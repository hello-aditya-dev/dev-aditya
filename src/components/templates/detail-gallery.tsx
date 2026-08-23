"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TemplateProduct } from "@/config/templates";

/**
 * DetailGallery — "Every section, before you decide."
 *
 * Four real scroll captures of the live template (hero + three deeper
 * sections) shown one at a time in a paperfolio browser frame, with
 * numbered tab navigation and auto-advance (paused on hover/focus,
 * disabled entirely under prefers-reduced-motion). Keyboard: the strip
 * is a tablist — arrow keys move between sections.
 */

const GALLERY_SECTIONS = [
  { key: 1, label: "Opening" },
  { key: 2, label: "Depth" },
  { key: 3, label: "Proof" },
  { key: 4, label: "Close" },
] as const;

const AUTO_ADVANCE_MS = 5200;

export function DetailGallery({ template }: { template: TemplateProduct }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Auto-advance unless paused or reduced motion.
  React.useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % GALLERY_SECTIONS.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(t);
  }, [paused, reduceMotion]);

  const onTabKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % GALLERY_SECTIONS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(
        (i) => (i - 1 + GALLERY_SECTIONS.length) % GALLERY_SECTIONS.length,
      );
    }
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Frame + captures */}
      <div className="relative overflow-hidden rounded-2xl border-1.5 border-ink bg-white shadow-hard">
        {/* Browser chrome */}
        <div
          className="flex h-9 items-center gap-2 border-b-1.5 border-ink bg-paper px-3"
          aria-hidden="true"
        >
          <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-coral" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-yellow" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-blue" />
          <div className="ml-1.5 h-4.5 min-w-0 flex-1 overflow-hidden rounded-full border border-ink bg-white px-2">
            <span className="block truncate font-mono text-[10px] leading-[16px] text-ink-muted">
              {template.previewHost}
            </span>
          </div>
        </div>

        {/* Captures — stacked, active on top */}
        <div className="relative aspect-[8/5] w-full bg-white">
          {GALLERY_SECTIONS.map((section, i) => (
            <Image
              key={section.key}
              src={`/templates/gallery/${template.slug}-${section.key}.jpg`}
              alt={`${template.name} — section ${i + 1} of the live template`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 55vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              className={cn(
                "object-cover object-top transition-opacity duration-500 ease-out",
                i === active ? "opacity-100" : "opacity-0",
                i === active ? "relative z-10" : "z-0",
              )}
            />
          ))}

          {/* Progress — one bar per section, active fills */}
          <div
            className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1.5"
            aria-hidden="true"
          >
            {GALLERY_SECTIONS.map((s, i) => (
              <span
                key={s.key}
                className={cn(
                  "h-1.5 rounded-full border border-ink transition-all duration-300",
                  i === active ? "w-6 bg-coral" : "w-1.5 bg-white",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div
        role="tablist"
        aria-label={`${template.name} sections`}
        onKeyDown={onTabKeydown}
        className="mt-4 flex flex-wrap items-center gap-2"
      >
        {GALLERY_SECTIONS.map((section, i) => (
          <button
            key={section.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border-1.5 px-3 py-1.5 text-xs font-bold tracking-tight transition-all",
              i === active
                ? "border-ink bg-ink text-white shadow-hard-sm"
                : "border-ink bg-white text-ink hover:bg-paper",
            )}
          >
            <span
              aria-hidden="true"
              className={cn("font-mono text-[0.65rem]", i === active ? "text-white/70" : "text-ink-muted")}
            >
              0{i + 1}
            </span>
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
