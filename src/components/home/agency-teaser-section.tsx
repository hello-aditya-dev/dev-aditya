import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Highlight } from "@/components/ui/highlight";

/**
 * AgencyTeaserSection — compact homepage CTA for the agency offer.
 *
 * Deliberately short: one line of problem framing, one line of the offer,
 * and a link to /for-agencies. Sits between Selected Work and About so
 * agency visitors see it without the homepage being expanded into a
 * second sales page.
 */
export function AgencyTeaserSection() {
  return (
    <Section id="agency-teaser" className="border-t-1.5 border-ink bg-white py-[clamp(3rem,6vw,5rem)]">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <SectionLabel accent="violet">For agencies</SectionLabel>
              <p className="mt-4 text-[clamp(1.25rem,2.5vw,1.625rem)] font-semibold leading-snug tracking-tight text-ink">
                Need more frontend capacity without another{" "}
                <Highlight variant="coral">permanent hire</Highlight>?
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                I work behind your brand, in your stack and against your design
                system. Useful when the work is signed off but your team needs
                another pair of hands to get it shipped properly.
              </p>
            </div>
            <a
              href="/for-agencies"
              className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border-1.5 border-ink bg-coral px-6 py-3.5 text-sm font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm sm:self-auto"
            >
              View agency services
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
