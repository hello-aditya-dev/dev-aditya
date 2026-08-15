import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral text-white border-1.5 border-ink shadow-hard hover:shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none",
  secondary:
    "bg-white text-ink border-1.5 border-ink shadow-hard-sm hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none",
  ghost:
    "bg-transparent text-ink border-1.5 border-transparent hover:border-ink hover:bg-white",
  white:
    "bg-white text-ink border-1.5 border-ink shadow-hard hover:shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3.5 py-2 rounded-lg",
  md: "text-sm px-5 py-2.5 rounded-lg",
  lg: "text-base px-7 py-3.5 rounded-xl",
};

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  href: string;
  external?: boolean;
}

/**
 * Button — link-styled button used everywhere.
 * Always renders an <a> (no JS-only buttons in this site).
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isExternal = external ?? (href.startsWith("http") || href.startsWith("mailto:"));
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
