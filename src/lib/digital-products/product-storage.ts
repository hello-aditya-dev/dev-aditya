// ============================================================
// Product File Storage — Secure File Access Abstraction
// ============================================================
// Keeps paid product files OUT of the public/ directory.
// Reads from a private directory on the server filesystem.
// In production, this could be replaced with S3/GCS/R2 calls.

import fs from "node:fs";
import path from "node:path";
import { ReadStream } from "node:fs";

// ── Configuration ────────────────────────────────────────────
const PRODUCT_FILES_DIR =
  process.env.PRODUCT_FILES_DIR ?? "/home/z/my-project/private-products/";

// ── Types ────────────────────────────────────────────────────
export interface ProductFileResult {
  stream: ReadStream | Buffer;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

// ── Helpers ──────────────────────────────────────────────────
/**
 * Resolves the file path for a given product ID.
 * Follows naming convention: {PRODUCT_FILES_DIR}/{productId}.zip
 */
function resolveProductPath(productId: string): string {
  // Prevent path traversal: strip any directory separators or dots
  const safeProductId = productId.replace(/[\/\\\.]/g, "");
  if (!safeProductId) {
    throw new Error(`Invalid productId: "${productId}"`);
  }
  return path.join(PRODUCT_FILES_DIR, `${safeProductId}.zip`);
}

// ── File Access ──────────────────────────────────────────────
/**
 * Returns a ReadStream for the product ZIP file.
 * Returns null if the file does not exist.
 *
 * @param productId - The product ID/slug
 * @returns ProductFileResult with stream and metadata, or null
 */
export function getSecureProductFile(productId: string): ProductFileResult | null {
  const filePath = resolveProductPath(productId);

  try {
    // Check file exists and get stats
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return null;
    }

    const stream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    return {
      stream,
      filePath,
      fileName,
      fileSize: stats.size,
      mimeType: "application/zip",
    };
  } catch (error) {
    // File doesn't exist or is inaccessible
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    // Re-throw unexpected errors (permissions, etc.)
    throw new Error(
      `Failed to access product file for "${productId}": ${(error as Error).message}`
    );
  }
}

/**
 * Returns the file path and name for Content-Disposition header.
 * Useful when you need the path but want to manage the stream yourself.
 *
 * @param productId - The product ID/slug
 * @returns Object with filePath and fileName, or null if file doesn't exist
 */
export function getProductFilePath(
  productId: string
): { filePath: string; fileName: string } | null {
  const filePath = resolveProductPath(productId);

  try {
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return null;
    }

    return {
      filePath,
      fileName: path.basename(filePath),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw new Error(
      `Failed to resolve product file path for "${productId}": ${(error as Error).message}`
    );
  }
}
