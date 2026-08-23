import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Highlight } from "@/components/ui/highlight";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION } from "@/config/contact";

/**
 * TemplatesCustomCta — closing CTA for visitors who need something the
 * templates don't cover.
 *
 * Follows the site's FinalCTASection pattern exactly: one white card,
 * hard shadow, restrained accent circles, one question, one clear CTA
 * into the existing /contact flow (which is never modified).
 */
export function TemplatesCustomCta() {
  return (
    <Section id="custom-cta" className="border-t-1.5 border-ink bg-paper">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-1.5 border-ink bg-white p-8 shadow-hard sm:p-12 lg:p-16">
            {/* Restrained accent panels */}
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral opacity-10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-yellow opacity-10"
              aria-hidden="true"
            />

            <div className="relative max-w-2xl">
              <p className="micro-label text-ink-muted">Custom work</p>
              <h2 className="mt-4 text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight">
                Need something completely <Highlight variant="coral">custom</Highlight>?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                Templates are a strong starting point. For a website built
                specifically around your business, work directly with me.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-6 py-3.5 text-base font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                >
                  Start a project
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
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
  );
}
