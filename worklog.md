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

---
Task ID: continuation
Agent: main
Task: Update git author to witejackel-eng <witejackel@gmail.com> and re-push to GitHub

Work Log:
- Configured git user.name and user.email locally
- Rewrote all commit history using git filter-branch to set author to witejackel-eng <witejackel@gmail.com>
- Added GitHub remote with PAT authentication
- Force-pushed to github.com/witejackel-eng/dev-aditya-paperfolio main (commit 03c06b0)
- Cleaned remote URL to remove embedded PAT
- Verified site renders correctly via agent-browser (store homepage + product detail page)
- Lint passes clean

Stage Summary:
- All commits now authored by witejackel-eng <witejackel@gmail.com>
- Successfully pushed to GitHub with correct author attribution
- Site verified working: /digital-products store homepage, product detail pages, checkout, policies all render correctly

---
Task ID: p10-12
Agent: sub-agent
Task: Fix nav anchor mismatches, copyright year, and centralize support email (Phases 10-12)

Work Log:

**Phase 10 — Fix store navigation anchor mismatches**
- Identified mismatches in store-nav.tsx: `Products → #products` (should be `#tools`), `Templates → #workflow` (should be `#templates`)
- Identified mismatch in store-footer.tsx: `Products → /digital-products#products` (should be `/digital-products#tools`)
- Fixed NAV_LINKS in store-nav.tsx: `Agency Tools → #tools`, `Bundles → #bundles`, `Templates → #templates`
- Fixed FOOTER_LINKS in store-footer.tsx: `Agency Tools → /digital-products#tools`
- Converted `<button>` elements to `<a href="#...">` anchor links in both desktop and mobile nav, with `e.preventDefault()` + smooth scroll via JS for enhanced UX, while keeping native anchor semantics for deep linking, accessibility, and no-JS fallback

**Phase 11 — Fix copyright year**
- Changed hardcoded `© 2025 Aditya` to dynamic `© {new Date().getFullYear()} Aditya`
- Removed `'use client'` directive from store-footer.tsx (no client-side interactivity needed — Link works in server components)
- Year now computed server-side, avoiding hydration mismatch entirely

**Phase 12 — Support email centralization**
- Added `export const SUPPORT_EMAIL = "work@dev-aditya.com"` to src/config/digital-products.ts (matches worklog intent)
- Updated all files to import SUPPORT_EMAIL from config:
  - src/app/digital-products/success/success-client.tsx: import + use in mailto link and button text
  - src/app/digital-products/delivery-policy/page.tsx: import + use in 2 mailto links
  - src/app/digital-products/[slug]/checkout/checkout-client.tsx: import + use in mailto link
  - src/app/digital-products/refund-policy/page.tsx: import + use in 3 mailto links
  - src/lib/digital-products/fulfilment.ts: import + use as env var fallback (`process.env.SUPPORT_EMAIL ?? SUPPORT_EMAIL`), also fixed REFUND_POLICY_URL path to include `/digital-products/` prefix

- Lint passes clean with zero errors

Files Modified:
1. src/components/digital-products/store-nav.tsx
2. src/components/digital-products/store-footer.tsx
3. src/config/digital-products.ts
4. src/app/digital-products/success/success-client.tsx
5. src/app/digital-products/delivery-policy/page.tsx
6. src/app/digital-products/[slug]/checkout/checkout-client.tsx
7. src/app/digital-products/refund-policy/page.tsx
8. src/lib/digital-products/fulfilment.ts

---
Task ID: p2
Agent: sub-agent
Task: Remove ALL Z.ai residue from the entire codebase (Phase 2)

Work Log:

**1. Comprehensive search for Z.ai residue patterns**
- Searched entire `src/` directory for: Z.ai, Zai, z.ai, chat.z.ai, z-cdn, Code Scaffold, AI-powered development, Z.ai Team, AI development, chatglm
- Found 12 instances — all concentrated in `src/app/layout.tsx`
- No Z.ai residue found in: components, config, lib, digital-products pages, API routes, public folder, robots.txt

**2. Fixed root layout.tsx metadata** (`src/app/layout.tsx`)
- Replaced title: "Z.ai Code Scaffold - AI-Powered Development" → "Aditya — Digital Products for Web Designers & Agencies"
- Replaced description: removed "Next.js scaffold optimized for AI-powered development with Z.ai. Built with TypeScript, Tailwind CSS, and shadcn/ui." → buyer-language description matching store positioning
- Replaced keywords: removed ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"] → ["web design tools", "agency tools", "pricing calculator", "scope creep", "client onboarding", "digital products", "web designer resources"]
- Replaced authors: "Z.ai Team" → "Aditya"
- Replaced favicon icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg" → "/logo.svg" (local asset, no Z.ai CDN)
- Replaced openGraph.title: "Z.ai Code Scaffold" → "Aditya — Digital Products for Web Designers & Agencies"
- Replaced openGraph.description: "AI-powered development with modern React stack" → buyer-language description
- Replaced openGraph.url: "https://chat.z.ai" → "https://dev-aditya.com"
- Replaced openGraph.siteName: "Z.ai" → "Aditya"
- Replaced twitter.title: "Z.ai Code Scaffold" → "Aditya — Digital Products for Web Designers & Agencies"
- Replaced twitter.description: "AI-powered development with modern React stack" → buyer-language description

