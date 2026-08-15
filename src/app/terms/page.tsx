import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_LOCATION } from "@/config/contact";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms under which Aditya offers web design and frontend development services through dev-aditya.com.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight">
          Terms of service
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: August 2026</p>

        <div className="mt-10 max-w-2xl space-y-8 text-base leading-relaxed text-ink">
          <section>
            <h2 className="text-xl font-bold tracking-tight">1. Services</h2>
            <p className="mt-3 text-ink-muted">
              This website describes the web design and frontend development
              services offered by Aditya, based in {CONTACT_LOCATION}. The
              information presented is general in nature and does not constitute
              a binding offer. A specific scope, timeline and price are agreed
              in writing before any work begins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">2. Enquiries</h2>
            <p className="mt-3 text-ink-muted">
              Submitting the contact form does not create a contract. It is an
              enquiry that I review and reply to, typically within 1–2 business
              days. If we agree to work together, a separate scope document
              governs the engagement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">3. Use of this website</h2>
            <p className="mt-3 text-ink-muted">
              You agree not to misuse this website — including submitting
              malicious content, attempting to overload the contact form, or
              trying to access areas that are not publicly available. The
              contact form includes a honeypot and rate limiting to discourage
              automated abuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">4. Intellectual property</h2>
            <p className="mt-3 text-ink-muted">
              The design, copy and code of this website belong to Aditya. Case
              studies describe real projects; the underlying work in each case
              study belongs to the respective project owner. Project case-study
              text on this site is original editorial content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">5. External links</h2>
            <p className="mt-3 text-ink-muted">
              This site links to external websites (GitHub, Vercel, project live
              URLs). I am not responsible for the content or practices of those
              sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">6. Limitation of liability</h2>
            <p className="mt-3 text-ink-muted">
              This website is provided "as is". To the maximum extent permitted
              by law, I am not liable for any direct, indirect, incidental or
              consequential damages arising from your use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight">7. Contact</h2>
            <p className="mt-3 text-ink-muted">
              Questions about these terms can be sent to{" "}
              <a href={CONTACT_EMAIL_HREF} className="font-semibold text-ink hover:text-coral">{CONTACT_EMAIL}</a>.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
