import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionLabel — uppercase tracked eyebrow with an accent dot.
 * Used at the top of every major section to anchor the eye.
 */
export function SectionLabel({
  children,
  className,
  accent = "coral",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "coral" | "blue" | "yellow" | "violet" | "ink";
}) {
  const dot = {
    coral: "bg-coral",
    blue: "bg-blue",
    yellow: "bg-yellow",
    violet: "bg-violet",
    ink: "bg-ink",
  }[accent];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 micro-label text-ink-muted",
        className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", dot)} aria-hidden="true" />
      {children}
    </span>
  );
}
