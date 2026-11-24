/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Limitation: state lives in this server process. On serverless or multi-instance hosting each
 * instance counts separately, so the effective limit is looser. For strict global limits put a
 * shared store (Redis/Upstash) behind the same function signature.
 */

const hitsByKey = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5000;

export interface RateLimitRule {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string, rule: RateLimitRule): RateLimitResult {
  const now = Date.now();
  const windowStart = now - rule.windowMs;
  const hits = (hitsByKey.get(key) ?? []).filter((time) => time > windowStart);

  if (hits.length >= rule.limit) {
    hitsByKey.set(key, hits);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((hits[0] + rule.windowMs - now) / 1000)),
    };
  }

  hits.push(now);
  hitsByKey.set(key, hits);

  // Keep memory bounded: drop expired keys once the map grows large.
  if (hitsByKey.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, times] of hitsByKey) {
      if (times.every((time) => time <= windowStart)) hitsByKey.delete(storedKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Best-effort client IP. Only trustworthy behind a proxy that sets these headers itself. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}
