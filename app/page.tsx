"use client";

import Hero from "@/components/home/Hero";
import MotionIntro from "@/components/home/MotionIntro";
import PortalSection from "@/components/home/PortalSection";
import DashboardPreview from "@/components/home/DashboardPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-200">
      <MotionIntro />
      <Hero />
      <PortalSection />
      <DashboardPreview />
      <footer className="mt-16 pb-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Gen X Baby · Resilient America · Substantial Funding
      </footer>
    </main>
  );
}
