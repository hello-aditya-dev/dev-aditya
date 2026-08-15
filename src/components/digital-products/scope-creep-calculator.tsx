'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ScopeCreepCalculator() {
  const [quote, setQuote] = useState(6000);
  const [plannedHours, setPlannedHours] = useState(70);
  const [extraHours, setExtraHours] = useState(15);

  const totalHours = plannedHours + extraHours;
  const originalRate = plannedHours > 0 ? quote / plannedHours : 0;
  const newRate = totalHours > 0 ? quote / totalHours : 0;
  const rateDrop = originalRate > 0 ? ((originalRate - newRate) / originalRate) * 100 : 0;
  const valueAtOriginalRate = extraHours * originalRate;

  const handleQuote = useCallback((v: string) => {
    const n = parseFloat(v);
    setQuote(isNaN(n) ? 0 : n);
  }, []);

  const handlePlanned = useCallback((v: string) => {
    const n = parseFloat(v);
    setPlannedHours(isNaN(n) ? 0 : n);
  }, []);

  const handleExtra = useCallback((v: string) => {
    const n = parseFloat(v);
    setExtraHours(isNaN(n) ? 0 : n);
  }, []);

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: '#FAF9F6' }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          {/* Section heading */}
          <span
            className="mb-3 block text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#5E5E5F' }}
          >
            ILLUSTRATIVE DEMO
          </span>
          <h2
            className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
            style={{ color: '#0B0B0B' }}
          >
            Scope creep calculator
          </h2>
          <p
            className="mb-8 text-sm"
            style={{ color: '#5E5E5F' }}
          >
            See how unplanned hours erode your effective rate. This is an illustrative
            example — the full Pricing OS models this and much more.
          </p>

          {/* Calculator card */}
          <div className="relative">
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
              {/* Inputs */}
              <div className="mb-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <Label
                    htmlFor="quote"
                    className="mb-1.5 text-[11px] font-semibold tracking-widest uppercase"
                    style={{ color: '#5E5E5F' }}
                  >
                    Project quote ($)
                  </Label>
                  <Input
                    id="quote"
                    type="number"
                    min={0}
                    value={quote}
                    onChange={(e) => handleQuote(e.target.value)}
                    className="rounded-lg border-2 text-base font-medium"
                    style={{ borderColor: '#0B0B0B', color: '#0B0B0B' }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="planned"
                    className="mb-1.5 text-[11px] font-semibold tracking-widest uppercase"
                    style={{ color: '#5E5E5F' }}
                  >
                    Planned hours
                  </Label>
                  <Input
                    id="planned"
                    type="number"
                    min={0}
                    value={plannedHours}
                    onChange={(e) => handlePlanned(e.target.value)}
                    className="rounded-lg border-2 text-base font-medium"
                    style={{ borderColor: '#0B0B0B', color: '#0B0B0B' }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="extra"
                    className="mb-1.5 text-[11px] font-semibold tracking-widest uppercase"
                    style={{ color: '#5E5E5F' }}
                  >
                    Extra hours
                  </Label>
                  <Input
                    id="extra"
                    type="number"
                    min={0}
                    value={extraHours}
                    onChange={(e) => handleExtra(e.target.value)}
                    className="rounded-lg border-2 text-base font-medium"
                    style={{ borderColor: '#0B0B0B', color: '#0B0B0B' }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div
                className="mb-6 h-0.5 w-full"
                style={{ background: '#E8E7E4' }}
              />

              {/* Results */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultBox
                  label="Original rate"
                  value={`$${fmt(originalRate)}/hr`}
                  accent={false}
                />
                <ResultBox
                  label="New effective rate"
                  value={`$${fmt(newRate)}/hr`}
                  accent
                />
                <ResultBox
                  label="Rate drop"
                  value={`${fmt(rateDrop)}%`}
                  accent
                />
                <ResultBox
                  label="Value of extra work"
                  value={`$${fmt(valueAtOriginalRate)}`}
                  accent={false}
                />
              </div>

              {/* Disclaimer */}
              <p
                className="mt-5 text-[11px] leading-relaxed"
                style={{ color: '#A0A09F' }}
              >
                Illustrative example only. The full Web Project Pricing OS includes
                scope-creep modelling, change-order calculators and actual-hours
                tracking across all your projects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResultBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: boolean;
}) {
  return (
    <div
      className="rounded-lg border-2 p-3"
      style={{
        borderColor: accent ? '#FF4A60' : '#E8E7E4',
        background: accent ? 'rgba(255,74,96,0.04)' : '#FAF9F6',
      }}
    >
      <span
        className="mb-1 block text-[11px] font-semibold tracking-widest uppercase"
        style={{ color: '#5E5E5F' }}
      >
        {label}
      </span>
      <span
        className="text-lg font-bold"
        style={{ color: accent ? '#FF4A60' : '#0B0B0B' }}
      >
        {value}
      </span>
    </div>
  );
}
