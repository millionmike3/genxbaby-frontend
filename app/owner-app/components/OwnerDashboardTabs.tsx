"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/DesignSystem";

export default function OwnerDashboardTabs({
  metrics,
  pipeline,
  audit,
  behavior,
  risk,
  performance,
}) {
  const tabs = [
    "Metrics",
    "Pipeline",
    "Audit",
    "Behavior",
    "Risk",
    "Performance",
  ];

  const [active, setActive] = useState("Metrics");

  function renderContent() {
    switch (active) {
      case "Metrics":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <div className={Card}>
              <h3 className="text-xs text-slate-400">Pipeline</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-400">
                {metrics?.pipelineCount}
              </p>
            </div>

            <div className={Card}>
              <h3 className="text-xs text-slate-400">Active Loans</h3>
              <p className="mt-2 text-2xl font-semibold text-purple-400">
                {metrics?.activeLoansCount}
              </p>
            </div>

            <div className={Card}>
              <h3 className="text-xs text-slate-400">Investors</h3>
              <p className="mt-2 text-2xl font-semibold text-amber-400">
                {metrics?.investorCount}
              </p>
            </div>

            <div className={Card}>
              <h3 className="text-xs text-slate-400">Avg Risk Score</h3>
              <p className="mt-2 text-2xl font-semibold text-red-400">
                {metrics?.avgRiskScore?.toFixed(2)}
              </p>
            </div>
          </motion.div>
        );

      case "Pipeline":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {pipeline.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/40"
              >
                <div className="font-semibold text-slate-100">
                  {app.borrowerName}
                </div>
                <div className="text-slate-400 text-sm">
                  ${app.amount.toLocaleString()}
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  Status: {app.status}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case "Audit":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {audit.map((a) => (
              <div
                key={a.id}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800"
              >
                <div className="font-bold">{a.action}</div>
                <div className="text-slate-400">{a.details}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case "Behavior":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={Card}>
              <h3 className="text-lg font-semibold mb-2">
                Behavioral Intelligence (Org Rollups)
              </h3>

              <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                <div>Avg Score: {behavior?.avgScore?.toFixed(2)}</div>
                <div>Volatility: {behavior?.avgVolatility?.toFixed(2)}</div>
                <div>Reaction Speed: {behavior?.avgReactionSpeed?.toFixed(2)}</div>
                <div>
                  Navigation Volatility:{" "}
                  {behavior?.avgNavigationVolatility?.toFixed(2)}
                </div>
                <div>Urgency Score: {behavior?.avgUrgencyScore?.toFixed(2)}</div>
                <div>Reversals: {behavior?.avgReversals?.toFixed(2)}</div>
              </div>
            </div>
          </motion.div>
        );

      case "Risk":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {risk.map((b) => (
              <div
                key={b.bucket}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800"
              >
                <div className="font-semibold">{b.bucket}</div>
                <div className="text-slate-300">
                  Avg Score: {b._avg.score.toFixed(2)}
                </div>
                <div className="text-slate-500 text-xs">
                  Count: {b._count._all}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case "Performance":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {performance.map((p) => (
              <div
                key={p.period}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800"
              >
                <div className="font-semibold">{p.period}</div>
                <div className="text-slate-300">DSCR: {p.dscr.toFixed(2)}</div>
                <div className="text-slate-300">
                  LTV: {(p.ltv * 100).toFixed(1)}%
                </div>
                <div className="text-slate-300">
                  Risk: {p.riskScore.toFixed(2)}
                </div>
              </div>
            ))}
          </motion.div>
        );
    }
  }

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              active === tab
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
