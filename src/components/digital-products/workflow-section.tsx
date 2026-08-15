'use client';

import { motion } from 'framer-motion';
import { digitalProducts, accentColors } from '@/config/digital-products';

const WORKFLOW_STAGES = [
  { id: 'lead', label: 'LEAD', products: [] as string[] },
  { id: 'scope', label: 'SCOPE', products: [] as string[] },
  { id: 'price', label: 'PRICE', products: [] as string[] },
  { id: 'onboard', label: 'ONBOARD', products: [] as string[] },
  { id: 'build', label: 'BUILD', products: [] as string[] },
  { id: 'qa', label: 'QA', products: [] as string[] },
  { id: 'launch', label: 'LAUNCH', products: [] as string[] },
  { id: 'review', label: 'REVIEW', products: [] as string[] },
];

// Map products to workflow stages
const STAGE_MAP: Record<string, string[]> = {
  'web-project-pricing-os': ['price'],
  'web-project-scope-proposal-os': ['scope'],
  'web-agency-client-onboarding-os': ['onboard'],
  'website-qa-launch-os': ['qa', 'launch'],
  'agency-profit-capacity-os': ['review'],
};

function buildStages() {
  const stages = WORKFLOW_STAGES.map((s) => ({ ...s, products: [] as string[] }));
  const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));

  digitalProducts.forEach((p) => {
    const mappedStages = STAGE_MAP[p.id];
    if (mappedStages) {
      mappedStages.forEach((stageId) => {
        if (stageMap[stageId]) {
          stageMap[stageId].products.push(p.name);
        }
      });
    }
  });

  return stages;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export function WorkflowSection() {
  const stages = buildStages();

  return (
    <section
      id="workflow"
      className="py-16 md:py-24"
      style={{ background: '#FAF9F6' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span
            className="mb-3 block text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#5E5E5F' }}
          >
            WORKFLOW
          </span>
          <h2
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={{ color: '#0B0B0B' }}
          >
            How the tools fit your workflow
          </h2>
        </motion.div>

        {/* Stages row — horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0 lg:grid-cols-8"
        >
          {stages.map((stage, i) => {
            const hasProducts = stage.products.length > 0;
            const accentKey = hasProducts
              ? (digitalProducts.find((p) => STAGE_MAP[p.id]?.includes(stage.id))?.accent ?? 'coral')
              : null;

            return (
              <motion.div
                key={stage.id}
                variants={item}
                className="relative min-w-[140px] flex-shrink-0 md:min-w-0"
              >
                {/* Shadow */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    transform: 'translate(4px, 4px)',
                    background: 'rgba(11,11,11,0.06)',
                  }}
                />

                {/* Card */}
                <div
                  className="relative rounded-xl border-2 p-4"
                  style={{
                    background: '#FAF9F6',
                    borderColor: hasProducts ? '#0B0B0B' : '#D4D3D0',
                  }}
                >
                  {/* Stage number */}
                  <span
                    className="mb-2 inline-flex size-6 items-center justify-center rounded-md text-[10px] font-bold"
                    style={{
                      background: hasProducts && accentKey
                        ? accentColors[accentKey].bg
                        : '#F0EFEC',
                      color: hasProducts && accentKey
                        ? '#FAF9F6'
                        : '#5E5E5F',
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Stage label */}
                  <h4
                    className="mb-2 text-sm font-bold tracking-wide"
                    style={{ color: hasProducts ? '#0B0B0B' : '#5E5E5F' }}
                  >
                    {stage.label}
                  </h4>

                  {/* Mapped products */}
                  {stage.products.length > 0 ? (
                    <ul className="space-y-1">
                      {stage.products.map((name) => (
                        <li
                          key={name}
                          className="text-xs leading-snug"
                          style={{ color: '#0B0B0B' }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span
                      className="text-[11px] italic"
                      style={{ color: '#A0A09F' }}
                    >
                      No tool yet
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Arrow connector hint (desktop) */}
        <div className="mt-4 hidden items-center gap-2 md:flex" style={{ color: '#5E5E5F' }}>
          <span className="text-[11px] font-semibold tracking-widest uppercase">
            Flow
          </span>
          <span className="text-xs">→ → → → → → →</span>
        </div>
      </div>
    </section>
  );
}
