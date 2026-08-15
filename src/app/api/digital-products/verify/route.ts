// ============================================================
// POST /api/digital-products/verify — Payment Verification
// ============================================================
// Verifies Razorpay payment signature and fulfils the order
// (generates download token + sends email).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPaymentSignature } from "@/lib/digital-products/razorpay";
import { fulfilOrder } from "@/lib/digital-products/fulfilment";

// ── Input Validation ──────────────────────────────────────────
const verifyPaymentSchema = z.object({
  orderId: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

// ── POST Handler ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate input
    const body = await request.json();
    const parsed = verifyPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;

    // 2. Look up local order by orderId
    const order = await db.digitalProductOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 3. Verify razorpayOrderId matches the one on the local order
    if (order.razorpayOrderId !== razorpayOrderId) {
      return NextResponse.json(
        { error: "Order ID mismatch" },
        { status: 400 }
      );
    }

    // 4. Verify payment signature using HMAC-SHA256
    const isValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 5. Update order: mark as PAID with payment details
    const now = new Date();
    await db.digitalProductOrder.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        razorpayPaymentId,
        razorpaySignature,
        paidAt: now,
      },
    });

    // 6. Fulfil order (generates download token and sends email)
    // fulfilOrder is idempotent — safe to call even if already fulfilled
    await fulfilOrder(orderId);

    // 7. Return success
    return NextResponse.json({
      success: true,
      orderId,
    });
  } catch (error) {
    console.error("[verify] Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed. Please try again." },
      { status: 500 }
    );
  }
}
