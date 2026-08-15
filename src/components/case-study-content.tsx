import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectFrame } from "@/components/ui/project-frame";
import { Reveal } from "@/components/ui/reveal";
import { PROJECTS, FLAGSHIP_PROJECTS, type Project } from "@/config/projects";
import { projectAccent, ACCENT_HEX } from "@/config/project-accents";
import { CONTACT_EMAIL_HREF } from "@/config/contact";

/**
 * CaseStudyContent — short, customer-facing case study layout.
 *
 * Structure (~60–90 seconds to read):
 *   - Back link
 *   - Hero: name, category, outcome-oriented title, large hero visual
 *   - THE PROBLEM (1 short paragraph)
 *   - WHAT I CHANGED (3–5 short bullet points)
 *   - THE RESULT (1 short paragraph)
 *   - VIEW LIVE WEBSITE ↗
 *   - HAVE A SIMILAR PROJECT? LET'S TALK →
 *
 * Removed from the previous long layout: metadata rail, disclosure box,
 * strategic decisions grid, proof-point grid, honest moment, timeline,
 * engineering notes, prev/next navigation, GitHub CTA.
 *
 * The detailed case-study content is preserved in the project data
 * (src/config/projects.ts) but is no longer rendered to visitors.
 */
export function CaseStudyContent({ slug }: { slug: string }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const accent = projectAccent(project.slug);
  const cs = project.caseStudy;
  const category = project.industry.split("·")[0].trim();

  return (
    <>
      {/* HERO */}
      <Section className="pt-12 sm:pt-16">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
          >
            <span aria-hidden="true">&larr;</span> Back to work
          </Link>

          <div className="mt-8 max-w-3xl">
            <Reveal>
              <p className="micro-label text-ink-muted">{category}</p>
              <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
                {project.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted sm:text-xl">
                {project.outcomeHeadline}
              </p>
            </Reveal>
          </div>

          {/* Large hero visual */}
          <Reveal delay={0.1}>
            <div className="mt-10 relative">
              <div
                className="absolute -inset-3 -z-10 rounded-3xl opacity-20"
                style={{ background: ACCENT_HEX[accent] }}
                aria-hidden="true"
              />
              <ProjectFrame
                slug={project.slug}
                name={project.name}
                industry={project.industry}
                accent={accent}
                size="xl"
                className="shadow-hard"
              />
            </div>
          </Reveal>

          {/* Optional small info line — Role · Type */}
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm text-ink-muted">
              {project.role}
              <span className="mx-2" aria-hidden="true">·</span>
              {project.projectType}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* THE PROBLEM */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-12">
            <div>
              <SectionLabel accent="coral">The problem</SectionLabel>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink">{cs.shortProblem}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHAT I CHANGED */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-12">
            <div>
              <SectionLabel accent="blue">What I changed</SectionLabel>
            </div>
            <ul className="space-y-3">
              {cs.changes.map((change) => (
                <li
                  key={change}
                  className="flex items-start gap-3 text-base leading-relaxed sm:text-lg"
                >
                  <span
                    className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    &check;
                  </span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* THE RESULT */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-12">
            <div>
              <SectionLabel accent="coral">The result</SectionLabel>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink">{cs.shortResult}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* VIEW LIVE WEBSITE */}
      {project.liveUrl && (
        <Section className="border-t-1.5 border-ink bg-ink text-white">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="micro-label text-ink-soft">See it for yourself</p>
              <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight">
                View the live website.
              </h2>
              <div className="mt-6 flex justify-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-7 py-3.5 text-base font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                >
                  View live website
                  <span aria-hidden="true">&nearr;</span>
                </a>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* HAVE A SIMILAR PROJECT? LET'S TALK */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel accent="yellow" className="justify-center">
              Have a similar project?
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight">
              Let&rsquo;s talk.
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <a
                href={CONTACT_EMAIL_HREF}
                className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-6 py-3.5 text-base font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
              >
                work@dev-aditya.com
                <span aria-hidden="true">&nearr;</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink transition-colors hover:text-coral"
              >
                Start a project
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * Breadcrumb JSON-LD for a case study.
 */
export function caseStudyBreadcrumb(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-aditya.com"}/work` },
      { "@type": "ListItem", position: 2, name: project.name, item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-aditya.com"}${project.caseStudyUrl}` },
    ],
  };
}

export type { Project };
