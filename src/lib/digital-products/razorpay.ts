// ============================================================
// Razorpay Server Utilities — REST API + HMAC Verification
// ============================================================
// Uses Razorpay REST API directly (NOT the SDK) for order creation.
// HMAC-SHA256 verification for payment signatures and webhooks.
// NEVER expose RAZORPAY_KEY_SECRET to the client.

import crypto from "node:crypto";

// ── Environment ──────────────────────────────────────────────
const KEY_ID = process.env.RAZORPAY_KEY_ID ?? "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? "";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";

// ── Types ────────────────────────────────────────────────────
export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string | null;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

// ── Helpers ──────────────────────────────────────────────────
/**
 * Timing-safe comparison of two strings using constant-time algorithm.
 * Prevents timing attacks on HMAC signature verification.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Compare lengths in constant time by still doing a full comparison
    // but return false regardless of the result
    crypto.timingSafeEqual(
      Buffer.from(a, "utf8"),
      Buffer.from(b.padEnd(a.length, "\0"), "utf8").subarray(0, a.length)
    );
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
}

/**
 * Compute HMAC-SHA256 digest as a hex string.
 */
function hmacSha256(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

// ── Order Creation (REST API) ────────────────────────────────
/**
 * Creates a Razorpay order using the REST API.
 *
 * @param amount  - Amount in smallest currency unit (e.g. cents for USD, paise for INR)
 * @param currency - Currency code (e.g. "USD", "INR")
 * @param receipt - Your internal receipt/order reference (max 40 chars)
 * @returns The Razorpay order object
 * @throws If env vars are missing or the API call fails
 */
export async function createRazorpayOrder(
  amount: number,
  currency: string,
  receipt: string
): Promise<RazorpayOrder> {
  if (!KEY_ID || !KEY_SECRET) {
    throw new Error(
      "Razorpay credentials not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET env vars."
    );
  }

  if (amount <= 0) {
    throw new Error(`Invalid amount: ${amount}. Must be a positive integer in smallest currency unit.`);
  }

  if (receipt.length > 40) {
    throw new Error(`Receipt "${receipt}" exceeds 40 character limit.`);
  }

  const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64");

  const response = await fetch(`${RAZORPAY_API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount,
      currency: currency.toUpperCase(),
      receipt,
      // Payment capture is automatic (default Razorpay behaviour)
      payment_capture: 1,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Razorpay order creation failed (${response.status}): ${errorBody}`
    );
  }

  const order: RazorpayOrder = await response.json();
  return order;
}

// ── Payment Signature Verification ──────────────────────────
/**
 * Verifies a Razorpay payment signature using HMAC-SHA256.
 *
 * The expected signature is: HMAC-SHA256(orderId + "|" + paymentId, keySecret)
 *
 * @param orderId   - The Razorpay order ID
 * @param paymentId - The Razorpay payment ID
 * @param signature - The signature received from Razorpay (frontend or webhook)
 * @returns true if signature is valid, false otherwise
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!KEY_SECRET) {
    throw new Error("RAZORPAY_KEY_SECRET is not configured.");
  }

  const expectedSignature = hmacSha256(`${orderId}|${paymentId}`, KEY_SECRET);
  return timingSafeEqual(expectedSignature, signature);
}

// ── Webhook Signature Verification ──────────────────────────
/**
 * Verifies a Razorpay webhook signature using HMAC-SHA256.
 *
 * Razorpay webhook signature = HMAC-SHA256(rawRequestBody, webhookSecret)
 *
 * @param rawBody   - The raw (unparsed) request body string
 * @param signature - The X-Razorpay-Signature header value
 * @returns true if signature is valid, false otherwise
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  if (!WEBHOOK_SECRET) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured.");
  }

  const expectedSignature = hmacSha256(rawBody, WEBHOOK_SECRET);
  return timingSafeEqual(expectedSignature, signature);
}
