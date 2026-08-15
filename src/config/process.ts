/**
 * Engagement process steps.
 *
 * Shared between the homepage Process summary and the dedicated /process
 * route.
 */

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  /** What the client receives at this step. */
  deliverables: string[];
  /** What the client is expected to provide. */
  clientResponsibilities: string[];
  /** Review point at the end of this step. */
  reviewPoint: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery and Scope",
    summary:
      "We clarify what the organisation offers, who the website is for and what action it should make easier. This produces an agreed scope before any design work begins.",
    deliverables: [
      "Discovery summary",
      "Agreed scope document",
      "Project plan and milestones",
    ],
    clientResponsibilities: [
      "Time for a structured discovery call",
      "Access to existing brand, content and analytics",
      "Honest answers about what is and is not working",
    ],
    reviewPoint: "Scope sign-off before design begins.",
  },
  {
    number: "02",
    title: "Structure and Direction",
    summary:
      "I map the information architecture and page structure, then agree the visual direction. Getting the structure right early is what keeps the rest of the project predictable.",
    deliverables: [
      "Sitemap and page hierarchy",
      "Wireframes for the most important pages",
      "Visual direction (typography, colour, layout mood)",
    ],
    clientResponsibilities: [
      "Feedback on structure and direction",
      "Confirmation of primary and secondary audiences",
    ],
    reviewPoint: "Structure and visual direction approved before build.",
  },
  {
    number: "03",
    title: "Design and Development",
    summary:
      "Design and frontend development run together. Pages are built on a shared staging website so you can review real screens rather than static mockups.",
    deliverables: [
      "Designed and built pages on a staging URL",
      "Design system tokens and components",
      "Responsive behaviour across breakpoints",
    ],
    clientResponsibilities: [
      "Timely feedback on staging screens",
      "Copy and asset supply per the agreed plan",
    ],
    reviewPoint: "Page-by-page approval on staging.",
  },
  {
    number: "04",
    title: "Review and Refinement",
    summary:
      "You review the work in progress and we refine the details: copy, spacing, responsive behaviour and interaction. Decisions stay documented and easy to follow.",
    deliverables: [
      "Refined pages with all feedback addressed",
      "Documented decision log",
      "Accessibility and performance checks",
    ],
    clientResponsibilities: [
      "Consolidated feedback rather than ad-hoc notes",
      "Final copy review",
    ],
    reviewPoint: "Final approval to enter launch.",
  },
  {
    number: "05",
    title: "Testing and Launch",
    summary:
      "Before launch I check performance, accessibility, responsive behaviour, links and metadata, then deploy the approved website to production.",
    deliverables: [
      "Pre-launch QA report",
      "Production deployment",
      "Sitemap and robots.txt submission",
    ],
    clientResponsibilities: [
      "DNS or hosting access where required",
      "Final go/no-go decision",
    ],
    reviewPoint: "Successful production deployment.",
  },
  {
    number: "06",
    title: "Handover and Support",
    summary:
      "You receive organised code, deployment details and a clear handover. I remain available for a defined support period to resolve anything that surfaces after launch.",
    deliverables: [
      "Code repository with documentation",
      "Deployment and environment notes",
      "Defined support period (typically 2 weeks)",
    ],
    clientResponsibilities: [
      "Internal handover to whoever maintains the site",
      "Reporting of any post-launch issues",
    ],
    reviewPoint: "Sign-off on handover and support closure.",
  },
];

/** Practical FAQ, derived from the source process content. */
export const PROCESS_FAQ: { question: string; answer: string }[] = [
  {
    question: "Do you work fixed-price or hourly?",
    answer:
      "Most projects are fixed-price against an agreed scope. Hourly is available for frontend-only work where the scope is genuinely open-ended.",
  },
  {
    question: "How long does a corporate website take?",
    answer:
      "A focused 6–10 page corporate website typically runs 4–8 weeks from discovery to launch. Larger or content-heavy sites take longer; the timeline is agreed at the end of discovery.",
  },
  {
    question: "Do you write the copy?",
    answer:
      "I structure the messaging and write headlines and section intros. Long-form service copy is most often supplied by the client — I edit it for clarity and consistency.",
  },
  {
    question: "Who hosts the website?",
    answer:
      "Most clients deploy on Vercel or Netlify. I help with the deployment and hand over full ownership of the hosting account at launch.",
  },
];
