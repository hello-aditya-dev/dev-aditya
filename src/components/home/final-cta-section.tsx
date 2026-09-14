import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Highlight } from "@/components/ui/highlight";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION } from "@/config/contact";

/**
 * FinalCTASection — closing call-to-action.
 *
 * Simple and strong: a question, the email address (primary contact
 * channel), and the location. No complex funnel, no large form on the
 * homepage — the contact form lives at /contact for visitors who want it.
 */
export function FinalCTASection() {
  return (
    <Section id="final-cta" className="border-t-1.5 border-ink bg-paper">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-1.5 border-ink bg-white p-8 shadow-hard sm:p-12 lg:p-16">
            {/* Restrained accent panels */}
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral opacity-10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue opacity-10"
              aria-hidden="true"
            />

            <div className="relative max-w-2xl">
              <p className="micro-label text-ink-muted">Start a project</p>
              <h2 className="mt-4 text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight">
                Have something the <Highlight variant="coral">website</Highlight> needs to explain better?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                Send a few honest sentences about the business, what is not
                working and what needs to change. No polished brief required.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-6 py-3.5 text-base font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                >
                  {CONTACT_EMAIL}
                  <span aria-hidden="true">&nearr;</span>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
                >
                  Start a project
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              <p className="mt-8 text-sm text-ink-muted">{CONTACT_LOCATION}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
