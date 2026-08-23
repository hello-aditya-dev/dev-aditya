/**
 * /templates — isolated outbound tracking hooks.
 *
 * The site has no global analytics abstraction, so this module provides a
 * minimal, self-contained implementation scoped to the /templates route
 * only. No existing analytics behaviour is touched (there is none).
 *
 * Each tracked click pushes two things:
 *   1. A `templates:cta` CustomEvent on window (for any future listener).
 *   2. A `templates_cta` entry on window.dataLayer (GTM-ready, harmless if
 *      no tag manager is installed).
 */

export type TemplateCtaType = "live_preview" | "marketplace" | "quick_look";

export interface TemplateCtaPayload {
  /** Template identifier, e.g. "multiply". */
  template: string;
  /** CTA type, e.g. "live_preview" or "marketplace". */
  cta: TemplateCtaType;
  /** Route the click happened on. */
  page: string;
  /** ISO timestamp of the click. */
  timestamp: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Tracks an outbound CTA click for a template product. */
export function trackTemplateCta(
  template: string,
  cta: TemplateCtaType,
): void {
  if (typeof window === "undefined") return;

  const payload: TemplateCtaPayload = {
    template,
    cta,
    page: "/templates",
    timestamp: new Date().toISOString(),
  };

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: "templates_cta", ...payload });
  } catch {
    // Never let tracking break a navigation.
  }

  try {
    window.dispatchEvent(
      new CustomEvent<TemplateCtaPayload>("templates:cta", {
        detail: payload,
      }),
    );
  } catch {
    // CustomEvent unavailable — ignore.
  }
}
