import {
  Audience,
  Benefits,
  Cta,
  Hero,
  HowItWorks,
  ResponsibleAi,
  WhySection,
} from "@/components/landing/LandingSections";

export function LandingPage() {
  return (
    <main>
      <Hero />
      <WhySection />
      <Audience />
      <HowItWorks />
      <Benefits />
      <ResponsibleAi />
      <Cta />
    </main>
  );
}
