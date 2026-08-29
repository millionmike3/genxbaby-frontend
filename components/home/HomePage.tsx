"use client";

import GenXBabyHero from "@/components/home/GenXBabyHero";
import MotionIntro from "@/components/home/MotionIntro";
import PortalSection from "@/components/home/PortalSection";
import { PortalRow } from "@/components/home/PortalRow";
import DashboardPreview from "@/components/home/DashboardPreview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gx-black via-[#0A0A0A] to-[#111111] text-white overflow-hidden">

      {/* Custom Hero */}
      <GenXBabyHero />

      {/* Motion Intro */}
      <MotionIntro />

      {/* Portal Section */}
      <PortalSection />

      {/* Portal Row */}
      <PortalRow />

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Footer */}
      <footer className="py-10 text-center text-gx-grayMuted">
        © 2026 GenXBaby — All Rights Reserved
      </footer>
    </main>
  );
}
