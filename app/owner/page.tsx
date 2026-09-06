"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import { Card } from "@/components/ui/DesignSystem";

export default function OwnerPortal() {
  return (
    <main className="bg-slate-900 text-slate-100 min-h-screen">
      <Navbar />

      <section className="px-4 py-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Owner Dashboard
          </h1>
          <p className="mt-2 text-slate-300">
            Real‑time property intelligence, Bluetooth signals, risk scoring, and servicing insights.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Property Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Property Overview</h3>
            <p className="text-slate-300 text-sm">1234 Liberty Ave, Queens NY</p>
            <p className="text-slate-300 text-sm">Loan Balance: <span className="text-white font-semibold">$482,000</span></p>
            <p className="text-slate-300 text-sm">Equity: <span className="text-[#3CF46B] font-semibold">$118,000</span></p>
          </motion.div>

          {/* Bluetooth Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Bluetooth Intelligence</h3>
            <p className="text-slate-300 text-sm">Signal Strength: <span className="text-[#3CF46B] font-semibold">92%</span></p>
            <p className="text-slate-300 text-sm">Device Count: <span className="text-white font-semibold">4</span></p>
            <p className="text-slate-300 text-sm">Behavior Score: <span className="text-[#3CF46B] font-semibold">A‑</span></p>
          </motion.div>

          {/* Risk Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Risk Score</h3>
            <p className="text-4xl font-bold text-[#3CF46B]">12.4%</p>
            <p className="text-slate-300 text-sm mt-2">Low risk — stable payment history and strong Bluetooth consistency.</p>
          </motion.div>

          {/* Payment Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Payment Schedule</h3>
            <p className="text-slate-300 text-sm">Next Payment: <span className="text-white font-semibold">Oct 1</span></p>
            <p className="text-slate-300 text-sm">Amount: <span className="text-[#3CF46B] font-semibold">$2,842.00</span></p>
            <p className="text-slate-300 text-sm">Status: <span className="text-white font-semibold">On Time</span></p>
          </motion.div>

          {/* Portfolio Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Portfolio Analytics</h3>
            <p className="text-slate-300 text-sm">Total Properties: <span className="text-white font-semibold">3</span></p>
            <p className="text-slate-300 text-sm">Avg Behavior Score: <span className="text-[#3CF46B] font-semibold">A</span></p>
            <p className="text-slate-300 text-sm">Bluetooth Coverage: <span className="text-white font-semibold">89%</span></p>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
