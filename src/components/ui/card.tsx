import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — outlined rounded surface with optional hard offset shadow.
 *
 * The Paperfolio-inspired editorial surface: white background, 1.5px black
 * outline, 16px radius, optional 4px hard offset shadow.
 */
export function Card({
  children,
  className,
  shadow = false,
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  as?: React.ElementType;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "rounded-2xl border-1.5 border-ink bg-white",
        shadow && "shadow-hard",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
