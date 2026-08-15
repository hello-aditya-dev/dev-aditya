import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "coral" | "blue" | "yellow" | "violet" | "outline";

const variants: Record<Variant, string> = {
  default: "bg-ink text-white border-1.5 border-ink",
  coral: "bg-coral text-white border-1.5 border-ink",
  blue: "bg-blue text-white border-1.5 border-ink",
  yellow: "bg-yellow text-ink border-1.5 border-ink",
  violet: "bg-violet text-white border-1.5 border-ink",
  outline: "bg-transparent text-ink border-1.5 border-ink",
};

/**
 * Badge — small pill for status, tags, project metadata.
 */
export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-tight",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
