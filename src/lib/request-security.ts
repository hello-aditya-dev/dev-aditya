/**
 * Request security utilities.
 *
 * Provides:
 *  – Honeypot field detection for spam bots
 *  – Body size limit helper
 *  – Same-origin validation
 *
 * The original repository also included Cloudflare Turnstile verification
 * (used by the audit funnel). The audit funnel is out of scope for this
 * redesign (see docs/content-inventory.md), so Turnstile is omitted.
 */

import { env } from "@/lib/env";

// ──────────────────────────────────────────────────────────────
// Same-origin validation
// ──────────────────────────────────────────────────────────────

/**
 * Validate that the request's Origin or Referer header matches
 * the site's own origin.
 *
 * Allows the request's own origin, the configured production origin,
 * and any additional origins in AUDIT_ALLOWED_ORIGINS.
 */
export function validateSameOrigin(
  request: Request & { nextUrl?: { origin: string } },
): boolean {
  const allowedOrigins = new Set<string>();

  const requestOrigin = (request as { nextUrl?: { origin: string } }).nextUrl?.origin;
  if (requestOrigin) allowedOrigins.add(requestOrigin);

  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      allowedOrigins.add(new URL(siteUrl).origin);
    } catch {
      // skip
    }
  }

  const allowed = env.AUDIT_ALLOWED_ORIGINS;
  if (allowed) {
    for (const origin of allowed.split(",")) {
      const trimmed = origin.trim();
      if (trimmed) {
        try {
          allowedOrigins.add(new URL(trimmed).origin);
        } catch {
          // skip
        }
      }
    }
  }

  if (allowedOrigins.size === 0) return true;

  const originHeader = request.headers.get("origin");
  if (originHeader) {
    try {
      return allowedOrigins.has(new URL(originHeader).origin);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return allowedOrigins.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return true;
}

// ──────────────────────────────────────────────────────────────
// Honeypot field check
// ──────────────────────────────────────────────────────────────

export function checkHoneypot(
  body: Record<string, unknown>,
  fieldName: string = "_honey",
): boolean {
  const value = body[fieldName];
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
}

// ──────────────────────────────────────────────────────────────
// Body size limit helper
// ──────────────────────────────────────────────────────────────

export async function readBodyWithLimit(
  request: Request,
  maxBytes: number = 50_000,
): Promise<string> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const length = parseInt(contentLength, 10);
    if (!isNaN(length) && length > maxBytes) {
      throw new Error(
        `Request body too large: ${length} bytes exceeds limit of ${maxBytes} bytes.`,
      );
    }
  }

  let bytesRead = 0;
  const chunks: Uint8Array[] = [];

  if (!request.body) return "";

  const reader = request.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      if (bytesRead > maxBytes) {
        reader.cancel().catch(() => {});
        throw new Error(`Request body too large: exceeded limit of ${maxBytes} bytes.`);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(combined);
}