**3. Fixed store layout metadata** (`src/app/digital-products/layout.tsx`)
- Added twitter card metadata (was missing): summary_large_image card with proper title and buyer-language description

**4. Fixed package.json**
- Replaced scaffold name: "nextjs_tailwind_shadcn_ts" → "dev-aditya"
- Removed dependency: "z-ai-web-dev-sdk": "^0.0.18"
- Ran `bun install` to update bun.lock (1 package removed)

**5. Verified all other files are clean**
- All store pages (product detail, checkout, success, delivery-policy, refund-policy): already use "Aditya" and dev-aditya.com — no Z.ai residue
- All components: clean — no Z.ai references
- All config files: clean
- public/robots.txt: clean
- No manifest.ts, sitemap.ts, or not-found/error pages exist in the project
- No JSON-LD structured data found in codebase

**6. Final verification**
- Re-searched entire `src/` for all Z.ai patterns: ZERO matches
- Re-searched for "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui" in metadata: ZERO matches
- Re-searched for "z-ai-web-dev-sdk" in all source + lock files: ZERO matches
- Re-searched for "scaffold" in src: ZERO matches
- `bun run lint` passes clean with zero errors

Files Modified:
1. src/app/layout.tsx (root metadata — all Z.ai residue removed, favicon fixed, author/site set to Aditya)
2. src/app/digital-products/layout.tsx (added twitter metadata)
3. package.json (name + removed z-ai-web-dev-sdk dependency)
4. bun.lock (auto-updated via bun install)

---
Task ID: p8
Agent: sub-agent
Task: Fix product content accuracy and data model (Phase 8)

Work Log:

**1. Data model restructure — eliminated features[]/outcomes[] pairing bug**
- Replaced separate `features: string[]` and `outcomes: string[]` arrays with structured `features: ProductFeature[]` objects where each feature carries its own `name` and `description`
- Added `ProductFeature` interface: `{ name: string; description: string }`
- Removed `outcomes` field from `DigitalProduct` interface entirely
- This eliminates the index-position pairing bug where `features[i]` was incorrectly paired with `outcomes[i]`, causing mismatched feature-outcome relationships (e.g., Change Order feature beside a tier-comparison benefit)

**2. Accurate feature descriptions for Web Project Pricing OS (11 features)**
- Scope Builder: Select project deliverables and activities to define what the project includes and excludes.
- Hours Engine: Assign estimated hours to each scope item so you can see total workload before you price.
- Cost Engine: Calculate delivery cost from estimated hours and your team's cost rates.
- Price Engine: Apply a margin target to delivery cost and generate the recommended project price.
- Quote Builder: Assemble scope, pricing and terms into a client-ready project quote.
- Essential / Recommended / Premium Tiers: Generate three pricing tiers for the same scope so the client can choose their level of investment.
- Scope Creep Modeller: Add unplanned hours to a live project and see the impact on margin and effective rate.
- Change Order Calculator: Quantify the cost of client-requested changes and produce a change-order amount to present.
- Project Actuals: Record actual hours after delivery to compare your estimate against what really happened.
- Project Database: Store completed project data so you can reference past projects when estimating new ones.
- Dashboard: See summary metrics across projects — average margin, scope-creep frequency, and effective rate.
- Added Cost Engine and Quote Builder (were missing from original features list)
- Separated "Project Actuals Tracker" into "Project Actuals" + "Project Database" + "Dashboard" for clarity
- All descriptions describe what each part DOES without overpromising unimplemented functionality

**3. Accurate feature descriptions for all other products**
- Scope & Proposal OS: 4 features with descriptions (Discovery Questionnaire, Scope Builder, Proposal Generator, Exclusions Tracker)
- Client Onboarding OS: 4 features with descriptions (Client Intake Form, Onboarding Checklist, Milestone Tracker, Welcome Packet Generator)
- Website QA & Launch OS: 4 features with descriptions (Pre-Launch QA Checklist, Cross-Browser Testing Guide, Launch Sequence, Post-Launch Verification)
- Agency Profit & Capacity OS: 4 features with descriptions (Profit Tracker, Overhead Allocator, Capacity Modeller, Growth Planner)
- Agency Starter Bundle: 4 features describing the bundle outcome (structured discovery, defensible pricing, professional proposals, consistent onboarding)
- Agency Operations Bundle: 4 features describing the bundle outcome (complete lifecycle, consistent quality, real profitability, capacity planning)
- Template + Delivery Bundle: 4 features describing the bundle outcome (production-ready template, client pricing, onboarding, QA/launch)
- Accounting/CFO Template: 4 features with descriptions (multi-page structure, service area sections, team/profile layouts, contact and intake forms)

