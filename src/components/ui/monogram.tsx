import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Monogram — circular "A" mark used in the navigation and hero.
 *
 * Original illustration, not a logo. The "A" is set in Onest with a
 * heavy weight, surrounded by a 1.5px black outline on a white surface.
 */
export function Monogram({
  className,
  size = 40,
  withShadow = false,
}: {
  className?: string;
  size?: number;
  withShadow?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full border-1.5 border-ink bg-white font-bold leading-none text-ink",
        withShadow && "shadow-hard-sm",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      A
    </span>
  );
}
