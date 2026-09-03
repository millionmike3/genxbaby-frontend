"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <section className="relative rounded-font py-20 px-6">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-neon-space opacity-40 blur-xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-5xl font-extrabold text-white mb-6
            neon-green-glow rounded-font tracking-tight
          "
        >
          Institutional Dashboard Preview
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="
            text-soft text-xl leading-relaxed max-w-3xl mx-auto mb-12
            rounded-font
          "
        >
          Real‑time analytics for lenders and investors — loan tapes, cohort aging,
          default probability, yield curves, audit logs, and blockchain‑verified event
          history. Designed for institutional clarity and regulatory‑grade transparency.
        </motion.p>

        {/* Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
        >
          {/* Metric Card */}
          <div className="
            bg-black/40 border-glow-green rounded-xl p-6
            shadow-neonGreenSoft text-white
          ">
            <p className="text-lg text-soft rounded-font">AI Decision Speed</p>
            <p className="text-3xl font-bold text-bright rounded-font">&lt; 48 hrs</p>
          </div>

          <div className="
            bg-black/40 border-glow-green rounded-xl p-6
            shadow-neonGreenSoft text-white
          ">
            <p className="text-lg text-soft rounded-font">Blockchain Integrity</p>
            <p className="text-3xl font-bold text-bright rounded-font">100% Immutable</p>
          </div>

          <div className="
            bg-black/40 border-glow-green rounded-xl p-6
            shadow-neonGreenSoft text-white
          ">
            <p className="text-lg text-soft rounded-font">Investor Yield Models</p>
            <p className="text-3xl font-bold text-bright rounded-font">Live</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="mt-12"
        >
          <a
            href="/admin/dashboard"
            className="
              px-8 py-4 rounded-xl bg-black border-glow-green text-bright
              font-semibold hover:bg-[#00ff7f]/10 transition-all
            "
          >
            Open Admin Dashboard
          </a>
        </motion.div>

      </div>
    </section>
  );
}
