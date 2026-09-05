// app/(marketing)/homepage/HeroMotion.tsx
"use client";

import { motion } from "framer-motion";
import { GenXBabyLogoDark } from "@/components/branding/genxbaby-logos";

export function HeroMotion() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">

      {/* Background gradient fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <GenXBabyLogoDark className="w-64 h-auto" />
        </motion.div>

        {/* GEN+X=BABY equation reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight"
        >
          GEN + X = BABY
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="mt-4 max-w-xl text-lg md:text-xl text-slate-300"
        >
          Behavioral Intelligence Meets Real‑Time Mortgage Pricing
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button className="rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-emerald-300 transition">
            Get a Quote
          </button>
          <button className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold hover:border-emerald-400 hover:text-emerald-300 transition">
            Borrower Portal
          </button>
          <button className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold hover:border-emerald-400 hover:text-emerald-300 transition">
            Investor Portal
          </button>
          <button className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold hover:border-emerald-400 hover:text-emerald-300 transition">
            Admin Login
          </button>
        </motion.div>

      </div>
    </section>
  );
}
