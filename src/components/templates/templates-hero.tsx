"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { BrowserFrame } from "@/components/templates/browser-frame";
import {
  TEMPLATES,
  TEMPLATE_COUNT,
  MARKETPLACE_PROFILE_URL,
} from "@/config/templates";

/**
 * TemplatesHero — paperfolio split hero for /templates.
 *
 * Left: eyebrow, oversized headline with a coral highlight block,
 * supporting copy, primary CTA (scrolls to the collection) and an
 * optional marketplace CTA (rendered only once a real profile URL is
 * configured — never faked).
 *
 * Right: the same editorial-collage language as the homepage hero —
 * yellow + coral backing panels, a dominant browser frame (the featured
 * template's real screenshot), a smaller overlapping frame and two
 * playful pill labels.
 */
export function TemplatesHero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const featured = TEMPLATES[0]; // Multiply — featured template
  const secondary = TEMPLATES[1]; // Meridian — secondary collage frame

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* LEFT */}
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="micro-label text-ink-muted"
            >
              Digital Products / Framer Templates
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="mt-5 text-[clamp(2.25rem,6.2vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink"
            >
              Premium websites.{" "}
              <Highlight variant="coral">Ready to launch.</Highlight>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              Production-ready website systems for AI companies, SaaS teams,
              agencies and ambitious businesses.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#collection" variant="primary" size="lg">
                Explore templates
                <span aria-hidden="true">&darr;</span>
              </Button>
              {MARKETPLACE_PROFILE_URL ? (
                <Button href={MARKETPLACE_PROFILE_URL} variant="secondary" size="lg">
                  Marketplace
                  <span aria-hidden="true">&nearr;</span>
                </Button>
              ) : null}
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="mt-8 text-sm font-semibold tracking-tight text-ink"
            >
              Finished websites — sold as templates you can make yours.
            </motion.p>
          </div>

          {/* RIGHT — editorial collage (real previews) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square">
              {/* Yellow backing panel */}
              <div
                className="absolute right-0 top-6 h-[78%] w-[72%] rounded-2xl border-1.5 border-ink bg-yellow"
                aria-hidden="true"
              />
              {/* Coral backing panel */}
              <div
                className="absolute -left-2 bottom-4 h-[40%] w-[40%] rounded-2xl border-1.5 border-ink bg-coral sm:left-0"
                aria-hidden="true"
              />

              {/* Dominant browser frame — featured template (Multiply) */}
              <div className="absolute right-3 top-10 w-[68%] sm:right-6">
                <BrowserFrame
                  src={featured.screenshot.desktop}
                  alt={`${featured.name} template — live preview screenshot`}
                  host={featured.previewHost}
                  priority
                  className="shadow-hard"
                  imageClassName="transition-transform duration-500 ease-out"
                />
              </div>

              {/* Smaller overlapping frame — Meridian */}
              <div className="absolute bottom-0 left-0 w-[52%] sm:left-2">
                <BrowserFrame
                  src={secondary.screenshot.desktop}
                  alt={`${secondary.name} template — live preview screenshot`}
                  className="shadow-hard"
                />
              </div>

              {/* Small capability labels */}
              <div className="absolute -right-1 bottom-8 hidden rotate-3 sm:block">
                <div className="rounded-full border-1.5 border-ink bg-white px-3 py-1.5 text-xs font-bold tracking-tight shadow-hard-sm">
                  Preview → Buy → Launch
                </div>
              </div>
              <div className="absolute -left-3 top-1/3 hidden -rotate-2 sm:block">
                <div className="rounded-full border-1.5 border-ink bg-violet px-3 py-1.5 text-xs font-bold tracking-tight text-white shadow-hard-sm">
                  Real live previews
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collection metadata line — restrained, uppercase */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-ink/15 pt-6 sm:mt-14"
        >
          <span className="inline-flex items-center gap-2 micro-label text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
            {TEMPLATE_COUNT} Templates
          </span>
          <span className="inline-flex items-center gap-2 micro-label text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            Framer
          </span>
          <span className="inline-flex items-center gap-2 micro-label text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
            Responsive
          </span>
          <span className="inline-flex items-center gap-2 micro-label text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
            CMS-Ready
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
