'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Agency Tools', href: '#tools' },
  { label: 'Bundles', href: '#bundles' },
  { label: 'Templates', href: '#templates' },
];

export function StoreNav() {
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="sticky top-0 z-40 border-b-2"
      style={{
        background: 'rgba(250,249,246,0.95)',
        borderColor: '#E8E7E4',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/digital-products"
          className="text-sm font-bold tracking-tight"
          style={{ color: '#0B0B0B' }}
        >
          A. Digital Products
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: '#5E5E5F' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              style={{ color: '#0B0B0B' }}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-l-2"
            style={{ background: '#FAF9F6', borderColor: '#0B0B0B' }}
          >
            <SheetHeader>
              <SheetTitle
                className="text-sm font-bold tracking-tight"
                style={{ color: '#0B0B0B' }}
              >
                A. Digital Products
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3 px-4 pt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="py-2 text-left text-base font-medium transition-colors hover:underline"
                  style={{ color: '#0B0B0B' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
