"use client";

import GenXBabyHero from "@/components/home/GenXBabyHero";
import MotionIntro from "@/components/home/MotionIntro";
import PortalSection from "@/components/home/PortalSection";
import { PortalRow } from "@/components/home/PortalRow";
import DashboardPreview from "@/components/home/DashboardPreview";

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen w-full text-white overflow-hidden
        font-[Rounded] 
        bg-gradient-to-b from-[#00FF7F] via-[#003300] to-black
        relative
      "
    >

      {/* SPACE PARTICLES */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 mix-blend-screen"></div>
      </div>

      {/* SECTION 1 — HERO */}
      <section className="relative z-10 py-24 px-6">
        <GenXBabyHero />
      </section>

      {/* SECTION 2 — MOTION INTRO */}
      <section className="relative z-10 py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <MotionIntro />
        </div>
      </section>

      {/* SECTION 3 — ECOSYSTEM PORTALS */}
      <section className="relative z-10 py-24 px-6 border-t border-white/10">
        <PortalSection />

        <div className="mt-12 flex justify-center">
          <PortalRow />
        </div>
      </section>

      {/* SECTION 4 — PRODUCT PREVIEW */}
      <section className="relative z-10 py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <DashboardPreview />
        </div>
      </section>

      {/* SECTION 5 — FOOTER */}
      <footer className="relative z-10 py-12 text-center text-white/70 border-t border-white/10">
        © 2026 GenXBaby — All Rights Reserved
      </footer>
    </main>
  );
}
