/**
 * Centralised social / external-profile configuration.
 *
 * Only verified profiles that genuinely exist are listed here. No handle
 * or URL is ever invented.
 *
 * IMPORTANT: GitHub is intentionally NOT included in SOCIAL_LINKS. The
 * portfolio is client-facing and the live product matters more than source
 * code. The GitHub URL is retained in src/config/contact.ts for internal
 * project-data use only, but is never rendered to visitors.
 *
 * LinkedIn is intentionally absent because no verified LinkedIn URL exists
 * in this repository.
 */

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * Verified external profiles rendered on the customer-facing portfolio.
 * Currently empty by design — the email address is the primary contact
 * channel and is rendered directly where needed.
 */
export const SOCIAL_LINKS: SocialLink[] = [];
