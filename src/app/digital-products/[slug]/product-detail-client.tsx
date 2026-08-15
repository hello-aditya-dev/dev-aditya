"use client";

import {
  type DigitalProduct,
  accentColors,
} from "@/config/digital-products";
import { ScopeCreepCalculator } from "@/components/digital-products/scope-creep-calculator";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Shield,
  Package,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailClient({
  product,
}: {
  product: DigitalProduct;
}) {
  const accent = accentColors[product.accent];
  const isActive = product.status === "active";
  const isComingSoon = product.status === "coming-soon";
  const displayPrice = product.launchPrice ?? product.regularPrice;

  return (
    <div className="paper-grain">
      {/* ── Product Hero ──────────────────────────────── */}
      <section className="pt-12 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#5E5E5F" }}>
            <Link href="/digital-products" className="hover:underline">Digital Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "#0B0B0B" }}>{product.name}</span>
          </nav>

          {/* Micro-label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#5E5E5F" }}>
              {product.type === "tool" ? "WEB AGENCY TOOL" : product.type === "bundle" ? "BUNDLE" : "WEBSITE TEMPLATE"}
              {product.version && ` / VERSION ${product.version}`}
            </span>
            {isActive && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-2" style={{ borderColor: accent.border, color: accent.text, backgroundColor: `${accent.bg}15` }}>
                Available
              </span>
            )}
            {isComingSoon && !(product.launchPrice || product.regularPrice) && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-2" style={{ borderColor: "#5E5E5F", color: "#5E5E5F" }}>
                Coming soon
              </span>
            )}
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" style={{ color: "#0B0B0B" }}>
            {product.shortDescription}
          </h1>

          {/* Supporting copy */}
          <p className="text-lg md:text-xl max-w-3xl mb-8" style={{ color: "#5E5E5F" }}>
            {product.description}
          </p>

          {/* Product facts row */}
          <div className="flex flex-wrap gap-3 mb-8">
            {product.formats.map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border-2" style={{ borderColor: "#0B0B0B", color: "#0B0B0B" }}>
                <FileSpreadsheet className="w-3.5 h-3.5" />
                {f}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border-2" style={{ borderColor: "#0B0B0B", color: "#0B0B0B" }}>
              <Shield className="w-3.5 h-3.5" />
              No subscription
            </span>
            {product.formats.includes("Demo workbook") && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border-2" style={{ borderColor: "#0B0B0B", color: "#0B0B0B" }}>
                <Package className="w-3.5 h-3.5" />
                Demo included
              </span>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex items-end gap-3">
              {product.launchPrice && (
                <span className="text-4xl font-bold" style={{ color: accent.text }}>
                  ${product.launchPrice}
                </span>
              )}
              <span className={`${product.launchPrice ? "text-xl line-through" : "text-4xl font-bold"}`} style={{ color: product.launchPrice ? "#5E5E5F" : "#0B0B0B" }}>
                ${product.regularPrice}
              </span>
              {product.launchPrice && (
                <span className="text-sm font-medium px-2 py-0.5 rounded" style={{ backgroundColor: `${accent.bg}20`, color: accent.text }}>
                  Launch price
                </span>
              )}
            </div>
            {isActive && (
              <Link
                href={`/digital-products/${product.slug}/checkout`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{
                  backgroundColor: "#0B0B0B",
                  color: "#FAF9F6",
                  borderColor: "#0B0B0B",
                  boxShadow: "3px 3px 0px 0px #0B0B0B",
                }}
              >
                Get {product.name} — ${displayPrice}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-base border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{
                backgroundColor: "#FAF9F6",
                color: "#0B0B0B",
                borderColor: "#0B0B0B",
                boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.15)",
              }}
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Buyer Problem ─────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border-2 p-8 md:p-12" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6", boxShadow: "4px 4px 0px 0px #0B0B0B" }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0B0B0B" }}>
              The problem
            </h2>
            <p className="text-lg mb-6" style={{ color: "#5E5E5F" }}>
              Most web designers and small agencies price projects by instinct, comparison, or guesswork. Without a system, scope creep erodes your rate, underquoting becomes normal, and you discover margin problems after the project is already running.
            </p>
            <p className="text-lg" style={{ color: "#5E5E5F" }}>
              This tool gives you a structured way to turn what you know about a project into a defensible quote — before you send the proposal.
            </p>
          </div>
        </div>
      </section>

      {/* ── What It Does / Features ───────────────────── */}
      <section id="how-it-works" className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0B0B0B" }}>
            What {product.name} does
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.features.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 1, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border-2 p-6"
                style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6", boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-sm font-bold mt-0.5" style={{ color: accent.text }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: "#0B0B0B" }}>{feature.name}</h3>
                    <p className="text-sm" style={{ color: "#5E5E5F" }}>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scope Creep Calculator (for Pricing OS) ──── */}
      {product.slug === "web-project-pricing-os" && (
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0B0B0B" }}>
              See the scope creep problem
            </h2>
            <p className="text-lg mb-8" style={{ color: "#5E5E5F" }}>
              This illustrative example shows how unplanned work erodes your effective rate. The full workbook models this and much more.
            </p>
            <ScopeCreepCalculator />
          </div>
        </section>
      )}

      {/* ── What's Included ───────────────────────────── */}
      {product.includes.length > 0 && (
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0B0B0B" }}>
              What&apos;s included
            </h2>
            <div className="rounded-xl border-2 p-6 md:p-8" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6", boxShadow: "4px 4px 0px 0px #0B0B0B" }}>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accent.bg }} />
                    <span className="text-sm" style={{ color: "#0B0B0B" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Bundle Contents ───────────────────────────── */}
      {product.bundleContents && product.bundleContents.length > 0 && (
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0B0B0B" }}>
              Bundle contents
            </h2>
            <div className="space-y-3">
              {product.bundleContents.map((item, i) => (
                <div key={item} className="rounded-lg border-2 px-5 py-3 flex items-center gap-3" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
                  <span className="text-xs font-bold" style={{ color: accent.text }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium" style={{ color: "#0B0B0B" }}>{item}</span>
                </div>
              ))}
            </div>
            {product.bundleLifecycle && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {product.bundleLifecycle.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider border-2" style={{ borderColor: accent.border, color: accent.text }}>
                      {step}
                    </span>
                    {i < product.bundleLifecycle!.length - 1 && (
                      <ChevronRight className="w-3 h-3" style={{ color: "#5E5E5F" }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Who It's For / Not For ────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {product.whoItsFor && (
            <div className="rounded-xl border-2 p-6" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6", boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.1)" }}>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2" style={{ color: "#0B0B0B" }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: accent.bg }} />
                Who it&apos;s for
              </h3>
              <p className="text-sm" style={{ color: "#5E5E5F" }}>{product.whoItsFor}</p>
            </div>
          )}
          {product.whoItsNotFor && (
            <div className="rounded-xl border-2 p-6" style={{ borderColor: "#5E5E5F", backgroundColor: "#FAF9F6" }}>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2" style={{ color: "#5E5E5F" }}>
                <XCircle className="w-5 h-5" />
                Who it&apos;s not for
              </h3>
              <p className="text-sm" style={{ color: "#5E5E5F" }}>{product.whoItsNotFor}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Pricing Section ───────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border-2 p-8 md:p-12 text-center" style={{ borderColor: accent.border, backgroundColor: "#FAF9F6", boxShadow: `4px 4px 0px 0px ${accent.bg}40` }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0B0B0B" }}>
              {product.name}
            </h2>
            <div className="flex items-end justify-center gap-3 mb-4">
              {product.launchPrice && (
                <span className="text-5xl font-bold" style={{ color: accent.text }}>
                  ${product.launchPrice}
                </span>
              )}
              <span className={`${product.launchPrice ? "text-2xl line-through" : "text-5xl font-bold"}`} style={{ color: product.launchPrice ? "#5E5E5F" : "#0B0B0B" }}>
                ${product.regularPrice}
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "#5E5E5F" }}>
              One-time payment. No subscription. {product.licenseType && ` ${product.licenseType}.`}
            </p>
            {isActive && (
              <Link
                href={`/digital-products/${product.slug}/checkout`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{
                  backgroundColor: "#0B0B0B",
                  color: "#FAF9F6",
                  borderColor: "#0B0B0B",
                  boxShadow: "3px 3px 0px 0px #0B0B0B",
                }}
              >
                Get {product.name} — ${displayPrice}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── License + Refund/Delivery Info ─────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border-2 p-6" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
            <h3 className="font-semibold mb-2" style={{ color: "#0B0B0B" }}>License</h3>
            <p className="text-sm" style={{ color: "#5E5E5F" }}>
              {product.licenseType || "Single-user commercial license. Use for your own projects. Do not redistribute."}
            </p>
          </div>
          <div className="rounded-xl border-2 p-6" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
            <h3 className="font-semibold mb-2" style={{ color: "#0B0B0B" }}>Delivery</h3>
            <p className="text-sm" style={{ color: "#5E5E5F" }}>
              Digital download. Access your files immediately after payment.{" "}
              <Link href="/digital-products/delivery-policy" className="underline" style={{ color: accent.text }}>Delivery policy</Link>
            </p>
          </div>
          <div className="rounded-xl border-2 p-6" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
            <h3 className="font-semibold mb-2" style={{ color: "#0B0B0B" }}>Refunds</h3>
            <p className="text-sm" style={{ color: "#5E5E5F" }}>
              Due to the digital nature of these products, refunds are limited.{" "}
              <Link href="/digital-products/refund-policy" className="underline" style={{ color: accent.text }}>Refund policy</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Product FAQ ────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0B0B0B" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {getProductFAQ(product).map((faq, i) => (
              <details key={i} className="group rounded-xl border-2 p-5" style={{ borderColor: "#0B0B0B", backgroundColor: "#FAF9F6" }}>
                <summary className="flex items-center justify-between cursor-pointer font-medium" style={{ color: "#0B0B0B" }}>
                  {faq.q}
                  <HelpCircle className="w-4 h-4 flex-shrink-0 group-open:rotate-180 transition-transform" style={{ color: "#5E5E5F" }} />
                </summary>
                <p className="mt-3 text-sm" style={{ color: "#5E5E5F" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────── */}
      {isActive && (
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0B0B0B" }}>
              Ready to stop guessing?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#5E5E5F" }}>
              Get {product.name} and start building more defensible project quotes.
            </p>
            <Link
              href={`/digital-products/${product.slug}/checkout`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{
                backgroundColor: "#0B0B0B",
                color: "#FAF9F6",
                borderColor: "#0B0B0B",
                boxShadow: "3px 3px 0px 0px #0B0B0B",
              }}
            >
              Get {product.name} — ${displayPrice}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function getProductFAQ(product: DigitalProduct) {
  const faqs = [
    {
      q: "What formats are included?",
      a: product.formats.join(", ") + ". All files are delivered as a downloadable ZIP package.",
    },
    {
      q: "Is this a subscription?",
      a: "No. This is a one-time purchase. You pay once and download the files. There are no recurring charges.",
    },
    {
      q: "Can I customise the files for my own use?",
      a: "Yes. You can modify the files for your own projects and workflow. The license restricts redistribution, not personal customisation.",
    },
    {
      q: "Can an agency use these internally?",
      a: "Yes. A single license covers internal use by one person or one agency. If multiple team members need separate copies, purchase additional licenses.",
    },
    {
      q: "Can I resell the files?",
      a: "No. Redistribution or resale of the original or modified files is not permitted under the license.",
    },
    {
      q: "Do they work in Google Sheets?",
      a: product.formats.includes("Excel workbook")
        ? "The workbooks are built in Excel. Google Sheets compatibility has not been independently verified. Excel is recommended for full functionality."
        : "Please check the product formats listed above.",
    },
    {
      q: "How are downloads delivered?",
      a: "After successful payment, you receive a secure download link on the confirmation page and via email. The link expires after 7 days with reasonable download limits.",
    },
    {
      q: "What happens if my payment succeeds but the download page fails?",
      a: "Check your email — the download link is also sent there. If you still have trouble, contact support for manual assistance.",
    },
  ];
  return faqs;
}
