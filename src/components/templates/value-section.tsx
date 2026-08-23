import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

/**
 * TemplatesValueSection — "More than a homepage."
 *
 * Four concise value columns. Kept quiet and typographic — the products
 * above already did the selling; this answers "what exactly do I get"
 * in the site's restrained editorial voice.
 */

const VALUE_ITEMS = [
  {
    title: "Designed as a system",
    body: "Reusable sections, components and page structures.",
  },
  {
    title: "Built for conversion",
    body: "Layouts structured around real business goals.",
  },
  {
    title: "Responsive by default",
    body: "Designed across desktop, tablet and mobile.",
  },
  {
    title: "Ready to customize",
    body: "Swap branding, imagery and content without rebuilding from zero.",
  },
];

export function TemplatesValueSection() {
  return (
    <Section className="border-t-1.5 border-ink bg-white">
      <Container>
        <Reveal>
          <SectionLabel accent="blue">What&rsquo;s inside</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
            More than a homepage.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_ITEMS.map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="border-t-1.5 border-ink pt-5">
                  <p
                    className="font-mono text-sm font-bold tracking-widest text-ink-muted"
                    aria-hidden="true"
                  >
                    {num}
                  </p>
                  <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
