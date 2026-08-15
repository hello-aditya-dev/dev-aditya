import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CAPABILITIES } from "@/config/capabilities";
import { CONTACT_LOCATION, CONTACT_WORKING_MODEL } from "@/config/contact";

export const metadata: Metadata = {
  title: "About — independent web designer and frontend developer in Delhi",
  description:
    "Aditya is an independent web designer and frontend developer based in Delhi, India, working remotely with B2B and professional-service firms across India and internationally.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Design judgment supported by technical execution.
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              I&rsquo;m Aditya, an independent web designer and frontend developer
              based in Delhi, India. I work with companies that need more than a
              visually polished website — the work begins with structure:
              understanding what the organisation offers, what its audience
              needs to understand, and what action the website should make
              easier.
            </p>
            <p>
              I then translate that structure into a clear interface and
              production-ready frontend. The relationship is direct — you work
              with the person designing and building the site, not an account
              manager.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Let&rsquo;s talk
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See the work
            </Button>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            <span className="micro-label mr-2">Based in</span>
            {CONTACT_LOCATION}
            <span className="mx-3" aria-hidden="true">·</span>
            <span className="micro-label mr-2">Working</span>
            {CONTACT_WORKING_MODEL}
          </p>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="blue">Where design and engineering meet</SectionLabel>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Structure before decoration",
                  desc: "Information architecture and page hierarchy come first, so the website communicates before a visitor reads a single line of detail.",
                },
                {
                  title: "Design that carries intent",
                  desc: "Layout, typography, spacing and motion are used to establish credibility and guide attention, not to decorate.",
                },
                {
                  title: "Production-ready frontend",
                  desc: "The approved design is implemented as accessible, responsive, maintainable code, faithful to the direction we agreed.",
                },
                {
                  title: "Careful delivery",
                  desc: "Performance, accessibility and technical SEO are checked before launch, followed by an organised handover.",
                },
              ].map((card) => (
                <Reveal key={card.title}>
                  <Card className="h-full p-6" shadow>
                    <h3 className="text-lg font-bold tracking-tight">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="coral">Core capabilities</SectionLabel>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                What I actually do day-to-day, kept honest.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-snug"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel accent="coral" className="justify-center">
              How I work
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
              The website is the easy part. The hard part is deciding what it should do.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Most websites fail before a single pixel is drawn — the brief is
              vague, the audience is unclear, the success criteria are missing.
              My process puts structure first so the rest of the project stays
              predictable.
            </p>
            <div className="mt-7 flex justify-center">
              <Button href="/process" variant="primary" size="lg">
                See the process
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
