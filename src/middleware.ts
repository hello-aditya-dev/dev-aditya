import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware: Host normalization
 *
 * Redirects bare domain (dev-aditya.com) to www subdomain
 * (www.dev-aditya.com) while preserving the full path and query string.
 *
 * Examples:
 *   dev-aditya.com/           → www.dev-aditya.com/
 *   dev-aditya.com/work       → www.dev-aditya.com/work
 *   dev-aditya.com/digital-products/web-project-pricing-os
 *     → www.dev-aditya.com/digital-products/web-project-pricing-os
 *   dev-aditya.com/contact?source=email
 *     → www.dev-aditya.com/contact?source=email
 *
 * This does NOT redirect every request to a fixed path.
 * It only normalises the host.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Only redirect the bare domain (without www) to www
  if (host === "dev-aditya.com") {
    url.hostname = "www.dev-aditya.com";
    // url.port remains empty (default 443 for https)
    return NextResponse.redirect(url, 308); // 308 = permanent, preserves method
  }

  return NextResponse.next();
}

// Run on all routes so the host check applies everywhere
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
