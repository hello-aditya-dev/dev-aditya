import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getResource, estimateReadingTime, type ResourceSection } from "@/config/resources";

/**
 * ResourceArticleContent — shared layout for every resource article.
 * Server component; reads from the central resources config.
 */
export function ResourceArticleContent({ slug }: { slug: string }) {
  const resource = getResource(slug);
  if (!resource) return null;

  const readingTime = estimateReadingTime(resource);

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
          >
            <span aria-hidden="true">←</span> All resources
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-ink/30 px-2.5 py-1 text-xs font-bold tracking-tight">
              {resource.category}
            </span>
            <span className="micro-label text-ink-muted">{readingTime} min read</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight">
            {resource.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {resource.description}
          </p>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <article className="mx-auto max-w-2xl space-y-6">
            {resource.sections.map((section, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <SectionRenderer section={section} />
              </Reveal>
            ))}

            <div className="border-t border-ink/15 pt-6">
              <p className="text-sm text-ink-muted">
                Written by Aditya — independent web designer and frontend
                developer based in Delhi.{" "}
                <Link href="/contact" className="font-semibold text-ink hover:text-coral">
                  Get in touch
                </Link>
                .
              </p>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}

function SectionRenderer({ section }: { section: ResourceSection }) {
  switch (section.type) {
    case "heading":
      return <h2 className="text-[clamp(1.375rem,3vw,1.75rem)] font-bold leading-tight tracking-tight">{section.text}</h2>;
    case "paragraph":
      return <p className="text-base leading-relaxed text-ink">{section.text}</p>;
    case "list":
      return (
        <ul className="space-y-2.5">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
              <span
                className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-coral text-[0.6rem] font-bold text-white"
                aria-hidden="true"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="rounded-2xl border-l-4 border-coral bg-paper p-5">
          <p className="text-base leading-relaxed text-ink">{section.text}</p>
        </div>
      );
    default:
      return null;
  }
}
