/**
 * Canonical site configuration.
 *
 * SITE_URL is the production origin for the custom domain. It is used for
 * canonical URLs, Open Graph URLs, sitemap/robots and structured data.
 *
 * NOTE: This redesign repository is NOT deployed to dev-aditya.com
 * automatically. The current production at dev-aditya.com is untouched.
 * SITE_URL still points at the production domain so that, when Aditya
 * chooses to deploy this redesign to that domain, every absolute URL is
 * already correct.
 */

export const SITE_URL = "https://dev-aditya.com";

export const SITE_NAME = "Aditya";

export const SITE_ROLE =
  "Designer & Developer for Business Websites, Ecommerce and Digital Products";

export const SITE_AUTHOR = "Aditya";

export const SITE_TAGLINE =
  "Clear, high-performance websites for B2B companies and professional-service firms.";

export const SITE_DESCRIPTION =
  "Aditya designs and builds websites that make complicated businesses easier to trust — and easier to choose. Corporate websites, ecommerce platforms and digital products shaped around the result your business needs, then engineered to work properly after launch.";

/** Person JSON-LD — used in the root layout. */
export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  jobTitle: SITE_ROLE,
  email: "work@dev-aditya.com",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  sameAs: ["https://github.com/witejackel-eng"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
} as const;

/** ProfessionalService JSON-LD — used on /capabilities and /contact. */
export const PROFESSIONAL_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aditya — Web Design & Frontend Development",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: "work@dev-aditya.com",
  image: `${SITE_URL}/opengraph-image`,
  areaServed: ["IN", "Global"],
  knowsAbout: [
    "Corporate website design",
    "Frontend development",
    "Information architecture",
    "Design systems",
    "Accessibility",
    "Technical SEO",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
} as const;
