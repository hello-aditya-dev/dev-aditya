// ============================================================
// Signed Download Token — JWT-like HMAC Token Utilities
// ============================================================
// Creates and verifies signed tokens for secure product downloads.
// Tokens are HMAC-SHA256 signed (not asymmetric JWT) for simplicity.
// Payload is base64url-encoded; signature ensures tamper resistance.

import crypto from "node:crypto";

// ── Environment ──────────────────────────────────────────────
const TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET ?? "";

// ── Types ────────────────────────────────────────────────────
export interface DownloadTokenPayload {
  orderId: string;
  productId: string;
  email: string;
  /** Unix timestamp (seconds) — token expiry */
  exp: number;
}

// ── Constants ────────────────────────────────────────────────
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

// ── Base64URL helpers ────────────────────────────────────────
function toBase64Url(buffer: Buffer): string {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Buffer {
  // Restore standard base64 padding
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad === 2) base64 += "==";
  else if (pad === 3) base64 += "=";
  return Buffer.from(base64, "base64");
}

// ── Token Generation ─────────────────────────────────────────
/**
 * Generates a signed download token for a purchased product.
 *
 * The token is a three-part string: header.payload.signature
 * - header:  base64url({ alg: "HS256", typ: "dl-token" })
 * - payload: base64url({ orderId, productId, email, exp })
 * - signature: base64url(HMAC-SHA256(header + "." + payload, secret))
 *
 * @param orderId      - The internal order ID (cuid)
 * @param productId    - The product ID/slug
 * @param customerEmail - The purchaser's email
 * @returns The signed token string
 * @throws If DOWNLOAD_TOKEN_SECRET is not configured
 */
export function generateDownloadToken(
  orderId: string,
  productId: string,
  customerEmail: string
): string {
  if (!TOKEN_SECRET) {
    throw new Error("DOWNLOAD_TOKEN_SECRET is not configured.");
  }

  // Header
  const header = toBase64Url(
    Buffer.from(JSON.stringify({ alg: "HS256", typ: "dl-token" }), "utf8")
  );

  // Payload with 7-day expiry
  const payload: DownloadTokenPayload = {
    orderId,
    productId,
    email: customerEmail,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };

  const payloadEncoded = toBase64Url(
    Buffer.from(JSON.stringify(payload), "utf8")
  );

  // Signature: HMAC-SHA256 over "header.payload"
  const signingInput = `${header}.${payloadEncoded}`;
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(signingInput, "utf8")
    .digest();

  return `${signingInput}.${toBase64Url(signature)}`;
}

// ── Token Verification ──────────────────────────────────────
/**
 * Verifies a signed download token.
 *
 * Checks:
 * 1. Correct number of parts (header.payload.signature)
 * 2. Signature matches HMAC-SHA256(header.payload, secret)
 * 3. Token has not expired
 *
 * @param token - The signed token string
 * @returns The decoded payload if valid, or null if invalid/expired
 */
export function verifyDownloadToken(token: string): DownloadTokenPayload | null {
  if (!TOKEN_SECRET) {
    throw new Error("DOWNLOAD_TOKEN_SECRET is not configured.");
  }

  // Split into parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [headerEncoded, payloadEncoded, signatureEncoded] = parts;

  // Recompute signature
  const signingInput = `${headerEncoded}.${payloadEncoded}`;
  const expectedSignature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(signingInput, "utf8")
    .digest();

  // Timing-safe comparison
  const providedSignature = fromBase64Url(signatureEncoded);
  if (expectedSignature.length !== providedSignature.length) {
    return null;
  }

  try {
    if (!crypto.timingSafeEqual(expectedSignature, providedSignature)) {
      return null;
    }
  } catch {
    return null;
  }

  // Decode payload
  let payload: DownloadTokenPayload;
  try {
    const payloadJson = fromBase64Url(payloadEncoded).toString("utf8");
    payload = JSON.parse(payloadJson);
  } catch {
    return null;
  }

  // Check required fields
  if (!payload.orderId || !payload.productId || !payload.email || !payload.exp) {
    return null;
  }

  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    return null;
  }

  return payload;
}
