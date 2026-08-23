"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { TemplateCard } from "@/components/templates/template-card";
import { PreviewModal } from "@/components/templates/preview-modal";
import { TEMPLATES } from "@/config/templates";
import type { TemplateProduct } from "@/config/templates";

/**
 * TemplatesCollection — the six template products in a curated grid.
 *
 * Desktop: 3 columns × 2 rows. Tablet: 2 columns. Mobile: 1 column.
 * No filters, no search, no tabs — with six hand-picked products the
 * collection should feel curated and intentional, not like a marketplace.
 *
 * Owns the Quick Look modal state: cards request a template preview via
 * onQuickLook and the live iframe modal renders once at this level.
 *
 * Deep links: /templates?preview={slug} opens the Quick Look modal on
 * load (validated against the known slugs; unknown values ignored).
 * The query param is removed from the URL once consumed so sharing the
 * page afterwards shares the clean collection URL.
 *
 * A Suspense boundary (CollectionInner) wraps the useSearchParams
 * consumer as required by Next.js App Router.
 */
export function TemplatesCollection() {
  return (
    <React.Suspense
      fallback={
        <Section id="collection" className="border-t-1.5 border-ink bg-paper">
          <Container>
            <div className="h-96" aria-hidden="true" />
          </Container>
        </Section>
      }
    >
      <CollectionInner />
    </React.Suspense>
  );
}

function CollectionInner() {
  const searchParams = useSearchParams();
  const [quickLook, setQuickLook] = React.useState<TemplateProduct | null>(
    null,
  );

  // Consume a ?preview= deep link once, on mount.
  React.useEffect(() => {
    const slug = searchParams.get("preview");
    if (!slug) return;
    const match = TEMPLATES.find((t) => t.slug === slug);
    if (!match) return;
    setQuickLook(match);
    // Clean the URL without reloading.
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    window.history.replaceState(null, "", url.pathname);
  }, [searchParams]);

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
              <TemplateCard
                template={template}
                index={i}
                onQuickLook={() => setQuickLook(template)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>

      <PreviewModal template={quickLook} onClose={() => setQuickLook(null)} />
    </Section>
  );
}
