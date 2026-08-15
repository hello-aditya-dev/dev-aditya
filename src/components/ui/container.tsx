import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Container — page max-width + horizontal padding.
 * Most sections should wrap their content in this.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[80rem] px-[clamp(1.25rem,5vw,3rem)]", className)}>
      {children}
    </Tag>
  );
}
