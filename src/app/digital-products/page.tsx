import {
  getTools,
  getBundles,
  getTemplates,
  getFeaturedProduct,
  accentColors,
  SITE_ORIGIN,
} from "@/config/digital-products";
import { StoreHero } from "@/components/digital-products/store-hero";
import { ProductCard } from "@/components/digital-products/product-card";
import { BundleCard } from "@/components/digital-products/bundle-card";
import { WorkflowSection } from "@/components/digital-products/workflow-section";
import { WhySection } from "@/components/digital-products/why-section";
import { StoreFAQ } from "@/components/digital-products/store-faq";
import { ScopeCreepCalculator } from "@/components/digital-products/scope-creep-calculator";
import Link from "next/link";
import { ArrowRight, Package, Wrench, LayoutTemplate } from "lucide-react";

export default function DigitalProductsPage() {
  const tools = getTools();
  const bundles = getBundles();
  const templates = getTemplates();
  const featured = getFeaturedProduct();

  // ── JSON-LD Structured Data ──────────────────────────
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Products for Web Designers & Agencies",
    description:
      "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
    url: `${SITE_ORIGIN}/digital-products`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_ORIGIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Digital Products",
        item: `${SITE_ORIGIN}/digital-products`,
      },
    ],
  };

  return (
    <div className="paper-grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ── Hero ──────────────────────────────────────── */}
      <StoreHero />

      {/* ── Featured Product ──────────────────────────── */}
      {featured && (
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#5E5E5F" }}>
                {featured.eyebrow}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-2" style={{ borderColor: accentColors[featured.accent].border, color: accentColors[featured.accent].text, backgroundColor: `${accentColors[featured.accent].bg}15` }}>
                Featured
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0B0B0B" }}>
              Know what a website project needs to cost before you send the proposal.
            </h2>
            <p className="text-lg mb-8 max-w-2xl" style={{ color: "#5E5E5F" }}>
              {featured.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left: Product details */}
              <div className="space-y-6">
                {/* Key features */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#5E5E5F" }}>What it does</h3>
                  <div className="space-y-2">
                    {featured.features.slice(0, 5).map((feature) => (
                      <div key={feature.name} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColors[featured.accent].bg }} />
                        <span className="text-sm" style={{ color: "#0B0B0B" }}>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formats */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#5E5E5F" }}>Formats</h3>
                  <div className="flex flex-wrap gap-2">
                    {featured.formats.map((format) => (
                      <span key={format} className="px-3 py-1 text-xs font-medium rounded-lg border-2" style={{ borderColor: "#0B0B0B", color: "#0B0B0B" }}>
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3">
                  {featured.launchPrice && (
                    <span className="text-3xl font-bold" style={{ color: accentColors[featured.accent].text }}>
                      ${featured.launchPrice}
                    </span>
                  )}
                  <span className={`text-lg ${featured.launchPrice ? "line-through" : "font-bold text-3xl"}`} style={{ color: featured.launchPrice ? "#5E5E5F" : "#0B0B0B" }}>
                    ${featured.regularPrice}
                  </span>
                  {featured.launchPrice && (
                    <span className="text-sm font-medium px-2 py-0.5 rounded" style={{ backgroundColor: `${accentColors[featured.accent].bg}20`, color: accentColors[featured.accent].text }}>
                      Launch price
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={`/digital-products/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                  style={{
                    backgroundColor: "#0B0B0B",
                    color: "#FAF9F6",
                    borderColor: "#0B0B0B",
                    boxShadow: "3px 3px 0px 0px #0B0B0B",
                  }}
                >
                  View Web Project Pricing OS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right: Scope Creep Calculator */}
              <div>
                <ScopeCreepCalculator />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Agency Tools ──────────────────────────────── */}
      <section id="tools" className="py-20 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#FAF9F6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Wrench className="w-4 h-4" style={{ color: "#5E5E5F" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#5E5E5F" }}>
              Agency Tools
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#0B0B0B" }}>
            Operating systems for client work
          </h2>
          <p className="text-lg mb-10 max-w-2xl" style={{ color: "#5E5E5F" }}>
            Each tool solves a specific operational problem in the web project lifecycle.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <ProductCard key={tool.id} product={tool} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bundles ───────────────────────────────────── */}
      <section id="bundles" className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-4 h-4" style={{ color: "#5E5E5F" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#5E5E5F" }}>
              Bundles
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#0B0B0B" }}>
            Save more when tools work together
          </h2>
          <p className="text-lg mb-10 max-w-2xl" style={{ color: "#5E5E5F" }}>
            Bundles combine tools that share a workflow, so you get the system instead of just the parts.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((bundle, i) => (
              <BundleCard key={bundle.id} product={bundle} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates ─────────────────────────────────── */}
      <section id="templates" className="py-20 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#FAF9F6" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <LayoutTemplate className="w-4 h-4" style={{ color: "#5E5E5F" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#5E5E5F" }}>
              Website Templates
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#0B0B0B" }}>
            Start from a better foundation
          </h2>
          <p className="text-lg mb-10 max-w-2xl" style={{ color: "#5E5E5F" }}>
            Production-ready starting points built around actual business categories. Designed to be customized for client projects. Not generic one-page demos.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, i) => (
              <ProductCard key={template.id} product={template} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow ──────────────────────────────────── */}
      <WorkflowSection />

      {/* ── Why These Exist ───────────────────────────── */}
      <WhySection />

      {/* ── FAQ ───────────────────────────────────────── */}
      <StoreFAQ />

      {/* ── Final CTA ─────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0B0B0B" }}>
            Make client work clearer.
          </h2>
          <p className="text-lg mb-8" style={{ color: "#5E5E5F" }}>
            Browse the tools and start building systems around the work you already do.
          </p>
          <Link
            href="#tools"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{
              backgroundColor: "#0B0B0B",
              color: "#FAF9F6",
              borderColor: "#0B0B0B",
              boxShadow: "3px 3px 0px 0px #0B0B0B",
            }}
          >
            Browse agency tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
