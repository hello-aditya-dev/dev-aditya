// ============================================================
// GET /api/digital-products/order-status — Check Order Status
// ============================================================
// Returns order status and a download URL if the order is paid
// and fulfilment has been completed.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateDownloadToken } from "@/lib/digital-products/download-token";
import { getProductBySlug } from "@/config/digital-products";

// ── GET Handler ───────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    // 1. Get orderId from query params
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId query parameter is required" },
        { status: 400 }
      );
    }

    // 2. Look up order in database
    const order = await db.digitalProductOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 3. Get product name from config
    const product = getProductBySlug(order.productSlug);
    const productName = product?.name ?? order.productSlug;

    // 4. If order is PAID and fulfilment has been sent, generate download URL
    let downloadUrl: string | undefined;

    if (order.status === "PAID" && order.fulfilmentSentAt) {
      const token = generateDownloadToken(
        order.id,
        order.productId,
        order.customerEmail
      );
      downloadUrl = `/api/digital-products/download/${token}`;
    }

    // 5. Return order status data
    return NextResponse.json({
      status: order.status,
      productName,
      customerEmail: order.customerEmail,
      ...(downloadUrl ? { downloadUrl } : {}),
    });
  } catch (error) {
    console.error("[order-status] Error checking order status:", error);
    return NextResponse.json(
      { error: "Failed to check order status. Please try again." },
      { status: 500 }
    );
  }
}
