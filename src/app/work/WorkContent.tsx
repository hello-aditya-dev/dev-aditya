"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectFrame } from "@/components/ui/project-frame";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import {
  PROJECTS,
  FLAGSHIP_PROJECTS,
  LABORATORY_PROJECTS,
  CAPABILITY_FILTERS,
  STATUS_LABELS,
  type CapabilityTag,
} from "@/config/projects";
import { projectAccent } from "@/config/project-accents";
import { cn } from "@/lib/utils";

/**
 * WorkContent — /work page client component.
 */
export function WorkContent() {
  const [active, setActive] = React.useState<Set<CapabilityTag>>(new Set());

  const toggle = (id: CapabilityTag) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = active.size
    ? FLAGSHIP_PROJECTS.filter((p) =>
        Array.from(active).every((id) => p.capabilities.includes(id)),
      )
    : FLAGSHIP_PROJECTS;

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Work</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Selected work — flagship case studies and laboratory experiments.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Every project below is real and honestly labelled. Flagship case
            studies walk through the problem, decisions and outcome in detail.
            Laboratory projects are smaller experiments, clearly marked as such.
          </p>
        </Container>
      </Section>

      <Container>
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter work by capability"
        >
          <span className="micro-label mr-2 text-ink-muted">Filter:</span>
          {CAPABILITY_FILTERS.map((filter) => {
            const isOn = active.has(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => toggle(filter.id)}
                aria-pressed={isOn}
                className={cn(
                  "rounded-full border-1.5 border-ink px-3.5 py-1.5 text-sm font-semibold tracking-tight transition-colors",
                  isOn ? "bg-ink text-white" : "bg-white text-ink hover:bg-paper",
                )}
              >
                {filter.label}
              </button>
            );
          })}
          {active.size > 0 && (
            <button
              type="button"
              onClick={() => setActive(new Set())}
              className="ml-1 text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
            >
              Clear ({active.size})
            </button>
          )}
        </div>
      </Container>

      <Section className="pt-8">
        <Container>
          {filtered.length === 0 ? (
            <Card className="p-10 text-center" shadow>
              <p className="text-lg font-bold tracking-tight">
                No projects match these filters.
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Try removing one, or browse the laboratory section below.
              </p>
              <button
                type="button"
                onClick={() => setActive(new Set())}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-coral"
              >
                Clear filters
                <span aria-hidden="true">→</span>
              </button>
            </Card>
          ) : (
            <StaggerGroup className="grid gap-5 md:grid-cols-2">
              {filtered.map((project) => (
                <StaggerItem key={project.slug}>
                  <Link
                    href={project.caseStudyUrl}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border-1.5 border-ink bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-sm"
                  >
                    <div className="p-5">
                      <ProjectFrame
                        slug={project.slug}
                        name={project.name}
                        industry={project.industry}
                        accent={projectAccent(project.slug)}
                        size="md"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 pt-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">
                          {project.industry.split("·")[0].trim()}
                        </Badge>
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
                      <h2 className="mt-3 text-xl font-bold leading-tight tracking-tight">
                        {project.name}
                      </h2>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                        {project.outcomeHeadline}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {project.liveUrl && (
                          <span className="text-xs font-semibold tracking-tight text-ink-muted">
                            Live ↗
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors group-hover:text-coral">
                          Read case study
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </Container>
      </Section>

      <Section id="lab" className="border-t-1.5 border-ink bg-ink text-white">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel accent="yellow" className="text-ink-soft">
                Laboratory
              </SectionLabel>
              <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
                Smaller experiments, kept honest.
              </h2>
            </div>
          </div>

          <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-3">
            {LABORATORY_PROJECTS.map((project) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={project.caseStudyUrl}
                  className="group block h-full rounded-2xl border-1.5 border-ink-soft bg-white/5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-coral"
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
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <Reveal>
        <Container className="py-12 text-center">
          <p className="text-sm text-ink-muted">
            {PROJECTS.length} projects in total — {FLAGSHIP_PROJECTS.length} flagship, {LABORATORY_PROJECTS.length} laboratory.
          </p>
        </Container>
      </Reveal>
    </>
  );
}
