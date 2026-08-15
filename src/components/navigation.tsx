"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Monogram } from "@/components/ui/monogram";
import { Button } from "@/components/ui/button";
import { PRIMARY_NAV } from "@/config/navigation";
import { CONTACT_EMAIL_HREF, CONTACT_EMAIL } from "@/config/contact";
import { cn } from "@/lib/utils";

/**
 * Navigation — sticky, compact, three primary links + one CTA.
 *
 * Deliberately small: Work · About · Contact, plus a "Let's talk" CTA.
 * Secondary routes (Capabilities, Process, Resources) are reachable only
 * from the footer so they never compete with the primary visitor journey.
 */
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on route change.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border-1.5 border-ink bg-white/95 px-3 py-2 transition-all duration-300 sm:px-4",
              scrolled ? "shadow-hard-sm backdrop-blur" : "bg-white",
            )}
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 transition-colors hover:bg-paper"
              aria-label="Aditya — home"
            >
              <Monogram size={32} />
              <span className="text-sm font-bold tracking-tight text-ink">Aditya</span>
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {PRIMARY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium tracking-tight transition-colors",
                    isActive(link.href)
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-paper",
                  )}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button href="/contact" size="sm" variant="primary" className="hidden sm:inline-flex">
                Let&rsquo;s talk
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-1.5 border-ink bg-white lg:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="absolute inset-x-3 top-3 rounded-3xl border-1.5 border-ink bg-paper p-5 shadow-hard">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                  aria-label="Aditya — home"
                >
                  <Monogram size={32} />
                  <span className="text-sm font-bold tracking-tight">Aditya</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border-1.5 border-ink bg-white"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <nav className="mt-5 flex flex-col" aria-label="Mobile primary">
                {PRIMARY_NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between border-b border-ink/15 py-3.5 text-lg font-semibold tracking-tight",
                    )}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-ink-muted">&rarr;</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button href="/contact" variant="primary" size="lg" className="w-full">
                  Let&rsquo;s talk
                </Button>
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="text-center text-sm font-semibold tracking-tight text-ink-muted hover:text-coral"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
