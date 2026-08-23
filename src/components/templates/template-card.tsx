"use client";

import * as React from "react";
import Image from "next/image";
import { BrowserFrame } from "@/components/templates/browser-frame";
import { trackTemplateCta } from "@/lib/templates-analytics";
import type { TemplateProduct } from "@/config/templates";
import { cn } from "@/lib/utils";

/**
 * TemplateCard — a template product presented as a mini case study.
 *
 * Real screenshot in a paperfolio browser frame (with a small mobile
 * overlay), then number / category / featured marker, name, one-line
 * description, a restrained meta line and the price. Actions: quick look
 * (in-page live preview modal), live preview (external, always) and
 * marketplace (only once a real URL is configured).
 *
 * Hover behaviour follows the site's button language: the card lifts
 * slightly, its hard shadow grows, the screenshot scales ~1.02 and the
 * arrow nudges forward. All subtle, all reduced-motion safe (CSS only).
 */
export function TemplateCard({
  template,
  index,
  onQuickLook,
}: {
  template: TemplateProduct;
  index: number;
  onQuickLook: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  const onPreviewClick = () => trackTemplateCta(template.slug, "live_preview");
  const onMarketplaceClick = () => trackTemplateCta(template.slug, "marketplace");

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border-1.5 border-ink bg-white shadow-hard-sm transition-all duration-300 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard">
      {/* Real live preview — the dominant visual. Opens Quick Look in-page. */}
      <button
        type="button"
        onClick={onQuickLook}
        aria-label={`Quick look — preview ${template.name} live on this page`}
        className="block w-full cursor-pointer focus-visible:outline-none"
      >
        <BrowserFrame
          src={template.screenshot.desktop}
          alt={`${template.name} — ${template.category} website template, live preview`}
          host={template.previewHost}
          className="rounded-b-none border-b-0"
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        >
          {/* Small mobile screenshot overlay — real responsive capture */}
          <div
            className="absolute bottom-2 right-2 hidden w-[24%] max-w-[120px] rotate-2 overflow-hidden rounded-xl border-1.5 border-ink bg-white shadow-hard-sm transition-transform duration-300 ease-out group-hover:-rotate-1 sm:block"
            aria-hidden="true"
          >
            <div className="relative aspect-[9/19] w-full">
              <Image
                src={template.screenshot.mobile}
                alt=""
                fill
                sizes="120px"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Quick look hint pill — always visible, touch friendly */}
          <span
            className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full border-1.5 border-ink bg-white px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-ink shadow-hard-sm transition-colors group-hover:bg-yellow"
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="5" cy="5" r="3.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7.8 7.8L11 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Quick look
          </span>
        </BrowserFrame>
      </button>

      {/* Product metadata */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-2.5">
            <span
              className="font-mono text-sm font-bold tracking-widest text-ink-muted"
              aria-hidden="true"
            >
              {num}
            </span>
            <span className="micro-label text-ink-muted">{template.category}</span>
          </p>
          {template.featured ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-1.5 border-ink bg-coral px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white">
              <span className="h-1 w-1 rounded-full bg-white" aria-hidden="true" />
              Featured
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink">
          {template.name}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
          {template.description}
        </p>

        <p className="mb-5 mt-3 text-xs font-medium tracking-tight text-ink-soft">
          Framer <span aria-hidden="true">·</span> Responsive{" "}
          <span aria-hidden="true">·</span> CMS-ready
        </p>

        {/* Price + actions — pinned to the card bottom for equal-height rows */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4">
          <p className="text-xl font-extrabold tracking-tight text-ink">
            {template.price}
            <span className="sr-only"> — one-time purchase price in USD</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <button
              type="button"
              onClick={onQuickLook}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border-1.5 border-ink bg-white px-3.5 py-2 text-xs font-bold tracking-tight text-ink",
                "transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none",
              )}
            >
              Quick look
              <span aria-hidden="true" className="text-ink-muted">
                &nearr;
              </span>
            </button>

            <a
              href={template.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onPreviewClick}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border-1.5 border-ink bg-coral px-3.5 py-2 text-xs font-bold tracking-tight text-white",
                "transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none",
              )}
            >
              Live preview
              <span aria-hidden="true">&nearr;</span>
            </a>

            {template.marketplaceUrl ? (
              <a
                href={template.marketplaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onMarketplaceClick}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors hover:text-coral"
              >
                <span className="link-underline">Get template</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover/link:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
