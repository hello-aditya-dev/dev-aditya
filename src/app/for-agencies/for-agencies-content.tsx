import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Highlight } from "@/components/ui/highlight";
import { HOMEPAGE_FEATURED } from "@/config/projects";
import { projectAccent, ACCENT_HEX } from "@/config/project-accents";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION } from "@/config/contact";
import { cn } from "@/lib/utils";

/**
 * /for-agencies — a dedicated, high-conversion agency offer page.
 *
 * Audience: agency owners / creative directors who need white-label
 * frontend capacity for overflow work. The page makes the offer obvious
 * above the fold (white-label, NDA available, your design system, remote)
 * and backs it with real project work — no fabricated metrics.
 *
 * Sections:
 *   1. Hero
 *   2. When agencies bring me in (problem)
 *   3. What I take on (capabilities)
 *   4. How it works (working model)
 *   5. White-label & confidentiality
 *   6. Selected work (real projects as proof)
 *   7. Final CTA
 */

const USE_CASES = [
  {
    title: "Frontend overflow",
    body: "The agency has more design signed off than the in-house team can build. I pick up the overflow so launches don’t slip.",
  },
  {
    title: "Last-mile delivery",
    body: "Designs are 90% there. I handle the responsive polish, interactions, accessibility and edge cases that get it to production.",
  },
  {
    title: "Specialist gap",
    body: "The team is strong on backend or design but thin on production frontend. I fill that gap without adding headcount.",
  },
  {
    title: "Fixed-scope sprint",
    body: "A defined chunk of work — a landing page set, a redesign, a new section — that needs to ship on a fixed timeline.",
  },
  {
    title: "Design-system build",
    body: "The agency has a design system in Figma and needs it turned into a real, documented component library in code.",
  },
  {
    title: "Pitch & prototype",
    body: "A new-business pitch needs a working prototype, not just slides. I build something clickable fast, under NDA.",
  },
];

const CAPABILITIES = [
  {
    title: "Figma → Frontend",
    body: "Pixel-faithful implementation of Figma files, with the responsive and interactive details filled in properly.",
  },
  {
    title: "Marketing websites",
    body: "Multi-page corporate and marketing sites built to be fast, accessible and easy for the client to update.",
  },
  {
    title: "Landing pages",
    body: "Campaign and product landing pages — high-conversion layout, clean markup, ready to ship.",
  },
  {
    title: "Responsive polish",
    body: "Taking an existing build across the line on mobile, tablet and desktop — spacing, type scale, touch targets.",
  },
  {
    title: "Design-system work",
    body: "Turning a Figma library into a documented, themeable component system in code that the agency can reuse.",
  },
  {
    title: "Last-mile delivery",
    body: "The unglamorous final 10% — accessibility pass, cross-browser checks, performance, handover docs.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Brief",
    desc: "You send the Figma file (or a Loom) and the scope. I confirm what’s included, the timeline and the handover format.",
  },
  {
    num: "02",
    title: "Build",
    desc: "I implement in your stack and your design system. You see progress in your own repo or staging — no black box.",
  },
  {
    num: "03",
    title: "Review",
    desc: "You review against the design. I work in your review tool of choice — Linear, GitHub, Notion, whatever you use.",
  },
  {
    num: "04",
    title: "Polish",
    desc: "Responsive pass, accessibility pass, cross-browser check. The details that separate production from preview.",
  },
  {
    num: "05",
    title: "Handover",
    desc: "Clean PR to your main branch, or a deploy. The client relationship stays entirely with the agency.",
  },
];

const WHITE_LABEL_POINTS = [
  "All work is delivered under the agency’s brand — never resold or portfolioed without permission.",
  "The client relationship stays entirely with the agency. I do not contact the end client directly.",
  "Code is written in your repository, your stack, your design system — not a parallel codebase.",
  "NDAs are available on request, before any project material is shared.",
  "Communication happens through your preferred channel — Slack, Linear, GitHub, email.",
  "I do not retain the client after handover. The agency owns the relationship and the work.",
];

