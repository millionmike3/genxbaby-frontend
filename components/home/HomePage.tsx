"use client";

import { motion } from "framer-motion";

// Design-system components
import { gxComponents } from "@/design-system/system/components";
const { Hero, Card, Section } = gxComponents;

// Custom homepage components
import GenXBabyHero from "@/components/home/GenXBabyHero";
import MotionIntro from "@/components/home/MotionIntro";
import PortalSection from "@/components/home/PortalSection";
import { PortalRow } from "@/components/home/PortalRow";
import DashboardPreview from "@/components/home/DashboardPreview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gx-black text-white overflow-hidden">

      {/* Primary Hero (your custom animated hero) */}
      <GenXBabyHero />

      {/* Secondary Hero (design-system hero) */}
      <Hero />

      {/* Motion Intro */}
      <MotionIntro />

      {/* Portal Section (Owner / Investor / Borrower) */}
      <PortalSection />

      {/* Portal Row (buttons) */}
      <PortalRow />

      {/* Professional Fintech Section */}
      <Section maxWidth="lg" center>
        <h2 className="text-3xl font-bold mb-6">
          Built for Modern Lending, Compliance, and Digital Trust
        </h2>

        <p className="text-gx-grayText leading-relaxed text-lg mb-10">
          GenXBaby unifies underwriting automation, blockchain audit trails,
          investor reporting, and borrower transparency into a single
          institutional-grade ecosystem. Designed for lenders, nonprofits,
          servicers, and capital partners who demand speed, accuracy, and
          compliance at scale.
        </p>
      </Section>

      {/* Ecosystem Blocks */}
      <Section maxWidth="xl" className="grid md:grid-cols-3 gap-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card title="Owner Stack" accentColor="#9DD431">
            Portfolio-level visibility, cashflow orchestration, and
            compliance-aligned reporting for institutional property owners.
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <Card title="Investor Intelligence" accentColor="#6D5AAC">
            Real-time performance signals, risk scoring, and blockchain-backed
            proof of capital deployment.
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Card title="Borrower Rail" accentColor="#3CF46B">
            Guided onboarding, document vaults, and automated underwriting
            workflows tuned for speed and compliance.
          </Card>
        </motion.div>
      </Section>

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Footer */}
      <footer className="py-10 text-center text-gx-grayMuted">
        © 2026 GenXBaby — All Rights Reserved
      </footer>
    </main>
  );
}
