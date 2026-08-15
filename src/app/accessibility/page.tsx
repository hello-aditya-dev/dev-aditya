import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/config/contact";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "How dev-aditya.com approaches accessibility — WCAG 2.2 AA target, semantic HTML, keyboard navigation, reduced-motion support and contact options.",
  alternates: { canonical: "/accessibility" },
};

export default function Page() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight">
          Accessibility statement
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: August 2026</p>

        <div className="mt-10 max-w-2xl space-y-8 text-base leading-relaxed text-ink">
          <section>
            <h2 className="text-xl font-bold tracking-tight">1. Commitment</h2>
            <p className="mt-3 text-ink-muted">
              I want this website to be usable by everyone, including visitors
              using assistive technology, keyboard-only navigation, or who have
              reduced-motion preferences. The target is WCAG 2.2 AA where
              practical.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">2. What I do</h2>
            <ul className="mt-3 space-y-2 text-ink-muted">
              <li>Semantic HTML — header, nav, main, section, article, footer.</li>
              <li>A logical heading hierarchy on every page (one h1, then h2s, then h3s).</li>
              <li>A skip-to-content link as the first focusable element.</li>
              <li>Visible focus indicators on every interactive element.</li>
              <li>Keyboard-accessible navigation and mobile menu (Escape to close, focus management).</li>
              <li>Keyboard-accessible project filters (aria-pressed state).</li>
              <li>Explicit labels on every form field.</li>
              <li>Descriptive alt text on meaningful images; decorative images hidden from AT.</li>
              <li>Colour-contrast checked against WCAG AA.</li>
              <li>prefers-reduced-motion short-circuits every animation.</li>
              <li>Minimum 44×44px touch targets on mobile.</li>
              <li>aria-current states on the active navigation item.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">3. Known limitations</h2>
            <p className="mt-3 text-ink-muted">
              The original SVG editorial project frames are decorative — they
              carry an <code className="mx-1 rounded bg-paper px-1.5 py-0.5 text-sm">aria-label</code> describing
              the project they represent, but the visual composition itself is
              not a meaningful image. If you need a textual description of any
              project, the case-study narrative covers it in full.
            </p>
            <p className="mt-3 text-ink-muted">
              The website audit feature is currently being migrated (see the{" "}
              <Link href="/audit" className="font-semibold text-ink hover:text-coral">/audit</Link>{" "}
              page). The migration page is itself accessible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">4. Reporting an issue</h2>
            <p className="mt-3 text-ink-muted">
              If you encounter an accessibility barrier on this site, please
              email{" "}
              <a href={CONTACT_EMAIL_HREF} className="font-semibold text-ink hover:text-coral">{CONTACT_EMAIL}</a>{" "}
              with a description of the issue and the page it occurred on. I
              take accessibility reports seriously and will investigate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">5. Testing</h2>
            <p className="mt-3 text-ink-muted">
              The site is tested manually across viewports (360, 390, 768, 1024,
              1280, 1440, 1920) and with keyboard-only navigation. Automated
              checks run via ESLint (next-eslint accessibility rules) and the
              build's type system. Lighthouse Accessibility is run on the
              production build — see <code className="mx-1 rounded bg-paper px-1.5 py-0.5 text-sm">docs/qa-report.md</code> for
              the most recent scores.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
