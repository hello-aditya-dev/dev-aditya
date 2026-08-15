/**
 * In-memory rate limiter for the contact form.
 *
 * The original repository used a database-backed sliding-window rate
 * limiter (Drizzle + Neon PostgreSQL). The redesign has no database —
 * the audit funnel that consumed it is out of scope (see
 * docs/content-inventory.md) — so we use an in-memory sliding window.
 *
 * Behaviour is equivalent at the single-instance level: N requests per
 * key per window. On a serverless deployment with multiple instances,
 * the effective limit becomes N × instances, which is acceptable for
 * a contact form (the honeypot and server-side validation are the
 * primary spam defences).
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Opportunistic cleanup — runs on ~5% of checks.
const CLEANUP_PROBABILITY = 0.05;
const CLEANUP_THRESHOLD_MS = 60 * 60 * 1000; // 1 hour

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (Math.random() < CLEANUP_PROBABILITY) {
    cleanupOldRecords();
  }

  const now = Date.now();
  const windowStart = now - windowMs;
  const entry = store.get(key) ?? { timestamps: [] };

  // Keep only timestamps within the window.
  const recent = entry.timestamps.filter((t) => t > windowStart);
  const resetAt = new Date(
    recent.length > 0 ? recent[0] + windowMs : now + windowMs,
  );

  if (recent.length >= limit) {
    store.set(key, { timestamps: recent });
    return { allowed: false, remaining: 0, resetAt };
  }

  recent.push(now);
  store.set(key, { timestamps: recent });

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
    resetAt,
  };
}

function cleanupOldRecords(): void {
  const threshold = Date.now() - CLEANUP_THRESHOLD_MS;
  for (const [key, entry] of store) {
    const recent = entry.timestamps.filter((t) => t > threshold);
    if (recent.length === 0) {
      store.delete(key);
    } else if (recent.length !== entry.timestamps.length) {
      store.set(key, { timestamps: recent });
    }
  }
}
