"use client";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BenefitCard } from "./components/BenefitCard";
import { SurvivalGuide } from "./components/SurvivalGuide";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BenefitCard />
        <SurvivalGuide />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
