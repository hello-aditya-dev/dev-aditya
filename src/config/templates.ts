/**
 * /templates — product configuration.
 *
 * All six template definitions live here so marketplace URLs, prices and
 * copy are editable in exactly one place. Nothing in the components
 * hardcodes product data.
 *
 * IMPORTANT — marketplace URLs:
 * The marketplace listings are not supplied yet. Each product carries a
 * `marketplaceUrl` field set to MARKETPLACE_URL_PLACEHOLDER (null). Cards
 * render the "Get template" action only when a real URL is configured —
 * never a fake or broken link. When the listings exist, replace the
 * placeholder per product (or set the shared constant if it is a profile
 * page with query params).
 */

/**
 * Shared placeholder for not-yet-supplied marketplace URLs.
 * Replace with the real listing URL string when available.
 */
export const MARKETPLACE_URL_PLACEHOLDER: string | null = null;

/**
 * Optional creator marketplace profile URL.
 * When supplied, the hero renders a secondary "Marketplace ↗" CTA.
 * Until then the button is omitted (never faked).
 */
export const MARKETPLACE_PROFILE_URL: string | null = null;

export interface TemplateProduct {
  /** Stable identifier — used for analytics and asset lookup. */
  slug: string;
  /** Display name, e.g. "Multiply". */
  name: string;
  /** Category label (rendered uppercase via micro-label styling). */
  category: string;
  /** One-sentence product description. */
  description: string;
  /** Display price, e.g. "$129". */
  price: string;
  /** Live preview URL (opens in a new tab). */
  previewUrl: string;
  /** Marketplace listing URL — null until supplied. */
  marketplaceUrl: string | null;
  /** Screenshot assets captured from the real live previews. */
  screenshot: {
    desktop: string;
    mobile: string;
  };
  /** Hostname shown in the card's browser-chrome address pill. */
  previewHost: string;
  /** Subtle featured marker — rendered as a small pill, never a hero card. */
  featured?: boolean;
}

export const TEMPLATES: TemplateProduct[] = [
  {
    slug: "multiply",
    name: "Multiply",
    category: "AI Automation",
    description:
      "A conversion-focused website system for AI automation agencies, AI consultants and implementation companies.",
    price: "$129",
    previewUrl: "https://ai-automation-agency-template-eight.vercel.app/",
    marketplaceUrl: MARKETPLACE_URL_PLACEHOLDER,
    screenshot: {
      desktop: "/templates/multiply-desktop.jpg",
      mobile: "/templates/multiply-mobile.jpg",
    },
    previewHost: "ai-automation-agency-template-eight.vercel.app",
    featured: true,
  },
  {
    slug: "meridian",
    name: "Meridian",
    category: "B2B / Enterprise",
    description:
      "A premium enterprise SaaS website system built for complex products, operational software and B2B companies.",
    price: "$149",
    previewUrl: "https://meridian-peach-chi.vercel.app/",
    marketplaceUrl: MARKETPLACE_URL_PLACEHOLDER,
    screenshot: {
      desktop: "/templates/meridian-desktop.jpg",
      mobile: "/templates/meridian-mobile.jpg",
    },
    previewHost: "meridian-peach-chi.vercel.app",
  },
  {
    slug: "perimeter",
    name: "Perimeter",
    category: "Security / DevSecOps",
    description:
      "An enterprise-grade website system for cybersecurity, cloud security and DevSecOps companies.",
    price: "$129",
    previewUrl: "https://perimeter-security.vercel.app/",
    marketplaceUrl: MARKETPLACE_URL_PLACEHOLDER,
    screenshot: {
      desktop: "/templates/perimeter-desktop.jpg",
      mobile: "/templates/perimeter-mobile.jpg",
    },
    previewHost: "perimeter-security.vercel.app",
  },
  {
    slug: "axiom",
    name: "AXIOM",
    category: "Fintech / Infrastructure",
    description:
      "A refined fintech website system designed around financial products, data, trust and infrastructure.",
    price: "$129",
    previewUrl: "https://axiom-fintech-template.vercel.app/",
    marketplaceUrl: MARKETPLACE_URL_PLACEHOLDER,
    screenshot: {
      desktop: "/templates/axiom-desktop.jpg",
      mobile: "/templates/axiom-mobile.jpg",
    },
    previewHost: "axiom-fintech-template.vercel.app",
  },
  {
    slug: "strata",
    name: "STRATA",
    category: "Architecture / Engineering",
    description:
      "An editorial website system for architecture studios, engineering firms and design-led practices.",
    price: "$99",
    previewUrl: "https://strata-architecture-studio.vercel.app/",
    marketplaceUrl: MARKETPLACE_URL_PLACEHOLDER,
    screenshot: {
      desktop: "/templates/strata-desktop.jpg",
      mobile: "/templates/strata-mobile.jpg",
    },
    previewHost: "strata-architecture-studio.vercel.app",
  },
  {
    slug: "aldervane",
    name: "Aldervane",
    category: "Legal / Professional Services",
    description:
      "A premium website system for modern law firms and professional services practices.",
    price: "$99",
    previewUrl: "https://modern-law-firm-template.vercel.app/",
    marketplaceUrl: MARKETPLACE_URL_PLACEHOLDER,
    screenshot: {
      desktop: "/templates/aldervane-desktop.jpg",
      mobile: "/templates/aldervane-mobile.jpg",
    },
    previewHost: "modern-law-firm-template.vercel.app",
  },
];

/** Count badge copy for the hero metadata line, e.g. "06". */
export const TEMPLATE_COUNT = String(TEMPLATES.length).padStart(2, "0");
