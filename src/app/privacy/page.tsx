import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION } from "@/config/contact";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Aditya handles enquiries, contact-form submissions, email delivery and analytics on dev-aditya.com.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: August 2026</p>

        <div className="mt-10 max-w-2xl space-y-8 text-base leading-relaxed text-ink">
          <section>
            <h2 className="text-xl font-bold tracking-tight">1. Who I am</h2>
            <p className="mt-3 text-ink-muted">
              This website is operated by Aditya, an independent web designer and
              frontend developer based in {CONTACT_LOCATION}. You can contact me
              at <a href={CONTACT_EMAIL_HREF} className="font-semibold text-ink hover:text-coral">{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">2. What I collect</h2>
            <p className="mt-3 text-ink-muted">
              When you submit the contact form, I collect the fields you fill in:
              name, work email, company, current website, project type, scope,
              timing and project details. I also receive a timestamp and the
              page the form was submitted from.
            </p>
            <p className="mt-3 text-ink-muted">
              I do not use third-party analytics on this site. I do not set
              advertising cookies. I do not sell or share your data with third
              parties for marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">3. How I use your data</h2>
            <p className="mt-3 text-ink-muted">
              I use the information you submit through the contact form to
              review your enquiry and reply to you. Enquiries are sent via
              Resend, a transactional email provider, and delivered to my work
              inbox. I keep enquiry emails for as long as is necessary to
              respond to and reference the conversation, then delete them on
              request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">4. Email delivery</h2>
            <p className="mt-3 text-ink-muted">
              The contact form uses Resend to deliver your enquiry to my work
              email address. Resend processes the email content as a
              transactional email service. Resend's privacy policy is available
              at <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-coral">resend.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">5. Spam protection</h2>
            <p className="mt-3 text-ink-muted">
              The contact form includes a hidden honeypot field and an
              IP-based rate limit. The honeypot is invisible to humans but
              visible to bots — if it is filled, the submission is silently
              discarded. The rate limit caps the number of submissions per IP
              within a sliding window.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">6. Your rights</h2>
            <p className="mt-3 text-ink-muted">
              You can request access to, correction of, or deletion of any
              personal data I hold about you by emailing{" "}
              <a href={CONTACT_EMAIL_HREF} className="font-semibold text-ink hover:text-coral">{CONTACT_EMAIL}</a>.
              I respond to such requests within a reasonable period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">7. External links</h2>
            <p className="mt-3 text-ink-muted">
              This site links to external websites (GitHub, Vercel, project
              live URLs). I am not responsible for the privacy practices of
              those sites. External links open in a new tab with
              <code className="mx-1 rounded bg-paper px-1.5 py-0.5 text-sm">rel="noopener noreferrer"</code>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">8. Changes to this policy</h2>
            <p className="mt-3 text-ink-muted">
              I may update this policy from time to time. The "last updated"
              date at the top of this page reflects the most recent revision.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
