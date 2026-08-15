import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { CONTACT_EMAIL_HREF } from "@/config/contact";

export const metadata: Metadata = {
  title: "Project help — frontend help for students, creators and small businesses",
  description:
    "Frontend help for students building portfolios, small businesses needing a better website, creators and developers stuck on UI polish. Send the project, define the outcome, fix and build.",
  alternates: { canonical: "/mentoring" },
};

const audience = [
  {
    title: "Students building portfolios",
    desc: "Get help turning your projects into a portfolio that looks serious and explains your work clearly.",
  },
  {
    title: "Small businesses needing a better website",
    desc: "Improve layout, copy, responsiveness and trust sections so the website feels more professional.",
  },
  {
    title: "Creators and freelancers",
    desc: "Build a clean landing page, digital profile or interactive experience around your personal brand.",
  },
  {
    title: "Developers stuck on UI polish",
    desc: "Get help with spacing, animation, responsiveness and the final 20% that makes a project feel complete.",
  },
];

const tags = [
  "Portfolio review",
  "Landing page structure",
  "UI/UX cleanup",
  "Animation polish",
  "Responsive fixes",
  "Project case studies",
  "GitHub profile cleanup",
  "Deployment and Vercel fixes",
];

const steps = [
  { step: "01", title: "Send the project", desc: "Share the live link, repo, screenshots, or problem." },
  { step: "02", title: "Define the outcome", desc: "We decide what needs to improve: design, speed, layout, copy, responsiveness, or polish." },
  { step: "03", title: "Fix and build", desc: "I help improve the actual interface, not just talk about it." },
  { step: "04", title: "Leave with something usable", desc: "You get a cleaner project, clearer next steps, or a better page to show." },
];

export default function Page() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Project help</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Frontend help for students, creators and small businesses.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            I help people turn rough website ideas, broken layouts, weak
            portfolios and unfinished frontend projects into something cleaner,
            sharper and ready to show.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={CONTACT_EMAIL_HREF} external variant="primary" size="lg">
              Email me
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="blue">Who it's for</SectionLabel>
            </div>
            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {audience.map((card) => (
                <StaggerItem key={card.title}>
                  <Card className="h-full p-6" shadow>
                    <h3 className="text-base font-bold tracking-tight">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.desc}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="coral">What we can work on</SectionLabel>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-1.5 border-ink bg-white px-4 py-2 text-sm font-semibold tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="violet">How it works</SectionLabel>
            </div>
            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <StaggerItem key={item.step}>
                  <Card className="h-full p-5" shadow>
                    <span className="font-mono text-xs font-bold tracking-widest text-coral">
                      {item.step}
                    </span>
                    <h3 className="mt-3 text-base font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
              Want help with a project?
            </h2>
            <div className="mt-5">
              <Button href={CONTACT_EMAIL_HREF} external variant="primary" size="lg">
                work@dev-aditya.com
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
