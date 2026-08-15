import { HeroSection } from "@/components/home/hero-section";
import { CapabilityStrip } from "@/components/home/capability-strip";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { SelectedWorkSection } from "@/components/home/selected-work-section";
import { ProcessSection } from "@/components/home/process-section";
import { WorkingRelationshipSection } from "@/components/home/working-relationship-section";
import { LabSection } from "@/components/home/lab-section";
import { ResourcesSection } from "@/components/home/resources-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CapabilityStrip />
      <ServicesSection />
      <AboutSection />
      <SelectedWorkSection />
      <ProcessSection />
      <WorkingRelationshipSection />
      <LabSection />
      <ResourcesSection />
      <FinalCTASection />
    </>
  );
}
