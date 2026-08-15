import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PROCESS_STEPS, PROCESS_FAQ } from "@/config/process";

export const metadata: Metadata = {
  title: "Process — six stages from brief to launch",
  description:
    "A clear, predictable engagement process: discovery, structure, design and development, review, testing and launch, handover and support. With deliverables, client responsibilities and review points at every stage.",
  alternates: { canonical: "/process" },
};

export default function Page() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionLabel>Process</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            A clear, predictable path from brief to launch.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Six stages that keep scope clear, progress visible and the final
            implementation faithful to the approved direction. Every stage
            ends with an explicit review point — no silent hand-offs.
          </p>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white pt-0">
        <Container>
          <ol className="relative space-y-6 border-l-1.5 border-ink pl-6 sm:pl-8">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="relative">
                <span
                  className="absolute -left-[34px] flex h-7 w-7 items-center justify-center rounded-full border-1.5 border-ink bg-white font-mono text-[0.7rem] font-bold sm:-left-[42px] sm:h-8 sm:w-8"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <Reveal>
                  <Card className="p-6 sm:p-7">
                    <h2 className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {step.summary}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-3">
                      <div>
                        <p className="micro-label text-ink-muted">Deliverables</p>
                        <ul className="mt-2 space-y-1">
                          {step.deliverables.map((d) => (
                            <li key={d} className="text-sm leading-snug">
                              <span className="font-semibold tracking-tight">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="micro-label text-ink-muted">You provide</p>
                        <ul className="mt-2 space-y-1">
                          {step.clientResponsibilities.map((c) => (
                            <li key={c} className="text-sm leading-snug text-ink-muted">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="micro-label text-ink-muted">Review point</p>
                        <p className="mt-2 text-sm leading-snug font-semibold tracking-tight">
                          {step.reviewPoint}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <SectionLabel accent="blue">Practical questions</SectionLabel>
            </div>
            <div className="space-y-4">
              {PROCESS_FAQ.map((item) => (
                <Card key={item.question} className="p-5" shadow>
                  <h3 className="text-base font-bold tracking-tight">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t-1.5 border-ink bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
              Ready to scope a project?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Share the current website and what you want the new one to achieve.
              I'll reply with a practical next step.
            </p>
            <div className="mt-7 flex justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
