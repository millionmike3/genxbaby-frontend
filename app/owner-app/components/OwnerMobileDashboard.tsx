"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/DesignSystem";

export default function OwnerMobileDashboard({ metrics, pipeline, audit }) {
  return (
    <div className="space-y-6 md:hidden">

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className={Card}>
          <h3 className="text-xs text-slate-400">Pipeline</h3>
          <p className="mt-2 text-xl font-semibold text-blue-400">
            {metrics?.pipelineCount}
          </p>
        </div>

        <div className={Card}>
          <h3 className="text-xs text-slate-400">Active Loans</h3>
          <p className="mt-2 text-xl font-semibold text-purple-400">
            {metrics?.activeLoansCount}
          </p>
        </div>

        <div className={Card}>
          <h3 className="text-xs text-slate-400">Investors</h3>
          <p className="mt-2 text-xl font-semibold text-amber-400">
            {metrics?.investorCount}
          </p>
        </div>

        <div className={Card}>
          <h3 className="text-xs text-slate-400">Risk</h3>
          <p className="mt-2 text-xl font-semibold text-red-400">
            {metrics?.avgRiskScore?.toFixed(2)}
          </p>
        </div>
      </motion.div>

      {/* Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-lg font-semibold">Pipeline</h2>
        {pipeline.map((app) => (
          <div
            key={app.id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900"
          >
            <div className="font-semibold">{app.borrowerName}</div>
            <div className="text-slate-400 text-sm">
              ${app.amount.toLocaleString()}
            </div>
            <div className="text-slate-500 text-xs mt-1">
              Status: {app.status}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Audit */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-lg font-semibold">Audit Log</h2>
        {audit.map((a) => (
          <div
            key={a.id}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900"
          >
            <div className="font-bold">{a.action}</div>
            <div className="text-slate-400">{a.details}</div>
            <div className="text-xs text-slate-500 mt-1">
              {new Date(a.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
