// ============================================================
// POST /api/digital-products/orders — Create Order
// ============================================================
// Creates a pending order with server-owned pricing.
// The client NEVER sends amount, currency, price, or discount.
// The server determines the authoritative price from the catalog.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getServerProduct, getCheckoutData } from "@/lib/digital-products/server-catalog";
import { createRazorpayOrder } from "@/lib/digital-products/razorpay";

// ── Input Validation ──────────────────────────────────────────
// Deliberately does NOT accept amount, currency, price, or discount.
const createOrderSchema = z.object({
  productSlug: z.string(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
});

// ── POST Handler ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate input
    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productSlug, customerName, customerEmail } = parsed.data;

    // 2. Determine currency from env (server-owned)
    const currency = (process.env.STORE_CURRENCY ?? "INR").toUpperCase() as "USD" | "INR";

    // 3. Look up product using server catalog
    const serverProduct = getServerProduct(productSlug, currency);
    if (!serverProduct || serverProduct.status !== "active") {
      return NextResponse.json(
        { error: "Product not found or not available for purchase" },
        { status: 400 }
      );
    }

    // 4. Get server-owned checkout data (price determined by server, NOT client)
    const checkoutData = getCheckoutData(productSlug, currency);
    if (!checkoutData) {
      return NextResponse.json(
        { error: "Product not available for checkout" },
        { status: 400 }
      );
    }

    // 5. Convert price to smallest unit (cents/paise)
    // The checkoutData.priceInCents is already the server price in the currency's
    // whole unit (e.g. $29 or ₹1499). We need to convert to smallest unit.
    const amountInSmallestUnit = checkoutData.priceInCents * 100;

    // 6. Create pending order in database
    const order = await db.digitalProductOrder.create({
      data: {
        productId: serverProduct.id,
        productSlug,
        customerName,
        customerEmail,
        currency,
        amount: amountInSmallestUnit,
        status: "CREATED",
      },
    });

    // 7. Create Razorpay order
    const receipt = order.id.slice(0, 40); // Use internal order ID as receipt (max 40 chars)
    const razorpayOrder = await createRazorpayOrder(
      amountInSmallestUnit,
      currency,
      receipt
    );

    // 8. Update order with razorpayOrderId
    await db.digitalProductOrder.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    // 9. Return safe checkout data — NEVER return price or amount the client could manipulate
    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInSmallestUnit,
      currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[orders] Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
