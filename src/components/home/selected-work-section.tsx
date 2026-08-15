import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectFrame } from "@/components/ui/project-frame";
import { Reveal } from "@/components/ui/reveal";
import { HOMEPAGE_FEATURED } from "@/config/projects";
import { projectAccent, ACCENT_HEX } from "@/config/project-accents";
import { cn } from "@/lib/utils";

/**
 * SelectedWorkSection — the main visual experience of the portfolio.
 *
 * Four strong projects, each presented as a large editorial composition
 * with alternating alignment. The structure per project is deliberately
 * sparse so the work dominates:
 *
 *   number · name · category
 *   LARGE project visual
 *   one sentence explaining what changed
 *   VIEW LIVE SITE ↗  (primary)   CASE STUDY →  (secondary)
 *
 * No GitHub, no technology stack, no role/scope metadata, no badges.
 * The visitor sees the work, not metadata about the work.
 */
export function SelectedWorkSection() {
  // Four strongest projects, curated by hand for commercial credibility.
  const featured = HOMEPAGE_FEATURED;

  return (
    <Section id="selected-work" className="border-t-1.5 border-ink bg-paper">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel accent="coral">Selected work</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Four projects. Real businesses, live websites.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
          >
            Browse all work
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-16 sm:gap-20 lg:gap-28">
          {featured.map((project, i) => {
            const accent = projectAccent(project.slug);
            const isAlt = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            const category = project.industry.split("·")[0].trim();

            return (
              <Reveal key={project.slug}>
                <article className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  {/* Number + name + category — text column */}
                  <div
                    className={cn(
                      "lg:col-span-4",
                      isAlt ? "lg:order-2 lg:col-start-9" : "lg:order-1",
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-sm font-bold tracking-widest text-ink-muted"
                        aria-hidden="true"
                      >
                        {num}
                      </span>
                      <span
                        className="h-px flex-1 bg-ink/20"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-2 micro-label text-ink-muted">{category}</p>

                    {/* One-sentence explanation of what changed */}
                    <p className="mt-5 max-w-md text-base leading-relaxed text-ink sm:text-lg">
                      {project.challenge}
                    </p>

                    {/* CTA hierarchy: VIEW LIVE SITE primary, CASE STUDY secondary */}
                    <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-5 py-3 text-sm font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                        >
                          View live site
                          <span aria-hidden="true">&nearr;</span>
                        </a>
                      ) : (
                        <span
                          className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink/30 bg-white px-5 py-3 text-sm font-semibold tracking-tight text-ink-muted"
                          aria-label="No live preview available"
                        >
                          No live preview
                        </span>
                      )}
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors hover:text-coral"
                      >
                        Case study
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>

                  {/* LARGE project visual */}
                  <div
                    className={cn(
                      "relative lg:col-span-8",
                      isAlt ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-5",
                    )}
                  >
                    <div
                      className="absolute -inset-3 -z-10 rounded-3xl opacity-20 transition-opacity"
                      style={{ background: ACCENT_HEX[accent] }}
                      aria-hidden="true"
                    />
                    <ProjectFrame
                      slug={project.slug}
                      name={project.name}
                      industry={project.industry}
                      accent={accent}
                      size="xl"
                      className="shadow-hard"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