export function ForAgenciesContent() {
  const featured = HOMEPAGE_FEATURED;

  return (
    <>
      {/* ───────────────── 1. HERO ───────────────── */}
      <Section className="pt-12 sm:pt-16">
        <Container>
          <Reveal>
            <SectionLabel accent="coral">For agencies</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
              White-label frontend for{" "}
              <Highlight variant="coral">agency overflow</Highlight>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              You design. I build — under your brand, in your stack, against
              your design system. For agencies that need more frontend capacity
              without the overhead of another permanent developer.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Work with me
                <span aria-hidden="true">&rarr;</span>
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                See the work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-xs font-bold tracking-widest text-ink-muted">
              WHITE-LABEL · NDA AVAILABLE · YOUR DESIGN SYSTEM · REMOTE
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ───────────────── 2. WHEN AGENCIES BRING ME IN ───────────────── */}
      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <Reveal>
            <SectionLabel accent="blue">When agencies bring me in</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              The situations I’m built for.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Not every project needs a permanent hire. These are the moments
              agencies tend to send work my way.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <Card className="h-full p-6">
                  <h3 className="text-base font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ───────────────── 3. WHAT I TAKE ON ───────────────── */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <Reveal>
            <SectionLabel accent="coral">What I take on</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              Capabilities, scoped honestly.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <Card shadow className="h-full p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold tracking-widest text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ───────────────── 4. HOW IT WORKS ───────────────── */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <Reveal>
            <SectionLabel accent="blue">How it works</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              Five steps, your workflow throughout.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.03}>
                <div className="grid grid-cols-[auto_1fr] gap-5 border-t-1.5 border-ink py-6 first:border-t-0 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                  <span className="font-mono text-sm font-bold tracking-widest text-ink-muted">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ───────────────── 5. WHITE-LABEL & CONFIDENTIALITY ───────────────── */}
      <Section className="border-t-1.5 border-ink bg-ink text-white">
        <Container>
          <Reveal>
            <SectionLabel accent="coral" className="text-white/70">
              White-label &amp; confidentiality
            </SectionLabel>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              The agency keeps the client. I keep the build.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              White-label isn’t a tag I add at the end — it’s how the engagement
              runs from the first message.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {WHITE_LABEL_POINTS.map((point, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-[0.6rem] font-bold text-white"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                    {point}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl border-t border-white/15 pt-6 text-sm leading-relaxed text-white/60">
              NDAs are available on request and can be signed before any project
              material is shared. I do not publish agency client work in my own
              portfolio without explicit written permission.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ───────────────── 6. SELECTED WORK ───────────────── */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <Reveal>
            <SectionLabel accent="coral">Selected work</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              Real businesses, live websites.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              A sample of the kind of production work I ship. Agency engagements
              are kept confidential — these are my own client projects, shown
              for craft reference.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {featured.map((project, i) => {
              const accent = projectAccent(project.slug);
              const category = project.industry.split("·")[0].trim();
              return (
                <Reveal key={project.slug} delay={i * 0.04}>
                  <Card className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ background: ACCENT_HEX[accent] }}
                        aria-hidden="true"
                      />
                      <span className="micro-label text-ink-muted">
                        {category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {project.challenge}
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <Link
                        href={project.caseStudyUrl}
                        className="text-sm font-semibold tracking-tight text-ink transition-colors hover:text-coral"
                      >
                        Case study
                        <span className="ml-1.5 inline-block" aria-hidden="true">
                          &rarr;
                        </span>
                      </Link>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold tracking-tight text-ink-muted transition-colors hover:text-coral"
                        >
                          Live site
                          <span className="ml-1.5 inline-block" aria-hidden="true">
                            &nearr;
                          </span>
                        </a>
                      ) : null}
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ───────────────── 7. FINAL CTA ───────────────── */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border-1.5 border-ink bg-paper p-8 shadow-hard sm:p-12 lg:p-16">
              <div
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral opacity-10"
                aria-hidden="true"
              />
              <div className="relative max-w-2xl">
                <p className="micro-label text-ink-muted">Start an agency project</p>
                <h2 className="mt-4 text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight">
                  Have a <Highlight variant="coral">scope</Highlight> in mind?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                  Send the Figma link (or a few sentences about the scope and
                  timeline). I’ll confirm whether it’s a fit and how soon I can
                  start.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <Button href="/contact" variant="primary" size="lg">
                    Start an agency project
                    <span aria-hidden="true">&rarr;</span>
                  </Button>
                  <a
                    href={CONTACT_EMAIL_HREF}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
                  >
                    {CONTACT_EMAIL}
                    <span aria-hidden="true">&nearr;</span>
                  </a>
                </div>
                <p className="mt-8 text-sm text-ink-muted">{CONTACT_LOCATION}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
