import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { TemplatesStructuredData } from "@/components/templates/structured-data";

/**
 * /templates — route layout.
 *
 * SEO metadata + the templates ItemList JSON-LD. The shared site chrome
 * (Navigation with the site-wide Templates item + Footer) is provided by
 * the root layout's SiteShell, exactly like every other page.
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
    <>
      <TemplatesStructuredData />
      {children}
    </>
  );
}
