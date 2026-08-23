import { TemplatesHero } from "@/components/templates/templates-hero";
import { TemplatesCollection } from "@/components/templates/templates-collection";
import { TemplatesMarquee } from "@/components/templates/templates-marquee";
import { TemplatesValueSection } from "@/components/templates/value-section";
import { BusinessesSection } from "@/components/templates/businesses-section";
import { CreatorSection } from "@/components/templates/creator-section";
import { TemplatesFaqSection } from "@/components/templates/faq-section";
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
 *   2. Template collection (3×2 grid, real previews + Quick Look modal)
 *   3. Marquee divider (template names, editorial strip)
 *   4. More than a homepage (four concise value columns)
 *   5. Built for real businesses (typographic category list)
 *   6. Buyer FAQ (accordion, pre-purchase objections)
 *   7. Creator section (links to the existing /about page)
 *   8. Custom project CTA (links to the existing /contact flow)
 */
export default function TemplatesPage() {
  return (
    <>
      <TemplatesHero />
      <TemplatesCollection />
      <TemplatesMarquee />
      <TemplatesValueSection />
      <BusinessesSection />
      <TemplatesFaqSection />
      <CreatorSection />
      <TemplatesCustomCta />
    </>
  );
}
