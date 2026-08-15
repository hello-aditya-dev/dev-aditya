/**
 * Environment variable validation.
 *
 * Parses and type-checks every env var the contact form needs. Optional
 * vars that are missing at runtime produce a safe fallback state rather
 * than crashing the build.
 */

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().default("https://dev-aditya.com"),

  RESEND_API_KEY: z.string().optional(),

  CONTACT_FROM_EMAIL: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().optional(),

  // Comma-separated list of additional allowed origins for the contact API.
  AUDIT_ALLOWED_ORIGINS: z.string().optional(),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.warn("[env] Invalid environment variables:", parsed.error.format());
    return {
      NEXT_PUBLIC_SITE_URL: "https://dev-aditya.com",
      RESEND_API_KEY: undefined,
      CONTACT_FROM_EMAIL: undefined,
      CONTACT_TO_EMAIL: undefined,
      AUDIT_ALLOWED_ORIGINS: undefined,
    };
  }
  return parsed.data;
}

export const env = loadEnv();

export const hasResendKey = Boolean(env.RESEND_API_KEY);

export const isContactConfigured = Boolean(
  env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL && env.CONTACT_TO_EMAIL,
);
