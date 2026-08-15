import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { PROCESS_STEPS } from "@/config/process";

/**
 * ProcessSection — six-step engagement timeline.
 *
 * Aditya's verified process is more relevant than inventing employment
 * history. Presented as a vertical timeline with large step numbers,
 * small icons and clear descriptions.
 */
export function ProcessSection() {
  return (
    <Section id="process-preview" className="border-t-1.5 border-ink bg-white">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel accent="violet">How we work</SectionLabel>
          <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
            A clear, predictable path from brief to launch.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Six stages that keep scope clear, progress visible and the final
            implementation faithful to the approved direction.
          </p>
        </div>

        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div className="flex h-full flex-col rounded-2xl border-1.5 border-ink bg-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-hard-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold leading-none tracking-tight text-ink">
                    {step.number}
                  </span>
                  <ProcessIcon step={step.number} />
                </div>
                <h3 className="mt-4 text-base font-bold leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.summary}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-8">
          <a
            href="/process"
            className="inline-flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink hover:text-coral"
          >
            See the full process
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

function ProcessIcon({ step }: { step: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "text-ink-muted",
  };

  switch (step) {
    case "01":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="6" />
          <path d="M14 14l4 4" />
        </svg>
      );
    case "02":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="6" height="6" />
          <rect x="11" y="3" width="6" height="6" />
          <rect x="3" y="11" width="6" height="6" />
          <rect x="11" y="11" width="6" height="6" />
        </svg>
      );
    case "03":
      return (
        <svg {...common}>
          <path d="M4 17V8l6-4 6 4v9" />
          <path d="M4 17h12" />
          <path d="M8 17v-5h4v5" />
        </svg>
      );
    case "04":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="6" />
          <path d="M8 10l2 2 4-4" />
        </svg>
      );
    case "05":
      return (
        <svg {...common}>
          <path d="M5 10l5 5 5-5" />
          <path d="M10 4v11" />
          <path d="M3 17h14" />
        </svg>
      );
    case "06":
      return (
        <svg {...common}>
          <path d="M3 7l7-4 7 4v6l-7 4-7-4V7z" />
          <path d="M3 7l7 4 7-4M10 11v6" />
        </svg>
      );
    default:
      return null;
  }
}