**4. Updated pricing per Phase 15 approved pricing**
- Web Project Pricing OS: Launch $29, Normal $49 ✓ (unchanged)
- Scope & Proposal OS: Launch $29, Normal $39 (was: no launch, normal $49)
- Client Onboarding OS: Launch $29, Normal $39 (was: no launch, normal $39)
- Website QA & Launch OS: Launch $29, Normal $39 (was: no launch, normal $39)
- Agency Profit & Capacity OS: Launch $39, Normal $59 (was: no launch, normal $49)
- Agency Starter Bundle: Launch $69, Normal $99 ✓ (unchanged)
- Agency Operations Bundle: Launch $99, Normal $149 ✓ (unchanged)
- Template + Delivery Bundle: Launch $129, Normal $169 ✓ (unchanged)
- Accounting/CFO Template: Launch $49, Normal $79 (was: no launch, normal $79)
- Updated currencyPrices (USDLaunch, INR) for all changed products

**5. Product statuses verified**
- Only Web Project Pricing OS: status "active" (only product with actual artifact)
- All other products: status "coming-soon" (no actual workbook/template files yet)

**6. Removed "Coming soon" text for products with pricing set**
- product-detail-client.tsx: "Coming soon" badge only shows when `isComingSoon && !(launchPrice || regularPrice)` — products with pricing no longer display "Coming soon"
- product-card.tsx: Same logic — coming-soon products with pricing now show price + "View" link instead of "Coming soon" badge

**7. Updated all consuming components for new data model**
- product-detail-client.tsx: `feature` (string) → `feature.name` + `feature.description`; removed `product.outcomes[i]` reference; key changed from `feature` to `feature.name`
- product-card.tsx: `product.outcomes[0]` → `product.features[0]?.description`; key unchanged
- page.tsx (store homepage): `feature` (string) → `feature.name`; key changed from `feature` to `feature.name`

**8. Lint verification**
- `bun run lint` passes clean with zero errors

Files Modified:
1. src/config/digital-products.ts (interface restructure, all product data, pricing updates)
2. src/app/digital-products/[slug]/product-detail-client.tsx (structured features, conditional Coming soon)
3. src/components/digital-products/product-card.tsx (structured features, conditional Coming soon + View link)
4. src/app/digital-products/page.tsx (structured features in featured product section)

---
Task ID: p4-6
Agent: sub-agent
Task: Fix sitemap, robots, OG — Phases 4-6

Work Log:

**Phase 4 — Fix sitemap.xml**

- No src/app/sitemap.ts existed — created one using Next.js Metadata API `sitemap()` function
- Returns `MetadataRoute.Sitemap` array with proper entries
- Includes: /digital-products (priority 0.9), every ACTIVE product (web-project-pricing-os, priority 0.8)
- No active bundles currently — none included
- Does NOT include: checkout, success, API routes, download routes, payment verification, webhook, order status, internal pages, noindex pages
- Coming-soon products with thin placeholder pages are NOT indexed
- All URLs use canonical host: https://www.dev-aditya.com
- Each entry has lastModified, changeFrequency, and priority

**Phase 5 — Robots + indexing**

- Updated public/robots.txt:
  - Added `Disallow: /api/` to block all API routes from crawling
  - Added `Disallow: /digital-products/checkout` and `Disallow: /digital-products/success` to block noindex routes
  - Added `Sitemap: https://www.dev-aditya.com/sitemap.xml` directive
- Updated src/app/digital-products/[slug]/page.tsx:
  - Active products: `robots: { index: true, follow: true }` — explicit allow
  - Coming-soon products: `robots: { index: false, follow: false }` — noindex thin placeholder pages
- Checkout page already had `robots: { index: false, follow: false }` ✓
- Success page already had `robots: { index: false, follow: false }` ✓
- Store homepage /digital-products defaults to index, follow ✓

**Phase 6 — Fix social metadata**

- Updated all canonical URLs from `https://dev-aditya.com` to `https://www.dev-aditya.com` across:
  - src/app/layout.tsx (root OG url)
  - src/app/digital-products/layout.tsx (store OG url + canonical)
  - src/app/digital-products/[slug]/page.tsx (product OG url + canonical)
  - src/app/digital-products/delivery-policy/page.tsx (canonical)
  - src/app/digital-products/refund-policy/page.tsx (canonical)
