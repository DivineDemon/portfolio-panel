import { CtaSection } from "@/components/landing/cta-section";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Highlights } from "@/components/landing/highlights";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingGrainientBackdrop } from "@/components/react-bits/landing-grainient-backdrop";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <LandingGrainientBackdrop />
      <LandingHeader />
      <main className="relative z-10 flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Highlights />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
