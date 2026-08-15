import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ArrowLink — text link with a small arrow that moves on hover.
 *
 * Used inline in card footers and inline CTAs.
 */
export function ArrowLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const isExternal = external ?? (href.startsWith("http") || href.startsWith("mailto:"));
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors hover:text-coral",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
