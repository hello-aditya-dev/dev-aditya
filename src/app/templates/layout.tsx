import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { TemplatesNav } from "@/components/templates/templates-nav";
import { TemplatesFooter } from "@/components/templates/templates-footer";
import { TemplatesStructuredData } from "@/components/templates/structured-data";

/**
 * /templates — route layout.
 *
 * This route renders its own local navigation and footer (visual clones
 * of the global chrome with a "Templates" item) so the global Navigation
 * and Footer components stay untouched for every other route. The root
 * layout's SiteShell detects /templates and steps out of the way — the
 * same established pattern the /digital-products store already uses.
 */

const TEMPLATES_TITLE =
  "Premium Framer Templates — AI, SaaS, Agency & Business | Aditya";
const TEMPLATES_DESCRIPTION =
  "Premium Framer website templates for AI companies, SaaS startups, agencies and modern businesses. Responsive, customizable and designed to launch quickly.";

export const metadata: Metadata = {
  title: { absolute: TEMPLATES_TITLE },
  description: TEMPLATES_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/templates`,
  },
  openGraph: {
    title: TEMPLATES_TITLE,
    description: TEMPLATES_DESCRIPTION,
    url: `${SITE_URL}/templates`,
    siteName: "Aditya",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/templates/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Premium websites. Ready to launch. — Aditya template collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TEMPLATES_TITLE,
    description: TEMPLATES_DESCRIPTION,
    images: ["/templates/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TemplatesStructuredData />
      <TemplatesNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <TemplatesFooter />
    </div>
  );
}
