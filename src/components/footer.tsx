import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Monogram } from "@/components/ui/monogram";
import {
  FOOTER_WORK,
  FOOTER_CAPABILITIES,
  FOOTER_EXPLORE,
  FOOTER_RESOURCES,
  FOOTER_LEGAL,
} from "@/config/navigation";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION, GITHUB_URL, GITHUB_HANDLE } from "@/config/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t-1.5 border-ink bg-white">
      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Monogram size={40} withShadow />
              <span className="text-lg font-bold tracking-tight">Aditya</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Designer & Developer for Business Websites, Ecommerce and Digital
              Products. Clear, high-performance websites for B2B companies and
              professional-service firms.
            </p>
            <p className="mt-4 text-sm text-ink-muted">
              <span className="micro-label mr-2">Based in</span>
              {CONTACT_LOCATION}
            </p>
          </div>

          {/* Work */}
          <FooterColumn title="Work" links={FOOTER_WORK} />
          {/* Capabilities */}
          <FooterColumn title="Capabilities" links={FOOTER_CAPABILITIES} />
          {/* Explore */}
          <FooterColumn title="Explore" links={FOOTER_EXPLORE} />
          {/* Resources */}
          <FooterColumn title="Resources" links={FOOTER_RESOURCES} />
        </div>

        <div className="mt-12 grid gap-4 border-t border-ink/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="micro-label text-ink-muted">Email</p>
            <a
              href={CONTACT_EMAIL_HREF}
              className="mt-1 block text-sm font-semibold tracking-tight text-ink hover:text-coral"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <p className="micro-label text-ink-muted">GitHub</p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm font-semibold tracking-tight text-ink hover:text-coral"
            >
              @{GITHUB_HANDLE}
            </a>
          </div>
          <div>
            <p className="micro-label text-ink-muted">Location</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-ink">{CONTACT_LOCATION}</p>
          </div>
          <div>
            <p className="micro-label text-ink-muted">Status</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-ink">
              Available for selected projects
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {year} Aditya. All rights reserved. Built in Delhi, India.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-tight text-ink-muted hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/accessibility"
              className="text-xs font-semibold tracking-tight text-ink-muted hover:text-coral"
            >
              Accessibility statement
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="micro-label text-ink-muted">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium tracking-tight text-ink hover:text-coral"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
