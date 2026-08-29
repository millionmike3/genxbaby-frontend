"use client";

import GenXBabyHero from "@/components/home/GenXBabyHero";
import MotionIntro from "@/components/home/MotionIntro";
import PortalSection from "@/components/home/PortalSection";
import { PortalRow } from "@/components/home/PortalRow";
import DashboardPreview from "@/components/home/DashboardPreview";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-hidden">

      {/* SECTION 1 — HERO */}
      <GenXBabyHero />

      {/* SECTION 2 — MOTION INTRO */}
      <section className="relative py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <MotionIntro />
        </div>
      </section>

      {/* SECTION 3 — ECOSYSTEM PORTALS */}
      <section className="relative py-24 px-6 border-t border-white/10">
        <PortalSection />

        <div className="mt-12 flex justify-center">
          <PortalRow />
        </div>
      </section>

      {/* SECTION 4 — PRODUCT PREVIEW */}
      <section className="relative py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <DashboardPreview />
        </div>
      </section>

      {/* SECTION 5 — FOOTER */}
      <footer className="py-12 text-center text-gray-500 border-t border-white/10">
        © 2026 GenXBaby — All Rights Reserved
      </footer>
    </main>
  );
}

