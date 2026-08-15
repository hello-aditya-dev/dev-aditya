import { notFound } from "next/navigation";
import { getProductBySlug } from "@/config/digital-products";
import type { Metadata } from "next";
import CheckoutClient from "./checkout-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `Checkout — ${product.name} | Aditya`,
    description: `Purchase ${product.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.status !== "active") {
    notFound();
  }

  return <CheckoutClient product={product} />;
}
