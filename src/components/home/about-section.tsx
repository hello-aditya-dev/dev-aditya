import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { FLAGSHIP_PROJECTS, LABORATORY_PROJECTS } from "@/config/projects";
import { CAPABILITIES } from "@/config/capabilities";
import { CONTACT_LOCATION, CONTACT_WORKING_MODEL } from "@/config/contact";

/**
 * AboutSection — "Who's behind all this work?"
 *
 * Adapted from Paperfolio's about block. Uses verifiable profile
 * information only — no fabricated years of experience, client counts
 * or revenue. Project counts are derived programmatically from the
 * central projects config.
 */
export function AboutSection() {
  const flagshipCount = FLAGSHIP_PROJECTS.length;
  const labCount = LABORATORY_PROJECTS.length;

  const facts: { label: string; value: string }[] = [
    { label: "Based", value: CONTACT_LOCATION },
    { label: "Working", value: CONTACT_WORKING_MODEL },
    { label: "Focus", value: "Strategy · Design · Full-stack delivery" },
    { label: "Range", value: "Corporate · Commerce · SaaS · Brand" },
    {
      label: "Flagship case studies",
      value: `${flagshipCount} published`,
    },
    {
      label: "Laboratory projects",
      value: `${labCount} experiments`,
    },
  ];

  return (
    <Section id="about-preview" className="border-y-1.5 border-ink bg-paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionLabel accent="blue">Who's behind all this work?</SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              A designer and developer who takes the project from the problem to
              the deploy.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
              I'm Aditya, an independent designer and developer based in Delhi,
              working remotely with organisations in India and internationally. I
              prefer projects where the business is genuinely complicated: too many
              services, technical products, regulated industries, operational
              density. That is where design judgement and engineering rigour
              actually pay for themselves.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              I do not lead with frameworks — the work is judged by whether the site
              makes the business easier to understand, trust and choose. Selected
              availability: I take on a small number of projects so each one gets
              the attention it needs.
            </p>

            <div className="mt-7">
              <ArrowLink href="/about">About Aditya</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="overflow-hidden" shadow>
              <div className="grid grid-cols-2 divide-x divide-y divide-ink/15 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="p-5">
                    <p className="micro-label text-ink-muted">{fact.label}</p>
                    <p className="mt-1.5 text-sm font-bold leading-tight tracking-tight">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t-1.5 border-ink bg-paper p-5">
                <p className="micro-label text-ink-muted">Core capabilities</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {CAPABILITIES.map((cap) => (
                    <li
                      key={cap}
                      className="rounded-full border border-ink/30 bg-white px-3 py-1 text-xs font-semibold tracking-tight"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
