"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MotionIntro() {
  const [visible, setVisible] = useState(true);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Trigger flash right before the intro disappears
    const flashTimer = setTimeout(() => setFlash(true), 1500);

    // Remove intro after flash
    const hideTimer = setTimeout(() => setVisible(false), 1800);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden rounded-font">

      {/* Sparkling Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-stars opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,127,0.25),_transparent_70%)] blur-2xl" />
      </div>

      {/* GEN X BABY Intro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-6"
      >
        <span className="text-white text-6xl md:text-8xl font-extrabold drop-shadow-xl">
          GEN
        </span>

        {/* BIGGER X — FAST BLINK */}
        <motion.span
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [1, 0.2, 1, 0.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            text-[#00ff7f]
            text-7xl md:text-9xl font-extrabold
            drop-shadow-[0_0_45px_#00ff7f]
          "
        >
          X
        </motion.span>

        <span className="text-white text-6xl md:text-8xl font-extrabold drop-shadow-xl">
          BABY
        </span>
      </motion.div>

      {/* Extra Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-ping absolute top-1/3 left-1/4 w-2 h-2 bg-[#00ff7f] rounded-full opacity-60" />
        <div className="animate-ping absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-40" />
        <div className="animate-ping absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[#00ff7f] rounded-full opacity-50" />
      </div>

      {/* BLINDING FLASH */}
      {flash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-white"
        />
      )}
    </div>
  );
}
