import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Marquee — CSS-only infinite horizontal scroller.
 *
 * Renders the children twice and translates the track by -50% over a
 * long duration. Pauses and lays out as a wrapped flex under
 * prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({
  children,
  className,
  duration = 38,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className,
      )}
      role="presentation"
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
