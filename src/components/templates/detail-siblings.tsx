import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { TEMPLATES } from "@/config/templates";

/**
 * DetailSiblings — "More templates." strip on a detail page.
 *
 * The other five products as compact editorial mini-cards linking to
 * their detail pages — the same hairline-grid rhythm as the businesses
 * section, keeping visitors inside the collection.
 */
export function DetailSiblings({ currentSlug }: { currentSlug: string }) {
  const siblings = TEMPLATES.filter((t) => t.slug !== currentSlug);

  return (
    <Section className="border-t-1.5 border-ink bg-paper">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel accent="blue">Keep exploring</SectionLabel>
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight">
                More templates.
              </h2>
            </div>
            <Link
              href="/templates"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
            >
              Back to collection
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {siblings.map((t, i) => (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border-1.5 border-ink bg-white shadow-hard-sm transition-all duration-300 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b-1.5 border-ink bg-paper">
                  <Image
                    src={t.screenshot.desktop}
                    alt={`${t.name} — ${t.category} template preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    loading="lazy"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="flex items-baseline gap-2">
                    <span
                      className="font-mono text-[0.65rem] font-bold tracking-widest text-ink-muted"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="micro-label text-ink-muted">
                      {t.category}
                    </span>
                  </p>
                  <p className="mt-1.5 text-base font-extrabold leading-tight tracking-tight text-ink">
                    {t.name}
                  </p>
                  <p className="mt-auto pt-3 text-sm font-bold tracking-tight text-ink">
                    {t.price}
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block text-coral transition-transform duration-200 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
