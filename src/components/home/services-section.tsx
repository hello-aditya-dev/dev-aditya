import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SERVICES, DIFFERENT_PROBLEM_CARD } from "@/config/services";
import { cn } from "@/lib/utils";

const accentBg = {
  coral: "bg-coral/10",
  blue: "bg-blue/10",
  yellow: "bg-yellow/20",
  violet: "bg-violet/10",
} as const;

/**
 * ServicesSection — "My broad set of capabilities"
 *
 * Paperfolio-style service cards with original inline SVG icons, numbers,
 * source-based descriptions and a fifth "different problem" CTA card.
 */
export function ServicesSection() {
  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>What I do</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Outcomes, not services.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              Tell me the situation. I will tell you whether I can help. Most agencies
              sell services by the yard — this is organised by the problem the business
              actually has, so you can recognise yours and see whether the work fits.
            </p>
          </div>
          <ArrowLink href="/capabilities" className="shrink-0">
            All capabilities
          </ArrowLink>
        </div>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <Card className="group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-sm">
                <div
                  className={cn(
                    "mb-5 flex h-12 w-12 items-center justify-center rounded-xl border-1.5 border-ink",
                    accentBg[service.accent],
                  )}
                >
                  <ServiceIcon id={service.id} />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-ink-muted">
                    {service.number}
                  </span>
                  <h3 className="text-lg font-bold leading-tight tracking-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.summary}
                </p>
                <Link
                  href={`/capabilities#${service.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors group-hover:text-coral"
                >
                  Read more
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Card>
            </StaggerItem>
          ))}

          {/* Fifth card — different problem */}
          <StaggerItem>
            <Card
              className="flex h-full flex-col justify-between bg-ink p-6 text-white"
            >
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-ink-soft">
                  {DIFFERENT_PROBLEM_CARD.number}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-tight tracking-tight">
                  {DIFFERENT_PROBLEM_CARD.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {DIFFERENT_PROBLEM_CARD.summary}
                </p>
              </div>
              <Link
                href={DIFFERENT_PROBLEM_CARD.cta.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white transition-colors hover:text-coral"
              >
                {DIFFERENT_PROBLEM_CARD.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </Card>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </Section>
  );
}

function ServiceIcon({ id }: { id: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "corporate-website-design":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="18" height="14" rx="2" />
          <path d="M2 7h18M5 11h6M5 14h4" />
          <path d="M7 20h8" />
        </svg>
      );
    case "website-redesign":
      return (
        <svg {...common}>
          <path d="M3 5h16v10H3z" />
          <path d="M3 9h16" />
          <path d="M6 12h4M6 15h2" />
          <path d="M14 12l3 3-3 3" />
          <path d="M17 15h-6" />
        </svg>
      );
    case "b2b-landing-pages":
      return (
        <svg {...common}>
          <path d="M3 4h16v14H3z" />
          <path d="M3 8h16" />
          <rect x="6" y="11" width="6" height="5" />
          <path d="M14 11h2M14 14h2M14 16h2" />
        </svg>
      );
    case "frontend-development":
      return (
        <svg {...common}>
          <path d="M8 5L3 11l5 6" />
          <path d="M14 5l5 6-5 6" />
          <path d="M12 3l-2 16" />
        </svg>
      );
    default:
      return null;
  }
}
