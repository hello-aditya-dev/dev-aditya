import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL_HREF } from "@/config/contact";

export const metadata: Metadata = {
  title: "Audit report — being migrated",
  description: "This audit report URL is being migrated to the new design.",
  alternates: { canonical: "/audit" },
  robots: { index: false, follow: false },
};

/**
 * /audit/[auditId] — maintenance page.
 *
 * The full audit-report viewer (with unlock, scoring, findings and
 * the email-gated lead funnel) is being migrated separately. See
 * docs/content-inventory.md for the full scope of what is preserved
 * and what is deferred.
 */
export default function Page() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <SectionLabel accent="coral">Audit report</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
          This report is being migrated.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          The audit-report viewer is part of the larger audit pipeline that is
          being migrated separately. Existing report URLs continue to work on
          the current production deployment at{" "}
          <a
            href="https://dev-aditya.com/audit"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink hover:text-coral"
          >
            dev-aditya.com/audit
          </a>
          .
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={CONTACT_EMAIL_HREF} external variant="primary">
            Email Aditya
          </Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
