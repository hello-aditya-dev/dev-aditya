// ============================================================
// Order Fulfilment — Mark Paid, Generate Token, Send Email
// ============================================================
// Idempotent fulfilment: if fulfilmentSentAt is already set, skip.
// Email failure does NOT block fulfilment — errors are caught and logged.

import { db } from "@/lib/db";
import { getProductBySlug, getServerPrice, SUPPORT_EMAIL, SITE_ORIGIN } from "@/config/digital-products";
import { generateDownloadToken } from "@/lib/digital-products/download-token";
import { Resend } from "resend";

// ── Environment ──────────────────────────────────────────────
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_ORIGIN;
const SUPPORT_EMAIL_RESOLVED = process.env.SUPPORT_EMAIL ?? SUPPORT_EMAIL;
const REFUND_POLICY_URL = `${SITE_URL}/digital-products/refund-policy`;

// ── Types ────────────────────────────────────────────────────
type DigitalProductOrder = {
  id: string;
  productId: string;
  productSlug: string;
  customerName: string;
  customerEmail: string;
  currency: string;
  amount: number;
  status: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  createdAt: Date;
  paidAt: Date | null;
  fulfilmentSentAt: Date | null;
  downloadCount: number;
  lastDownloadAt: Date | null;
};

// ── Email Sending ────────────────────────────────────────────
/**
 * Sends a purchase confirmation email via Resend.
 *
 * Email includes:
 * - Thank you message
 * - Product name
 * - Amount and currency
 * - Order reference
 * - Download button with secure link
 * - Support email
 * - Refund policy link
 *
 * Does NOT attach ZIP files — download is via secure token link.
 *
 * @param order - The database order record
 * @param downloadToken - The signed download token string
 */
export async function sendFulfilmentEmail(
  order: DigitalProductOrder,
  downloadToken: string
): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[fulfilment] RESEND_API_KEY not configured. Skipping email send.");
    return;
  }

  // Resolve product data for the email
  const product = getProductBySlug(order.productSlug);
  const productName = product?.name ?? order.productSlug;

  // Format amount for display (amount is in smallest currency unit)
  const displayAmount = formatAmount(order.amount, order.currency);

  // Build the secure download URL
  const downloadUrl = `${SITE_URL}/api/download?token=${encodeURIComponent(downloadToken)}`;

  // Order reference for the customer
  const orderRef = order.razorpayOrderId ?? order.id;

  const resend = new Resend(RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: `Digital Products <no-reply@${SITE_URL.replace(/^https?:\/\//, "")}>`,
    to: order.customerEmail,
    subject: `Your purchase: ${productName} — Download ready`,
    html: buildEmailHtml({
      customerName: order.customerName,
      productName,
      displayAmount,
      currency: order.currency,
      orderRef,
      downloadUrl,
      supportEmail: SUPPORT_EMAIL_RESOLVED,
      refundPolicyUrl: REFUND_POLICY_URL,
    }),
  });

  if (error) {
    throw new Error(`Resend email send failed: ${error.message}`);
  }
}

// ── Fulfilment ───────────────────────────────────────────────
/**
 * Fulfils a digital product order:
 * 1. Looks up the order in the database
 * 2. Checks idempotency — if fulfilmentSentAt is already set, returns early
 * 3. Marks the order as PAID (if not already)
 * 4. Generates a signed download token
 * 5. Sends the fulfilment email (non-blocking — failure is caught and logged)
 * 6. Records fulfilmentSentAt timestamp
 *
 * @param orderId - The internal order ID (cuid)
 * @returns The updated order record, or null if order not found
 */
