"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BrowserFrame — real screenshot inside a paperfolio browser chrome.
 *
 * Mirrors the browser-chrome treatment of ProjectFrame (three dots in
 * coral/yellow/blue + an address pill) but renders the template's real
 * captured screenshot instead of an illustration.
 */

export function BrowserFrame({
  src,
  alt,
  host,
  priority = false,
  className,
  imageClassName,
  chromeClassName,
  showUrlOnMobile = false,
  children,
}: {
  src: string;
  alt: string;
  /** Hostname shown inside the address pill. */
  host?: string;
  /** Enable next/image priority loading (hero/above-the-fold only). */
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  chromeClassName?: string;
  /** Show the address pill on mobile too (default: dots only). */
  showUrlOnMobile?: boolean;
  /** Optional overlay content positioned over the screenshot (e.g. phone). */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border-1.5 border-ink bg-white",
        className,
      )}
    >
      {/* Browser chrome */}
      <div
        className={cn(
          "flex h-9 items-center gap-2 border-b-1.5 border-ink bg-paper px-3",
          chromeClassName,
        )}
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-coral" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-yellow" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-blue" />
        {host ? (
          <div
            className={cn(
              "ml-1.5 h-4.5 min-w-0 flex-1 overflow-hidden rounded-full border border-ink bg-white px-2",
              showUrlOnMobile ? "" : "hidden sm:block",
            )}
          >
            <span className="block truncate font-mono text-[10px] leading-[16px] text-ink-muted">
              {host}
            </span>
          </div>
        ) : (
          <div className="ml-2 hidden h-4 flex-1 rounded-full border border-ink bg-white sm:block">
            <div className="h-full w-1/2 rounded-full border-r border-ink/40" />
          </div>
        )}
      </div>

      {/* Screenshot area */}
      <div className="relative aspect-[8/5] w-full bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className={cn("object-cover object-top", imageClassName)}
        />
        {children}
      </div>
    </div>
  );
}
