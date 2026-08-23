import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Highlight } from "@/components/ui/highlight";

/**
 * CreatorSection — connects the template collection back to Aditya's
 * personal portfolio. The same positioning language as the homepage
 * about block, closing with a link to the existing /about page.
 */
export function CreatorSection() {
  return (
    <Section className="border-t-1.5 border-ink bg-white">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel accent="violet">The designer</SectionLabel>
            <p className="mt-5 text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-snug tracking-tight text-ink">
              Built by the <Highlight variant="coral">same designer</Highlight>{" "}
              behind these websites.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              I design websites around clarity, visual hierarchy and
              real-world business goals. These templates package that same
              approach into production-ready systems that teams can
              customize and launch themselves.
            </p>
            <a
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
            >
              About Aditya
              <span aria-hidden="true">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