export async function fulfilOrder(orderId: string): Promise<DigitalProductOrder | null> {
  // 1. Look up order
  const order = await db.digitalProductOrder.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    console.error(`[fulfilment] Order not found: ${orderId}`);
    return null;
  }

  // 2. Idempotency check — already fulfilled
  if (order.fulfilmentSentAt) {
    console.info(`[fulfilment] Order ${orderId} already fulfilled at ${order.fulfilmentSentAt.toISOString()}. Skipping.`);
    return order as DigitalProductOrder;
  }

  // 3. Mark as PAID if not already
  const now = new Date();
  if (order.status !== "PAID") {
    await db.digitalProductOrder.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        paidAt: order.paidAt ?? now,
      },
    });
  }

  // 4. Generate download token
  const downloadToken = generateDownloadToken(
    order.id,
    order.productId,
    order.customerEmail
  );

  // 5. Send fulfilment email (errors caught gracefully — never blocks fulfilment)
  try {
    await sendFulfilmentEmail(order as DigitalProductOrder, downloadToken);
  } catch (emailError) {
    console.error(
      `[fulfilment] Email send failed for order ${orderId}. Fulfilment will still complete.`,
      emailError
    );
    // Continue — email failure must NOT block fulfilment
  }

  // 6. Record fulfilment timestamp
  const updatedOrder = await db.digitalProductOrder.update({
    where: { id: orderId },
    data: {
      fulfilmentSentAt: now,
    },
  });

  console.info(`[fulfilment] Order ${orderId} fulfilled successfully.`);
  return updatedOrder as DigitalProductOrder;
}

// ── Helpers ──────────────────────────────────────────────────
/**
 * Formats an amount from smallest currency unit to display string.
 * e.g. 2499 INR → "₹24.99", 2900 USD → "$29.00"
 */
function formatAmount(amount: number, currency: string): string {
  const decimalAmount = amount / 100;
  const formatters: Record<string, (a: number) => string> = {
    INR: (a) => `₹${a.toLocaleString("en-IN")}`,
    USD: (a) => `$${a.toFixed(2)}`,
    EUR: (a) => `€${a.toFixed(2)}`,
    GBP: (a) => `£${a.toFixed(2)}`,
  };
  const formatter = formatters[currency] ?? ((a: number) => `${a.toFixed(2)} ${currency}`);
  return formatter(decimalAmount);
}

/**
 * Builds the HTML email body for the fulfilment email.
 * Styled for email clients — inline styles, table-based layout where needed.
 */
function buildEmailHtml(params: {
  customerName: string;
  productName: string;
  displayAmount: string;
  currency: string;
  orderRef: string;
  downloadUrl: string;
  supportEmail: string;
  refundPolicyUrl: string;
}): string {
  const {
    customerName,
    productName,
    displayAmount,
    currency,
    orderRef,
    downloadUrl,
    supportEmail,
    refundPolicyUrl,
  } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your purchase: ${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 16px 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Thank you for your purchase! 🎉</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:0 40px 24px 40px;text-align:center;color:#6b7280;font-size:16px;line-height:1.6;">
              Hi ${customerName}, your order is confirmed and your download is ready.
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding:0 40px 24px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
                    <span style="color:#6b7280;font-size:13px;">Product</span><br>
                    <span style="color:#111827;font-size:16px;font-weight:600;">${productName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
                    <span style="color:#6b7280;font-size:13px;">Amount</span><br>
                    <span style="color:#111827;font-size:16px;font-weight:600;">${displayAmount} ${currency}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <span style="color:#6b7280;font-size:13px;">Order Reference</span><br>
                    <span style="color:#111827;font-size:16px;font-weight:600;font-family:monospace;">${orderRef}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding:0 40px 32px 40px;text-align:center;">
              <a href="${downloadUrl}" style="display:inline-block;padding:14px 32px;background-color:#111827;color:#ffffff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:600;">
                ↓ Download Your Product
              </a>
              <p style="margin:12px 0 0 0;color:#9ca3af;font-size:13px;">
                This download link expires in 7 days.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px 40px;border-top:1px solid #e5e7eb;text-align:center;color:#9ca3af;font-size:13px;line-height:1.6;">
              Need help? Contact <a href="mailto:${supportEmail}" style="color:#6b7280;">${supportEmail}</a><br>
              <a href="${refundPolicyUrl}" style="color:#6b7280;">Refund Policy</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
