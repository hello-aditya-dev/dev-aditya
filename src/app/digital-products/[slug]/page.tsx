import { notFound } from "next/navigation";
import { digitalProducts, getProductBySlug, accentColors, SITE_ORIGIN } from "@/config/digital-products";
import type { Metadata } from "next";
import ProductDetailClient from "./product-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return digitalProducts
    .filter((p) => p.status !== "hidden")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const isActive = product.status === "active";
  const url = `${SITE_ORIGIN}/digital-products/${product.slug}`;

  return {
    title: product.seo.title,
    description: product.seo.description,
    robots: isActive
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: isActive
      ? {
          title: product.seo.title,
          description: product.seo.description,
          url,
          siteName: "Aditya",
          type: "website",
          images: [
            {
              url: `${SITE_ORIGIN}/og/pricing-os-og.png`,
              width: 1344,
              height: 768,
              alt: product.seo.title,
            },
          ],
        }
      : undefined,
    twitter: isActive
      ? {
          card: "summary_large_image",
          title: product.seo.title,
          description: product.seo.description,
          images: [`${SITE_ORIGIN}/og/pricing-os-og.png`],
        }
      : undefined,
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.status === "hidden") {
    notFound();
  }

  const isActive = product.status === "active";
  const productUrl = `${SITE_ORIGIN}/digital-products/${product.slug}`;

  // ── JSON-LD Structured Data ──────────────────────────
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
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  // Only emit Product schema for active products — no fake ratings/reviews
  const productSchema = isActive
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.seo.description,
        url: productUrl,
        brand: { "@type": "Brand", name: "Aditya" },
        offers: {
          "@type": "Offer",
          price: String(product.launchPrice ?? product.regularPrice),
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: productUrl,
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailClient product={product} />
    </>
  );
}
