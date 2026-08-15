import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/reveal";
import { WORKING_ADVANTAGES } from "@/config/capabilities";

/**
 * WorkingRelationshipSection — "A direct working relationship"
 *
 * Replaces Paperfolio's testimonials block. Source has no verifiable
 * testimonials, so this uses the real working-relationship content
 * instead. Communicates real expectations clearly.
 */
export function WorkingRelationshipSection() {
  return (
    <Section id="working-relationship" className="border-t-1.5 border-ink bg-paper">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel accent="coral" className="justify-center">
              A direct working relationship
            </SectionLabel>
            <blockquote className="mt-6 text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.2] tracking-tight">
              "You work directly with the person{" "}
              <Highlight variant="coral">designing</Highlight> and{" "}
              <Highlight variant="blue">developing</Highlight> the website.
              Communication stays clear, decisions move quickly and the final
              implementation remains faithful to the approved direction."
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              The work begins with a clear scope and ends with an organised handover.
              In between, you get regular progress updates, a shared staging website
              and the kind of attention that comes from working with someone whose
              name is on the project.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {WORKING_ADVANTAGES.map((advantage) => (
              <li
                key={advantage}
                className="flex items-center gap-3 rounded-xl border-1.5 border-ink bg-white p-4"
              >
                <span
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-sm font-semibold tracking-tight">{advantage}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
