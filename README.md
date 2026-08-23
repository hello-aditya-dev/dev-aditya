# dev-aditya-paperfolio

A Paperfolio-inspired redesign of **Aditya's** portfolio — an independent
web designer and frontend developer based in Delhi, India, working with
B2B and professional-service firms.

> ⚠️ **Live production warning**
> This repository is a **redesign**. It does **not** replace the current
> production deployment at [dev-aditya.com](https://dev-aditya.com)
> automatically. The current production site, its Vercel settings, GoDaddy
> DNS and the original source repository
> ([witejackel-eng/dev-aditya.com](https://github.com/witejackel-eng/dev-aditya.com))
> remain untouched. Deploy this redesign to `dev-aditya.com` only when
> Aditya chooses to switch.

---

## Project overview

A complete rebuild of the personal portfolio using the visual grammar of
the [Paperfolio](https://v0-paperfolio.vercel.app/) template (a community
V0 clone of Brix Templates' Paperfolio) — bold black outlines, hard
offset shadows, coloured highlight blocks, rounded cards, generous
whitespace — while keeping the entire content, project data, contact
form behaviour and route inventory of the current site.

**What's original:** every component, illustration, SVG, copy line (other
than content migrated from the source repo), the Onest-based type system,
and the editorial project-frame illustrations.

**What's preserved verbatim:** the project case-study data
(`src/config/projects.ts`), services, process, capabilities, contact
information, website-review offer, mentoring page, resources, and the
contact-form's security model (Zod validation, honeypot, rate limit,
safe error responses, Resend email integration with safe fallback).

---

## Design direction

A light, editorial system inspired by Paperfolio. See
[`docs/design-direction.md`](docs/design-direction.md) for the full
specification. Summary:

- **Palette:** paper `#FAF9F6`, ink `#0B0B0B`, coral `#FF4A60`, blue
  `#1C92FF`, yellow `#FFC431`, violet `#5C42FB` — controlled, not random.
- **Typography:** Onest (via `next/font/google`), heavy tightly-tracked
  display weights, fluid `clamp()` scale.
- **Visual signatures:** bold black outlines, hard offset shadows,
  coloured highlight rectangles behind key words, original SVG editorial
  project frames (no fake screenshots, no stock imagery), paper grain
  via CSS-only dotted background.
- **Motion:** Framer Motion, every animation honours
  `prefers-reduced-motion`.

---

## Technology stack

- **Framework:** Next.js 15.5 (App Router)
- **Language:** TypeScript 5 (strict)
- **Styling:** Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- **Animation:** Framer Motion 11
- **Fonts:** Onest via `next/font/google`
- **Email:** Resend (server-side only, with safe fallback when not configured)
- **Validation:** Zod (shared between client and server)
- **No database** (the source repo's Drizzle/Neon setup was only consumed
  by the audit funnel, which is out of scope — see below)
- **No smooth-scroll library** (native `scroll-behavior: smooth` is enough)

---

## Route inventory

| Route | Type | Source |
|---|---|---|
| `/` | Homepage (11 sections) | Rebuilt |
| `/work` | Work listing with filters | Rebuilt |
| `/work/ibs-infra` | Flagship case study | Migrated verbatim |
| `/work/device-destination` | Flagship case study | Migrated verbatim |
| `/work/cloudsun` | Flagship case study (concept) | Migrated verbatim |
| `/work/saffron-steam-experience` | Flagship case study | Migrated verbatim |
| `/work/aarohan-legal` | Flagship case study | Migrated verbatim |
| `/work/casa-aurelia` | Laboratory case study | Migrated verbatim |
| `/work/pricepilot` | Laboratory case study | Migrated verbatim |
| `/work/dust-signal` | Laboratory case study | Migrated verbatim |
| `/about` | About page | Rebuilt with source copy |
| `/capabilities` | Services (renamed from `/services`) | Migrated + extended |
| `/services` | 308 redirect → `/capabilities` | New (SEO continuity) |
| `/process` | Six-step engagement process | Migrated + extended |
| `/contact` | Contact form + direct contact | Rebuilt (form behaviour preserved) |
| `/mentoring` | Project-help page | Migrated |
| `/resources` | Resources hub | Rebuilt |
| `/resources/portfolio-checklist` | Article | Migrated |
| `/resources/ai-website-agency` | Article | Migrated |
| `/resources/frontend-qa` | Article | Migrated |
| `/templates` | Template collection (six products) | New |
| `/templates/[slug]` | Six template detail pages | New |
| `/api/templates/feed` | Collection JSON feed | New |
| `/audit` | Audit funnel | **Maintenance page** (see below) |
| `/audit/[auditId]` | Audit report viewer | **Maintenance page** |
| `/privacy` | Privacy policy | Redesigned |
| `/terms` | Terms of service | Redesigned |
| `/accessibility` | Accessibility statement | Redesigned |
| 404 | Not-found page | Redesigned |
| `/api/contact` | Contact form API | Reimplemented (Zod + honeypot + rate limit + Resend) |
| `/sitemap.xml` | Sitemap | Generated from projects + resources + static routes |
| `/robots.txt` | Robots | Same disallow rules as source |
| `/manifest.webmanifest` | PWA manifest | New |
| `/icon.svg`, favicons | Favicon set | New SVG + reused PNGs |
| `/opengraph-image` | 1200×630 OG image | New (Next.js ImageResponse) |
| `/twitter-image` | 1200×630 Twitter image | New |

### Out-of-scope routes

The full **audit funnel** (`/api/audits/*`, `/api/admin/*`, the audit
pipeline with PageSpeed API, Drizzle DB, Turnstile, and admin
dashboard) is documented as out-of-scope in
[`docs/content-inventory.md`](docs/content-inventory.md). The current
production deployment at `dev-aditya.com` continues to serve these
routes untouched. The `/audit` URL is preserved here as a maintenance
page that honestly explains the migration status and links to the live
production audit.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, Onest font, metadata, JSON-LD
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind v4 tokens + base styles
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts              # Generated from projects + resources
│   ├── robots.ts
│   ├── manifest.webmanifest.ts
│   ├── icon.svg                # SVG favicon (next/file convention)
│   ├── opengraph-image.tsx     # 1200×630 OG via ImageResponse
│   ├── twitter-image.tsx
│   ├── api/contact/route.ts    # Contact form API
│   ├── work/
│   │   ├── page.tsx            # Work listing
│   │   ├── WorkContent.tsx     # Client component with filters
│   │   └── <slug>/page.tsx     # 8 case-study pages (Bharat Electrosafe removed)
│   ├── about/page.tsx
│   ├── capabilities/page.tsx
│   ├── process/page.tsx
│   ├── contact/{page,ContactContent}.tsx
│   ├── resources/{page.tsx,<slug>/page.tsx}
│   ├── mentoring/page.tsx
│   ├── audit/{page.tsx,[auditId]/page.tsx}  # Maintenance pages
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── accessibility/page.tsx
├── components/
│   ├── navigation.tsx          # Sticky header + mobile menu
│   ├── footer.tsx              # Multi-column footer
│   ├── case-study-content.tsx  # Reusable case-study layout
│   ├── resource-article-content.tsx
│   ├── home/                   # 9 homepage section components
│   └── ui/                     # Design system primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── container.tsx
│       ├── highlight.tsx
│       ├── marquee.tsx
│       ├── monogram.tsx
│       ├── project-frame.tsx   # Original SVG editorial frame
│       ├── section.tsx
│       ├── section-label.tsx
│       └── reveal.tsx          # Framer Motion in-view wrapper
├── config/                     # Central content (single source of truth)
│   ├── site.ts                 # SITE_URL, JSON-LD schemas
│   ├── contact.ts              # Email, location, GitHub
│   ├── navigation.ts           # Primary nav + footer columns
│   ├── services.ts             # 4 services + 5th "different problem" card
│   ├── capabilities.ts         # Capabilities, working advantages, tools
│   ├── process.ts              # 6 process steps + FAQ
│   ├── projects.ts             # 8 projects — Bharat Electrosafe removed, rest migrated verbatim
│   ├── project-accents.ts      # Per-project accent colour side-table
│   ├── resources.ts            # 3 resource articles
│   ├── website-review.ts       # Complimentary review offer
│   └── socials.ts              # Verified external profiles (GitHub only)
├── emails/
│   └── ContactEnquiryEmail.tsx # Resend React email template
└── lib/
    ├── email/resend.ts         # Resend client singleton + send()
    ├── env.ts                  # Zod-parsed env vars
    ├── rate-limit.ts           # In-memory sliding-window rate limiter
    ├── request-security.ts     # Honeypot, body-size limit, same-origin
    ├── schemas/contact.ts      # Zod schema (shared client + server)
    └── utils.ts                # cn() helper
```

---

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the env template and fill in any values you need
cp .env.example .env.local

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
```

### Commands

```bash
npm run dev         # Dev server
npm run build       # Production build
npm run start       # Start the production server (after build)
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit

# Static broken-link audit
npx tsx scripts/audit-links.ts

# Regenerate the case-study pages from projects.ts
npx tsx scripts/generate-case-studies.ts

# Regenerate the resource article pages from resources.ts
npx tsx scripts/generate-resources.ts
```

---

## Environment variables

Only **three** env vars are required for full functionality. The rest
are optional or inherited from defaults.

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | `https://dev-aditya.com` | Production origin for canonical URLs, OG, sitemap |
| `RESEND_API_KEY` | **Yes** for email | — | Resend.com API key. Without it, the contact form returns a 503 with a message directing the visitor to email `work@dev-aditya.com` directly. |
| `CONTACT_FROM_EMAIL` | **Yes** for email | — | Verified "from" address inside Resend, e.g. `Website Enquiries <enquiries@send.dev-aditya.com>` |
| `CONTACT_TO_EMAIL` | **Yes** for email | — | Recipient address for enquiries (Aditya's inbox) |
| `AUDIT_ALLOWED_ORIGINS` | No | — | Comma-separated list of additional allowed origins for the contact API's same-origin check |

Copy `.env.example` to `.env.local` and fill in the values. **Never
commit `.env.local`** — it is gitignored.

---

## Digital Products Store

A complete digital-product storefront lives at `/digital-products`, fully
isolated from the normal portfolio experience. The store sells agency
operating tools, bundles and website templates to freelance web designers
and small agencies.

### Routes

| Route | Purpose | Indexable |
|---|---|---|
| `/digital-products` | Store home (hero, featured product, tools, bundles, templates, workflow, why, FAQ, CTA) | Yes |
| `/digital-products/[slug]` | Product detail page (dynamic) | Active = yes; coming-soon = noindex |
| `/digital-products/[slug]/checkout` | Checkout (Razorpay Standard Checkout) | noindex |
| `/digital-products/success` | Post-purchase success / download page | noindex |
| `/digital-products/delivery-policy` | Digital delivery / shipping policy | Yes |
| `/digital-products/refund-policy` | Refund / cancellation policy | Yes |
| `/digital-products/terms` | Store terms | Yes |
| `/digital-products/privacy` | Store privacy (supplements `/privacy`) | Yes |
| `POST /api/digital-products/orders` | Create Razorpay order (server-owned price) | — |
| `POST /api/digital-products/verify` | Verify payment signature + fulfil | — |
| `GET /api/digital-products/order-status` | Poll order status / get download URL | — |
| `POST /api/digital-products/webhook/razorpay` | Signed Razorpay webhook (raw body) | — |
| `GET /api/digital-products/download/[token]` | Signed-token secure download | — |

### Product config (single source of truth)

All product data lives in `src/config/digital-products.ts`. Secrets,
private file paths and server-owned prices are **not** in this file —
server-only modules in `src/lib/digital-products/` own those.

To activate a product:

1. Place the final product ZIP at `{PRODUCT_FILES_DIR}/{productId}.zip`.
2. Confirm the package contents listed in the config match the real ZIP.
3. Set the price in `currencyPrices`.
4. Set `status: "active"`.
5. Verify checkout + download + email in Razorpay **Test Mode**.
6. The product is automatically added to the sitemap and becomes indexable.

### Payment architecture

```
checkout form
   → POST /api/digital-products/orders  (server validates, looks up server price,
                                          creates local CREATED order, creates Razorpay order)
   → Razorpay Standard Checkout opens (script loaded only on checkout route)
   → handler callback
   → POST /api/digital-products/verify  (verifies HMAC-SHA256 signature, timing-safe,
                                          marks PAID, fulfils: token + email, idempotent)
   → redirect to /digital-products/success?orderId=…
   → success page polls /api/digital-products/order-status → download URL

Razorpay webhook (signed, raw body, idempotent via payment_webhook_events)
   → payment.captured → mark PAID + fulfil (idempotent)
   → payment.failed   → mark FAILED
   → refund.*         → mark REFUNDED
```

### Security

- **Price tampering:** the client never sends an amount. The server looks up the
  price from the server-only catalog (`src/lib/digital-products/server-catalog.ts`).
- **Forged callback:** payment signature verified with HMAC-SHA256 + timing-safe
  comparison before any fulfilment.
- **Forged webhook:** raw body verified against `RAZORPAY_WEBHOOK_SECRET` before
  JSON parsing; duplicate events deduped via `payment_webhook_events`.
- **Public download:** paid ZIPs live outside `public/`; downloads require a
  signed HMAC token (7-day TTL) bound to a PAID order + matching product.
- **Duplicate fulfilment:** `fulfilmentSentAt` guard makes fulfilment idempotent.
- **Secrets:** `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`,
  `DOWNLOAD_TOKEN_SECRET` are server-only and never `NEXT_PUBLIC_`.

### Store env vars

| Variable | Required | Description |
|---|---|---|
| `RAZORPAY_KEY_ID` | **Yes** for checkout | Razorpay Key ID (safe for browser) |
| `RAZORPAY_KEY_SECRET` | **Yes** for checkout | Razorpay Key Secret (server-only) |
| `RAZORPAY_WEBHOOK_SECRET` | **Yes** for webhooks | Webhook signing secret (server-only) |
| `STORE_CURRENCY` | No (default `INR`) | Order currency; must match merchant account |
| `DOWNLOAD_TOKEN_SECRET` | **Yes** for downloads | HMAC secret for download tokens |
| `DATABASE_URL` | **Yes** | Prisma datasource (SQLite dev / Postgres prod) |
| `PRODUCT_FILES_DIR` | **Yes** for delivery | Private directory holding `{productId}.zip` |
| `DIGITAL_PRODUCTS_FROM_EMAIL` | No | "From" for purchase email (defaults to `CONTACT_FROM_EMAIL`) |
| `DIGITAL_PRODUCTS_SUPPORT_EMAIL` | No | Support inbox (defaults to `work@dev-aditya.com`) |

### Razorpay setup (manual dashboard steps)

1. Add/verify `dev-aditya.com` in Razorpay → Settings → Website.
2. Complete the Website Review (policies, contact, pricing visible).
3. Generate **Test** keys; set `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`.
4. Configure the Test webhook URL `https://<host>/api/digital-products/webhook/razorpay`
   and copy the webhook secret into `RAZORPAY_WEBHOOK_SECRET`.
5. Run the payment test matrix (success, fail, close, duplicate click,
   tampered callback, invalid signature, duplicate webhook, page-close,
   captured fulfilment, invalid/expired download token).
6. Confirm the capture strategy (auto-capture recommended).
7. Generate **Live** keys + Live webhook; update the env vars.
8. Verify active payment methods; request international payments if needed.

### Database

Prisma schema in `prisma/schema.prisma` defines `DigitalProductOrder` and
`PaymentWebhookEvent`. Run:

```bash
npm run db:generate   # generate the client
npm run db:push       # create/apply the schema (SQLite dev)
```

For production use a durable Postgres (Neon / Vercel Postgres) by setting
`DATABASE_URL` to a `postgresql://` URL.

### SEO

- Canonical origin: `https://dev-aditya.com` (aligned across portfolio + store;
  metadata-only — **no host redirect, no DNS change**).
- Per-product metadata, canonicals, OG/Twitter tags, `Product` + `BreadcrumbList`
  JSON-LD. No fake ratings/reviews/stock.
- Checkout + success pages are `noindex`. Active products are in the sitemap;
  coming-soon products are `noindex` and excluded from the sitemap.

### Manual go-live checklist

- [ ] Refund policy approved by owner: **YES / NO** (production go-live requires YES)
- [ ] Razorpay Live keys + Live webhook configured
- [ ] `DOWNLOAD_TOKEN_SECRET` generated (`openssl rand -hex 32`)
- [ ] `DATABASE_URL` points at durable Postgres (not SQLite) in production
- [ ] Product ZIP placed at `{PRODUCT_FILES_DIR}/{productId}.zip`
- [ ] Test-mode payment matrix passed
- [ ] Sitemap + robots reachable after deploy
- [ ] Search Console: submit `/sitemap.xml`, request indexing for
      `/digital-products` and active product pages

---

## Templates chapter (`/templates`)

A showcase/discovery chapter for six premium website templates. Purchases
happen on an external marketplace — this site only presents the products
and routes visitors to the preview → marketplace → purchase flow.

**Pages**

- `/templates` — hero, 3×2 collection grid (Quick Look modal with
  desktop/mobile live iframe preview, arrow-key navigation, shareable
  `?preview={slug}` deep links), pricing strip, marquee, value columns,
  comparison matrix, audience grid, buyer FAQ, licensing explainer,
  creator section, custom-project CTA.
- `/templates/[slug]` — six statically-generated detail pages: editorial
  hero (real desktop + mobile captures), four-section scroll gallery,
  load-on-demand live preview, what's-inside, sibling navigation.
- Per-page SEO: unique metadata, `opengraph-image` (generated per
  template via next/og), `ItemList`/`Product` JSON-LD, sitemap entries.

**Configuration — one source of truth**

All product data lives in `src/config/templates.ts` (name, category,
description, audience, price, preview URL, marketplace URL, screenshot
paths). The page, cards, compare table, pricing strip, detail pages,
OG images, JSON-LD and the JSON feed all derive from it.

**Marketplace URLs** are intentionally `null`
(`MARKETPLACE_URL_PLACEHOLDER`) until real listings exist. "Get
template" buttons, the feed's `marketplaceUrl` field and the hero
secondary CTA (`MARKETPLACE_PROFILE_URL`) activate automatically once
real URLs are set — nothing else needs changing.

**JSON feed** — `GET /api/templates/feed`

```json
{
  "version": "1",
  "count": 6,
  "templates": [
    {
      "slug": "multiply",
      "name": "Multiply",
      "category": "AI Automation",
      "price": "$129",
      "previewUrl": "https://…",
      "detailUrl": "https://dev-aditya.com/templates/multiply",
      "quickLookUrl": "https://dev-aditya.com/templates?preview=multiply",
      "images": { "desktop": "…", "mobile": "…", "gallery": ["…", "…", "…", "…"] }
    }
  ]
}
```

Built from the same config (never drifts); cached
`public, max-age=3600, stale-while-revalidate=86400`. `marketplaceUrl`
is omitted per product while unconfigured.

**Analytics** — isolated to `/templates`
(`src/lib/templates-analytics.ts`): `templates_cta` events
(`live_preview` / `marketplace` / `quick_look`) pushed to
`window.dataLayer` + a `templates:cta` CustomEvent.

**Screenshots** — `public/templates/` (desktop + mobile per product)
and `public/templates/gallery/` (four scroll captures per product),
captured from the real live template sites.

---

## Contact-form setup

The contact form lives at `/contact` and posts to `/api/contact`.

**What is preserved from the source repo:**

- All eight form fields (name, email, company, website, projectType,
  scope, timing, details, consent) plus the hidden honeypot `_honey`.
- Client-side validation with the same error messages.
- Server-side validation via Zod schema
  (`src/lib/schemas/contact.ts`) — shared with the client so the rules
  can never drift.
- Honeypot spam protection (`_honey` field — silently accepts and
  discards bot submissions).
- Body-size limit (50 KB).
- Same-origin validation (Origin / Referer check).
- Rate limiting (3 submissions per 10 minutes per IP — in-memory
  sliding window instead of the source's DB-backed limiter).
- Safe error responses: 400 (validation), 413 (body too large), 429
  (rate limit), 503 (email not configured), 502 (delivery failure).
- Resend email integration with a safe fallback when `RESEND_API_KEY`
  is not set — the visitor is told to email `work@dev-aditya.com`
  directly.
- No secrets exposed to the client bundle.

**What changed:**

- The source used a Drizzle/Neon PostgreSQL database for rate limiting
  (because the audit funnel needed it). The redesign has no database,
  so rate limiting is in-memory. This is equivalent at the
  single-instance level; on a serverless deployment with multiple
  instances, the effective limit becomes `limit × instances`, which is
  acceptable for a contact form (the honeypot and server-side
  validation remain the primary spam defences).

**To enable email delivery:**

1. Create a Resend account at [resend.com](https://resend.com).
2. Verify the sender domain (e.g. `send.dev-aditya.com`).
3. Create an API key.
4. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`
   in your `.env.local` (or in your Vercel project's environment
   variables).

---

## Deployment

This site is built for **Vercel** (the same platform the source repo
deploys to). Deploy with:

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: Connect the repo on vercel.com
```

Set the same env vars in your Vercel project. The build command is
`next build` (default) and the output is `.next`.

**Do not point this deployment at `dev-aditya.com` until Aditya has
explicitly switched.** The current production deployment and DNS are
untouched.

---

## Accessibility notes

Target: WCAG 2.2 AA. See [`docs/qa-report.md`](docs/qa-report.md) for
the full checklist of what was tested.

Highlights:

- Skip-to-content link as the first focusable element.
- Visible focus ring on every interactive element.
- Keyboard-accessible mobile menu (focus trap, Escape, focus restore).
- Keyboard-accessible project filters (`aria-pressed`).
- Explicit `<label>` on every form field.
- `prefers-reduced-motion` short-circuits every Framer Motion animation.
- Minimum 44×44px touch targets.
- `aria-current="page"` on the active navigation item.
- Decorative SVGs have `aria-hidden`; meaningful images have descriptive
  alt text.

---

## Content update instructions

All content lives in `src/config/`. To update:

- **Projects** → edit `src/config/projects.ts`, then run
  `npx tsx scripts/generate-case-studies.ts` to regenerate the
  case-study page.tsx files.
- **Services** → edit `src/config/services.ts`.
- **Process steps** → edit `src/config/process.ts`.
- **Resources** → edit `src/config/resources.ts`, then run
  `npx tsx scripts/generate-resources.ts`.
- **Contact info** → edit `src/config/contact.ts`.
- **Navigation / footer** → edit `src/config/navigation.ts`.
- **Site metadata** → edit `src/config/site.ts`.

---

## Image update instructions

Project visuals use the original `ProjectFrame` SVG component (see
`src/components/ui/project-frame.tsx`) — there are no binary screenshot
files to update. To change a project's accent colour, edit
`src/config/project-accents.ts`.

To add a real screenshot for a project instead of the editorial frame,
replace the `<ProjectFrame />` usage in
`src/components/home/selected-work-section.tsx`,
`src/app/work/WorkContent.tsx`, and
`src/components/case-study-content.tsx` with a `next/image` element.

The favicon SVG lives at `src/app/icon.svg`. PNG favicons (16/32/192/512
+ apple-touch-icon) are not committed in this redesign — they should be
generated from the SVG using the source repo's
`scripts/generate-favicons.mjs` script, or regenerated before production
deployment. The Next.js metadata in `src/app/layout.tsx` references
them; if they are missing, browsers fall back to the SVG, which is the
preferred modern format.

---

## GitHub owner & author

- **GitHub owner:** [witejackel-eng](https://github.com/witejackel-eng)
- **Repository:** `witejackel-eng/dev-aditya-paperfolio` (private)
- **Author:** Aditya / witejackel-eng
- **Email:** work@dev-aditya.com
- **Location:** Delhi, India

---

## License

Personal portfolio use. All code is original work. Project case-study
content is original editorial content describing real projects; the
underlying work in each case study belongs to the respective project
owner. The Paperfolio template was used for visual direction only — no
Paperfolio source code, illustrations, copy or assets were copied.
