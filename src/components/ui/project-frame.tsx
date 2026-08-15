import * as React from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/config/project-accents";
import { ACCENT_HEX } from "@/config/project-accents";

/**
 * ProjectFrame — original SVG browser-frame illustration.
 *
 * Replaces fake screenshots. Each project gets a frame with:
 *   - a browser chrome bar (three dots, an address pill)
 *   - a project-specific accent backing panel
 *   - the project's monogram (first letter of its name)
 *   - the project name set in heavy display type
 *
 * The result is graphic, original, on-brand for Paperfolio, and
 * completely honest — never fakes a screenshot.
 */
export function ProjectFrame({
  slug,
  name,
  industry,
  accent,
  className,
  size = "lg",
}: {
  slug: string;
  name: string;
  industry: string;
  accent: Accent;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const hex = ACCENT_HEX[accent];
  const monogram = name.charAt(0).toUpperCase();
  const subtitle = industry.split("·")[0].trim().slice(0, 28);

  const sizes = {
    sm: { chrome: 28, frame: "h-32", title: "text-base", mono: "text-3xl" },
    md: { chrome: 36, frame: "h-44", title: "text-xl", mono: "text-5xl" },
    lg: { chrome: 44, frame: "h-56", title: "text-2xl", mono: "text-6xl" },
    xl: { chrome: 52, frame: "h-[22rem] sm:h-[26rem] lg:h-[30rem]", title: "text-3xl sm:text-4xl", mono: "text-7xl" },
  }[size];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border-1.5 border-ink bg-white",
        sizes.frame,
        className,
      )}
      role="img"
      aria-label={`Editorial frame for ${name} — ${industry}`}
    >
      {/* Accent backing panel — bottom right */}
      <div
        className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-90"
        style={{ background: hex }}
        aria-hidden="true"
      />

      {/* Browser chrome */}
      <div
        className={cn(
          "flex items-center gap-2 border-b-1.5 border-ink bg-paper px-3",
          sizes.chrome,
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-yellow" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-blue" />
        <div className="ml-2 hidden h-4 flex-1 rounded-full border border-ink bg-white sm:block">
          <div className="h-full w-1/2 rounded-full border-r border-ink/40" />
        </div>
      </div>

      {/* Content area */}
      <div className="relative flex items-end justify-between p-4 sm:p-6" style={{ height: `calc(100% - ${sizes.chrome}px)` }}>
        <div className="z-10">
          <p className="micro-label text-ink-muted">{subtitle}</p>
          <p className={cn("mt-1 font-bold leading-tight tracking-tight text-ink", sizes.title)}>
            {name}
          </p>
        </div>
        <div
          className={cn(
            "z-10 flex items-center justify-center rounded-xl border-1.5 border-ink bg-white font-bold leading-none text-ink",
            sizes.mono,
            "h-14 w-14",
          )}
          style={{ textShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
        >
          {monogram}
        </div>
      </div>

      {/* Decorative grid lines — subtle paper-fold effect */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${slug})`} />
      </svg>
    </div>
  );
}
