/**
 * Navigation and footer link configuration.
 *
 * Primary navigation is deliberately short: Work, About, For Agencies,
 * Contact. The agency offer is a commercial route surfaced in the header
 * so agency visitors see it immediately. All other secondary routes
 * (Capabilities, Process, Resources, Mentoring) remain live for SEO and
 * direct links but are surfaced only in the footer — never in the header
 * — so they cannot compete with the primary visitor journey.
 *
 * Templates is currently unlinked from both header and footer. The route,
 * components and data remain in the repository for when the showcase goes
 * live again; only the links are removed so the page is not discoverable
 * from the public site.
 *
 * GitHub is linked once from the footer (brand column) using the URL/handle
 * centralised in src/config/contact.ts. It is not part of the primary header
 * navigation.
 */

export interface NavLink {
  href: string;
  label: string;
}

/** Primary header navigation — Work, About, For Agencies, Contact. */
export const PRIMARY_NAV: NavLink[] = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/for-agencies", label: "For Agencies" },
  { href: "/contact", label: "Contact" },
];

/**
 * Footer — secondary links only.
 * Kept small on purpose: a few useful deep links plus legal.
 * Work column lists featured projects for direct access.
 */
export const FOOTER_WORK: NavLink[] = [
  { href: "/work", label: "All work" },
  { href: "/work/bharat-electrosafe", label: "Bharat Electrosafe" },
  { href: "/work/ibs-infra", label: "IBS Infra" },
  { href: "/work/strata-architecture-studio", label: "Strata Architecture Studio" },
  { href: "/work/cloudsun", label: "CloudSun" },
  { href: "/work/aarohan-legal", label: "Aarohan Legal" },
];

/** Footer — Explore column (secondary routes kept reachable, not loud). */
export const FOOTER_EXPLORE: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/for-agencies", label: "For Agencies" },
  { href: "/process", label: "Process" },
  { href: "/resources", label: "Resources" },
];

/** Footer — Legal column. */
export const FOOTER_LEGAL: NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
];

// Backwards-compatible exports kept for any legacy consumers, now empty so
// nothing renders GitHub/capability-strip style columns on the new small footer.
export const FOOTER_CAPABILITIES: NavLink[] = [];
export const FOOTER_RESOURCES: NavLink[] = [];
