// ============================================================
// Digital Product Catalog — Single Source of Truth
// ============================================================
// ALL product data lives here. Pages and API routes import from here.
// Secrets, private file paths, and server-only prices are NOT here.
// Those live in server-only modules.

export type ProductStatus = "active" | "coming-soon" | "hidden" | "sold-out";
export type ProductType = "tool" | "bundle" | "template";
export type AccentColor = "coral" | "blue" | "yellow" | "violet";

export interface ProductFeature {
  name: string;
  description: string;
}

export interface DigitalProduct {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  category: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  launchPrice?: number;
  regularPrice: number;
  /** Server-owned prices — NEVER sent to client as authoritative source */
  currencyPrices: {
    USD?: number;
    INR?: number;
    USDLaunch?: number;
    INRLaunch?: number;
  };
  status: ProductStatus;
  featured: boolean;
  version?: string;
  formats: string[];
  includes: string[];
  /** Structured features — each feature carries its own description */
  features: ProductFeature[];
  bundleContents?: string[];
  bundleLifecycle?: string[];
  screenshots?: string[];
  thumbnail?: string;
  accent: AccentColor;
  whoItsFor?: string;
  whoItsNotFor?: string;
  licenseType?: string;
  seo: {
    title: string;
    description: string;
  };
}

// ── Accent color map ────────────────────────────────────────
export const accentColors: Record<AccentColor, { bg: string; text: string; border: string; shadow: string }> = {
  coral: {
    bg: "#FF4A60",
    text: "#FF4A60",
    border: "#FF4A60",
    shadow: "rgba(255,74,96,0.25)",
  },
  blue: {
    bg: "#1C92FF",
    text: "#1C92FF",
    border: "#1C92FF",
    shadow: "rgba(28,146,255,0.25)",
  },
  yellow: {
    bg: "#FFC431",
    text: "#9B7A1E",
    border: "#FFC431",
    shadow: "rgba(255,196,49,0.25)",
  },
  violet: {
    bg: "#5C42FB",
    text: "#5C42FB",
    border: "#5C42FB",
    shadow: "rgba(92,66,251,0.25)",
  },
};

