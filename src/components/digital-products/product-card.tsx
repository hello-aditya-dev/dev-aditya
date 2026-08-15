'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  type DigitalProduct,
  accentColors,
} from '@/config/digital-products';

interface ProductCardProps {
  product: DigitalProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const accent = accentColors[product.accent];
  const num = String(index + 1).padStart(2, '0');
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
        className="relative rounded-xl border-2 p-6"
        style={{
          background: '#FAF9F6',
          borderColor: '#0B0B0B',
        }}
      >
        {/* Number + Category row */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="inline-flex size-8 items-center justify-center rounded-lg text-xs font-bold"
            style={{ background: accent.bg, color: '#FAF9F6' }}
          >
            {num}
          </span>
          <span
            className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase"
            style={{
              background: accent.bg,
              color: '#FAF9F6',
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-2 text-lg font-bold leading-snug"
          style={{ color: '#0B0B0B' }}
        >
          {product.name}
        </h3>

        {/* Short description (the problem) */}
        <p className="mb-3 text-sm leading-relaxed" style={{ color: '#5E5E5F' }}>
          {product.shortDescription}
        </p>

        {/* Outcome */}
        {product.features.length > 0 && product.features[0]?.description && (
          <p className="mb-4 text-sm font-medium" style={{ color: accent.text }}>
            → {product.features[0].description}
          </p>
        )}

        {/* Format labels */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {product.formats.slice(0, 3).map((fmt) => (
            <span
              key={fmt}
              className="rounded-md border px-2 py-0.5 text-[11px] font-medium"
              style={{ borderColor: '#0B0B0B', color: '#5E5E5F' }}
            >
              {fmt}
            </span>
          ))}
        </div>

        {/* Price / Status + CTA */}
        <div className="flex items-center justify-between">
          {isActive && (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold" style={{ color: '#0B0B0B' }}>
                  ${displayPrice}
                </span>
                {product.launchPrice && (
                  <span
                    className="text-sm line-through"
                    style={{ color: '#5E5E5F' }}
                  >
                    ${product.regularPrice}
                  </span>
                )}
              </div>
              <Button
                asChild
                size="sm"
                className="gap-1.5 rounded-lg border-2 font-semibold"
                style={{
                  background: '#0B0B0B',
                  color: '#FAF9F6',
                  borderColor: '#0B0B0B',
                }}
              >
                <Link href={`/digital-products/${product.slug}`}>
                  View
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </>
          )}

          {isComingSoon && !(product.launchPrice || product.regularPrice) && (
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
            </>
          )}
          {isComingSoon && (product.launchPrice || product.regularPrice) && (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold" style={{ color: '#0B0B0B' }}>
                  ${displayPrice}
                </span>
                {product.launchPrice && (
                  <span
                    className="text-sm line-through"
                    style={{ color: '#5E5E5F' }}
                  >
                    ${product.regularPrice}
                  </span>
                )}
              </div>
              <Link
                href={`/digital-products/${product.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border-2"
                style={{
                  background: '#FAF9F6',
                  color: '#0B0B0B',
                  borderColor: '#0B0B0B',
                }}
              >
                View
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
