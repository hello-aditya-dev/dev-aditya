import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Badge } from "@/components/ui/badge";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ProjectFrame } from "@/components/ui/project-frame";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { LABORATORY_PROJECTS, STATUS_LABELS } from "@/config/projects";
import { projectAccent } from "@/config/project-accents";

/**
 * LabSection — Laboratory / Creative Technology
 *
 * Compact, playful cards distinct from flagship case studies. Each
 * project is clearly labelled by its actual status — Experiment,
 * Concept, Independent project, Business project.
 */
export function LabSection() {
  return (
    <Section id="lab" className="border-t-1.5 border-ink bg-ink text-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel accent="yellow" className="text-ink-soft">
              Laboratory
            </SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              The Useful Experiments Department.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Built to learn — small on purpose, kept honest. These never compete
              with the primary case studies for attention. Each one is honestly
              labelled as an experiment, concept or independent project.
            </p>
          </div>
          <ArrowLink href="/work#lab" className="shrink-0 text-white hover:text-coral">
            All experiments
          </ArrowLink>
        </div>

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LABORATORY_PROJECTS.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={project.caseStudyUrl}
                className="group block h-full overflow-hidden rounded-2xl border-1.5 border-ink-soft bg-white/5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-coral"
              >
                <div className="flex items-center justify-between gap-2">
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
                  <span className="font-mono text-xs font-bold tracking-widest text-ink-soft">
                    LAB
                  </span>
                </div>

                <div className="mt-4">
                  <ProjectFrame
                    slug={project.slug}
                    name={project.name}
                    industry={project.industry}
                    accent={projectAccent(project.slug)}
                    size="sm"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold leading-tight tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {project.outcomeHeadline}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white transition-colors group-hover:text-coral">
                  Read the experiment
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
