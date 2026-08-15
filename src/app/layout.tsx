import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Onest } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PERSON_SCHEMA } from "@/config/site";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  colorScheme: "light",
};

const FALLBACK_BASE_URL = SITE_URL;

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  if (!host) return FALLBACK_BASE_URL;
  return `${proto}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrl();
  const base = new URL(baseUrl);

  return {
    title: {
      default: `${SITE_NAME} — Designer & Developer for Business Websites`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: base,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    openGraph: {
      title: `${SITE_NAME} — Designer & Developer for Business Websites`,
      description: SITE_DESCRIPTION,
      url: baseUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Aditya — Independent Web Designer & Frontend Developer based in Delhi, India",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Designer & Developer for Business Websites`,
      description: SITE_DESCRIPTION,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: baseUrl },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${onest.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <SiteShell>{children}</SiteShell>
        <Toaster />
      </body>
    </html>
  );
}
