import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/config/contact";

export const metadata: Metadata = {
  title: "Website audit — being migrated",
  description:
    "The website audit tool is being migrated to the new design. The current production deployment at dev-aditya.com continues to serve the audit.",
  alternates: { canonical: "/audit" },
  robots: { index: false, follow: false },
};

/**
 * /audit — maintenance page.
 *
 * The full audit funnel (PageSpeed API, Drizzle DB, Resend report
 * emails, Turnstile, admin dashboard) is documented as out-of-scope
 * for this redesign. The current production deployment at
 * dev-aditya.com continues to serve the audit untouched.
 *
 * This route preserves the URL with an honest message and a contact
 * link, rather than faking functionality that is not yet wired up.
 */
export default function Page() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <SectionLabel accent="coral">Website audit</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
          The audit tool is being migrated.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          The full website audit funnel — PageSpeed analysis, SEO and conversion
          findings, score grid, lead unlock and report emails — is a larger
          pipeline that depends on a database, the Google PageSpeed API and
          Cloudflare Turnstile. It is being migrated separately, on its own
          timeline.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
          The current production deployment at{" "}
          <a
            href="https://dev-aditya.com/audit"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink hover:text-coral"
          >
            dev-aditya.com/audit
          </a>{" "}
          continues to serve the audit untouched. If you'd like an audit in the
          meantime, please use that link or email me directly.
        </p>

        <Card className="mt-8 max-w-xl p-6" shadow>
          <p className="micro-label text-ink-muted">In the meantime</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Send your website and a short note about what is not working. I'll
            review it personally and reply with the clearest next step.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={CONTACT_EMAIL_HREF} external variant="primary">
              {CONTACT_EMAIL}
            </Button>
            <Button href="/contact" variant="secondary">
              Use the contact form
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
