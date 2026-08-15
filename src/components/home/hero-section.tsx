"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Monogram } from "@/components/ui/monogram";
import { ProjectFrame } from "@/components/ui/project-frame";
import { FLAGSHIP_PROJECTS } from "@/config/projects";
import { projectAccent } from "@/config/project-accents";
import { CONTACT_LOCATION, CONTACT_WORKING_MODEL } from "@/config/contact";

/**
 * HeroSection — Paperfolio-inspired split hero.
 *
 * Left: positioning line, big headline with highlight blocks, supporting
 * paragraph, primary + secondary CTAs, location meta.
 *
 * Right: original black-outlined editorial collage made of overlapping
 * project frames and a monogram — never an avatar, never a fake
 * screenshot.
 */
export function HeroSection() {
  const reduce = useReducedMotion();
  const featured = FLAGSHIP_PROJECTS.slice(0, 3);

  const ease = [0.22, 1, 0.36, 1] as const;

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
              Designer & Developer for Business Websites, Ecommerce and Digital Products
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="mt-5 text-[clamp(2.25rem,6.2vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink"
            >
              I design and build websites that make{" "}
              <Highlight variant="coral">complicated businesses</Highlight> easier to{" "}
              <Highlight variant="blue">trust</Highlight> — and easier to choose.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              Corporate websites, ecommerce platforms and digital products shaped around
              the result your business needs, then engineered to work properly after
              launch.
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-4 text-sm font-semibold tracking-tight text-ink"
            >
              Designer's eye. Developer's hands. Business outcomes in the middle.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/work" variant="primary" size="lg">
                See what changed
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Bring me the messy version
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
                Based in {CONTACT_LOCATION}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
                {CONTACT_WORKING_MODEL}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
                Available for selected projects
              </span>
            </motion.div>
          </div>

          {/* RIGHT — editorial collage */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            aria-hidden="false"
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

              {/* Dominant project frame — top right */}
              <div className="absolute right-3 top-10 w-[68%] sm:right-6">
                <ProjectFrame
                  slug={featured[0].slug}
                  name={featured[0].name}
                  industry={featured[0].industry}
                  accent={projectAccent(featured[0].slug)}
                  size="lg"
                  className="shadow-hard"
                />
              </div>

              {/* Smaller overlapping frame — bottom left */}
              <div className="absolute bottom-0 left-0 w-[52%] sm:left-2">
                <ProjectFrame
                  slug={featured[1].slug}
                  name={featured[1].name}
                  industry={featured[1].industry}
                  accent={projectAccent(featured[1].slug)}
                  size="md"
                  className="shadow-hard"
                />
              </div>

              {/* Compact monogram cap — top left */}
              <div className="absolute left-2 top-0 sm:left-6">
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-1.5 border-ink bg-white p-2 shadow-hard-sm sm:h-24 sm:w-24">
                  <Monogram size={36} />
                  <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink-muted">
                    Designer
                  </span>
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink-muted">
                    & Developer
                  </span>
                </div>
              </div>

              {/* Small capability labels */}
              <div className="absolute -right-1 bottom-8 hidden rotate-3 sm:block">
                <div className="rounded-full border-1.5 border-ink bg-white px-3 py-1.5 text-xs font-bold tracking-tight shadow-hard-sm">
                  Strategy → Ship
                </div>
              </div>
              <div className="absolute -left-3 top-1/3 hidden -rotate-2 sm:block">
                <div className="rounded-full border-1.5 border-ink bg-violet px-3 py-1.5 text-xs font-bold tracking-tight text-white shadow-hard-sm">
                  Real shipped work
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
