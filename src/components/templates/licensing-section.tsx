import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

/**
 * LicensingSection — "Buy once. Own the launch."
 *
 * An honest, editorial licensing & usage explainer: three numbered
 * chapters (buy → customize → launch) plus a plain-terms list of what
 * the license permits and what it doesn't. No legal boilerplate — the
 * exact terms live with the marketplace listing at purchase time.
 */

const STEPS = [
  {
    title: "Buy once",
    body: "One payment per end website. No subscriptions, no renewals, no per-page pricing.",
  },
  {
    title: "Make it yours",
    body: "Swap the brand, copy and imagery inside the visual editor — the system keeps working.",
  },
  {
    title: "Launch it",
    body: "Publish as your own website, on your own domain, with your team editing content.",
  },
];

const PERMITTED = [
  "One live website per license — yours or a client's",
  "Customize everything: brand, copy, imagery, structure",
  "Use for commercial and client projects",
  "Keep using it — the license doesn't expire",
];

const NOT_PERMITTED = [
  "Reselling or redistributing the template itself",
  "Building products that compete with the template",
  "Sharing the source files outside your team",
];

export function LicensingSection() {
  return (
    <Section className="border-t-1.5 border-ink bg-white">
      <Container>
        <Reveal>
          <SectionLabel accent="violet">Licensing, in plain words</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
            Buy once. Own the launch.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            A template purchase is a license to build one real website on top
            of the system. Simple terms, honestly stated — the full agreement
            travels with the purchase.
          </p>
        </Reveal>

        {/* Three-step rhythm */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border-1.5 border-ink bg-paper px-5 py-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-1.5 border-ink bg-white font-mono text-sm font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Honest terms — two columns */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl border-1.5 border-ink bg-white px-6 py-6 shadow-hard-sm">
              <p className="flex items-center gap-2 micro-label text-ink">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border-1.5 border-ink bg-coral text-white"
                  aria-hidden="true"
                >
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6.5L4.8 9.2 10 3.4"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Your license includes
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {PERMITTED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border-1.5 border-ink/30 bg-paper px-6 py-6">
              <p className="flex items-center gap-2 micro-label text-ink-muted">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border-1.5 border-ink/50 bg-white text-ink"
                  aria-hidden="true"
                >
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 3l6 6M9 3l-6 6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Not included
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {NOT_PERMITTED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
