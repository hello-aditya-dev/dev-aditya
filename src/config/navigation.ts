/**
 * Navigation and footer link configuration.
 *
 * Primary navigation is buyer-focused and matches the Paperfolio-inspired
 * information architecture. Secondary routes (Resources, Mentoring) remain
 * live but are surfaced in the footer rather than the header.
 */

export interface NavLink {
  href: string;
  label: string;
}

/** Primary header navigation. */
export const PRIMARY_NAV: NavLink[] = [
  { href: "/work", label: "Work" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

/** Footer — Work column. */
export const FOOTER_WORK: NavLink[] = [
  { href: "/work", label: "All work" },
  { href: "/work/ibs-infra", label: "IBS Infra" },
  { href: "/work/device-destination", label: "DeviceDestination" },
  { href: "/work/aarohan-legal", label: "Aarohan Legal" },
];

/** Footer — Capabilities column. */
export const FOOTER_CAPABILITIES: NavLink[] = [
  { href: "/capabilities#corporate-website-design", label: "Corporate websites" },
  { href: "/capabilities#website-redesign", label: "Website redesign" },
  { href: "/capabilities#b2b-landing-pages", label: "B2B landing pages" },
  { href: "/capabilities#frontend-development", label: "Frontend development" },
];

/** Footer — Explore column. */
export const FOOTER_EXPLORE: NavLink[] = [
  { href: "/work", label: "Work" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/mentoring", label: "Project help" },
];

/** Footer — Resources column. */
export const FOOTER_RESOURCES: NavLink[] = [
  { href: "/resources", label: "All resources" },
  { href: "/resources/portfolio-checklist", label: "Portfolio checklist" },
  { href: "/resources/ai-website-agency", label: "AI website agency notes" },
  { href: "/resources/frontend-qa", label: "Frontend QA checklist" },
];

/** Footer — Legal column. */
export const FOOTER_LEGAL: NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
];
