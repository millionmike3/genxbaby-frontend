"use client";

import { motion } from "framer-motion";

export default function GenXBabyHero() {
  return (
    <section
      className="
        relative w-full min-h-[70vh] flex flex-col items-center justify-center
        text-center px-6 py-24
        rounded-font
      "
    >
      {/* STARFIELD BACKGROUND */}
      <div className="absolute inset-0 bg-stars opacity-40"></div>

      {/* NEON GLOW ORB */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] 
        bg-[#00FF7F]/20 blur-[180px] rounded-full pointer-events-none">
      </div>

      {/* FLOATING GRID */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.25, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/grid.svg')] bg-cover opacity-20"
      />

      {/* MAIN TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="
          text-6xl md:text-7xl font-extrabold neon-green-glow 
          tracking-tight mb-6 z-10
        "
      >
        GEN X BABY
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="
          text-white 
         text-2xl 
         font-extrabold 
         tracking-wide 
         leading-relaxed 
         max-w-4xl 
         mx-auto 
          mt-6 
          neon-green-glow
         "
      >
        The AI‑Powered Fintech Operating System for underwriting intelligence, 
        investor automation, borrower analytics, and blockchain‑verified audit trails.
      </motion.p>

      {/* CTA BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className="flex flex-wrap gap-6 mt-12 z-10 justify-center"
      >
        <a
          href="/owner-portal"
          className="
              px-8 py-4 rounded-xl bg-black border-glow-green text-bright
              font-semibold hover:bg-[#00ff7f]/10 transition-all
            "
        >
          Owner Portal
        </a>

        <a
          href="/investor-portal"
          className="
              px-8 py-4 rounded-xl bg-black border-glow-green text-bright
              font-semibold hover:bg-[#00ff7f]/10 transition-all
             "
        >
          Investor Portal
        </a>

        <a
          href="/borrower-portal"
          className="
              px-8 py-4 rounded-xl bg-black border-glow-green text-bright
              font-semibold hover:bg-[#00ff7f]/10 transition-all
             "
        >
          Borrower Portal
        </a>

      </motion.div>

                <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="
          text-white 
         text-2xl 
         font-extrabold 
         tracking-wide 
         leading-relaxed 
         max-w-4xl 
         mx-auto 
          mt-6 
          neon-green-glow
         "
      >
         GEN X BABY brings every major financial workflow into one unified platform 
         — from real‑time banking and advanced deal analysis to certified check generation, 
         mortgage underwriting, lender intelligence, and stock volatility scoring. 
         It replaces fragmented tools with a single ecosystem that handles CRM, dialer, 
         messaging, email, and productivity tracking, giving users a complete command center for managing clients, 
         deals, and financial decisions.

         The platform is secured by institutional‑grade blockchain technology, including smart contract verification,
         Merkle‑based audit integrity, and QR‑enabled document validation. 
         Every action — from underwriting to check generation — is anchored to an immutable ledger, ensuring transparency, 
         authenticity, and trust for lenders, investors, and users across the entire financial lifecycle.
      </motion.p>
    </section>
             
  );
}
