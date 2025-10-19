import { HeroSection } from "@/components/HeroSection";
import { ExperienceHighlights } from "@/components/ExperienceHighlights";
import { JourneySteps } from "@/components/JourneySteps";
import { DonationCTA } from "@/components/DonationCTA";

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ExperienceHighlights />
      <JourneySteps />
      <DonationCTA />
    </div>
  );
}
