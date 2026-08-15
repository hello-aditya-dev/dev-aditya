'use client';

import { motion } from 'framer-motion';

export function WhySection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: '#FAF9F6' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: heading + body */}
          <motion.div
            initial={{ opacity: 1, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="mb-3 block text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#5E5E5F' }}
            >
              CONTEXT
            </span>
            <h2
              className="mb-5 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: '#0B0B0B' }}
            >
              Why these tools exist
            </h2>
            <p
              className="text-base leading-relaxed md:text-lg"
              style={{ color: '#5E5E5F' }}
            >
              Website work is not only design and development. A profitable project
              also depends on scoping, pricing, approvals, client inputs, QA and
              handover. These products turn those hidden parts of the work into
              repeatable systems.
            </p>
          </motion.div>

          {/* Right: context card */}
          <motion.div
            initial={{ opacity: 1, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            {/* Shadow */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                transform: 'translate(6px, 6px)',
                background: 'rgba(11,11,11,0.06)',
              }}
            />

            <div
              className="relative rounded-xl border-2 p-6 md:p-8"
              style={{ background: '#FAF9F6', borderColor: '#0B0B0B' }}
            >
              <span
                className="mb-3 block text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: '#5E5E5F' }}
              >
                ABOUT THE CREATOR
              </span>
              <p
                className="mb-4 text-sm leading-relaxed"
                style={{ color: '#0B0B0B' }}
              >
                Aditya is a designer and developer who builds websites and digital
                systems for clients. These products come from real problems
                encountered in paid client work — not theoretical scenarios.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#5E5E5F' }}>
                The focus is operational: scoping accurately, pricing defensibly,
                onboarding smoothly, delivering consistently and understanding
                profitability. The things that happen around the design and code.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
