import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section — vertical rhythm wrapper for a page section.
 * Adds top/bottom padding and an optional id for anchor links.
 */
export function Section({
  children,
  className,
  id,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-[clamp(3.5rem,8vw,7rem)] scroll-mt-24",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
