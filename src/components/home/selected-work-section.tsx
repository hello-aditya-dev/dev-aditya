import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Badge } from "@/components/ui/badge";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ProjectFrame } from "@/components/ui/project-frame";
import { Reveal } from "@/components/ui/reveal";
import { FLAGSHIP_PROJECTS, STATUS_LABELS } from "@/config/projects";
import { projectAccent, ACCENT_HEX } from "@/config/project-accents";
import { cn } from "@/lib/utils";

/**
 * SelectedWorkSection — "Take a look at selected work"
 *
 * Large editorial cards with alternating layout, thick outlines, real
 * project frames (no fake screenshots), project-specific accent panel,
 * and strong hover feedback.
 */
export function SelectedWorkSection() {
  const featured = FLAGSHIP_PROJECTS.slice(0, 4);

  return (
    <Section id="selected-work">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel accent="coral">Selected work</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Five projects that prove range without losing focus.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              Corporate, industrial, commerce, SaaS, brand and professional services —
              each chosen because it demonstrates a different kind of judgement. Open any
              of them for the full case study.
            </p>
          </div>
          <ArrowLink href="/work" className="shrink-0">
            Browse all work
          </ArrowLink>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {featured.map((project, i) => {
            const accent = projectAccent(project.slug);
            const isAlt = i % 2 === 1;

            return (
              <Reveal key={project.slug}>
                <article
                  className={cn(
                    "group relative grid items-center gap-6 rounded-3xl border-1.5 border-ink bg-white p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8",
                    "transition-all duration-300 hover:shadow-hard-sm hover:-translate-y-0.5",
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: ACCENT_HEX[accent] }}
                  />
                  <div
                    className={cn(
                      "relative",
                      isAlt ? "lg:order-2" : "lg:order-1",
                    )}
                  >
                    <div
                      className="absolute -inset-2 -z-10 rounded-3xl opacity-30 transition-opacity group-hover:opacity-50"
                      style={{ background: ACCENT_HEX[accent] }}
                      aria-hidden="true"
                    />
                    <ProjectFrame
                      slug={project.slug}
                      name={project.name}
                      industry={project.industry}
                      accent={accent}
                      size="lg"
                      className="shadow-hard transition-transform duration-300 group-hover:-translate-y-1"
                    />
                  </div>

                  <div className={cn(isAlt ? "lg:order-1" : "lg:order-2")}>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{project.industry.split("·")[0].trim()}</Badge>
                      <Badge variant="outline">{project.projectType}</Badge>
                      <Badge
                        variant={
                          project.status === "business"
                            ? "coral"
                            : project.status === "concept"
                              ? "blue"
                              : "yellow"
                        }
                      >
                        {STATUS_LABELS[project.status]}
                      </Badge>
                    </div>

                    <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.15] tracking-tight">
                      {project.outcomeHeadline}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {project.challenge}
                    </p>

                    <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <dt className="micro-label text-ink-muted">Role</dt>
                        <dd className="mt-0.5 text-sm font-semibold tracking-tight">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="micro-label text-ink-muted">Scope</dt>
                        <dd className="mt-0.5 text-sm font-semibold tracking-tight">{project.scope.split(",")[0]}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
                      >
                        Read the case study
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
                        >
                          View live
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
                        >
                          GitHub
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
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
