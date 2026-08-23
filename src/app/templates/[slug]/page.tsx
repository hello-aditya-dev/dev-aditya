import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { BrowserFrame } from "@/components/templates/browser-frame";
import { DetailLivePreview } from "@/components/templates/detail-live-preview";
import { DetailSiblings } from "@/components/templates/detail-siblings";
import { TemplateProductJsonLd } from "@/components/templates/structured-data";
import { TEMPLATES } from "@/config/templates";
import { SITE_URL } from "@/config/site";

/**
 * /templates/[slug] — individual template detail page.
 *
 * Presents one product as a focused editorial entry: breadcrumb, hero
 * (number/category/name/description/price/CTAs), the real screenshots
 * as an editorial composition, an on-page live preview, an honest
 * "what's inside" breakdown, and the sibling templates strip. Purchases
 * still happen on the external marketplace — this page exists to
 * let a product be inspected and linked to directly.
 */

/** Honest, structural features shared by every template in the collection. */
const WHATS_INSIDE = [
  {
    title: "Complete page system",
    body: "Homepage, inner pages and supporting sections — structured as one coherent website, not loose blocks.",
  },
  {
    title: "Responsive across devices",
    body: "Designed at desktop, tablet and mobile widths; the layouts adapt instead of shrinking.",
  },
  {
    title: "CMS-ready content",
    body: "Repeating content (posts, studies, listings) is wired to the CMS so edits stay simple after launch.",
  },
  {
    title: "Conversion-structured layouts",
    body: "Sections are ordered around a visitor's decision path: understand, believe, act.",
  },
  {
    title: "Editable design system",
    body: "Type scale, colors and components are centralized — rebrand once, it propagates.",
  },
  {
    title: "Launch-ready engineering",
    body: "Clean structure, working interactions and performance-minded builds out of the box.",
  },
];

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug);
  if (!template) {
    return { title: { absolute: "Template not found | Aditya" } };
  }

  const title = `${template.name} — ${template.category} Framer Template | Aditya`;
  const canonical = `${SITE_URL}/templates/${template.slug}`;

  return {
    title: { absolute: title },
    description: template.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: template.description,
      url: canonical,
      siteName: "Aditya",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${template.screenshot.desktop}`,
          width: 1200,
          height: 750,
          alt: `${template.name} — ${template.category} website template preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: template.description,
      images: [`${SITE_URL}${template.screenshot.desktop}`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = TEMPLATES.findIndex((t) => t.slug === slug);
  if (index === -1) notFound();
  const template = TEMPLATES[index];
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      <TemplateProductJsonLd template={template} />

      {/* Breadcrumb + hero */}
      <Section className="pb-0 pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-3">
              <Link
                href="/templates"
                className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-ink-muted transition-colors hover:text-coral"
              >
                <span aria-hidden="true">&larr;</span> Templates
              </Link>
              <span
                className="h-px w-6 bg-ink/25"
                aria-hidden="true"
              />
              <span className="micro-label text-ink-muted" aria-current="page">
                {template.name}
              </span>
            </nav>

            <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              {/* Text column */}
              <div>
                <p className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-sm font-bold tracking-widest text-ink-muted"
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <span className="micro-label text-ink-muted">
                    {template.category} · Template
                  </span>
                </p>

                <h1 className="mt-4 text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
                  {template.name}
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {template.description}
                </p>

                <p className="mt-4 text-sm font-semibold tracking-tight text-ink">
                  Preview it live below — this is the finished website, not a
                  mockup.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <p className="text-3xl font-extrabold tracking-tight text-ink">
                    {template.price}
                    <span className="sr-only"> — one-time purchase price in USD</span>
                  </p>
                  <a
                    href={template.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-coral px-6 py-3.5 text-base font-bold tracking-tight text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                  >
                    Open live site
                    <span aria-hidden="true">&nearr;</span>
                  </a>
                  {template.marketplaceUrl ? (
                    <a
                      href={template.marketplaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border-1.5 border-ink bg-white px-6 py-3.5 text-base font-bold tracking-tight text-ink shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm"
                    >
                      Get template
                      <span aria-hidden="true">&nearr;</span>
                    </a>
                  ) : null}
                </div>

                <p className="mt-6 text-xs font-medium tracking-tight text-ink-soft">
                  Framer <span aria-hidden="true">·</span> Responsive{" "}
                  <span aria-hidden="true">·</span> CMS-ready
                </p>
              </div>

              {/* Editorial composition — real screenshots */}
              <div className="relative mx-auto w-full max-w-md pb-2 lg:max-w-none">
                <div
                  className="absolute -right-3 top-5 hidden h-[74%] w-[70%] rounded-2xl border-1.5 border-ink bg-yellow sm:block"
                  aria-hidden="true"
                />
                <div className="relative">
                  <BrowserFrame
                    src={template.screenshot.desktop}
                    alt={`${template.name} — ${template.category} website template, desktop preview`}
                    host={template.previewHost}
                    priority
                    className="shadow-hard"
                  />
                </div>
                {/* Mobile capture — slight pull-up on mobile, editorial
                    overlap from sm up. */}
                <div className="relative z-10 -mt-8 ml-auto w-[32%] min-w-[104px] max-w-[150px] sm:-mt-16 sm:w-[34%]">
                  <div className="rotate-2 overflow-hidden rounded-2xl border-1.5 border-ink bg-white p-1.5 shadow-hard-sm">
                    <div className="relative aspect-[9/19] w-full overflow-hidden rounded-xl">
                      <Image
                        src={template.screenshot.mobile}
                        alt={`${template.name} mobile layout preview`}
                        fill
                        sizes="150px"
                        priority
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* On-page live preview */}
      <Section className="pt-10 sm:pt-14">
        <Container>
          <Reveal>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="micro-label text-ink-muted">Interactive</p>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight">
                  Try it here, live.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted sm:text-right">
                Loaded on demand — the real template running in the frame
                below. Nothing installs, nothing commits you.
              </p>
            </div>
            <DetailLivePreview template={template} />
          </Reveal>
        </Container>
      </Section>

      {/* What's inside */}
      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <Reveal>
            <p className="micro-label text-ink-muted">What&rsquo;s inside</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight">
              A finished website, not a starter kit.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHATS_INSIDE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="border-t-1.5 border-ink pt-5">
                  <p
                    className="font-mono text-sm font-bold tracking-widest text-ink-muted"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Siblings */}
      <DetailSiblings currentSlug={template.slug} />
    </>
  );
}
