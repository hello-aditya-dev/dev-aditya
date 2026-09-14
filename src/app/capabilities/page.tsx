import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PROFESSIONAL_SERVICE_SCHEMA } from "@/config/site";
import { SERVICES } from "@/config/services";
import { getProject } from "@/config/projects";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/config/contact";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capabilities — corporate websites, redesign, B2B landing pages, frontend",
  description:
    "Four focused ways to work together: corporate website design, website redesign, B2B landing pages and frontend development. Each one with deliverables, scope and an honest note on what is not included.",
  alternates: { canonical: "/capabilities" },
};

const accentBg = {
  coral: "bg-coral/10",
  blue: "bg-blue/10",
  yellow: "bg-yellow/20",
  violet: "bg-violet/10",
} as const;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_SERVICE_SCHEMA) }}
      />

      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Capabilities</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            How I help organisations improve their digital presence.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Four focused ways to work together, from a complete corporate
            website to frontend implementation for an existing team. Each one is
            scoped honestly — including what is explicitly not included.
          </p>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <div className="flex flex-col gap-10">
            {SERVICES.map((service) => {
              const example = getProject(service.exampleSlug);
              return (
                <Reveal key={service.id}>
                  <Card id={service.id} className="overflow-hidden" shadow>
                    <div className="grid gap-0 lg:grid-cols-[0.55fr_0.45fr]">
                      {/* Left — narrative */}
                      <div className="p-7 sm:p-9">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-xl border-1.5 border-ink font-mono text-sm font-bold",
                              accentBg[service.accent],
                            )}
                          >
                            {service.number}
                          </span>
                          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight tracking-tight">
                            {service.title}
                          </h2>
                        </div>
                        <p className="mt-5 text-base leading-relaxed text-ink-muted">
                          {service.summary}
                        </p>

                        <div className="mt-6">
                          <p className="micro-label text-ink-muted">When this is the right fit</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink">
                            {service.suitableFor}
                          </p>
                        </div>

                        <div className="mt-5">
                          <p className="micro-label text-ink-muted">What is not included</p>
                          <ul className="mt-1.5 space-y-1">
                            {service.notIncluded.map((n) => (
                              <li key={n} className="flex items-start gap-2 text-sm text-ink-muted">
                                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-muted" aria-hidden="true" />
                                {n}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right — deliverables + example */}
                      <div className="border-t-1.5 border-ink bg-paper p-7 sm:p-9 lg:border-l lg:border-t-0">
                        <p className="micro-label text-ink-muted">Deliverables</p>
                        <ul className="mt-3 space-y-1.5">
                          {service.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm leading-relaxed">
                              <span
                                className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-coral text-[0.6rem] font-bold text-white"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>

                        {example && example.caseStudyUrl && (
                          <div className="mt-6 border-t border-ink/15 pt-5">
                            <p className="micro-label text-ink-muted">Example project</p>
                            <a
                              href={example.caseStudyUrl}
                              className="mt-1.5 block text-sm font-bold tracking-tight text-ink hover:text-coral"
                            >
                              {example.name}
                              <span className="ml-1.5 inline-block" aria-hidden="true">→</span>
                            </a>
                            <p className="mt-1 text-xs text-ink-muted">{example.outcomeHeadline}</p>
                          </div>
                        )}

                        <div className="mt-6">
                          <Button href="/contact" variant="secondary" size="sm">
                            Discuss this service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-paper pt-0">
        <Container>
          <Reveal>
            <Card className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-9" shadow>
              <div className="max-w-xl">
                <SectionLabel accent="violet">For agencies</SectionLabel>
                <h2 className="mt-3 text-[clamp(1.375rem,2.5vw,1.75rem)] font-extrabold leading-tight tracking-tight">
                  White-label frontend for agency overflow.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                  If you’re an agency that needs more frontend capacity —
                  last-mile delivery, fixed-scope sprints or a design-system
                  build — I work under your brand, in your stack, against your
                  design system.
                </p>
              </div>
              <Button href="/for-agencies" variant="secondary" size="lg" className="shrink-0">
                View agency services
                <span aria-hidden="true">&rarr;</span>
              </Button>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
              Not sure which fits your project?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Tell me what the website needs to achieve and I'll recommend a
              practical direction — even if that means pointing you to someone
              better suited.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Discuss a project
              </Button>
              <a
                href={CONTACT_EMAIL_HREF}
                className="text-sm font-bold tracking-tight text-ink hover:text-coral"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
