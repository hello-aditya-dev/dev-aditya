/**
 * Service categories.
 *
 * Shared between the homepage Services section and the dedicated
 * /capabilities route. No pricing is included by design.
 */

export interface Service {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  /** When this service is the right fit. */
  suitableFor: string;
  /** What is explicitly not included. */
  notIncluded: string[];
  /** Suggested example project slug from projects.ts. */
  exampleSlug: string;
  /** Accent token used for the card's backing panel. */
  accent: "coral" | "blue" | "yellow" | "violet";
}

export const SERVICES: Service[] = [
  {
    id: "corporate-website-design",
    number: "01",
    title: "Corporate Website Design and Development",
    summary:
      "A complete corporate website built around what your organisation offers and what your audience needs to understand. Structure and messaging come first, then a clear interface and a production-ready frontend.",
    deliverables: [
      "Information architecture and page structure",
      "Homepage and core service pages",
      "Design system for consistent pages",
      "Responsive frontend implementation",
      "Basic technical SEO and metadata",
      "Deployment and code handover",
    ],
    suitableFor:
      "Organisations whose services are hard to explain in one sentence — multiple divisions, technical buyers, or audiences that need to trust the company before they enquire.",
    notIncluded: [
      "Ongoing content writing after launch",
      "Hosting and infrastructure management beyond handover",
    ],
    exampleSlug: "ibs-infra",
    accent: "coral",
  },
  {
    id: "website-redesign",
    number: "02",
    title: "Website Redesign and Modernisation",
    summary:
      "A focused rebuild of an existing website that no longer reflects the business. I keep what already works, resolve the structural and performance problems, and modernise the design without discarding your established credibility.",
    deliverables: [
      "Review of the current structure and content",
      "Reworked navigation and page hierarchy",
      "Updated visual direction and design system",
      "Performance and accessibility improvements",
      "Content migration into the new structure",
      "Staged launch with redirects preserved",
    ],
    suitableFor:
      "Companies with an existing website that has accrued SEO equity but no longer reflects the business — slow, dated, hard to navigate, or built on a stack that is painful to update.",
    notIncluded: [
      "Complete re-platforming onto a different CMS without a clear business reason",
      "Migration of legacy backend systems outside the website",
    ],
    exampleSlug: "ibs-infra",
    accent: "coral",
  },
  {
    id: "b2b-landing-pages",
    number: "03",
    title: "B2B Landing Pages and Lead Generation",
    summary:
      "Campaign and service landing pages designed to explain a specific offer and turn qualified visitors into enquiries. Clear messaging, a single purpose per page and a form flow built to be measured.",
    deliverables: [
      "Message and offer structure",
      "Conversion-focused page layout",
      "Enquiry form with validation",
      "Reusable sections for future campaigns",
      "Analytics-ready event structure",
      "Responsive implementation and deployment",
    ],
    suitableFor:
      "Teams running a specific campaign — a new service launch, an industry vertical, a paid-search destination — that need a page with one job and a form that qualifies the lead.",
    notIncluded: [
      "Paid media management",
      "CRM implementation and pipeline reporting",
    ],
    exampleSlug: "ibs-infra",
    accent: "yellow",
  },
  {
    id: "frontend-development",
    number: "04",
    title: "Frontend Development",
    summary:
      "Frontend implementation for teams that already have a design or an existing product. I build accessible, maintainable interfaces from designs, component systems or dashboards, faithful to the approved direction.",
    deliverables: [
      "Implementation from Figma or existing designs",
      "Reusable component systems",
      "Dashboard and web-application interfaces",
      "Motion and interaction where it adds clarity",
      "Performance and accessibility checks",
      "Organised, documented code handover",
    ],
    suitableFor:
      "Product teams that have design coverage but need engineering capacity — dashboards, web apps, or component libraries built to production standard.",
    notIncluded: [
      "Backend API design and database engineering",
      "Long-term on-call maintenance contracts",
    ],
    exampleSlug: "cloudsun",
    accent: "violet",
  },
];

/** Fifth "different problem" card — not a real service, just a CTA. */
export const DIFFERENT_PROBLEM_CARD = {
  number: "05",
  title: "Have a different website problem?",
  summary:
    "If your project does not fit one of these four categories, send a short note. I will reply with the most practical direction — even if that means pointing you to someone better suited.",
  cta: { label: "Describe the problem", href: "/contact" },
  accent: "ink" as const,
};
