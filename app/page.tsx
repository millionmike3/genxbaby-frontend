"use client";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import PricingDemo from "@/components/ui/PricingDemo";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import WhyGenXBaby from "@/components/ui/WhyGenXBaby";

// Marketing components
import { PortalTabs } from "@/app/(marketing)/homepage/PortalTabs";
import { FeatureGrid } from "@/app/(marketing)/homepage/FeatureGrid";
import { SplitSection } from "@/app/(marketing)/homepage/SplitSection";
import { TechTrust } from "@/app/(marketing)/homepage/TechTrust";
import { Footer } from "@/app/(marketing)/homepage/Footer";

export default function HomePage() {
  return (
    <main className="bg-slate-900 text-slate-100 min-h-screen">

      {/* Global Navbar */}
      <Navbar />

      {/* Cinematic Hero */}
      <Hero />

      {/* Dynamic Pricing Demo */}
      <PricingDemo />

      {/* Portal Login Tabs */}
      <PortalTabs />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Split Sections with your photos */}
      <SplitSection
        title="Built by engineers obsessed with precision."
        text="GenxBaby blends behavioral science, Bluetooth analytics, and underwriting automation into a unified intelligence layer. Our engineering team builds every feature with accuracy, speed, and transparency in mind."
        image="/images/genxbaby-team.jpg"
      />

      <SplitSection
        title="Investor intelligence powered by real‑time data."
        text="Pipeline, positions, pricing sheets, and behavioral insights — all in one dashboard. GenxBaby gives investors the clarity they need to make confident, data‑driven decisions."
        image="/images/genxbaby-investor.jpg"
        reverse
      />

      <SplitSection
        title="Financial clarity for families."
        text="Real‑time pricing, savings goals, risk scoring, and financial health — built for real households. GenxBaby empowers families to plan, save, and grow with confidence."
        image="/images/genxbaby-family.jpg"
      />

      {/* Why GenxBaby Stats */}
      <WhyGenXBaby />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Tech + Trust */}
      <TechTrust />

      {/* Footer */}
      <Footer />

    </main>
  );
}
