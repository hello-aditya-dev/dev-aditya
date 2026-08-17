import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Monogram } from "@/components/ui/monogram";
import { FOOTER_EXPLORE, FOOTER_LEGAL } from "@/config/navigation";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_LOCATION,
  GITHUB_URL,
  GITHUB_HANDLE,
} from "@/config/contact";

/**
 * Footer — deliberately small.
 *
 * Brand line, the email address (primary contact channel), location, a
 * GitHub link, and a short row of legal links. A compact Explore column
 * surfaces the secondary routes — including For Agencies — so they stay
 * reachable without competing with the primary visitor journey in the
 * header.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-1.5 border-ink bg-white">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand + contact */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Monogram size={36} withShadow />
              <span className="text-base font-bold tracking-tight">Aditya</span>
            </div>
            <a
              href={CONTACT_EMAIL_HREF}
              className="mt-4 block text-base font-bold tracking-tight text-ink hover:text-coral"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-1.5 text-sm text-ink-muted">{CONTACT_LOCATION}</p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium tracking-tight text-ink-muted hover:text-coral"
            >
              GitHub
              <span aria-hidden="true" className="text-xs">
                ↗
              </span>
              <span className="sr-only"> — {GITHUB_HANDLE} (opens in new tab)</span>
            </a>
          </div>

          {/* Explore — secondary routes kept reachable, not loud */}
          <nav aria-label="Explore" className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
            {FOOTER_EXPLORE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-tight text-ink-muted hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal — visually secondary */}
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
            {FOOTER_LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-tight text-ink-muted hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-ink/15 pt-5">
          <p className="text-xs text-ink-muted">
            &copy; {year} Aditya. Built in Delhi, India.
          </p>
        </div>
      </Container>
    </footer>
  );
}
