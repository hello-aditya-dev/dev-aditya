import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/config/digital-products";
import { StoreNav } from "@/components/digital-products/store-nav";
import { StoreFooter } from "@/components/digital-products/store-footer";

export const metadata: Metadata = {
  title: "Digital Products for Web Designers & Agencies | Aditya",
  description:
    "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
  openGraph: {
    title: "Digital Products for Web Designers & Agencies | Aditya",
    description:
      "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
    url: `${SITE_ORIGIN}/digital-products`,
    siteName: "Aditya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Products for Web Designers & Agencies | Aditya",
    description:
      "Pricing systems, agency operations tools and website templates for web designers, developers and small studios.",
  },
  alternates: {
    canonical: `${SITE_ORIGIN}/digital-products`,
  },
};

export default function DigitalProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F6" }}>
      <StoreNav />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
}
