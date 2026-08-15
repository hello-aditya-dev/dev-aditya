'use client';

import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Products', href: '/digital-products#products' },
  { label: 'Bundles', href: '/digital-products#bundles' },
  { label: 'Delivery Policy', href: '/digital-products/delivery-policy' },
  { label: 'Refund Policy', href: '/digital-products/refund-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Contact', href: '/contact' },
  { label: 'Portfolio', href: '/' },
];

export function StoreFooter() {
  return (
    <footer
      className="border-t-2"
      style={{ background: '#FAF9F6', borderColor: '#0B0B0B' }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          {/* Links */}
          <nav aria-label="Store footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium transition-colors hover:underline"
                    style={{ color: '#5E5E5F' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <span
            className="text-xs"
            style={{ color: '#A0A09F' }}
          >
            &copy; 2025 Aditya
          </span>
        </div>
      </div>
    </footer>
  );
}