- Added Twitter card metadata to product detail page:
  - Active products get `twitter: { card: "summary_large_image", title, description }`
  - Coming-soon products omit Twitter metadata (noindex pages don't need social preview)
- Active products get full OG metadata; coming-soon products omit OG (noindex)
- Verified store homepage metadata matches spec: title="Digital Products for Web Designers & Agencies | Aditya" ✓
- Verified Web Project Pricing OS metadata: title="Web Project Pricing OS — Website Pricing Calculator for Agencies", description="Scope website projects, estimate workload, calculate margins, model scope creep and build more defensible client quotes." ✓
- Checkout: noindex, nofollow, omits social preview metadata ✓
- Success: noindex, nofollow ✓
- No scaffold content or Z.ai values in any metadata ✓

- `bun run lint` passes clean with zero errors

Files Created:
1. src/app/sitemap.ts (Next.js Metadata API sitemap function)

Files Modified:
1. public/robots.txt (added Disallow for /api/, checkout, success; added Sitemap directive)
2. src/app/digital-products/[slug]/page.tsx (robots directives by status, Twitter metadata, www canonical URLs)
3. src/app/layout.tsx (www canonical URL)
4. src/app/digital-products/layout.tsx (www canonical URLs)
5. src/app/digital-products/delivery-policy/page.tsx (www canonical URL)
6. src/app/digital-products/refund-policy/page.tsx (www canonical URL)

---
Task ID: p33
Agent: sub-agent
Task: Fix No-JS / Hydration Safety — Phase 33

Work Log:

**Problem**: Animated hero content rendered server-side with `opacity: 0` via framer-motion `initial` state. If JavaScript fails or hydration is delayed, critical content (headlines, CTAs, pricing) permanently disappears.

**Audit results across 9 files**:

1. **store-hero.tsx** — CRITICAL: Container variant `hidden: { opacity: 0 }` and item variant `hidden: { opacity: 0, y: 20 }` made hero headline, description, and CTA buttons invisible until JS animation fires. Fixed: changed `container.hidden` to `{ opacity: 1 }` and `item.hidden` to `{ opacity: 1, y: 8 }`. Content now always visible; animation adds subtle 8px slide-up enhancement. Decorative workflow step cards (`initial={{ opacity: 0, x: 20 }}`) and project health strip (`initial={{ opacity: 0, y: 10 }}`) kept as-is — purely visual, non-critical.

2. **product-card.tsx** — SAFE: Only uses `whileHover={{ y: -4 }}`, no `initial={{ opacity: 0 }}`. Content always visible. ✅

3. **bundle-card.tsx** — SAFE: Only uses `whileHover={{ y: -4 }}`, no `initial={{ opacity: 0 }}`. Content always visible. ✅

4. **workflow-section.tsx** — Fixed: Container variant `hidden: { opacity: 0 }` and item variant `hidden: { opacity: 0, y: 16 }}` made section heading and all stage cards invisible until `whileInView` fires. Changed to `container.hidden: { opacity: 1 }`, `item.hidden: { opacity: 1, y: 8 }`, and heading `initial` from `{ opacity: 0, y: 16 }` to `{ opacity: 1, y: 8 }`.

5. **why-section.tsx** — Fixed: Both `motion.div` columns used `initial={{ opacity: 0, y: 16 }}` with `whileInView`. Changed both to `initial={{ opacity: 1, y: 8 }}`.

6. **store-faq.tsx** — SAFE: No framer-motion usage. Pure server-rendered accordion. ✅

7. **scope-creep-calculator.tsx** — Fixed: Wrapper `motion.div` used `initial={{ opacity: 0, y: 16 }}` with `whileInView`, making entire calculator (heading, inputs, results) invisible until JS. Changed to `initial={{ opacity: 1, y: 8 }}`.

8. **product-detail-client.tsx** — Fixed: Feature cards used `initial={{ opacity: 0, y: 20 }}` with `whileInView`. Changed to `initial={{ opacity: 1, y: 8 }}`. Hero section (headline, price, CTA) had no framer-motion opacity:0 — already safe. ✅

9. **checkout-client.tsx** — SAFE: No framer-motion usage. Pure React with state. ✅

**overflow-hidden / clip audit**:
- store-hero.tsx: `overflow-hidden` on section wrapper — clips background decoration only, not content. Safe. ✅
- bundle-card.tsx: `overflow-hidden` on card — clips accent top bar at rounded corners only, not content. Safe. ✅
- No `clip-path` or `clip:` found anywhere in digital-products components. ✅

**Principle applied**: Animations now ENHANCE content (subtle 8px slide-up), never REQUIRE content to be invisible. If JS fails or hydration is delayed, all content renders at `opacity: 1` with a barely-noticeable 8px y-offset that causes no layout shift or content loss.

**Lint verification**: `bun run lint` passes clean with zero errors.

Files Modified:
1. src/components/digital-products/store-hero.tsx (container + item variants: opacity 0→1, y 20→8)
2. src/components/digital-products/workflow-section.tsx (container + item variants + heading initial: opacity 0→1, y 16→8)
3. src/components/digital-products/why-section.tsx (both columns initial: opacity 0→1, y 16→8)
4. src/components/digital-products/scope-creep-calculator.tsx (wrapper initial: opacity 0→1, y 16→8)
5. src/app/digital-products/[slug]/product-detail-client.tsx (feature cards initial: opacity 0→1, y 20→8)

---
Task ID: p3
Agent: sub-agent
Task: Fix canonical host inconsistency — Phase 3

Work Log:

**Goal**: Standardize all URLs to one canonical origin: `https://www.dev-aditya.com`. Eliminate all bare `dev-aditya.com` (no www) references. Centralize the canonical origin into a single exported constant so every URL derives from one source of truth.

**1. Added centralized constants to src/config/digital-products.ts**
- Added `export const SITE_ORIGIN = "https://www.dev-aditya.com"` — single source of truth for the canonical origin
- Added `export const SUPPORT_EMAIL = "work@dev-aditya.com"` — single source of truth for support email (was imported but not exported; now properly exported)
- All other files now import `SITE_ORIGIN` instead of hardcoding URLs

**2. Fixed metadataBase in root layout (src/app/layout.tsx)**
- Added `metadataBase: new URL(SITE_ORIGIN)` — Next.js uses this as the base for resolving all relative metadata URLs (canonical, OG images, etc.)
- Changed `openGraph.url` from hardcoded string to `SITE_ORIGIN` import

**3. Fixed digital-products layout (src/app/digital-products/layout.tsx)**
- Replaced hardcoded `https://www.dev-aditya.com/digital-products` with `${SITE_ORIGIN}/digital-products` for both `openGraph.url` and `alternates.canonical`
- Added `SITE_ORIGIN` import

**4. Fixed product detail page (src/app/digital-products/[slug]/page.tsx)**
- Replaced hardcoded URL `https://www.dev-aditya.com/digital-products/${product.slug}` with `${SITE_ORIGIN}/digital-products/${product.slug}`
- Added `SITE_ORIGIN` import

**5. Fixed delivery-policy page (src/app/digital-products/delivery-policy/page.tsx)**
- Replaced hardcoded canonical URL with `${SITE_ORIGIN}/digital-products/delivery-policy`
- Added `SITE_ORIGIN` import

**6. Fixed refund-policy page (src/app/digital-products/refund-policy/page.tsx)**
- Replaced hardcoded canonical URL with `${SITE_ORIGIN}/digital-products/refund-policy`
- Added `SITE_ORIGIN` import

**7. Fixed fulfilment.ts (src/lib/digital-products/fulfilment.ts)**
- Changed `SITE_URL` fallback from `"https://example.com"` to `SITE_ORIGIN` — emails and download links now default to the canonical host instead of a placeholder
- Added `SITE_ORIGIN` import

**8. Updated sitemap.ts (src/app/sitemap.ts)**
- Replaced hardcoded `BASE_URL = "https://www.dev-aditya.com"` with `BASE_URL = SITE_ORIGIN` import
- Added `SITE_ORIGIN` import

**9. Verified robots.txt (public/robots.txt)**
- Already contains `Sitemap: https://www.dev-aditya.com/sitemap.xml` ✓
- Already contains `Disallow: /api/`, `Disallow: /digital-products/checkout`, `Disallow: /digital-products/success` ✓
- Static file — cannot import TypeScript; hardcoded canonical URL is correct

**10. Verified no bare domain references remain**
- Searched entire `src/` for `https://dev-aditya.com` (without www): ZERO matches
- Searched entire `src/` for hardcoded `www.dev-aditya.com`: only the single definition in `digital-products.ts` (`SITE_ORIGIN`)
- All other references go through `SITE_ORIGIN` import

**11. Audit of all URL-bearing surfaces**
- metadataBase: ✓ `new URL(SITE_ORIGIN)` in root layout
- Canonical URLs: ✓ all use `${SITE_ORIGIN}/path` via import
- OG URLs: ✓ all use `SITE_ORIGIN` via import
- Twitter URLs: ✓ no URL field (card type + title + description only)
- JSON-LD: N/A (none in codebase)
- Breadcrumbs: N/A (none in codebase)
- Sitemap: ✓ uses `SITE_ORIGIN` import
- robots.txt: ✓ hardcoded to canonical host (static file)
- Email links: ✓ `SITE_URL` fallback now uses `SITE_ORIGIN` instead of `example.com`
- Purchase/download links: ✓ derived from `SITE_URL` which defaults to `SITE_ORIGIN`

**12. Lint verification**
- `bun run lint` passes clean with zero errors

Files Modified:
1. src/config/digital-products.ts (added SITE_ORIGIN + SUPPORT_EMAIL exports)
2. src/app/layout.tsx (added metadataBase, replaced hardcoded URL with SITE_ORIGIN import)
3. src/app/digital-products/layout.tsx (replaced hardcoded URLs with SITE_ORIGIN import)
4. src/app/digital-products/[slug]/page.tsx (replaced hardcoded URL with SITE_ORIGIN import)
5. src/app/digital-products/delivery-policy/page.tsx (replaced hardcoded canonical with SITE_ORIGIN import)
6. src/app/digital-products/refund-policy/page.tsx (replaced hardcoded canonical with SITE_ORIGIN import)
7. src/lib/digital-products/fulfilment.ts (changed SITE_URL fallback from example.com to SITE_ORIGIN)
8. src/app/sitemap.ts (replaced hardcoded BASE_URL with SITE_ORIGIN import)

## Task p38: Add SEO Structured Data (JSON-LD)

**Agent**: general-purpose
**Date**: 2025-01-24
**Status**: ✅ Completed

### Summary
Implemented accurate JSON-LD structured data for the digital products store:
- **Store homepage** (`/digital-products`): CollectionPage + BreadcrumbList schemas
- **Product detail pages** (`/digital-products/[slug]`): Product + Offer + BreadcrumbList schemas (active products only)

### Design Decisions
- Product schema only emitted for `status === "active"` products — no schema for coming-soon/hidden/sold-out
- No AggregateRating, Review, or fake inventory fields per task requirements
- Single Product schema per page — no duplicates
- Price uses `launchPrice` if available, falls back to `regularPrice`
- All URLs derived from `SITE_ORIGIN` constant in `src/config/digital-products.ts`
- BreadcrumbList uses 2 levels for homepage (Home → Digital Products), 3 levels for product pages (Home → Digital Products → Product Name)
- Offer `priceValidUntil` set to `2026-12-31`, availability to `https://schema.org/InStock`

### Files Modified
1. `src/app/digital-products/page.tsx` — Added SITE_ORIGIN import, CollectionPage JSON-LD schema, BreadcrumbList JSON-LD schema via `<script type="application/ld+json">` tags
2. `src/app/digital-products/[slug]/page.tsx` — Added BreadcrumbList JSON-LD for all visible products, Product+Offer JSON-LD conditionally for active products only

### Verification
- `bun run lint` passed with zero errors

---

## Task p42-p29: Policy Audit + Checkout/Success UX Polish

**Agent**: code-agent
**Date**: 2025-01-24
**Status**: ✅ Completed

### Phase 42 — Policy Audit

#### Refund Policy (`src/app/digital-products/refund-policy/page.tsx`)
- Removed draft warning banner (was a launch-blocking placeholder)
- Renamed "Digital product nature" → "Digital products only" and added explicit "delivered electronically, no physical goods shipped" language
- Added "Payment processing" section: explicitly names Razorpay as payment processor, states card/banking details never touch our servers, states collected data is name + email only, names Resend for order communications
- "How to request a refund" now says "processed via Razorpay through the original payment method" instead of vague "processed through the original payment method"

#### Delivery Policy (`src/app/digital-products/delivery-policy/page.tsx`)
- Added Resend mention in "Delivery method" section: download link email sent "via Resend"

#### Terms of Service (`src/app/digital-products/terms/page.tsx`) — **NEW**
- Created dedicated terms page under digital-products route (footer was pointing to `/terms` which 404'd)
- Covers: scope, products/delivery (digital only), license (single-user for tools, single-site for templates), payment (Razorpay), data collection (name + email only, Resend for email), IP, disclaimer, changes, contact
- Does NOT invent legal guarantees; liability limited to purchase amount

#### Privacy Policy (`src/app/digital-products/privacy/page.tsx`) — **NEW**
- Created dedicated privacy page under digital-products route (footer was pointing to `/privacy` which 404'd)
- Covers: data collected (name + email only), how used, data sharing (only Razorpay + Resend), cookies/analytics, retention, user rights, contact
- Explicitly states "We do not collect, store, or have access to your card or banking details"

#### Footer Links (`src/components/digital-products/store-footer.tsx`)
- Updated Terms link from `/terms` → `/digital-products/terms`
- Updated Privacy link from `/privacy` → `/digital-products/privacy`

### Phase 28 — Checkout Polish

#### Checkout Client (`src/app/digital-products/[slug]/checkout/checkout-client.tsx`)
- Changed 2-column grid (License + Delivery) → 3-column grid (License + Formats + Delivery)
- Added "Formats" card showing `product.formats.join(", ")` so exact file formats are immediately visible
- Already had: product name, price, contents (includes), license, delivery, name/email fields, secure-payment CTA, policy links, single dominant CTA

#### Checkout Page Metadata (`src/app/digital-products/[slug]/checkout/page.tsx`)
- Added `openGraph: null`, `twitter: null`, `alternates: undefined` to strip inherited layout social metadata from noindex checkout pages
- Already had `robots: { index: false, follow: false }` ✓

### Phase 29 — Success UX Polish

#### Success Client (`src/app/digital-products/success/success-client.tsx`)
- Added tip below download CTA: "Tip: Start with **01_START_HERE.pdf** inside the ZIP."
- Already had: "Payment successful." headline, "[Product name] is yours.", order reference, purchase email, download CTA, no heavy upsell above download

### Verification
- `bun run lint` passed with zero errors

---

## Task p7-p43: OG Images + Content Proofreading

**Agent**: general-purpose
**Date**: 2025-08-15
**Status**: ✅ Completed

### Phase 7: Open Graph / Social Preview Images

Created two OG images using the image-generation skill (z-ai CLI) at 1344×768 (closest supported landscape size to 1200×630):

1. **`public/og/store-og.png`** — Store homepage OG image
   - Warm paper (#FAF9F6) background with grain texture
   - "ADITYA / DIGITAL PRODUCTS" small caps eyebrow
   - Headline: "Tools and templates for people who build websites for clients."
   - Workflow cards: SCOPE → PRICE → ONBOARD → QA → LAUNCH
   - Black border, hard shadow aesthetic

2. **`public/og/pricing-os-og.png`** — Product detail OG image
   - Warm paper (#FAF9F6) background
   - "WEB PROJECT PRICING OS" small caps
   - Headline: "Stop guessing what to charge for websites."
   - Workflow chain: Scope → Workload → Cost → Margin → Quote
   - "$29 launch" in coral (#FF4A60)
   - Black border, hard shadow aesthetic

### Metadata Updates

1. **`src/app/digital-products/layout.tsx`** — Added `images` array to `openGraph` and `twitter` metadata pointing to `/og/store-og.png` with width/height/alt
2. **`src/app/digital-products/[slug]/page.tsx`** — Added `images` array to `openGraph` and `twitter` metadata pointing to `/og/pricing-os-og.png` with width/height/alt

### Phase 43: Content Proofreading

Proofread all 14 store-visible files. Issues found and fixed:

**British → American English spellings:**
- `digital-products.ts`: "standardises" → "standardizes" (onboarding description)
- `digital-products.ts`: "Standardise" → "Standardize" (onboarding SEO description)
- `digital-products.ts`: "standardise" → "standardize" (bundle feature description)
- `digital-products.ts`: "specialisations" → "specializations" (template feature)
- `store-faq.tsx`: "customise" → "customize" (FAQ question + answer)
- `store-faq.tsx`: "behaviours" → "behaviors" (Google Sheets FAQ)
- `page.tsx`: "customised" → "customized" (templates section)
- `product-detail-client.tsx`: "customise" → "customize" (product FAQ)
- `product-detail-client.tsx`: "customisation" → "customization" (product FAQ)

**Product naming consistency:**
- `digital-products.ts`: "Client Onboarding OS" → "Web Agency Client Onboarding OS" in Template + Delivery Bundle contents (to match the actual product name)

**License/FAQ clarity:**
- `store-faq.tsx`: Fixed contradictory agency license FAQ — was "Yes for internal use. A single-user commercial license lets one person use the product." → "A single-user commercial license covers one person. If multiple people in your agency need their own copies, purchase one license per user."
- `product-detail-client.tsx`: Fixed agency FAQ — was "A single license covers internal use by one person or one agency." → "A single-user commercial license covers one person. If multiple team members need separate copies, purchase additional licenses."

**No issues found in:**
- AI-like phrasing (no instances of revolutionize, supercharge, ultimate, game-changing, unlock, 10x)
- Price consistency (all match config values)
- Hyphenation consistency
- Dead/repetitive copy
- Grammar/punctuation errors

### Verification
- `bun run lint` passed with zero errors

---

## Task p46-49: Link Audit + Environment Variables Review

**Agent**: code-agent
**Date**: 2025-01-25
**Status**: ✅ Completed

### Phase 46: Link Audit — Findings & Fixes

#### Files Audited
- `src/components/digital-products/store-nav.tsx`
- `src/components/digital-products/store-footer.tsx`
- `src/components/digital-products/store-hero.tsx`
- `src/components/digital-products/product-card.tsx`
- `src/components/digital-products/bundle-card.tsx`
- `src/app/digital-products/page.tsx`
- `src/app/digital-products/[slug]/product-detail-client.tsx`
- `src/app/digital-products/[slug]/checkout/checkout-client.tsx`
- `src/app/digital-products/success/success-client.tsx`
- `src/app/digital-products/delivery-policy/page.tsx`
- `src/app/digital-products/refund-policy/page.tsx`
- `src/app/digital-products/terms/page.tsx` (discovered during audit)
- `src/app/digital-products/privacy/page.tsx` (discovered during audit)

#### Anchor Links — All Valid ✅
| Anchor | Location | Matching `id` |
|--------|----------|--------------|
| `#tools` | store-nav.tsx, page.tsx | `id="tools"` in page.tsx |
| `#bundles` | store-nav.tsx, page.tsx | `id="bundles"` in page.tsx |
| `#templates` | store-nav.tsx | `id="templates"` in page.tsx |
| `#how-it-works` | product-detail-client.tsx | `id="how-it-works"` in product-detail-client.tsx |

#### Policy Paths — All Correct ✅
- `/digital-products/delivery-policy` → page exists
- `/digital-products/refund-policy` → page exists
- `/digital-products/terms` → page exists
- `/digital-products/privacy` → page exists

#### Product Slugs — All Dynamic & Valid ✅
All product/bundle links use `product.slug` or `featured.slug` from `src/config/digital-products.ts`. No hardcoded invalid slugs found.

#### Checkout Links — All Valid ✅
- `/digital-products/${product.slug}/checkout` → checkout page exists

#### Portfolio Link — Correct ✅
- Footer `href: '/'` → root page exists

#### Canonical Links — All Correct ✅
- All canonical URLs use `SITE_ORIGIN` (`https://www.dev-aditya.com`) with correct paths

#### Fixes Applied

1. **store-footer.tsx — Fixed 404 `/contact` link**
   - Replaced broken `href: '/contact'` (no page exists) with `mailto:${SUPPORT_EMAIL}` Contact link
   - Imported `SUPPORT_EMAIL` from `@/config/digital-products`
   - Restored `/digital-products/terms` and `/digital-products/privacy` links (pages confirmed to exist during audit)

2. **fulfilment.ts — Fixed broken download URL in purchase confirmation email**
   - **Before**: `${SITE_URL}/api/download?token=${...}` (404 — no such API route exists)
   - **After**: `${SITE_URL}/api/digital-products/download/${...}` (matches actual route at `/api/digital-products/download/[token]/route.ts`)

### Phase 49: Environment Variables Review

#### `.env.example` Created ✅
New file at project root documenting all required env vars with comments and categories.

#### All `process.env` Usage Audited
| Variable | Location | Server-Only | Category |
|----------|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | fulfilment.ts | No (intentionally public) | Site URL |
| `RAZORPAY_KEY_ID` | razorpay.ts, orders/route.ts | Yes (passed via API) | Payment |
| `RAZORPAY_KEY_SECRET` | razorpay.ts | Yes | Payment |
| `RAZORPAY_WEBHOOK_SECRET` | razorpay.ts | Yes | Payment |
| `DOWNLOAD_TOKEN_SECRET` | download-token.ts | Yes | Download Security |
| `PRODUCT_FILES_DIR` | product-storage.ts | Yes | Product Files |
| `RESEND_API_KEY` | fulfilment.ts | Yes | Email |
| `SUPPORT_EMAIL` | fulfilment.ts | Yes | Store Config |
| `STORE_CURRENCY` | orders/route.ts | Yes | Store Config |
| `DATABASE_URL` | db.ts (Prisma) | Yes | Database |

#### Security Check ✅
- **No secrets use `NEXT_PUBLIC_` prefix** — all server-only secrets correctly NOT prefixed
- `NEXT_PUBLIC_SITE_URL` is the only `NEXT_PUBLIC_` var — intentionally public
- `RAZORPAY_KEY_ID` accessed server-side and passed to client via API response (correct pattern)

#### Unused Scaffold Variables
- No unused scaffold env vars found

### Verification
- `bun run lint` passed with exit code 0

---
Task ID: redirect-fix
Agent: main
Task: Fix root domain redirect — remove / → /digital-products redirect, add host normalization middleware

Work Log:
- Identified exact redirect source: src/app/page.tsx line 4 had `redirect("/digital-products")`
- Replaced page.tsx: removed redirect, created proper portfolio homepage with paper-themed design
- Updated root layout metadata from store-focused to portfolio identity ("Aditya — Web Designer & Developer")
- Created src/middleware.ts for host normalization: dev-aditya.com → www.dev-aditya.com (path-preserving 308 redirect)
- Middleware only normalizes the host, does NOT redirect to a fixed path
- Verified: GET / returns 200 (not 307), GET /digital-products returns 200, GET /digital-products/web-project-pricing-os returns 200
- Lint passes clean
- Pushed commits 2d8d8f2 + 61273e2 to GitHub

Stage Summary:
- Root (/) no longer redirects to /digital-products
- Portfolio homepage renders at / with paper-themed design (nav, hero, work preview, CTA, footer)
- Digital products store remains at /digital-products (untouched)
- Host normalization middleware ensures dev-adity.com/* → www.dev-aditya.com/* (path-preserving)
- All existing production hardening phases (2-49) remain intact
