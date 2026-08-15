// ============================================================
// Digital Product Catalog — Single Source of Truth
// ============================================================
// ALL product data lives here. Pages and API routes import from here.
// Secrets, private file paths, and server-only prices are NOT here.
// Those live in server-only modules.

export type ProductStatus = "active" | "coming-soon" | "hidden" | "sold-out";
export type ProductType = "tool" | "bundle" | "template";
export type AccentColor = "coral" | "blue" | "yellow" | "violet";

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
  outcomes: string[];
  features: string[];
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
    outcomes: [
      "Estimate true project workload",
      "Calculate delivery cost",
      "Protect margin",
      "Generate recommended project pricing",
      "Compare Essential / Recommended / Premium tiers",
      "Model scope creep",
      "Calculate change orders",
      "Compare estimated vs actual hours",
      "Learn from completed projects",
    ],
    features: [
      "Scope Builder",
      "Hours Engine",
      "Price Engine",
      "Scope Creep Modeller",
      "Change Order Calculator",
      "Project Actuals Tracker",
      "Tier Comparison (Essential/Recommended/Premium)",
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
    regularPrice: 49,
    currencyPrices: { USD: 49, INR: 2499 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    outcomes: [
      "Structure discovery findings",
      "Define deliverables and exclusions",
      "Generate proposal documents",
      "Track proposal status",
    ],
    features: [
      "Discovery Questionnaire",
      "Scope Builder",
      "Proposal Generator",
      "Exclusions Tracker",
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
      "A client onboarding system that standardises how new projects start — from signed proposal to first deliverable review.",
    regularPrice: 39,
    currencyPrices: { USD: 39, INR: 1999 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    outcomes: [
      "Collect client inputs systematically",
      "Assign internal responsibilities",
      "Track onboarding milestones",
      "Reduce start-of-project friction",
    ],
    features: [
      "Client Intake Form",
      "Onboarding Checklist",
      "Milestone Tracker",
      "Welcome Packet Generator",
    ],
    accent: "yellow",
    seo: {
      title: "Web Agency Client Onboarding OS — Client Onboarding System",
      description:
        "Standardise how new client projects start — from signed proposal to first deliverable review.",
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
    regularPrice: 39,
    currencyPrices: { USD: 39, INR: 1999 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    outcomes: [
      "Systematic pre-launch QA",
      "Consistent launch checklist",
      "Post-launch verification",
      "Client handover documentation",
    ],
    features: [
      "Pre-Launch QA Checklist",
      "Cross-Browser Testing Guide",
      "Launch Sequence",
      "Post-Launch Verification",
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
    regularPrice: 49,
    currencyPrices: { USD: 49, INR: 2499 },
    status: "coming-soon",
    featured: false,
    formats: ["Excel workbook", "PDF documentation", "ZIP package"],
    includes: [],
    outcomes: [
      "Track real project profitability",
      "Allocate overhead correctly",
      "Model capacity scenarios",
      "Plan hiring and growth",
    ],
    features: [
      "Profit Tracker",
      "Overhead Allocator",
      "Capacity Modeller",
      "Growth Planner",
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
    outcomes: [
      "Structured discovery process",
      "Defensible pricing",
      "Professional proposals",
      "Consistent client onboarding",
    ],
    features: [],
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
    outcomes: [
      "Complete project lifecycle system",
      "Consistent delivery quality",
      "Real profitability tracking",
      "Capacity planning",
    ],
    features: [],
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
    outcomes: [
      "Production-ready website starting point",
      "Client pricing system",
      "Onboarding workflow",
      "QA and launch process",
    ],
    features: [],
    bundleContents: [
      "Accounting / Fractional CFO website template",
      "Web Project Pricing OS",
      "Client Onboarding OS",
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
    regularPrice: 79,
    currencyPrices: { USD: 79, INR: 3999 },
    status: "coming-soon",
    featured: false,
    formats: ["Framer project", "ZIP package"],
    includes: [],
    outcomes: [
      "Professional website for accounting/CFO firms",
      "Real business structure and pages",
      "Ready for client customisation",
    ],
    features: [
      "Multi-page structure",
      "Service area sections",
      "Team/profile layouts",
      "Contact and intake forms",
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
