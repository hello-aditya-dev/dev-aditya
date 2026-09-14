import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Badge } from "@/components/ui/badge";
import { ProjectFrame } from "@/components/ui/project-frame";
import { Reveal } from "@/components/ui/reveal";
import {
  FLAGSHIP_PROJECTS,
  LABORATORY_PROJECTS,
  STATUS_LABELS,
} from "@/config/projects";
import { projectAccent, ACCENT_HEX } from "@/config/project-accents";
import { cn } from "@/lib/utils";

/**
 * WorkContent — /work page.
 *
 * An expanded version of Selected Work: every flagship project as a large
 * editorial entry, followed by a visually secondary "Experiments" section
 * for laboratory projects. No filter system — with only a few strong
 * projects, filters add noise without adding value.
 *
 * Each flagship entry mirrors the homepage card structure: number, name,
 * category, large visual, one sentence, VIEW LIVE SITE primary, CASE STUDY
 * secondary. No GitHub, no stack, no role metadata.
 */
export function WorkContent() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Selected work</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Real businesses, live websites, honestly labelled.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Each project below is real. Open the live website to see the work,
            or read the case study for the problem, what changed and the result.
          </p>
        </Container>
      </Section>

      {/* Flagship entries — large editorial compositions */}
      <Section className="border-t-1.5 border-ink bg-paper pt-12 sm:pt-16">
        <Container>
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
            {FLAGSHIP_PROJECTS.map((project, i) => {
              const accent = projectAccent(project.slug);
              const isAlt = i % 2 === 1;
              const num = String(i + 1).padStart(2, "0");
              const category = project.industry.split("·")[0].trim();

              return (
                <Reveal key={project.slug}>
                  <article className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                    {/* Number + name + category */}
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
                      <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight">
                        {project.name}
                      </h2>
                      <p className="mt-2 micro-label text-ink-muted">{category}</p>

                      <p className="mt-5 max-w-md text-base leading-relaxed text-ink sm:text-lg">
                        {project.challenge}
                      </p>

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
                          <span className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink/30 bg-white px-5 py-3 text-sm font-semibold tracking-tight text-ink-muted">
                            No live preview
                          </span>
                        )}
                        {project.caseStudyUrl && (
                          <Link
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors hover:text-coral"
                          >
                            Case study
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        )}
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
                        className="absolute -inset-3 -z-10 rounded-3xl opacity-20"
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

      {/* Experiments — visually secondary */}
      {LABORATORY_PROJECTS.length > 0 && (
        <Section id="lab" className="border-t-1.5 border-ink bg-white">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel accent="yellow">Experiments</SectionLabel>
                <h2 className="mt-4 max-w-2xl text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight">
                  Smaller experiments, kept honest.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                  Self-initiated projects built to learn. Clearly marked as
                  experiments, not client work.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {LABORATORY_PROJECTS.filter(
                (p): p is typeof p & { caseStudyUrl: string } =>
                  p.caseStudyUrl !== null,
              ).map((project) => (
                <Link
                  key={project.slug}
                  href={project.caseStudyUrl}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border-1.5 border-ink/30 bg-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink hover:shadow-hard-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="yellow">
                      {STATUS_LABELS[project.status]}
                    </Badge>
                    <span className="font-mono text-xs font-bold tracking-widest text-ink-muted">
                      LAB
                    </span>
                  </div>
                  <div className="mt-4">
                    <ProjectFrame
                      slug={project.slug}
                      name={project.name}
                      industry={project.industry}
                      accent={projectAccent(project.slug)}
                      size="md"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-tight tracking-tight">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {project.outcomeHeadline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors group-hover:text-coral">
                    Read case study
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
