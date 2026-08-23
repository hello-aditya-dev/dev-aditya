import { TemplatesHero } from "@/components/templates/templates-hero";
import { TemplatesCollection } from "@/components/templates/templates-collection";
import { TemplatesValueSection } from "@/components/templates/value-section";
import { BusinessesSection } from "@/components/templates/businesses-section";
import { CreatorSection } from "@/components/templates/creator-section";
import { TemplatesCustomCta } from "@/components/templates/final-cta";

/**
 * /templates — showcase / discovery page for the six premium website
 * templates.
 *
 * This is NOT a checkout page: purchases happen on the external
 * marketplace. The page's job is to present the six real products
 * (with real live previews), make the value obvious and route visitors
 * to the preview → marketplace → purchase flow, or into a custom
 * project conversation.
 *
 *   1. Hero (editorial collage with real template screenshots)
 *   2. Template collection (3×2 grid, real previews)
 *   3. More than a homepage (four concise value columns)
 *   4. Built for real businesses (typographic category list)
 *   5. Creator section (links to the existing /about page)
 *   6. Custom project CTA (links to the existing /contact flow)
 */
export default function TemplatesPage() {
  return (
    <>
      <TemplatesHero />
      <TemplatesCollection />
      <TemplatesValueSection />
      <BusinessesSection />
      <CreatorSection />
      <TemplatesCustomCta />
    </>
  );
}
