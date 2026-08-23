import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { TemplateCard } from "@/components/templates/template-card";
import { TEMPLATES } from "@/config/templates";

/**
 * TemplatesCollection — the six template products in a curated grid.
 *
 * Desktop: 3 columns × 2 rows. Tablet: 2 columns. Mobile: 1 column.
 * No filters, no search, no tabs — with six hand-picked products the
 * collection should feel curated and intentional, not like a marketplace.
 */
export function TemplatesCollection() {
  return (
    <Section id="collection" className="border-t-1.5 border-ink bg-paper">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel accent="coral">Template collection</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              Selected templates.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted sm:text-right">
            Six finished website systems. Preview them live, buy on the
            marketplace, launch as your own.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TEMPLATES.map((template, i) => (
            <StaggerItem key={template.slug} className="h-full">
              <TemplateCard template={template} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
