import * as React from "react";
import { Marquee } from "@/components/ui/marquee";
import { TEMPLATES } from "@/config/templates";

/**
 * TemplatesMarquee — a restrained editorial divider under the collection.
 *
 * The six template names scroll as a quiet strip between the products
 * and the value sections — the same CSS-only marquee treatment used
 * elsewhere on the site. Purely decorative: the Marquee primitive is
 * role="presentation" and the duplicated track is aria-hidden.
 */
export function TemplatesMarquee() {
  const items = [
    ...TEMPLATES.map((t) => t.name),
    "06 Templates",
    "Framer",
    "Responsive",
    "CMS-Ready",
  ];

  return (
    <div
      className="border-t-1.5 border-ink bg-ink py-3.5"
      aria-hidden="true"
    >
      <Marquee duration={42}>
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-6 pr-6 micro-label whitespace-nowrap text-white/90"
          >
            {name}
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
