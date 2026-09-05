"use client";

import { motion } from "framer-motion";

export default function WhyGenXBaby() {
  const stats = [
    { label: "Pricing Accuracy", value: "99.4%" },
    { label: "Investor Reporting Speed", value: "4.2x" },
    { label: "Underwriting Automation", value: "68%" },
    { label: "Bluetooth Signal Coverage", value: "92%" },
  ];

  return (
    <section className="px-4 py-20 bg-slate-900 border-t border-slate-800">
      <div className="mx-auto max-w-6xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Why GenxBaby?
        </h2>
        <p className="mt-4 text-slate-300 max-w-xl mx-auto">
          A unified intelligence layer for borrowers, investors, owners, and admins.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              rounded-2xl border border-slate-800 bg-slate-950/60
              p-6 text-center shadow-xl shadow-black/40
            "
          >
            <p className="text-4xl font-bold text-[#3CF46B]">{s.value}</p>
            <p className="mt-2 text-slate-300">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
