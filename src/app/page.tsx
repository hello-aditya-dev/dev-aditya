import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F6" }}>
      {/* Navigation */}
      <nav
        className="border-b-2"
        style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            style={{ color: "#0B0B0B" }}
          >
            Aditya
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/work"
              className="text-sm font-medium"
              style={{ color: "#5E5E5F" }}
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium"
              style={{ color: "#5E5E5F" }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium"
              style={{ color: "#5E5E5F" }}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <section className="paper-grain py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <p
              className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#5E5E5F" }}
            >
              PORTFOLIO
            </p>
            <h1
              className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              style={{ color: "#0B0B0B" }}
            >
              Web designer &amp; developer
              <br />
              based in India.
            </h1>
            <p
              className="max-w-xl text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "#5E5E5F" }}
            >
              I design and build websites for clients — from scope to launch.
              Clean design, solid code, clear process.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{
                  backgroundColor: "#0B0B0B",
                  color: "#FAF9F6",
                  borderColor: "#0B0B0B",
                  boxShadow: "3px 3px 0px 0px #0B0B0B",
                }}
              >
                View my work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{
                  backgroundColor: "#FAF9F6",
                  color: "#0B0B0B",
                  borderColor: "#0B0B0B",
                  boxShadow: "3px 3px 0px 0px #0B0B0B",
                }}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Selected Work Preview */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p
              className="mb-2 text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#5E5E5F" }}
            >
              SELECTED WORK
            </p>
            <h2
              className="mb-10 text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: "#0B0B0B" }}
            >
              Recent projects
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Project Card 1 */}
              <div
                className="paper-card p-6 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{ boxShadow: "5px 5px 0px 0px #0B0B0B" }}
              >
                <p
                  className="mb-2 text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: "#FF4A60" }}
                >
                  WEBSITE
                </p>
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: "#0B0B0B" }}
                >
                  Accounting Firm Redesign
                </h3>
                <p className="text-sm" style={{ color: "#5E5E5F" }}>
                  A complete website redesign for a fractional CFO firm —
                  clean, professional, conversion-focused.
                </p>
              </div>

              {/* Project Card 2 */}
              <div
                className="paper-card p-6 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{ boxShadow: "5px 5px 0px 0px #0B0B0B" }}
              >
                <p
                  className="mb-2 text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: "#1C92FF" }}
                >
                  WEB APP
                </p>
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: "#0B0B0B" }}
                >
                  Client Portal Dashboard
                </h3>
                <p className="text-sm" style={{ color: "#5E5E5F" }}>
                  A secure client portal for a web agency with project
                  tracking, file sharing, and billing.
                </p>
              </div>

              {/* Project Card 3 */}
              <div
                className="paper-card p-6 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{ boxShadow: "5px 5px 0px 0px #0B0B0B" }}
              >
                <p
                  className="mb-2 text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: "#FFC431" }}
                >
                  ECOMMERCE
                </p>
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: "#0B0B0B" }}
                >
                  Artisan Marketplace
                </h3>
                <p className="text-sm" style={{ color: "#5E5E5F" }}>
                  A curated online store for handcrafted goods —
                  minimal design, smooth checkout.
                </p>
              </div>

              {/* Project Card 4 */}
              <div
                className="paper-card p-6 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{ boxShadow: "5px 5px 0px 0px #0B0B0B" }}
              >
                <p
                  className="mb-2 text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: "#5C42FB" }}
                >
                  BRANDING
                </p>
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: "#0B0B0B" }}
                >
                  SaaS Product Launch
                </h3>
                <p className="text-sm" style={{ color: "#5E5E5F" }}>
                  Brand identity and marketing site for a new SaaS
                  product — from logo to landing page.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/work"
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: "#5E5E5F" }}
              >
                See all projects →
              </Link>
            </div>
          </div>
        </section>

        {/* About teaser */}
        <section
          className="py-16 md:py-24 border-y-2"
          style={{ borderColor: "#E8E7E4" }}
        >
          <div className="mx-auto max-w-5xl px-6 md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2
                className="mb-2 text-xl md:text-2xl font-bold tracking-tight"
                style={{ color: "#0B0B0B" }}
              >
                Want to work together?
              </h2>
              <p className="text-sm" style={{ color: "#5E5E5F" }}>
                I&apos;m available for web design and development projects.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{
                backgroundColor: "#0B0B0B",
                color: "#FAF9F6",
                borderColor: "#0B0B0B",
                boxShadow: "3px 3px 0px 0px #0B0B0B",
              }}
            >
              Let&apos;s talk
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t-2 py-8"
        style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}
      >
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#5E5E5F" }}>
            © {new Date().getFullYear()} Aditya
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/work"
              className="text-xs font-medium"
              style={{ color: "#5E5E5F" }}
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-xs font-medium"
              style={{ color: "#5E5E5F" }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-xs font-medium"
              style={{ color: "#5E5E5F" }}
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
