'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Badge } from '@/components/ui/shadcn/badge';
import {
  type DigitalProduct,
  accentColors,
} from '@/config/digital-products';

interface BundleCardProps {
  product: DigitalProduct;
  index: number;
}

export function BundleCard({ product, index }: BundleCardProps) {
  const accent = accentColors[product.accent];
  const isActive = product.status === 'active';
  const isComingSoon = product.status === 'coming-soon';
  const displayPrice = product.launchPrice ?? product.regularPrice;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative"
    >
      {/* Shadow layer */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          transform: 'translate(8px, 8px)',
          background: 'rgba(11,11,11,0.08)',
        }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-xl border-2 p-6 md:p-8"
        style={{
          background: '#FAF9F6',
          borderColor: '#0B0B0B',
        }}
      >
        {/* Accent top bar */}
        <div
          className="absolute left-0 right-0 top-0 h-1.5"
          style={{ background: accent.bg }}
        />

        {/* Bundle label */}
        <span
          className="mb-3 inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-widest uppercase"
          style={{ background: accent.bg, color: '#FAF9F6' }}
        >
          {product.eyebrow}
        </span>

        {/* Name */}
        <h3
          className="mb-3 text-xl font-bold leading-snug md:text-2xl"
          style={{ color: '#0B0B0B' }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed" style={{ color: '#5E5E5F' }}>
          {product.shortDescription}
        </p>

        {/* Lifecycle flow */}
        {product.bundleLifecycle && product.bundleLifecycle.length > 0 && (
          <div className="mb-5">
            <span
              className="mb-2 block text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: '#5E5E5F' }}
            >
              Lifecycle
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {product.bundleLifecycle.map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <span
                    className="rounded-md border px-2 py-0.5 text-[11px] font-semibold"
                    style={{ borderColor: '#0B0B0B', color: '#0B0B0B' }}
                  >
                    {step}
                  </span>
                  {i < product.bundleLifecycle!.length - 1 && (
                    <span style={{ color: '#5E5E5F' }} className="text-[11px]">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contents list */}
        {product.bundleContents && product.bundleContents.length > 0 && (
          <div className="mb-5">
            <span
              className="mb-2 block text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: '#5E5E5F' }}
            >
              Includes
            </span>
            <ul className="space-y-1.5">
              {product.bundleContents.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: '#0B0B0B' }}
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: accent.bg }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Who it's for */}
        {product.whoItsFor && (
          <div className="mb-5">
            <span
              className="mb-1 block text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: '#5E5E5F' }}
            >
              Who it&rsquo;s for
            </span>
            <p className="text-sm" style={{ color: '#5E5E5F' }}>
              {product.whoItsFor}
            </p>
          </div>
        )}

        {/* Price / Status + CTA */}
        <div className="flex items-center justify-between border-t-2 pt-5" style={{ borderColor: '#0B0B0B' }}>
          {isActive && (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold" style={{ color: '#0B0B0B' }}>
                  ${displayPrice}
                </span>
                {product.launchPrice && (
                  <span className="text-sm line-through" style={{ color: '#5E5E5F' }}>
                    ${product.regularPrice}
                  </span>
                )}
              </div>
              <Button
                asChild
                size="lg"
                className="gap-2 rounded-xl border-2 font-semibold"
                style={{
                  background: '#0B0B0B',
                  color: '#FAF9F6',
                  borderColor: '#0B0B0B',
                }}
              >
                <Link href={`/digital-products/${product.slug}`}>
                  Get bundle
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </>
          )}

          {isComingSoon && (
            <>
              <Badge
                className="rounded-md border-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  background: 'transparent',
                  borderColor: '#5E5E5F',
                  color: '#5E5E5F',
                }}
              >
                Coming soon
              </Badge>
              <span className="text-sm font-medium" style={{ color: '#5E5E5F' }}>
                ${product.regularPrice}
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
