# Worklog

## Task 2-a: Server-Side Digital Products Utility Files

**Agent**: code-agent
**Date**: 2025-01-24
**Status**: ✅ Completed

### Files Created

1. **`src/lib/digital-products/razorpay.ts`** — Razorpay REST API integration
   - `createRazorpayOrder(amount, currency, receipt)` — creates Razorpay order via REST API (not SDK), uses Basic auth with `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` env vars
   - `verifyPaymentSignature(orderId, paymentId, signature)` — HMAC-SHA256 verification with timing-safe comparison
   - `verifyWebhookSignature(rawBody, signature)` — webhook verification using `RAZORPAY_WEBHOOK_SECRET`
   - Key secret never exposed to client; uses Node.js `crypto` for all HMAC operations

2. **`src/lib/digital-products/download-token.ts`** — Signed download token utilities
   - `generateDownloadToken(orderId, productId, customerEmail)` — creates JWT-like HMAC-SHA256 signed token with 7-day expiry, base64url encoded (header.payload.signature format)
   - `verifyDownloadToken(token)` — verifies signature with timing-safe comparison and checks expiration; returns payload or null
   - Uses `DOWNLOAD_TOKEN_SECRET` env var

3. **`src/lib/digital-products/product-storage.ts`** — Secure file storage abstraction
   - `getSecureProductFile(productId)` — returns ReadStream + metadata for product ZIP from private directory, null if not found; path traversal protection
   - `getProductFilePath(productId)` — returns file path + name for Content-Disposition header
   - Files served from `PRODUCT_FILES_DIR` env var (fallback: `/home/z/my-project/private-products/`), keeping paid files out of `public/`

4. **`src/lib/digital-products/fulfilment.ts`** — Order fulfilment logic
   - `fulfilOrder(orderId)` — idempotent fulfilment: checks `fulfilmentSentAt`, marks order as PAID, generates download token, sends email, records timestamp
   - `sendFulfilmentEmail(order, downloadToken)` — sends purchase confirmation via Resend with thank you, product name, amount, order ref, download button, support email, refund policy link; NO ZIP attachments
   - Email failure caught gracefully — never blocks fulfilment
   - Uses `db` from `@/lib/db` for order lookup/update, `getProductBySlug`/`getServerPrice` from config

5. **`src/lib/digital-products/server-catalog.ts`** — Server-only product catalog
   - Marked with `import 'server-only'` to prevent client bundling
   - `getServerProduct(slug, currency)` — returns product with server-determined price
   - `getActiveServerProducts(currency)` — returns only active products with server prices
   - `getCheckoutData(slug, currency)` — returns checkout-safe data (name, slug, priceInCents, currency, formats, licenseType); only for active products; server determines price

### Packages Installed
- `server-only` — prevents server-only modules from being bundled client-side
- `resend` — transactional email service for fulfilment emails

### Security Measures
- Timing-safe comparison for all HMAC signature checks
- Path traversal protection in product file access
- Server-only catalog ensures client cannot set prices
- Download tokens are signed and expire after 7 days
- Razorpay key secret never exposed to client
- Product files stored outside public/ directory

---

## Task 6: Digital Products API Route Files

**Agent**: code-agent
**Date**: 2025-03-04
**Status**: ✅ Completed

### Files Created

1. **`src/app/api/digital-products/orders/route.ts`** — POST handler for creating orders
   - Zod validation: `{ productSlug, customerName (min 2), customerEmail (email) }`
   - Does NOT accept amount, currency, price, or discount from client
   - Looks up product via `getServerProduct` from server-catalog; returns 400 if not found/inactive
   - Gets server-owned price via `getCheckoutData` — price determined by server, not client
   - Currency from `STORE_CURRENCY` env (default "INR"); converts to smallest unit (cents/paise) × 100
   - Creates pending order in database with `db.digitalProductOrder.create`
   - Creates Razorpay order via `createRazorpayOrder`; updates local order with `razorpayOrderId`
   - Returns safe checkout data: `{ orderId, razorpayOrderId, amount, currency, keyId }` — never exposes manipulatable price

2. **`src/app/api/digital-products/verify/route.ts`** — POST handler for payment verification
   - Zod validation: `{ orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature }`
   - Looks up local order; returns 404 if not found
   - Verifies `razorpayOrderId` matches the one on the local order (mismatch → 400)
   - Verifies payment signature via `verifyPaymentSignature` (HMAC-SHA256); invalid → 400
   - Updates order: status → PAID, sets `razorpayPaymentId`, `razorpaySignature`, `paidAt`
   - Calls `fulfilOrder` (generates download token + sends email; idempotent)
   - Returns `{ success: true, orderId }`

3. **`src/app/api/digital-products/order-status/route.ts`** — GET handler for order status
   - Gets `orderId` from query params; returns 400 if missing
   - Looks up order in database; returns 404 if not found
   - If order is PAID and `fulfilmentSentAt` is set, generates download URL via `generateDownloadToken`
   - Download URL: `/api/digital-products/download/[token]`
   - Returns `{ status, productName, customerEmail, downloadUrl? }`; product name from config

