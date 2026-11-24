import { NextResponse } from "next/server";
import { isMailConfigured, sendInquiryEmail } from "@/lib/mailer";
import { checkRateLimit, clientKey, type RateLimitRule } from "@/lib/rate-limit";
import { inquirySchema, type InquiryInput } from "@/lib/validation";

const WEBHOOK_TIMEOUT_MS = 8000;
// 5 submissions per IP every 10 minutes.
const RATE_LIMIT: RateLimitRule = { limit: 5, windowMs: 10 * 60 * 1000 };

async function postWebhook(inquiry: InquiryInput, url: string): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...inquiry, receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`webhook responded ${response.status}`);
}

/**
 * Delivers a validated inquiry by email (SMTP_* vars) and/or webhook (INQUIRY_WEBHOOK_URL).
 * Succeeds when at least one configured channel works. With nothing configured, development
 * just logs; production fails loudly so leads are never dropped silently.
 */
async function deliver(inquiry: InquiryInput): Promise<boolean> {
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  const channels: Promise<void>[] = [];
  if (isMailConfigured()) channels.push(sendInquiryEmail(inquiry));
  if (webhookUrl) channels.push(postWebhook(inquiry, webhookUrl));

  if (channels.length === 0) {
    if (process.env.NODE_ENV === "production") return false;
    console.info("[inquiry:dev] no SMTP/webhook configured, logging only:", JSON.stringify(inquiry));
    return true;
  }

  const results = await Promise.allSettled(channels);
  for (const result of results) {
    if (result.status === "rejected") console.error("[inquiry] delivery channel failed:", result.reason);
  }
  return results.some((result) => result.status === "fulfilled");
}

export async function POST(request: Request): Promise<NextResponse> {
  const limit = checkRateLimit(clientKey(request.headers), RATE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_failed" }, { status: 422 });
  }

  // Honeypot filled: pretend success so bots get no signal.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const delivered = await deliver(parsed.data);
  if (!delivered) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
