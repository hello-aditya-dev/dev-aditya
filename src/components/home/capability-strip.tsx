import * as React from "react";
import { Marquee } from "@/components/ui/marquee";
import { CAPABILITY_STRIP_PHRASES } from "@/config/capabilities";

/**
 * CapabilityStrip — replaces the Paperfolio logo strip.
 *
 * Source has no client logos to invent, so we move real capability phrases
 * instead. The animation pauses under prefers-reduced-motion.
 */
export function CapabilityStrip() {
  return (
    <section
      className="border-y-1.5 border-ink bg-ink py-4"
      aria-label="Capabilities"
    >
      <Marquee duration={36}>
        {CAPABILITY_STRIP_PHRASES.map((phrase) => (
          <span
            key={phrase}
            className="flex items-center gap-3 px-6 text-sm font-semibold tracking-tight text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
            {phrase}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