4. **`src/app/api/digital-products/webhook/razorpay/route.ts`** — POST handler for Razorpay webhooks
   - Gets raw body as text (does NOT JSON parse before signature verification)
   - Gets `X-Razorpay-Signature` header; verifies via `verifyWebhookSignature`
   - Invalid signature → 400
   - Parses JSON body after verification
   - Idempotency: checks `paymentWebhookEvent.findUnique` on `eventId`; returns 200 if duplicate
   - Stores event in `paymentWebhookEvent` table
   - Handles event types using `after()` from `next/server` for non-blocking work:
     - `payment.captured`: finds order by `razorpay_order_id`, marks PAID if not already, triggers fulfilment
     - `payment.failed`: finds order, marks FAILED
     - `refund.created` / `refund.processed`: finds order, marks REFUNDED, sets `refundedAt`
   - Returns 200 promptly (doesn't hold response for email sending)

5. **`src/app/api/digital-products/download/[token]/route.ts`** — GET handler for secure file download
   - Gets token from route params
   - Verifies token via `verifyDownloadToken` (HMAC-SHA256 signature + expiry check); invalid/expired → 403
   - Looks up order by `orderId` from token payload; not found → 403
   - Verifies order status is PAID; not paid → 403
   - Verifies product entitlement: `productId` from token matches order's `productId`; mismatch → 403
   - Increments `downloadCount` and sets `lastDownloadAt` on order
   - Gets product file via `getSecureProductFile`; not found → 404
   - Streams file as Response with headers:
     - `Content-Type: application/zip`
     - `Content-Disposition: attachment; filename="[product-name].zip"`
     - `Cache-Control: no-store, no-cache, must-revalidate`
   - Converts Node.js ReadStream to Web ReadableStream for streaming

### Security Measures
- Server-owned pricing: client never sends amount/price/discount
- Zod validation on all inputs
- HMAC-SHA256 signature verification for payments, webhooks, and download tokens
- Webhook idempotency via event deduplication
- Download token expiry (7 days) and product entitlement verification
- `after()` for non-blocking fulfilment work in webhook handler
- No internal error details exposed to client (generic error messages)
- Path traversal protection inherited from product-storage.ts
- Cache-Control headers prevent download URL caching

---
Task ID: 1-11
Agent: main
Task: Implement complete digital products store at /digital-products and push to GitHub

Work Log:
- Read and analyzed full implementation spec from pasted content (3878 lines)
- Explored existing project structure and dependencies
- Created product catalog source of truth at src/config/digital-products.ts with all 9 products (5 tools, 3 bundles, 1 template)
- Updated Prisma schema with DigitalProductOrder and PaymentWebhookEvent models
- Ran db:push to sync database schema
- Created 5 server-side utility files (razorpay, download-token, product-storage, fulfilment, server-catalog)
- Created 9 UI components (store-hero, product-card, bundle-card, workflow-section, why-section, store-faq, scope-creep-calculator, store-footer, store-nav)
- Built store homepage at /digital-products with all 10 sections
- Built product detail page at /digital-products/[slug] with full content hierarchy
- Built checkout page with Razorpay Standard Checkout integration
- Built success page with secure download flow
- Built 5 API routes (orders, verify, order-status, webhook/razorpay, download/[token])
- Added delivery-policy and refund-policy legal pages
- Added paper-grain CSS, paper-card, hard-shadow utilities to globals.css
- Added SEO metadata (title, description, canonical, OpenGraph) for all store pages
- Fixed named export import issues across multiple files
- Fixed shadcn/ui component references for target repo compatibility
- Browser verified all pages render correctly (homepage, product detail, checkout, policies)
- Lint passes clean with zero errors
- Cloned target GitHub repo, copied and adapted all files for target conventions
- Replaced shadcn/ui components (Sheet, Button, Accordion, Input, Label, Badge) with native HTML
- Created file-based order store (order-store.ts) as development replacement for Prisma
- Updated sitemap.ts to include store URLs for active products
- Created .env.example with all required env vars
- Created docs/LAUNCH-CHECKLIST.md with production requirements
- Updated support email to work@dev-aditya.com
- Successfully pushed commit ee9e5dc to github.com/witejackel-eng/dev-aditya-paperfolio main

Stage Summary:
- Complete digital products store implemented and pushed to GitHub
- 37 files changed, 4793 insertions in target repo
- Portfolio boundary fully preserved — no modifications to existing nav, footer, homepage, or work pages
- Store accessible at /digital-products via direct link
- Razorpay integration with server-side price determination, signature verification, webhook handling
- Secure download tokens with HMAC-SHA256 signing, 7-day expiry
- Production deployment requires: database upgrade, env vars, product files, owner approval of refund policy
