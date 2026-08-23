"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

/**
 * TemplatesFaqSection — "Before you buy."
 *
 * Answers the six questions a serious buyer actually asks, in the site's
 * restrained editorial voice. Built as a custom accordion in the
 * paperfolio language (hairline rows, mono numbers, plus/minus
 * indicator) rather than a generic shadcn pattern — and fully
 * keyboard-accessible via native button semantics.
 */

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What exactly do I get when I purchase a template?",
    a: "A complete, production-ready website system — every page, section and component you see in the live preview, structured so you can swap in your own copy, imagery and branding without rebuilding anything from zero.",
  },
  {
    q: "Do I need design or development skills to customize one?",
    a: "No. Each template is built visually editable in Framer. Text, images, colors and content live on the canvas — if you can use a design tool, you can make the template yours. Developers can go further with code overrides where needed.",
  },
  {
    q: "What does “CMS-ready” actually mean?",
    a: "Blog posts, case studies, listings and other repeating content are wired to Framer's CMS. Your team edits content in a clean admin panel — the layouts update everywhere automatically. No hand-coded pages for every new entry.",
  },
  {
    q: "Can I use a template for client work?",
    a: "Yes — templates are built for exactly that. Buy once, adapt it to a client's brand and deploy. Each purchase is licensed per end-product, so a second client website needs a second license. Simple and honest.",
  },
  {
    q: "Can I try the template on my phone first?",
    a: "Yes. Every template has a live preview — the real website, not a mockup. Open it on desktop, tablet and mobile to judge the responsive behaviour yourself before spending anything.",
  },
  {
    q: "What if I need changes beyond what the template covers?",
    a: "That's the custom route. Templates are a strong starting point, but if you need a website shaped specifically around your business, work directly with me — start the conversation from the contact page.",
  },
];

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");
  const panelId = `templates-faq-panel-${index}`;

  return (
    <div className="border-b-1.5 border-ink/15 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-baseline gap-4 py-5 text-left transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2 sm:gap-5"
        >
          <span
            className="shrink-0 font-mono text-sm font-bold tracking-widest text-ink-muted transition-colors group-hover:text-coral"
            aria-hidden="true"
          >
            {num}
          </span>
          <span className="flex-1 text-base font-bold tracking-tight text-ink sm:text-lg">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center self-center rounded-full border-1.5 border-ink bg-white text-ink transition-colors group-hover:border-coral group-hover:text-coral"
          >
            <span className="absolute h-px w-2.5 bg-current" />
            <span
              className={`absolute h-2.5 w-px bg-current transition-transform duration-300 ease-out ${
                open ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={item.q}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-[2.4rem] pr-8 text-sm leading-relaxed text-ink-muted sm:pl-[2.9rem] sm:text-base">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TemplatesFaqSection() {
  return (
    <Section className="border-t-1.5 border-ink bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionLabel accent="coral">Buyer questions</SectionLabel>
              <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
                Before you buy.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
                Straight answers on what&rsquo;s inside a template, how
                customization works and what happens when you outgrow one.
              </p>
              <p className="mt-6 text-sm font-semibold tracking-tight text-ink">
                Still unsure?{" "}
                <a
                  href="/contact"
                  className="link-underline font-bold transition-colors hover:text-coral"
                >
                  Ask me directly
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border-1.5 border-ink bg-white px-5 shadow-hard-sm sm:px-7">
              {FAQ_ITEMS.map((item, i) => (
                <FaqRow key={item.q} item={item} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
