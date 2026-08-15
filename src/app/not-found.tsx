import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="pt-20 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[clamp(5rem,15vw,9rem)] font-extrabold leading-none tracking-tighter text-coral">
            404
          </p>
          <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
            That page is not here.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            The page you were looking for may have been renamed, removed, or
            never existed. Try one of the routes below, or get in touch.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="primary" size="lg">
              Back to home
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See the work
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Contact
            </Button>
          </div>

          <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            <Link href="/capabilities" className="rounded-xl border-1.5 border-ink bg-white p-4 hover:bg-paper">
              <span className="micro-label text-ink-muted">Services</span>
              <p className="mt-1 text-sm font-bold tracking-tight">Capabilities →</p>
            </Link>
            <Link href="/resources" className="rounded-xl border-1.5 border-ink bg-white p-4 hover:bg-paper">
              <span className="micro-label text-ink-muted">Reading</span>
              <p className="mt-1 text-sm font-bold tracking-tight">Resources →</p>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
