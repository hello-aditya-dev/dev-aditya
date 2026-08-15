// ============================================================
// Server-Only Product Catalog — Server-Owned Prices
// ============================================================
// This module is server-only. It ensures product prices are
// determined by the server, NOT the client. The client can
// display prices for UX, but checkout MUST use server prices.

import "server-only";

import {
  getProductBySlug,
  getActiveProducts,
  getServerPrice,
  type DigitalProduct,
} from "@/config/digital-products";

// ── Types ────────────────────────────────────────────────────
export interface ServerProduct extends DigitalProduct {
  /** Server-determined price in the requested currency (smallest unit) */
  serverPrice: number;
  /** The currency this server price is in */
  priceCurrency: "USD" | "INR";
}

export interface CheckoutData {
  name: string;
  slug: string;
  /** Price in smallest currency unit (cents/paise) */
  priceInCents: number;
  currency: "USD" | "INR";
  formats: string[];
  licenseType: string;
}

// ── Server Product Access ────────────────────────────────────
/**
 * Returns a product with server-owned prices.
 * The server determines the authoritative price, not the client.
 *
 * @param slug     - Product slug
 * @param currency - Currency for pricing (default: USD)
 * @returns Product with serverPrice, or null if not found
 */
export function getServerProduct(
  slug: string,
  currency: "USD" | "INR" = "USD"
): ServerProduct | null {
  const product = getProductBySlug(slug);
  if (!product) {
    return null;
  }

  const serverPrice = getServerPrice(product, currency);

  return {
    ...product,
    serverPrice,
    priceCurrency: currency,
  };
}

// ── Active Products ──────────────────────────────────────────
/**
 * Returns only active products with server-owned prices.
 * Filters out "coming-soon", "hidden", and "sold-out" products.
 *
 * @param currency - Currency for pricing (default: USD)
 * @returns Array of active products with server prices
 */
export function getActiveServerProducts(
  currency: "USD" | "INR" = "USD"
): ServerProduct[] {
  const active = getActiveProducts();

  return active.map((product) => ({
    ...product,
    serverPrice: getServerPrice(product, currency),
    priceCurrency: currency,
  }));
}

// ── Checkout Data ────────────────────────────────────────────
/**
 * Returns product data safe for checkout.
 * Only includes the fields needed to create a payment —
 * the server determines price, NOT the client.
 *
 * @param slug     - Product slug
 * @param currency - Currency for checkout
 * @returns Checkout-safe product data, or null if product not found/inactive
 */
export function getCheckoutData(
  slug: string,
  currency: "USD" | "INR"
): CheckoutData | null {
  const product = getProductBySlug(slug);

  if (!product) {
    return null;
  }

  // Only allow active products for checkout
  if (product.status !== "active") {
    return null;
  }

  const priceInCents = getServerPrice(product, currency);

  return {
    name: product.name,
    slug: product.slug,
    priceInCents,
    currency,
    formats: product.formats,
    licenseType: product.licenseType ?? "Single-user commercial license",
  };
}
