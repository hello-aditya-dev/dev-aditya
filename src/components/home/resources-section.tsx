import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { RESOURCES, estimateReadingTime } from "@/config/resources";

/**
 * ResourcesSection — homepage resources preview.
 *
 * Adapted from Paperfolio's Articles & News block. Each card includes
 * the real category, title, description, an honest reading-time
 * estimate (computed from the actual content), and the real destination
 * route. No fabricated publication dates.
 */
export function ResourcesSection() {
  return (
    <Section id="resources-preview" className="border-t-1.5 border-ink bg-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel accent="blue">Resources</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Notes, checklists and starter guides.
            </h2>
          </div>
          <ArrowLink href="/resources" className="shrink-0">
            All resources
          </ArrowLink>
        </div>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {RESOURCES.map((resource) => {
            const readingTime = estimateReadingTime(resource);
            return (
              <StaggerItem key={resource.slug}>
                <Link href={`/resources/${resource.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-sm">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-ink/30 px-2.5 py-1 text-xs font-bold tracking-tight">
                        {resource.category}
                      </span>
                      <span className="micro-label text-ink-muted">
                        {readingTime} min read
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold leading-tight tracking-tight">
                      {resource.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {resource.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors group-hover:text-coral">
                      Read
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
