"use client";

import { motion } from "framer-motion";

export default function PricingDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="
        mx-auto mt-16 max-w-xl rounded-2xl p-6
        bg-slate-900/70 border border-slate-800
        shadow-xl shadow-black/40
      "
    >
      <h3 className="text-xl font-semibold text-slate-100 mb-4">
        Real‑Time Pricing Intelligence
      </h3>

      <div className="space-y-3 text-slate-300 text-sm">
        <p>Base Rate: <span className="text-white font-semibold">6.250%</span></p>
        <p>LLPA Adjustments: <span className="text-[#3CF46B] font-semibold">+0.375%</span></p>
        <p>Behavior Score: <span className="text-[#3CF46B] font-semibold">‑0.125%</span></p>
        <p>Bluetooth Proximity: <span className="text-[#3CF46B] font-semibold">‑0.050%</span></p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-lg font-bold text-white">
          Final Rate: <span className="text-[#3CF46B]">6.450%</span>
        </p>
      </div>
    </motion.div>
  );
}
