import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TEMPLATES, TEMPLATE_COUNT } from "@/config/templates";

/**
 * PricingStrip — the whole collection's pricing at a glance.
 *
 * A quiet editorial band: each template's name, category and price in a
 * hairline row, linking to its detail page. No discounts, no scarcity —
 * just honest one-time prices, consistently presented. Sits right after
 * the collection grid so price comparison needs zero scrolling.
 */
export function PricingStrip() {
  return (
    <Section className="border-t-1.5 border-ink bg-paper pt-0 pb-14 sm:pb-16 lg:pb-20">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-2xl border-1.5 border-ink bg-white shadow-hard-sm">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-1.5 border-ink bg-paper px-5 py-3.5 sm:px-7">
              <p className="micro-label text-ink-muted">
                {TEMPLATE_COUNT} templates · one-time prices
              </p>
              <p className="text-xs font-semibold tracking-tight text-ink-muted">
                Every license: one live website, yours to customize.
              </p>
            </div>

            {/* Price rows */}
            <ul>
              {TEMPLATES.map((t, i) => (
                <li key={t.slug} className="last:border-b-0">
                  <Link
                    href={`/templates/${t.slug}`}
                    className="group flex items-center gap-3 border-b border-ink/10 px-5 py-3.5 transition-colors hover:bg-paper sm:gap-5 sm:px-7"
                  >
                    <span
                      className="font-mono text-[0.65rem] font-bold tracking-widest text-ink-muted sm:text-xs"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-extrabold tracking-tight text-ink transition-colors group-hover:text-coral sm:text-base">
                      {t.name}
                    </span>
                    <span className="hidden max-w-[10rem] truncate text-xs text-ink-muted sm:block sm:text-sm">
                      {t.category}
                    </span>
                    <span className="text-sm font-extrabold tracking-tight text-ink sm:text-base">
                      {t.price}
                      <span className="sr-only"> — one-time</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block text-coral opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
