import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Highlight — coloured rectangle behind a word or phrase.
 *
 * Used inline inside headings to draw the eye to the most important
 * word. Each variant maps to a CSS class in globals.css.
 */
export function Highlight({
  children,
  variant = "coral",
  className,
}: {
  children: React.ReactNode;
  variant?: "coral" | "blue" | "yellow";
  className?: string;
}) {
  return (
    <span className={cn("highlight", `highlight-${variant}`, className)}>{children}</span>
  );
}
