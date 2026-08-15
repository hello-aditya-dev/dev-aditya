'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WORKFLOW_STEPS = ['SCOPE', 'PRICE', 'ONBOARD', 'QA', 'LAUNCH'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function StoreHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden" style={{ background: '#FAF9F6' }}>
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* ── Left: Copy ── */}
          <div className="flex flex-col justify-center">
            <motion.span
              variants={item}
              className="mb-4 block text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#5E5E5F' }}
            >
              A.DIGITAL PRODUCTS
            </motion.span>

            <motion.h1
              variants={item}
              className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
              style={{ color: '#0B0B0B' }}
            >
              Tools and templates for people who build websites for clients.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-lg text-base leading-relaxed md:text-lg"
              style={{ color: '#5E5E5F' }}
            >
              Pricing systems, delivery tools and production-ready templates for
              freelancers and small web agencies. Built to make client work clearer
              from scope to launch.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => scrollTo('tools')}
                size="lg"
                className="gap-2 rounded-xl border-2 px-6 font-semibold"
                style={{
                  background: '#0B0B0B',
                  color: '#FAF9F6',
                  borderColor: '#0B0B0B',
                }}
              >
                Browse agency tools
                <ArrowDown className="size-4" />
              </Button>
              <Button
                onClick={() => scrollTo('bundles')}
                variant="outline"
                size="lg"
                className="gap-2 rounded-xl border-2 px-6 font-semibold"
                style={{
                  borderColor: '#0B0B0B',
                  color: '#0B0B0B',
                  background: '#FAF9F6',
                }}
              >
                See bundles
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </div>

          {/* ── Right: Visual stack ── */}
          <motion.div variants={item} className="relative flex items-center justify-center">
            {/* Layered workflow cards */}
            <div className="relative w-full max-w-md">
              {WORKFLOW_STEPS.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
                  className="absolute w-full rounded-xl border-2 p-4"
                  style={{
                    background: '#FAF9F6',
                    borderColor: '#0B0B0B',
                    top: i * 18,
                    left: i * 8,
                    zIndex: WORKFLOW_STEPS.length - i,
                    transform: `translate(${i * 4}px, ${i * 4}px)`,
                    boxShadow: `${4 + i * 2}px ${4 + i * 2}px 0px 0px rgba(11,11,11,0.12)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex size-8 items-center justify-center rounded-lg text-xs font-bold"
                      style={{
                        background: i === 0 ? '#FF4A60' : '#F0EFEC',
                        color: i === 0 ? '#FAF9F6' : '#0B0B0B',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <span
                        className="block text-[11px] font-semibold tracking-widest uppercase"
                        style={{ color: '#5E5E5F' }}
                      >
                        STEP {i + 1}
                      </span>
                      <span
                        className="block text-sm font-bold"
                        style={{ color: '#0B0B0B' }}
                      >
                        {step}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Spacer for height */}
              <div
                style={{ height: WORKFLOW_STEPS.length * 18 + 80 }}
              />

              {/* Project health strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="mt-4 rounded-xl border-2 p-3"
                style={{
                  background: '#FAF9F6',
                  borderColor: '#0B0B0B',
                  boxShadow: '3px 3px 0px 0px rgba(11,11,11,0.12)',
                }}
              >
                <span
                  className="mb-2 block text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: '#5E5E5F' }}
                >
                  PROJECT HEALTH
                </span>
                <div className="flex flex-wrap gap-2">
                  {['On Scope', 'Margin ✓', 'On Track', 'QA Pass'].map((label) => (
                    <span
                      key={label}
                      className="rounded-md border px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        borderColor: '#0B0B0B',
                        color: '#0B0B0B',
                        background: '#FAF9F6',
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
