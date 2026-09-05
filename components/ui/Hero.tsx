"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GenXBabyLogoDark } from "@/components/branding/genxbaby-logos";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 pt-20 md:pt-28 bg-slate-900 overflow-hidden">

      {/* Cinematic background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-800/40 to-slate-900"
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-8"
      >
        <GenXBabyLogoDark className="w-64 h-auto" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="
          text-4xl sm:text-6xl md:text-8xl font-extrabold rounded-font
          tracking-tight leading-none
          flex items-center justify-center gap-2 sm:gap-4
        "
      >
        <span className="text-white drop-shadow-xl">GEN</span>
        <span className="text-[#3CF46B] drop-shadow-[0_0_25px_#3CF46B] animate-pulse">
          X
        </span>
        <span className="text-white drop-shadow-xl">BABY</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.6 }}
        className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl md:max-w-2xl leading-relaxed rounded-font text-center"
      >
        Behavioral Intelligence Meets Real‑Time Mortgage Pricing.  
        LLPA automation, Bluetooth analytics, underwriting AI, and institutional‑grade investor reporting — unified into one intelligent ecosystem.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
      >
        <Link
          href="/owner-portal"
          className="px-6 py-3 rounded-full bg-[#3CF46B] text-black font-semibold"
        >
          Owner Portal
        </Link>

        <Link
          href="/investor-portal"
          className="px-6 py-3 rounded-full border border-slate-600 text-slate-200 hover:bg-white/5 transition"
        >
          Investor Portal
        </Link>

        <Link
          href="/admin"
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
        >
          Admin Dashboard
        </Link>
      </motion.div>
    </section>
  );
}
