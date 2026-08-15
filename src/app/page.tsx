import { HeroSection } from "@/components/home/hero-section";
import { SelectedWorkSection } from "@/components/home/selected-work-section";
import { AboutSection } from "@/components/home/about-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

/**
 * Homepage — four sections only.
 *
 *   1. Hero (kept as the original editorial collage — unchanged)
 *   2. Selected Work (the main visual experience of the portfolio)
 *   3. Short About (small, human)
 *   4. Final Contact CTA
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
      <AboutSection />
      <FinalCTASection />
    </>
  );
}