// ── Product Catalog ─────────────────────────────────────────
export const digitalProducts: DigitalProduct[] = [
  // ── PRODUCT 1: Web Project Pricing OS ──────────────────
  {
    id: "web-project-pricing-os",
    slug: "web-project-pricing-os",
    name: "Web Project Pricing OS",
    type: "tool",
    category: "Agency Tools",
    eyebrow: "01 / PRICING",
    shortDescription: "Stop guessing what to charge for websites.",
    description:
      "A project-pricing system for web designers and agencies that turns scope into estimated workload, delivery cost, target margin and a defensible project quote.",
    launchPrice: 29,
    regularPrice: 49,
    currencyPrices: {
      USD: 49,
      USDLaunch: 29,
      INR: 2499,
      INRLaunch: 1499,
    },
    status: "active",
    featured: true,
    version: "1.0",
    formats: ["Excel workbook", "Demo workbook", "PDF documentation", "ZIP package"],
    includes: [
      "Main pricing workbook",
      "Fictional demo workbook",
      "Start Here guide",
      "Project scoping questionnaire",
      "Pricing and margin guide",
      "Change-order guide",
      "License",
    ],
    features: [
      {
        name: "Scope Builder",
        description: "Select project deliverables and activities to define what the project includes and excludes.",
      },
      {
        name: "Hours Engine",
        description: "Assign estimated hours to each scope item so you can see total workload before you price.",
      },
      {
        name: "Cost Engine",
        description: "Calculate delivery cost from estimated hours and your team's cost rates.",
      },
      {
        name: "Price Engine",
        description: "Apply a margin target to delivery cost and generate the recommended project price.",
      },
      {
        name: "Quote Builder",
        description: "Assemble scope, pricing and terms into a client-ready project quote.",
      },
      {
        name: "Essential / Recommended / Premium Tiers",
        description: "Generate three pricing tiers for the same scope so the client can choose their level of investment.",
      },
      {
        name: "Scope Creep Modeller",
        description: "Add unplanned hours to a live project and see the impact on margin and effective rate.",
      },
      {
        name: "Change Order Calculator",
        description: "Quantify the cost of client-requested changes and produce a change-order amount to present.",
      },
      {
        name: "Project Actuals",
        description: "Record actual hours after delivery to compare your estimate against what really happened.",
      },
      {
        name: "Project Database",
        description: "Store completed project data so you can reference past projects when estimating new ones.",
      },
      {
        name: "Dashboard",
        description: "See summary metrics across projects — average margin, scope-creep frequency, and effective rate.",
      },
    ],
    accent: "coral",
    whoItsFor:
      "Freelance web designers, small agency owners, and independent developers who quote client projects and want to stop underpricing.",
    whoItsNotFor:
      "Teams that already use mature agency management software with built-in financial modelling, or people who never quote fixed-price projects.",
    licenseType: "Single-user commercial license",
    seo: {
      title: "Web Project Pricing OS — Website Pricing Calculator for Agencies",
      description:
        "Scope website projects, estimate workload, calculate margins, model scope creep and build more defensible client quotes.",
    },
  },

  // ── FUTURE: Web Project Scope & Proposal OS ─────────────
  {
    id: "web-project-scope-proposal-os",
    slug: "web-project-scope-proposal-os",
    name: "Web Project Scope & Proposal OS",
    type: "tool",
    category: "Agency Tools",
    eyebrow: "02 / SCOPE",
    shortDescription: "Turn discovery calls into structured scope and proposals.",
    description:
      "A scoping and proposal system that converts client discovery into structured project scope, deliverables, exclusions and a professional proposal document.",
    launchPrice: 29,
    regularPrice: 39,
    currencyPrices: { USD: 39, USDLaunch: 29, INR: 1999, INRLaunch: 1499 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    features: [
      {
        name: "Discovery Questionnaire",
        description: "Capture client goals, audience, technical requirements and brand direction in a structured format.",
      },
      {
        name: "Scope Builder",
        description: "Convert discovery answers into a list of deliverables, activities and explicit exclusions.",
      },
      {
        name: "Proposal Generator",
        description: "Assemble scope, timeline and pricing into a formatted proposal document ready to send.",
      },
      {
        name: "Exclusions Tracker",
        description: "Maintain a clear record of what is out of scope to protect against scope creep after sign-off.",
      },
    ],
    accent: "blue",
    seo: {
      title: "Web Project Scope & Proposal OS — Agency Scoping Tool",
      description:
        "Convert client discovery into structured project scope, deliverables and professional proposals.",
    },
  },

  // ── FUTURE: Web Agency Client Onboarding OS ─────────────
  {
    id: "web-agency-client-onboarding-os",
    slug: "web-agency-client-onboarding-os",
    name: "Web Agency Client Onboarding OS",
    type: "tool",
    category: "Agency Tools",
    eyebrow: "03 / ONBOARD",
    shortDescription: "Onboard new clients without chaos.",
    description:
      "A client onboarding system that standardizes how new projects start — from signed proposal to first deliverable review.",
    launchPrice: 29,
    regularPrice: 39,
    currencyPrices: { USD: 39, USDLaunch: 29, INR: 1999, INRLaunch: 1499 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    features: [
      {
        name: "Client Intake Form",
        description: "Collect logos, brand assets, access credentials and project preferences in one place.",
      },
      {
        name: "Onboarding Checklist",
        description: "Track every setup step — hosting, CMS, analytics, email — so nothing is missed.",
      },
      {
        name: "Milestone Tracker",
        description: "Define onboarding milestones and due dates to keep the project start on schedule.",
      },
      {
        name: "Welcome Packet Generator",
        description: "Produce a client-ready welcome document covering process, timelines and communication norms.",
      },
    ],
    accent: "yellow",
    seo: {
      title: "Web Agency Client Onboarding OS — Client Onboarding System",
      description:
        "Standardize how new client projects start — from signed proposal to first deliverable review.",
    },
  },

  // ── FUTURE: Website QA & Launch OS ─────────────────────
  {
    id: "website-qa-launch-os",
    slug: "website-qa-launch-os",
    name: "Website QA & Launch OS",
    type: "tool",
    category: "Agency Tools",
    eyebrow: "04 / QA",
    shortDescription: "QA and launch websites without missing steps.",
    description:
      "A QA and launch checklist system that ensures every website goes live with consistent quality, not just hope.",
    launchPrice: 29,
    regularPrice: 39,
    currencyPrices: { USD: 39, USDLaunch: 29, INR: 1999, INRLaunch: 1499 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    features: [
      {
        name: "Pre-Launch QA Checklist",
        description: "Work through a structured checklist of functional, content and visual checks before going live.",
      },
      {
        name: "Cross-Browser Testing Guide",
        description: "Reference table of browsers, devices and breakpoints to test against before launch.",
      },
      {
        name: "Launch Sequence",
        description: "Step-by-step deployment checklist covering DNS, hosting, SSL, redirects and go-live verification.",
      },
      {
        name: "Post-Launch Verification",
        description: "Confirm forms, analytics, performance and client handover items after the site is live.",
      },
    ],
    accent: "violet",
    seo: {
      title: "Website QA & Launch OS — Launch Checklist System",
      description:
        "Ensure every website goes live with consistent quality using structured QA and launch checklists.",
    },
  },

  // ── FUTURE: Agency Profit & Capacity OS ─────────────────
  {
    id: "agency-profit-capacity-os",
    slug: "agency-profit-capacity-os",
    name: "Agency Profit & Capacity OS",
    type: "tool",
    category: "Agency Tools",
    eyebrow: "05 / PROFIT",
    shortDescription: "Understand your actual profitability and capacity.",
    description:
      "A profit and capacity system that shows actual project profitability, overhead allocation, and how much work your agency can take on.",
    launchPrice: 39,
    regularPrice: 59,
    currencyPrices: { USD: 59, USDLaunch: 39, INR: 2999, INRLaunch: 1999 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    features: [
      {
        name: "Profit Tracker",
        description: "Record revenue and true cost per project to see actual margin — not the margin you quoted.",
      },
      {
        name: "Overhead Allocator",
        description: "Distribute fixed overhead (software, rent, salaries) across active projects to understand real cost.",
      },
      {
        name: "Capacity Modeller",
        description: "Input team size, available hours and current commitments to see how much work you can take on.",
      },
      {
        name: "Growth Planner",
        description: "Model hiring scenarios and revenue targets to plan when and how to grow the team.",
      },
    ],
    accent: "coral",
    seo: {
      title: "Agency Profit & Capacity OS — Agency Profitability Tool",
      description:
        "Track real project profitability, allocate overhead, model capacity and plan growth for your web agency.",
    },
  },

  // ── BUNDLE 1: Agency Starter Bundle ─────────────────────
  {
    id: "agency-starter-bundle",
    slug: "agency-starter-bundle",
    name: "Agency Starter Bundle",
    type: "bundle",
    category: "Bundles",
    eyebrow: "BUNDLE 01",
    shortDescription: "Discover, scope, price, propose, onboard.",
    description:
      "The front half of your client process, systematised. Pricing, scoping and onboarding tools for freelancers and small studios formalising their workflow.",
    launchPrice: 69,
    regularPrice: 99,
    currencyPrices: {
      USD: 99,
      USDLaunch: 69,
      INR: 4999,
      INRLaunch: 3499,
    },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbooks", "PDF documentation", "ZIP packages"],
    includes: [],
    features: [
      {
        name: "Structured discovery process",
        description: "Use the Discovery Questionnaire to capture every client need before you scope.",
      },
      {
        name: "Defensible pricing",
        description: "Scope Builder → Hours Engine → Cost Engine → Price Engine gives you a quote backed by real numbers.",
      },
      {
        name: "Professional proposals",
        description: "Assemble scope and pricing into a client-ready proposal with clear exclusions.",
      },
      {
        name: "Consistent client onboarding",
        description: "Standardize how every new project starts with intake forms, checklists and milestones.",
      },
    ],
    bundleContents: [
      "Web Project Pricing OS",
      "Web Project Scope & Proposal OS",
      "Web Agency Client Onboarding OS",
    ],
    bundleLifecycle: ["DISCOVER", "SCOPE", "PRICE", "PROPOSE", "ONBOARD"],
    accent: "blue",
    whoItsFor: "Freelancers and small studios formalising the front half of their client process.",
    seo: {
      title: "Agency Starter Bundle — Pricing, Scoping & Onboarding Tools",
      description:
        "Pricing, scoping and onboarding tools bundled for freelancers and small studios formalising their client workflow.",
    },
  },

  // ── BUNDLE 2: Agency Operations Bundle ──────────────────
  {
    id: "agency-operations-bundle",
    slug: "agency-operations-bundle",
    name: "Agency Operations Bundle",
    type: "bundle",
    category: "Bundles",
    eyebrow: "BUNDLE 02",
    shortDescription: "Full agency lifecycle from discovery to profitability review.",
    description:
      "Everything in Agency Starter, plus QA & Launch and Profit & Capacity tools. For studios that need the complete operational system.",
    launchPrice: 99,
    regularPrice: 149,
    currencyPrices: {
      USD: 149,
      USDLaunch: 99,
      INR: 7499,
      INRLaunch: 4999,
    },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbooks", "PDF documentation", "ZIP packages"],
    includes: [],
    features: [
      {
        name: "Complete project lifecycle system",
        description: "From discovery and scoping through delivery, QA, launch and post-project review.",
      },
      {
        name: "Consistent delivery quality",
        description: "Structured QA checklists and launch sequences for every project.",
      },
      {
        name: "Real profitability tracking",
        description: "See actual margin per project after overhead — not just the margin you quoted.",
      },
      {
        name: "Capacity planning",
        description: "Know how much work your team can take on before you commit to timelines.",
      },
    ],
    bundleContents: [
      "Everything in Agency Starter Bundle",
      "Website QA & Launch OS",
      "Agency Profit & Capacity OS",
    ],
    bundleLifecycle: [
      "DISCOVER", "SCOPE", "PRICE", "PROPOSE", "ONBOARD",
      "DELIVER", "QA", "LAUNCH", "REVIEW PROFITABILITY", "PLAN CAPACITY",
    ],
    accent: "violet",
    whoItsFor: "Studios that need pricing, onboarding, delivery QA and profitability management.",
    seo: {
      title: "Agency Operations Bundle — Full Agency Lifecycle Tools",
      description:
        "Complete agency operations system from discovery to profitability review. Pricing, QA, launch and capacity tools.",
    },
  },

  // ── BUNDLE 3: Template + Delivery Bundle ────────────────
  {
    id: "template-delivery-bundle",
    slug: "template-delivery-bundle",
    name: "Template + Delivery Bundle",
    type: "bundle",
    category: "Bundles",
    eyebrow: "BUNDLE 03",
    shortDescription: "A production-ready template plus the delivery systems around it.",
    description:
      "A website template for a real business vertical, plus the pricing, onboarding and QA tools to deliver it to a client professionally.",
    launchPrice: 129,
    regularPrice: 169,
    currencyPrices: {
      USD: 169,
      USDLaunch: 129,
      INR: 8499,
      INRLaunch: 6499,
    },
    status: "coming-soon",
    featured: false,
    formats: ["Framer project", "Excel workbooks", "PDF documentation", "ZIP packages"],
    includes: [],
    features: [
      {
        name: "Production-ready website starting point",
        description: "A fully structured Framer template with real pages, not a generic one-page demo.",
      },
      {
        name: "Client pricing system",
        description: "Scope, cost and price the template-customisation project using the Pricing OS workflow.",
      },
      {
        name: "Onboarding workflow",
        description: "Collect client assets and preferences systematically before you start customising.",
      },
      {
        name: "QA and launch process",
        description: "Structured checklists to QA and launch the customised site without missing steps.",
      },
    ],
    bundleContents: [
      "Accounting / Fractional CFO website template",
      "Web Project Pricing OS",
      "Web Agency Client Onboarding OS",
      "Website QA & Launch OS",
      "Delivery documentation",
    ],
    bundleLifecycle: [
      "BUY TEMPLATE", "PRICE CLIENT PROJECT", "COLLECT CLIENT INFORMATION",
      "CUSTOMIZE", "QA", "LAUNCH",
    ],
    accent: "yellow",
    whoItsFor: "Designers who want both the site starting point and the delivery systems around it.",
    seo: {
      title: "Template + Delivery Bundle — Website Template with Agency Tools",
      description:
        "A production-ready website template plus pricing, onboarding and QA tools for professional client delivery.",
    },
  },

  // ── FUTURE: Accounting / CFO Template ───────────────────
  {
    id: "accounting-cfo-framer-template",
    slug: "accounting-cfo-framer-template",
    name: "Accounting / Fractional CFO Template",
    type: "template",
    category: "Website Templates",
    eyebrow: "TEMPLATE 01",
    shortDescription: "A production-ready site for accounting and fractional CFO firms.",
    description:
      "A Framer website template built for accounting firms and fractional CFOs. Real structure, real pages, not a generic one-page demo.",
    launchPrice: 49,
    regularPrice: 79,
    currencyPrices: { USD: 79, USDLaunch: 49, INR: 3999, INRLaunch: 2499 },
    status: "coming-soon",
    featured: false,
    formats: ["Framer project", "ZIP package"],
    includes: [],
    features: [
      {
        name: "Multi-page structure",
        description: "Home, services, about, team, contact and industry-specific pages — all pre-built.",
      },
      {
        name: "Service area sections",
        description: "Pre-designed sections for bookkeeping, tax, advisory and CFO service offerings.",
      },
      {
        name: "Team / profile layouts",
        description: "Professional layouts for team members, credentials and specializations.",
      },
      {
        name: "Contact and intake forms",
        description: "Ready-made contact form and new-client intake form suited to financial services.",
      },
    ],
    accent: "blue",
    whoItsFor: "Designers building sites for accounting firms, CFOs, or financial services clients.",
    licenseType: "Single-site commercial license",
    seo: {
      title: "Accounting / Fractional CFO Framer Template",
      description:
        "Production-ready Framer website template for accounting firms and fractional CFOs. Real structure, real pages.",
    },
  },
];

// ── Site constants ───────────────────────────────────────────
/**
 * Canonical site origin — every public store URL must start with this.
 *
 * Aligned with SITE_URL in src/config/site.ts (https://dev-aditya.com) so that
 * store canonicals / sitemap / OG URLs are consistent with the rest of the site.
 *
 * NOTE: This is a metadata-only canonical. It does NOT add an HTTP redirect and
 * does NOT touch DNS. No host-to-host redirect logic is introduced.
 */
export const SITE_ORIGIN = "https://dev-aditya.com";

/** Centralised support email — all mailto links import from here */
export const SUPPORT_EMAIL = "work@dev-aditya.com";

// ── Query helpers ───────────────────────────────────────────
export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return digitalProducts.find((p) => p.slug === slug);
}

export function getActiveProducts(): DigitalProduct[] {
  return digitalProducts.filter((p) => p.status === "active");
}

export function getVisibleProducts(): DigitalProduct[] {
  return digitalProducts.filter((p) => p.status !== "hidden");
}

export function getProductsByType(type: ProductType): DigitalProduct[] {
  return digitalProducts.filter((p) => p.type === type && p.status !== "hidden");
}

export function getFeaturedProduct(): DigitalProduct | undefined {
  return digitalProducts.find((p) => p.featured && p.status === "active");
}

export function getTools(): DigitalProduct[] {
  return getProductsByType("tool");
}

export function getBundles(): DigitalProduct[] {
  return getProductsByType("bundle");
}

export function getTemplates(): DigitalProduct[] {
  return getProductsByType("template");
}

/** Server-only: returns price in the given currency, preferring launch price if available */
export function getServerPrice(product: DigitalProduct, currency: "USD" | "INR" = "USD"): number {
  const key = currency;
  const launchKey = `${currency}Launch` as keyof typeof product.currencyPrices;
  const launchPrice = product.currencyPrices[launchKey] as number | undefined;
  const regularPrice = product.currencyPrices[key] as number | undefined;
  return launchPrice ?? regularPrice ?? product.regularPrice;
}
