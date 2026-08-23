import { NextResponse } from "next/server";
import { TEMPLATES } from "@/config/templates";
import { SITE_URL } from "@/config/site";

/**
 * GET /api/templates/feed
 *
 * A read-only JSON feed of the template collection for partners,
 * embeds and integrations. Built entirely from src/config/templates.ts
 * so it can never drift from the page. Marketplace URLs are omitted
 * while unconfigured (never faked).
 */

export const dynamic = "force-dynamic";

export function GET() {
  const generated = new Date().toISOString();

  const feed = {
    version: "1",
    generated,
    source: `${SITE_URL}/templates`,
    count: TEMPLATES.length,
    templates: TEMPLATES.map((t) => ({
      slug: t.slug,
      name: t.name,
      category: t.category,
      description: t.description,
      audience: t.audience,
      price: t.price,
      featured: Boolean(t.featured),
      previewUrl: t.previewUrl,
      detailUrl: `${SITE_URL}/templates/${t.slug}`,
      quickLookUrl: `${SITE_URL}/templates?preview=${t.slug}`,
      marketplaceUrl: t.marketplaceUrl ?? undefined,
      images: {
        desktop: `${SITE_URL}${t.screenshot.desktop}`,
        mobile: `${SITE_URL}${t.screenshot.mobile}`,
        gallery: [1, 2, 3, 4].map(
          (n) => `${SITE_URL}/templates/gallery/${t.slug}-${n}.jpg`,
        ),
      },
    })),
  };

  return NextResponse.json(feed, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
