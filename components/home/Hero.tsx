"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[75vh] flex-col items-center justify-center px-4 pt-16 md:px-6 md:pt-24">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(60,244,107,0.22),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(0,140,255,0.12),_transparent_60%)]" />

      <div className="flex flex-col items-center text-center max-w-[480px] md:max-w-3xl mx-auto">

        {/* Logo */}
        <Image
          src="/genxbaby-logo-v2-layered.png"
          alt="GenXBaby Logo"
          width={180}
          height={180}
          priority
          className="mb-6 md:w-[300px] md:h-[300px] drop-shadow-[0_0_40px_rgba(60,244,107,0.85)]"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="
            text-4xl sm:text-6xl md:text-9xl font-extrabold rounded-font
            tracking-tight leading-none
            flex items-center justify-center gap-2 sm:gap-4
          "
        >
          <span className="text-white drop-shadow-xl">GEN</span>
          <span className="text-[#00ff7f] drop-shadow-[0_0_25px_#00ff7f] animate-pulseGreen">X</span>
          <span className="text-white drop-shadow-xl">BABY</span>
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-md md:max-w-xl leading-relaxed rounded-font">
          The unified fintech ecosystem for AI‑driven underwriting, blockchain
          auditability, mortgage automation, and institutional‑grade investor
          reporting. Engineered for trust, speed, and scale.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

          <Link
            href="/owner-portal"
            className="
              px-6 py-3 rounded-full bg-[#3CF46B] text-black font-semibold
              shadow-[0_0_30px_rgba(60,244,107,0.9)]
              hover:bg-[#32d45f] transition text-center
            "
          >
            Enter Owner Portal
          </Link>

          <Link
            href="/investor-portal"
            className="
              px-6 py-3 rounded-full border border-gray-600 text-gray-200
              hover:bg-white/5 transition text-center
            "
          >
            Investor Portal
          </Link>

          <Link
            href="/admin"
            className="
              px-6 py-3 rounded-full bg-blue-600 text-white font-semibold
              hover:bg-blue-500 transition text-center
            "
          >
            Admin Dashboard
          </Link>

        </div>
      </div>
    </section>
  );
}
