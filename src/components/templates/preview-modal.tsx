"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { trackTemplateCta } from "@/lib/templates-analytics";
import type { TemplateProduct } from "@/config/templates";
import { cn } from "@/lib/utils";

/**
 * PreviewModal — Quick Look: the live template site, in-page.
 *
 * Opens a template's real live preview inside a paperfolio browser frame
 * so visitors can inspect a product without leaving the collection.
 * Desktop/mobile toggle shows the responsive behaviour; "Open full
 * preview" hands off to the external site in a new tab.
 *
 * Interaction rules: opens from a card's Quick look button (or its
 * screenshot), closes on Escape / backdrop / close button, locks body
 * scroll while open, restores focus to the trigger on close, and tracks
 * the open as `cta=quick_look`.
 */

type PreviewMode = "desktop" | "mobile";

/** Copy-to-clipboard feedback label (a11y-live). */
function useCopyFeedback() {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable — select-friendly fallback.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;left:-9999px;";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };
  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  return { copied, copy };
}

export function PreviewModal({
  template,
  onClose,
}: {
  template: TemplateProduct | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [mode, setMode] = React.useState<PreviewMode>("desktop");
  const [loaded, setLoaded] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { copied, copy } = useCopyFeedback();

  // Reset view state + track when a different template opens.
  React.useEffect(() => {
    if (!template) return;
    setMode("desktop");
    setLoaded(false);
    trackTemplateCta(template.slug, "quick_look");
  }, [template]);

  // Escape closes; body scroll locked while open.
  React.useEffect(() => {
    if (!template) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [template, onClose]);

  // Focus the dialog on open; restore focus to the trigger on close.
  const restoreFocus = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (template) {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      // Defer so the dialog exists in the DOM.
      requestAnimationFrame(() => dialogRef.current?.focus());
    } else {
      restoreFocus.current?.focus?.();
    }
  }, [template]);

  return (
    <AnimatePresence>
      {template ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${template.name} quick look — live preview`}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog — paperfolio browser frame */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-1.5 border-ink bg-white shadow-hard outline-none"
          >
            {/* Browser chrome */}
            <div
              className="flex h-11 shrink-0 items-center gap-2 border-b-1.5 border-ink bg-paper px-3 sm:px-4"
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-coral" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-yellow" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-blue" />
              <div className="ml-1.5 min-w-0 flex-1 overflow-hidden rounded-full border border-ink bg-white px-2.5">
                <span className="block truncate font-mono text-[10px] leading-[17px] text-ink-muted">
                  {template.previewHost}
                </span>
              </div>
            </div>

            {/* Toolbar: template identity + mode toggle + actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-1.5 border-ink bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="micro-label text-ink-muted">
                  {String(template.category)} · {template.price}
                </p>
                <h2 className="text-lg font-extrabold leading-tight tracking-tight text-ink">
                  {template.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Desktop / mobile toggle */}
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

                <button
                  type="button"
                  onClick={() => {
                    if (!template) return;
                    copy(`${window.location.origin}/templates?preview=${template.slug}`);
                  }}
                  aria-live="polite"
                  className="inline-flex items-center gap-1.5 rounded-lg border-1.5 border-ink bg-white px-3.5 py-2 text-xs font-bold tracking-tight text-ink transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                >
                  {copied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6.5L4.8 9.2 10 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Link copied
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 4V2.5A1.5 1.5 0 006.5 1H2.5A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      Share preview
                    </>
                  )}
                </button>

                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackTemplateCta(template.slug, "live_preview")
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border-1.5 border-ink bg-coral px-3.5 py-2 text-xs font-bold tracking-tight text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                >
                  Open full preview
                  <span aria-hidden="true">&nearr;</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close quick look"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-1.5 border-ink bg-white text-ink transition-colors hover:bg-paper hover:text-coral"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3l10 10M13 3L3 13"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Live preview area */}
            <div className="relative bg-paper">
              {/* Loading state */}
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
                  ref={iframeRef}
                  key={`${template.slug}-${mode === "mobile" ? "m" : "d"}`}
                  src={template.previewUrl}
                  title={`${template.name} — live preview`}
                  onLoad={() => setLoaded(true)}
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                  className="block h-[58vh] w-full bg-white sm:h-[64vh] lg:h-[68vh]"
                />
              </div>

              {/* Phone notch hint in mobile mode */}
              {mode === "mobile" ? (
                <div
                  className="pointer-events-none absolute left-1/2 top-0 z-10 h-4 w-28 -translate-x-1/2 rounded-b-xl border-1.5 border-ink bg-paper"
                  aria-hidden="true"
                />
              ) : null}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t-1.5 border-ink bg-white px-4 py-3">
              <p className="text-xs text-ink-muted">
                This is the live template — explore it directly.
              </p>
              <p className="micro-label text-ink-muted">
                Quick look · {template.name}
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
