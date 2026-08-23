import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { TEMPLATES } from "@/config/templates";
import { cn } from "@/lib/utils";

/**
 * CompareSection — "Choose by fit, not guesswork."
 *
 * A restrained editorial comparison matrix of the six templates. Rows
 * are shared attributes (honest, structural — no invented metrics);
 * columns are the products, each linking to its detail page. The
 * featured template's column gets a subtle yellow header so the grid
 * still reads premium rather than marketplace-cluttered.
 *
 * Rendered as a real <table> for accessibility: row/column headers,
 * scope attributes and caption. On small screens the table scrolls
 * horizontally inside a bordered card with a hint label.
 */

interface RowDef {
  label: string;
  render: (t: (typeof TEMPLATES)[number]) => React.ReactNode;
}

const YesCell = () => (
  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6.5L4.8 9.2 10 3.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="sr-only">Included</span>
    Yes
  </span>
);

const ROWS: RowDef[] = [
  {
    label: "Built for",
    render: (t) => <span className="text-sm text-ink">{t.category}</span>,
  },
  {
    label: "Best fit",
    render: (t) => (
      <span className="text-sm text-ink-muted">{t.audience}</span>
    ),
  },
  {
    label: "Price",
    render: (t) => (
      <span className="text-base font-extrabold tracking-tight text-ink">
        {t.price}
      </span>
    ),
  },
  {
    label: "Responsive (desktop / tablet / mobile)",
    render: () => <YesCell />,
  },
  {
    label: "CMS-ready content",
    render: () => <YesCell />,
  },
  {
    label: "Live preview",
    render: (t) => (
      <a
        href={t.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold tracking-tight text-ink underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral"
      >
        Open<span aria-hidden="true"> ↗</span>
        <span className="sr-only"> — {t.name} live preview (new tab)</span>
      </a>
    ),
  },
  {
    label: "Details",
    render: (t) => (
      <Link
        href={`/templates/${t.slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold tracking-tight text-ink transition-colors hover:text-coral"
      >
        View
        <span aria-hidden="true">&rarr;</span>
        <span className="sr-only"> — {t.name} details</span>
      </Link>
    ),
  },
];

export function CompareSection() {
  return (
    <Section className="border-t-1.5 border-ink bg-white">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel accent="blue">Side by side</SectionLabel>
              <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
                Choose by fit, not guesswork.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted sm:text-right">
              The same honest structure across every template — pick the
              system built for your industry.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-x-auto rounded-2xl border-1.5 border-ink bg-white shadow-hard-sm">
            {/* Scroll hint for small screens */}
            <p className="border-b border-ink/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-ink-soft md:hidden">
              Swipe to compare →
            </p>
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">
                Comparison of the six website templates: built-for category,
                best fit, price, responsiveness, CMS, live preview and details
                links
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-44 border-b-1.5 border-r-1.5 border-ink bg-paper px-4 py-4 align-bottom sm:w-52"
                  >
                    <span className="micro-label text-ink-muted">Compare</span>
                  </th>
                  {TEMPLATES.map((t) => (
                    <th
                      key={t.slug}
                      scope="col"
                      className={cn(
                        "border-b-1.5 border-ink px-4 py-4 align-bottom",
                        t.featured ? "bg-yellow/40" : "bg-white",
                      )}
                    >
                      <Link
                        href={`/templates/${t.slug}`}
                        className="group/th block"
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[0.65rem] font-bold tracking-widest text-ink-muted">
                            {String(TEMPLATES.indexOf(t) + 1).padStart(2, "0")}
                          </span>
                          {t.featured ? (
                            <span className="rounded-full border-1.5 border-ink bg-coral px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white">
                              Featured
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1.5 block text-lg font-extrabold leading-tight tracking-tight text-ink transition-colors group-hover/th:text-coral">
                          {t.name}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr
                    key={row.label}
                    className={ri % 2 === 1 ? "bg-paper/60" : "bg-white"}
                  >
                    <th
                      scope="row"
                      className="border-b border-r-1.5 border-ink/15 px-4 py-3.5 align-top text-xs font-bold tracking-tight text-ink last:border-b-0"
                    >
                      {row.label}
                    </th>
                    {TEMPLATES.map((t) => (
                      <td
                        key={t.slug}
                        className={cn(
                          "border-b border-ink/10 px-4 py-3.5 align-top",
                          t.featured ? "bg-yellow/20" : "",
                          ri === ROWS.length - 1 ? "border-b-0" : "",
                        )}
                      >
                        {row.render(t)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
