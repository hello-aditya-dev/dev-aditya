import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

/**
 * BusinessesSection — "Built for real businesses."
 *
 * A curated category list rendered with typography and layout instead of
 * icon tiles. Large confident words with small index numbers inside a
 * hairline grid — quietly echoing the numbered project entries elsewhere
 * on the site.
 */

const BUSINESS_TYPES = [
  { name: "AI companies", note: "Automation & implementation firms" },
  { name: "SaaS teams", note: "B2B products & platforms" },
  { name: "Agencies", note: "Studio & service businesses" },
  { name: "Founders", note: "New ventures & launches" },
  { name: "Professional services", note: "Legal, finance & consulting" },
];

export function BusinessesSection() {
  return (
    <Section className="border-t-1.5 border-ink bg-paper">
      <Container>
        <Reveal>
          <SectionLabel accent="yellow">Who they&rsquo;re for</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
            Built for real businesses.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Every template starts from an actual industry, its sales
            motion and its buyer — not from a generic layout.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* gap-px on an ink-tinted grid = clean hairline dividers at every breakpoint */}
          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border-1.5 border-ink bg-ink/20 sm:grid-cols-2 lg:grid-cols-5">
            {BUSINESS_TYPES.map((type, i) => (
              <li
                key={type.name}
                className="flex flex-col justify-between gap-3 bg-white px-5 py-5 sm:px-6 sm:py-6"
              >
                <span
                  className="font-mono text-xs font-bold tracking-widest text-coral"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-lg font-extrabold leading-tight tracking-tight text-ink">
                    {type.name}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-ink-muted">
                    {type.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
