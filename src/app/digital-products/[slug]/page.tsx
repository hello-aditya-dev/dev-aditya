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
        }
      : undefined,
    twitter: isActive
      ? {
          card: "summary_large_image",
          title: product.seo.title,
          description: product.seo.description,
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

  return <ProductDetailClient product={product} />;
}
