import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/config/contact";
import { WEBSITE_REVIEW, getWebsiteReviewMailto } from "@/config/website-review";

/**
 * FinalCTASection — closing call-to-action.
 *
 * Uses the current contact positioning and the complimentary
 * website-review offer (when active in the source).
 */
export function FinalCTASection() {
  return (
    <Section id="final-cta" className="border-t-1.5 border-ink bg-paper">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-1.5 border-ink bg-white p-8 shadow-hard sm:p-12 lg:p-16">
            {/* Decorative accent panels */}
            <div
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-coral opacity-10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue opacity-10"
              aria-hidden="true"
            />

            <div className="relative max-w-2xl">
              <p className="micro-label text-ink-muted">Start a project</p>
              <h2 className="mt-4 text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight">
                Have a <Highlight variant="coral">capable business</Highlight> hiding
                behind an <Highlight variant="blue">incapable website</Highlight>?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                Send me the current site and tell me what the business needs it to
                do better. No perfect brief required — a few honest sentences about
                what is not working is enough to start.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contact" variant="primary" size="lg">
                  Show me the problem
                </Button>
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="text-sm font-bold tracking-tight text-ink hover:text-coral"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Complimentary website review offer */}
            <div className="relative mt-10 border-t-1.5 border-ink pt-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="micro-label text-coral">{WEBSITE_REVIEW.headline}</p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                    {WEBSITE_REVIEW.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                    {WEBSITE_REVIEW.clarifications.map((c) => (
                      <li
                        key={c}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted"
                      >
                        <span
                          className="inline-block h-1 w-1 rounded-full bg-ink-muted"
                          aria-hidden="true"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  href={getWebsiteReviewMailto()}
                  variant="secondary"
                  size="md"
                  external
                  className="shrink-0"
                >
                  {WEBSITE_REVIEW.cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
