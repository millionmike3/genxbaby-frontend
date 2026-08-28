"use client";

import { motion, Variants, MotionProps } from "framer-motion";

// -------------------------------------------------------------
// ANIMATION VARIANTS (Framer Motion v11 strict‑mode safe)
// -------------------------------------------------------------

const container: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 90,
      damping: 18
    }
  }
};

const fastTitle: Variants = {
  hidden: { opacity: 0, x: -120, skewX: -12 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      stiffness: 140,
      damping: 16
    }
  }
};

// Pulse animation — MUST be typed as MotionProps
const xPulse: MotionProps = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 6, -6, 0],
    transition: {
      repeat: Infinity,
      duration: 3.2,
      ease: "easeInOut"
    }
  }
};

// -------------------------------------------------------------
// COMPONENT
// -------------------------------------------------------------

export default function GenXBabyHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center px-6 py-20 bg-black text-white overflow-hidden">

      {/* Neon Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-40 mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#1F2933"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow Overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(60,244,107,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(0,140,255,0.18),_transparent_60%)]" />

      {/* MAIN CONTAINER */}
      <motion.div
        className="max-w-4xl text-center flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        {/* TITLE */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.25em] uppercase flex items-center justify-center gap-3"
          variants={fastTitle}
        >
          <span className="text-gray-200">GEN</span>

          <motion.span
            className="relative inline-flex items-center justify-center text-[#9DD431]"
            {...xPulse}
          >
            <span className="absolute inset-0 blur-xl bg-[conic-gradient(from_120deg,_#9DD431,_#6D5AAC,_#008CFF,_#3CF46B,_#9DD431)] opacity-70" />
            <span className="relative z-10 text-7xl font-black">X</span>
          </motion.span>

          <span className="text-gray-200">BABY</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.h2
          className="mt-4 text-xl sm:text-2xl font-semibold tracking-wide text-[#9DD431]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Institutional‑Grade Fintech Operating System
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <span className="text-[#3CF46B] font-medium">Blockchain‑Verified</span>,{" "}
          <span className="text-[#008CFF] font-medium">AI‑Driven</span>,{" "}
          <span className="text-[#9DD431] font-medium">Compliance‑Aligned</span>
        </motion.p>

        {/* DIVIDER */}
        <motion.div
          className="mt-8 w-28 h-[3px] bg-gradient-to-r from-[#9DD431] via-[#6D5AAC] to-[#008CFF] rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45 }}
        />

        {/* PORTAL BUTTONS */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <a
            href="/owner"
            className="px-8 py-3 rounded-lg bg-[#111] text-gray-200 border border-[#9DD431] hover:bg-[#9DD431] hover:text-black transition font-semibold"
          >
            Owner Portal
          </a>

          <a
            href="/investor"
            className="px-8 py-3 rounded-lg bg-[#111] text-gray-200 border border-[#6D5AAC] hover:bg-[#6D5AAC] hover:text-black transition font-semibold"
          >
            Investor Portal
          </a>

          <a
            href="/borrower"
            className="px-8 py-3 rounded-lg bg-[#111] text-gray-200 border border-[#3CF46B] hover:bg-[#3CF46B] hover:text-black transition font-semibold"
          >
            Borrower Portal
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
