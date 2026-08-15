// ============================================================
// GET /api/digital-products/download/[token] — Secure File Download
// ============================================================
// Verifies signed download token, checks order status, and streams
// the product ZIP file with proper headers.
// Token is HMAC-SHA256 signed and expires after 7 days.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyDownloadToken } from "@/lib/digital-products/download-token";
import { getSecureProductFile } from "@/lib/digital-products/product-storage";
import { getProductBySlug } from "@/config/digital-products";

// ── GET Handler ───────────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // 1. Get token from params
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Missing download token" },
        { status: 400 }
      );
    }

    // 2. Verify token using HMAC-SHA256 signature check + expiry
    const tokenPayload = verifyDownloadToken(token);

    if (!tokenPayload) {
      return NextResponse.json(
        { error: "Invalid or expired download link" },
        { status: 403 }
      );
    }

    // 3. Look up order in database using orderId from token payload
    const order = await db.digitalProductOrder.findUnique({
      where: { id: tokenPayload.orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 403 }
      );
    }

    // 4. Verify order is PAID
    if (order.status !== "PAID") {
      return NextResponse.json(
        { error: "Order is not paid" },
        { status: 403 }
      );
    }

    // 5. Verify product matches entitlement (productId from token matches order's productId)
    if (tokenPayload.productId !== order.productId) {
      return NextResponse.json(
        { error: "Product entitlement mismatch" },
        { status: 403 }
      );
    }

    // 6. Increment download count on order
    await db.digitalProductOrder.update({
      where: { id: order.id },
      data: {
        downloadCount: { increment: 1 },
        lastDownloadAt: new Date(),
      },
    });

    // 7. Get product file
    const productFile = getSecureProductFile(order.productId);

    if (!productFile) {
      return NextResponse.json(
        { error: "Product file not found" },
        { status: 404 }
      );
    }

    // 8. Determine filename for Content-Disposition header
    const product = getProductBySlug(order.productSlug);
    const downloadFileName = product
      ? `${product.name.replace(/[^a-zA-Z0-9-_ ]/g, "")}.zip`
      : productFile.fileName;

    // 9. Stream the file as a Response with proper headers
    // Convert Node.js ReadStream to a Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        const stream = productFile.stream;

        stream.on("data", (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk));
        });

        stream.on("end", () => {
          controller.close();
        });

        stream.on("error", (err: Error) => {
          console.error("[download] Stream error:", err);
          controller.error(err);
        });
      },
    });

    return new Response(readableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${downloadFileName}"`,
        "Content-Length": String(productFile.fileSize),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("[download] Error serving download:", error);
    return NextResponse.json(
      { error: "Failed to download file. Please try again." },
      { status: 500 }
    );
  }
}
