"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TemplateProduct } from "@/config/templates";

/**
 * DetailLivePreview — the real template site, embedded on the page.
 *
 * The detail page's centrepiece: the live product inside a paperfolio
 * browser frame with a Desktop/Mobile toggle. The iframe is lazy by
 * default and only mounts after the user presses "Load live preview",
 * so opening a detail page never silently transfers megabytes from the
 * external site.
 */
type PreviewMode = "desktop" | "mobile";

export function DetailLivePreview({ template }: { template: TemplateProduct }) {
  const [mode, setMode] = React.useState<PreviewMode>("desktop");
  const [active, setActive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border-1.5 border-ink bg-white shadow-hard">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-1.5 border-ink bg-white px-4 py-3">
        <p className="micro-label text-ink-muted">
          Live preview · {template.previewHost}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {active ? (
            <div
              className="flex items-center gap-0.5 rounded-full border-1.5 border-ink bg-paper p-0.5"
              role="group"
              aria-label="Preview device"
            >
              {(
                [
                  ["desktop", "Desktop"],
                  ["mobile", "Mobile"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value)}
                  aria-pressed={mode === value}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-bold tracking-tight transition-colors",
                    mode === value
                      ? "bg-ink text-white"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          <a
            href={template.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border-1.5 border-ink bg-coral px-3.5 py-2 text-xs font-bold tracking-tight text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
          >
            Open in new tab
            <span aria-hidden="true">&nearr;</span>
          </a>
        </div>
      </div>

      {/* Preview area */}
      <div className="relative bg-paper">
        {active ? (
          <>
            {!loaded ? (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="inline-flex items-center gap-2.5 micro-label text-ink-muted">
                  <span className="status-dot h-1.5 w-1.5 rounded-full bg-coral" />
                  Loading live preview
                </span>
              </div>
            ) : null}
            <div
              className={cn(
                "mx-auto transition-all duration-300 ease-out",
                mode === "mobile"
                  ? "w-[min(100%,390px)] border-x-1.5 border-ink/15 bg-white"
                  : "w-full",
              )}
            >
              <iframe
                key={`${template.slug}-${mode === "mobile" ? "m" : "d"}`}
                src={template.previewUrl}
                title={`${template.name} — live preview`}
                onLoad={() => setLoaded(true)}
                referrerPolicy="strict-origin-when-cross-origin"
                className="block h-[60vh] w-full bg-white sm:h-[68vh]"
              />
            </div>
            {mode === "mobile" ? (
              <div
                className="pointer-events-none absolute left-1/2 top-0 z-10 h-4 w-28 -translate-x-1/2 rounded-b-xl border-1.5 border-ink bg-paper"
                aria-hidden="true"
              />
            ) : null}
          </>
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group flex h-[38vh] w-full flex-col items-center justify-center gap-4 sm:h-[42vh]"
            aria-label={`Load the live preview of ${template.name} on this page`}
          >
            <span className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-white px-5 py-3 text-sm font-bold tracking-tight text-ink shadow-hard-sm transition-all group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-hard">
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="3.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M7.8 7.8L11 11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Load live preview
            </span>
            <span className="micro-label text-ink-muted">
              Interactive · Nothing to install
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
