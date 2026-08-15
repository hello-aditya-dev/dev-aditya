/**
 * Resend email client for the contact form.
 *
 * Sends a single type of transactional email:
 *   1. Contact enquiry — delivered to CONTACT_TO_EMAIL when a visitor
 *      submits the /contact form.
 *
 * Uses the Resend Node.js SDK (server-side only). Failures are caught
 * and returned as `{ success: false, reason, error }` so the API route
 * can respond gracefully without crashing.
 *
 * Security: never logs full email bodies containing personal
 * information in production.
 */

import { Resend } from "resend";

import { env, hasResendKey } from "@/lib/env";

import {
  ContactEnquiryEmail,
  CONTACT_ENQUIRY_EMAIL_SUBJECT,
  contactEnquiryEmailText,
  type ContactEnquiryEmailProps,
} from "@/emails/ContactEnquiryEmail";

// ──────────────────────────────────────────────────────────────
// Resend client singleton
// ──────────────────────────────────────────────────────────────

function createResendClient(): Resend | null {
  if (!hasResendKey || !env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[email] RESEND_API_KEY is not set — emails will not be sent.");
    }
    return null;
  }
  return new Resend(env.RESEND_API_KEY);
}

const resendClient = createResendClient();

// ──────────────────────────────────────────────────────────────
// Public API — Contact enquiry email
// ──────────────────────────────────────────────────────────────

export interface SendContactEnquiryEmailParams extends ContactEnquiryEmailProps {
  sourcePage: string;
  submittedAt: string;
}

export interface SendEmailResult {
  success: boolean;
  reason?: "not_configured" | "send_failed";
  error?: string;
}

export async function sendContactEnquiryEmail(
  params: SendContactEnquiryEmailParams,
): Promise<SendEmailResult> {
  if (!resendClient || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
    console.warn(
      "[email] Skipping contact enquiry email — RESEND_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is not configured.",
    );
    return { success: false, reason: "not_configured" };
  }

  try {
    const { error } = await resendClient.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: params.email,
      subject: CONTACT_ENQUIRY_EMAIL_SUBJECT,
      react: ContactEnquiryEmail(params),
      text: contactEnquiryEmailText(params),
    });

    if (error) {
      console.error(
        `[email] Resend returned an error sending contact enquiry from ${params.email}:`,
        error.message,
      );
      return { success: false, reason: "send_failed", error: error.message };
    }

    console.info(
      `[email] Contact enquiry sent: from=***@${params.email.split("@")[1]}, name=${params.name.slice(0, 32)}`,
    );

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[email] Contact enquiry email failed to send:", message);
    return { success: false, reason: "send_failed", error: message };
  }
}
