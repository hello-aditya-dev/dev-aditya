// ============================================================
// POST /api/digital-products/webhook/razorpay — Razorpay Webhook
// ============================================================
// Handles Razorpay webhook events: payment.captured, payment.failed,
// refund.created, refund.processed.
// Uses idempotent event processing and after() for non-blocking work.

import { NextRequest, NextResponse, after } from "next/server";
import { db } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/digital-products/razorpay";
import { fulfilOrder } from "@/lib/digital-products/fulfilment";

// ── POST Handler ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body as text — DO NOT JSON parse before verification
    const rawBody = await request.text();

    // 2. Get X-Razorpay-Signature header
    const signature = request.headers.get("X-Razorpay-Signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing X-Razorpay-Signature header" },
        { status: 400 }
      );
    }

    // 3. Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    // 4. Parse the JSON body (now safe after signature verification)
    let payload: RazorpayWebhookPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const eventId = payload.event_id ?? payload.id;
    const eventType = payload.event;

    if (!eventId || !eventType) {
      return NextResponse.json(
        { error: "Missing event_id or event type" },
        { status: 400 }
      );
    }

    // 5. Check for duplicate event (idempotency)
    const existingEvent = await db.paymentWebhookEvent.findUnique({
      where: { eventId },
    });

    if (existingEvent) {
      // Already processed — return 200 (idempotent)
      return NextResponse.json({ received: true, duplicate: true });
    }

    // 6. Store event in paymentWebhookEvent table
    await db.paymentWebhookEvent.create({
      data: {
        eventId,
        eventType,
        payload: rawBody,
        processedAt: new Date(),
      },
    });

    // 7. Handle event types using after() for non-blocking fulfilment work
    // This ensures we return 200 promptly without waiting for email sending
    after(async () => {
      try {
        await handleWebhookEvent(eventType, payload);
      } catch (err) {
        console.error("[webhook] Error handling event in after():", err);
      }
    });

    // 8. Return 200 promptly
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook] Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// ── Event Handler ─────────────────────────────────────────────
async function handleWebhookEvent(
  eventType: string,
  payload: RazorpayWebhookPayload
): Promise<void> {
  const paymentEntity = payload.payload?.payment?.entity;
  const razorpayOrderId = paymentEntity?.order_id;

  switch (eventType) {
    case "payment.captured": {
      if (!razorpayOrderId) {
        console.error("[webhook] payment.captured missing order_id");
        return;
      }

      // Find order by razorpay_order_id
      const order = await db.digitalProductOrder.findFirst({
        where: { razorpayOrderId },
      });

      if (!order) {
        console.error(`[webhook] No order found for razorpayOrderId: ${razorpayOrderId}`);
        return;
      }

      // Mark as PAID if not already
      if (order.status !== "PAID") {
        const now = new Date();
        await db.digitalProductOrder.update({
          where: { id: order.id },
          data: {
            status: "PAID",
            razorpayPaymentId: paymentEntity?.id ?? undefined,
            paidAt: now,
          },
        });
      }

      // Trigger fulfilment (idempotent — safe to call multiple times)
      await fulfilOrder(order.id);
      break;
    }

    case "payment.failed": {
      if (!razorpayOrderId) {
        console.error("[webhook] payment.failed missing order_id");
        return;
      }

      const order = await db.digitalProductOrder.findFirst({
        where: { razorpayOrderId },
      });

      if (!order) {
        console.error(`[webhook] No order found for razorpayOrderId: ${razorpayOrderId}`);
        return;
      }

      // Mark as FAILED
      await db.digitalProductOrder.update({
        where: { id: order.id },
        data: { status: "FAILED" },
      });
      break;
    }

    case "refund.created":
    case "refund.processed": {
      if (!razorpayOrderId) {
        // Refund events may reference payment entity differently
        const refundOrderId = payload.payload?.refund?.entity?.payment_id;
        if (!refundOrderId) {
          console.error(`[webhook] ${eventType} missing order reference`);
          return;
        }
        // For refund events, we try to find the order by the payment_id
        // which may be the razorpayPaymentId on our order
        const order = await db.digitalProductOrder.findFirst({
          where: { razorpayPaymentId: refundOrderId },
        });

        if (order) {
          await db.digitalProductOrder.update({
            where: { id: order.id },
            data: {
              status: "REFUNDED",
              refundedAt: new Date(),
            },
          });
        }
        return;
      }

      const order = await db.digitalProductOrder.findFirst({
        where: { razorpayOrderId },
      });

      if (!order) {
        console.error(`[webhook] No order found for razorpayOrderId: ${razorpayOrderId}`);
        return;
      }

      // Mark as REFUNDED
      await db.digitalProductOrder.update({
        where: { id: order.id },
        data: {
          status: "REFUNDED",
          refundedAt: new Date(),
        },
      });
      break;
    }

    default:
      console.info(`[webhook] Unhandled event type: ${eventType}`);
  }
}

// ── Types ─────────────────────────────────────────────────────
interface RazorpayWebhookPayload {
  entity?: string;
  event?: string;
  event_id?: string;
  id?: string;
  created_at?: number;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
        amount?: number;
        currency?: string;
        email?: string;
        method?: string;
      };
    };
    refund?: {
      entity?: {
        id?: string;
        payment_id?: string;
        order_id?: string;
        status?: string;
        amount?: number;
      };
    };
  };
}
