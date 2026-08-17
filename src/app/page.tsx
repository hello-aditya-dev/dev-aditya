import { HeroSection } from "@/components/home/hero-section";
import { SelectedWorkSection } from "@/components/home/selected-work-section";
import { AgencyTeaserSection } from "@/components/home/agency-teaser-section";
import { AboutSection } from "@/components/home/about-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

/**
 * Homepage — five sections.
 *
 *   1. Hero (kept as the original editorial collage — unchanged)
 *   2. Selected Work (the main visual experience of the portfolio)
 *   3. Agency teaser (compact CTA for the white-label agency offer)
 *   4. Short About (small, human)
 *   5. Final Contact CTA
 *
 * Everything else (capability strip, services, process, working relationship,
 * laboratory, resources) has been removed from the primary visitor journey.
 * Those routes still exist for SEO and direct links, but they are not part
 * of the homepage.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <AgencyTeaserSection />
      <AboutSection />
      <FinalCTASection />
    </>
  );
}
