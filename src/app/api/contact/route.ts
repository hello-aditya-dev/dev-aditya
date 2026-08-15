import { NextResponse, type NextRequest } from "next/server";

import { CONTACT_EMAIL } from "@/config/contact";
import { checkHoneypot, readBodyWithLimit, validateSameOrigin } from "@/lib/request-security";
import { sendContactEnquiryEmail } from "@/lib/email/resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/schemas/contact";

export const runtime = "nodejs";

/** Contact form: 3 submissions per 10 minutes per IP. */
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export async function POST(request: NextRequest) {
  if (!validateSameOrigin(request)) {
    return NextResponse.json(
      { success: false, message: "Request origin is not allowed." },
      { status: 403 },
    );
  }

  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many enquiries from this address. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 1000),
          ),
        },
      },
    );
  }

  let raw: string;
  try {
    raw = await readBodyWithLimit(request, 50_000);
  } catch {
    return NextResponse.json(
      { success: false, message: "Request body is too large." },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (checkHoneypot(body, "_honey")) {
    return NextResponse.json(
      { success: true, message: "Enquiry received. I'll reply within 1–2 business days." },
      { status: 200 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        message: firstError?.message ?? "Please check the form and try again.",
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const sourcePage = request.headers.get("referer")?.slice(0, 300) || "/contact";
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const result = await sendContactEnquiryEmail({
    name: data.name,
    email: data.email,
    company: data.company,
    website: data.website,
    projectType: data.projectType,
    scope: data.scope,
    timing: data.timing,
    details: data.details,
    sourcePage,
    submittedAt,
  });

  if (!result.success) {
    if (result.reason === "not_configured") {
      console.error("[contact] Enquiry email not sent — service not configured:", result.error);
      return NextResponse.json(
        {
          success: false,
          message: `Email delivery is not configured yet. Please email ${CONTACT_EMAIL} directly.`,
        },
        { status: 503 },
      );
    }

    console.error("[contact] Enquiry email failed to send:", result.error);
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong sending your enquiry. Please email ${CONTACT_EMAIL} directly.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Enquiry received. I'll reply within 1–2 business days.",
  });
}
