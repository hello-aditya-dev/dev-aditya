import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { RESOURCES, estimateReadingTime } from "@/config/resources";

export const metadata: Metadata = {
  title: "Resources — guides, checklists and starter notes",
  description:
    "Practical resources for building better websites, portfolios and frontend projects. Each one with an honest reading-time estimate.",
  alternates: { canonical: "/resources" },
};

export default function Page() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Resources</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Guides, checklists and notes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Practical resources I've put together for building better websites,
            portfolios and frontend projects. Reading-time estimates are
            computed from actual content length, not fabricated.
          </p>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((resource) => {
              const readingTime = estimateReadingTime(resource);
              return (
                <StaggerItem key={resource.slug}>
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="group block h-full"
                  >
                    <Card className="flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard-sm">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-ink/30 px-2.5 py-1 text-xs font-bold tracking-tight">
                          {resource.category}
                        </span>
                        <span className="micro-label text-ink-muted">
                          {readingTime} min read
                        </span>
                      </div>
                      <h2 className="mt-5 text-lg font-bold leading-tight tracking-tight">
                        {resource.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                        {resource.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink transition-colors group-hover:text-coral">
                        Read
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </Section>
    </>
  );
}
