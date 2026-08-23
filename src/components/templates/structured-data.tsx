import { TEMPLATES } from "@/config/templates";
import { SITE_URL } from "@/config/site";

/**
 * TemplatesStructuredData — schema.org ItemList of the six products.
 *
 * Route-scoped JSON-LD for rich results. Zero visual impact; rendered
 * only on /templates and built entirely from the templates config so
 * data stays in one place.
 */
function priceToNumber(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function TemplatesStructuredData() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aditya — Premium Website Templates",
    description:
      "Premium website templates for AI companies, SaaS startups, agencies and modern businesses. Responsive, customizable and designed to launch quickly.",
    numberOfItems: TEMPLATES.length,
    itemListElement: TEMPLATES.map((template, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${template.name} — ${template.category} Website Template`,
        description: template.description,
        category: template.category,
        url: `${SITE_URL}/templates`,
        brand: {
          "@type": "Brand",
          name: "Aditya",
        },
        ...(template.marketplaceUrl
          ? {
              offers: {
                "@type": "Offer",
                price: priceToNumber(template.price),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: template.marketplaceUrl,
              },
            }
          : {
              offers: {
                "@type": "Offer",
                price: priceToNumber(template.price),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: template.previewUrl,
              },
            }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

/**
 * TemplateProductJsonLd — single Product schema for a detail page.
 * Built from the templates config so pricing/data stays in one place.
 */
export function TemplateProductJsonLd({
  template,
}: {
  template: (typeof TEMPLATES)[number];
}) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${template.name} — ${template.category} Website Template`,
    description: template.description,
    category: template.category,
    url: `${SITE_URL}/templates/${template.slug}`,
    image: `${SITE_URL}${template.screenshot.desktop}`,
    brand: { "@type": "Brand", name: "Aditya" },
    offers: {
      "@type": "Offer",
      price: priceToNumber(template.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: template.marketplaceUrl ?? template.previewUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
    />
  );
}
