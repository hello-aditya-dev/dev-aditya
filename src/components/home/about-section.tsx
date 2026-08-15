import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

/**
 * AboutSection — homepage about block.
 *
 * Deliberately small and human. Two short paragraphs and a link to the
 * full /about page. No giant capability grid, no timeline, no values
 * section — those belong on /about, not the homepage.
 */
export function AboutSection() {
  return (
    <Section id="about-preview" className="border-t-1.5 border-ink bg-white">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel accent="blue">About</SectionLabel>
            <p className="mt-5 text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold leading-snug tracking-tight text-ink">
              I&rsquo;m Aditya, an independent designer and developer based in Delhi.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              I work across business websites, ecommerce and digital products —
              handling the process from structure and visual direction through
              development and deployment. Selected availability, so each project
              gets the attention it needs.
            </p>
            <a
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
            >
              More about me
              <span aria-hidden="true">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
