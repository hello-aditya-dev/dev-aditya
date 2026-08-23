"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { PreviewModal } from "@/components/templates/preview-modal";
import { TEMPLATES, type TemplateProduct } from "@/config/templates";
import { DetailSiblings } from "@/components/templates/detail-siblings";

/**
 * DetailSiblingsWithQuickLook — siblings strip + Quick Look modal for
 * a detail page.
 *
 * The siblings grid itself is static (server-friendly links to the
 * other detail pages); this client wrapper adds a live "Quick look"
 * action per sibling, opening the same in-page preview modal used on
 * the collection. Browsing all six products without leaving the page.
 */
export function DetailSiblingsWithQuickLook({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const [quickLook, setQuickLook] = React.useState<TemplateProduct | null>(
    null,
  );

  return (
    <>
      <DetailSiblings currentSlug={currentSlug} onQuickLook={setQuickLook} />
      <PreviewModal
        template={quickLook}
        onClose={() => setQuickLook(null)}
        onNavigate={(next) => setQuickLook(next)}
      />
    </>
  );
}
