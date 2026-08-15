import type { MetadataRoute } from "next";
import { digitalProducts, SITE_ORIGIN } from "@/config/digital-products";

const BASE_URL = SITE_ORIGIN;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Store homepage
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/digital-products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Only include ACTIVE products (not coming-soon, hidden, sold-out)
  // Coming-soon products have thin placeholder pages — do NOT index them
  const activeProducts = digitalProducts.filter((p) => p.status === "active");

  for (const product of activeProducts) {
    entries.push({
      url: `${BASE_URL}/digital-products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Only include ACTIVE bundles
  const activeBundles = digitalProducts.filter(
    (p) => p.status === "active" && p.type === "bundle"
  );

  for (const bundle of activeBundles) {
    entries.push({
      url: `${BASE_URL}/digital-products/${bundle.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
