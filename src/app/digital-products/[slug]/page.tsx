import { notFound } from "next/navigation";
import { digitalProducts, getProductBySlug, accentColors } from "@/config/digital-products";
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

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `https://dev-aditya.com/digital-products/${product.slug}`,
      siteName: "Aditya",
      type: "website",
    },
    alternates: {
      canonical: `https://dev-aditya.com/digital-products/${product.slug}`,
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
