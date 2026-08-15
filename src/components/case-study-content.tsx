import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectFrame } from "@/components/ui/project-frame";
import { Reveal } from "@/components/ui/reveal";
import { PROJECTS, FLAGSHIP_PROJECTS, STATUS_LABELS, type Project } from "@/config/projects";
import { projectAccent, ACCENT_HEX } from "@/config/project-accents";
import { CONTACT_EMAIL_HREF } from "@/config/contact";

/**
 * CaseStudyContent — full case-study layout for a single project.
 *
 * Graphic hero with metadata rail, large project frame, narrative
 * sections, numbered decisions, proof-point grid, timeline, engineering
 * notes, and a contextual final CTA. Includes previous/next navigation
 * across flagship projects.
 */
export function CaseStudyContent({ slug }: { slug: string }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const accent = projectAccent(project.slug);
  const flagshipIndex = FLAGSHIP_PROJECTS.findIndex((p) => p.slug === slug);
  const prev = flagshipIndex > 0 ? FLAGSHIP_PROJECTS[flagshipIndex - 1] : null;
  const next =
    flagshipIndex >= 0 && flagshipIndex < FLAGSHIP_PROJECTS.length - 1
      ? FLAGSHIP_PROJECTS[flagshipIndex + 1]
      : null;

  const cs = project.caseStudy;

  return (
    <>
      {/* HERO */}
      <Section className="pt-12 sm:pt-16">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
          >
            <span aria-hidden="true">←</span> Back to work
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{project.industry}</Badge>
                <Badge variant="outline">{project.projectType}</Badge>
                <Badge
                  variant={
                    project.status === "business"
                      ? "coral"
                      : project.status === "concept"
                        ? "blue"
                        : "yellow"
                  }
                >
                  {STATUS_LABELS[project.status]}
                </Badge>
              </div>
              <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
                {project.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted sm:text-xl">
                {project.outcomeHeadline}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
                {project.challenge}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button href={project.liveUrl} external variant="primary">
                    View live
                  </Button>
                )}
                {project.githubUrl && (
                  <Button href={project.githubUrl} external variant="secondary">
                    GitHub
                  </Button>
                )}
                <Button href={CONTACT_EMAIL_HREF} external variant="ghost">
                  Discuss similar work
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
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
                  size="lg"
                  className="shadow-hard"
                />
              </div>
            </Reveal>
          </div>

          {/* Metadata rail */}
          <Reveal delay={0.15}>
            <Card className="mt-10 overflow-hidden">
              <dl className="grid grid-cols-1 divide-y divide-ink/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                <MetaItem label="Role" value={project.role} />
                <MetaItem label="Scope" value={project.scope} />
                <MetaItem label="Outcome" value={project.outcome} />
                <MetaItem label="Technology" value={project.technology.join(", ")} />
              </dl>
            </Card>
          </Reveal>

          {/* Honest disclosure */}
          <Reveal delay={0.2}>
            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border-l-4 border-coral bg-white p-4"
              role="note"
              aria-label="Project disclosure"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-white" aria-hidden="true">
                !
              </span>
              <p className="text-sm leading-relaxed text-ink-muted">
                <span className="font-bold text-ink">Disclosure. </span>
                {cs.disclosure}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* PROBLEM */}
      <Section className="border-t-1.5 border-ink bg-white pt-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="coral">The problem</SectionLabel>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink">{cs.problem}</p>
              <ul className="mt-6 space-y-2">
                {cs.constraints.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* DECISIONS */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="blue">Strategic decisions</SectionLabel>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                The structural decisions that shaped the solution — explicit and
                arguable, not hidden inside a polished screen.
              </p>
            </div>
            <ol className="space-y-5">
              {cs.decisions.map((d) => (
                <li key={d.num} className="rounded-2xl border-1.5 border-ink bg-white p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-extrabold leading-none tracking-tight text-ink">
                      {d.num}
                    </span>
                    <h3 className="text-lg font-bold leading-tight tracking-tight">{d.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* BUILT */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="violet">What was built</SectionLabel>
            </div>
            <ul className="space-y-2">
              {cs.built.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base leading-relaxed">
                  <span
                    className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* OUTCOME + PROOF */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="coral">Outcome</SectionLabel>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink">{cs.outcome}</p>
              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cs.proof.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-xl border-1.5 border-ink bg-white p-4"
                  >
                    <dt className="micro-label text-ink-muted">{p.label}</dt>
                    <dd className="mt-1 text-sm font-semibold tracking-tight">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* HONEST MOMENT */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="yellow">An honest moment</SectionLabel>
            </div>
            <blockquote className="rounded-2xl border-1.5 border-ink bg-yellow/15 p-6">
              <p className="text-base leading-relaxed text-ink sm:text-lg">{cs.honestMoment}</p>
            </blockquote>
          </div>
        </Container>
      </Section>

      {/* TIMELINE */}
      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="blue">Timeline</SectionLabel>
            </div>
            <ol className="relative space-y-6 border-l-1.5 border-ink pl-6">
              {cs.timeline.map((t) => (
                <li key={t.num} className="relative">
                  <span
                    className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-1.5 border-ink bg-white font-mono text-[0.65rem] font-bold"
                    aria-hidden="true"
                  >
                    {t.num}
                  </span>
                  <h3 className="text-base font-bold leading-tight tracking-tight">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ENGINEERING NOTES */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="violet">Engineering notes</SectionLabel>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Technical material kept secondary — for the engineering reader who
                wants to look under the hood.
              </p>
            </div>
            <ul className="space-y-2">
              {cs.engineeringNotes.map((n) => (
                <li key={n} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* CONTEXTUAL CTA */}
      <Section className="border-t-1.5 border-ink bg-ink text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="micro-label text-ink-soft">{project.name} — wrap-up</p>
            <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight">
              {cs.contextualCta.question}
            </h2>
            <div className="mt-6 flex justify-center">
              <Button href="/contact" variant="white" size="lg">
                {cs.contextualCta.button}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* PREV / NEXT */}
      {(prev || next) && (
        <Section className="border-t-1.5 border-ink bg-paper">
          <Container>
            <nav
              className="grid gap-4 sm:grid-cols-2"
              aria-label="Previous and next case study"
            >
              {prev && (
                <Link
                  href={prev.caseStudyUrl}
                  className="group rounded-2xl border-1.5 border-ink bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-hard-sm"
                >
                  <span className="micro-label text-ink-muted">← Previous</span>
                  <p className="mt-2 text-base font-bold tracking-tight">{prev.name}</p>
                </Link>
              )}
              {next && (
                <Link
                  href={next.caseStudyUrl}
                  className="group rounded-2xl border-1.5 border-ink bg-white p-5 text-right transition-all hover:-translate-y-0.5 hover:shadow-hard-sm sm:col-start-2"
                >
                  <span className="micro-label text-ink-muted">Next →</span>
                  <p className="mt-2 text-base font-bold tracking-tight">{next.name}</p>
                </Link>
              )}
            </nav>
          </Container>
        </Section>
      )}
    </>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5">
      <dt className="micro-label text-ink-muted">{label}</dt>
      <dd className="mt-1.5 text-sm font-semibold leading-snug tracking-tight">{value}</dd>
    </div>
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
