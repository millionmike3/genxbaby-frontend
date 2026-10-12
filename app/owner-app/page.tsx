"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import { Card } from "@/components/ui/DesignSystem";
import BehavioralPanel from "../underwriting-app/components/BehavioralPanel";
import OrgBehaviorRollups from "./components/OrgBehaviorRollups";
import RiskBucketChart from "./components/RiskBucketChart";
import PerformanceChart from "./components/PerformanceChart";
import OwnerDashboardTabs from "./components/OwnerDashboardTabs";
import OwnerMobileDashboard from "./components/OwnerMobileDashboard";

// ⭐ NEW: Import your hooks
import {
  useOwnerMetrics,
  useOwnerPipeline,
  useOwnerAudit,
  useOwnerBehaviorRollups,
  useOwnerRiskBuckets,
  useOwnerPerformance,
} from "./hooks";

export default function OwnerPortal() {
  // TODO: Replace with real orgId from session or JWT
  const orgId = "ORG-001";

  // ⭐ NEW: Replace all manual state with hook-based data
  const metrics = useOwnerMetrics(orgId)?.data;
  const pipeline = useOwnerPipeline(orgId)?.data;
  const audit = useOwnerAudit(orgId)?.data;
  const behavior = useOwnerBehaviorRollups(orgId)?.data;
  const risk = useOwnerRiskBuckets(orgId)?.data;
  const performance = useOwnerPerformance(orgId)?.data;

  // ⭐ Derived values
  const totalPipeline = metrics?.pipelineCount ?? 0;
  const activeLoans = metrics?.activeLoansCount ?? 0;
  const totalInvestors = metrics?.investorCount ?? 0;
  const avgRiskScore = metrics?.avgRiskScore?.toFixed(2) ?? "0.00";
  const avgBehaviorScore = metrics?.avgBehaviorScore?.toFixed(2) ?? "0.00";

  const selected = pipeline?.[0];

 

  return (
    <main className="bg-slate-900 text-slate-100 min-h-screen">
      <Navbar />

      <section className="px-4 py-10 mx-auto max-w-6xl space-y-12">

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
            Organization-wide intelligence, property analytics, behavioral scoring, and servicing insights.
          </p>
        </motion.div>

        {/* ----------------------------- */}
        {/* ORIGINAL PROPERTY GRID */}
        {/* ----------------------------- */}
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
            <p className="text-slate-300 text-sm">
              Loan Balance: <span className="text-white font-semibold">$482,000</span>
            </p>
            <p className="text-slate-300 text-sm">
              Equity: <span className="text-[#3CF46B] font-semibold">$118,000</span>
            </p>
          </motion.div>

          {/* Bluetooth Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Bluetooth Intelligence</h3>
            <p className="text-slate-300 text-sm">
              Signal Strength: <span className="text-[#3CF46B] font-semibold">92%</span>
            </p>
            <p className="text-slate-300 text-sm">
              Device Count: <span className="text-white font-semibold">4</span>
            </p>
            <p className="text-slate-300 text-sm">
              Behavior Score: <span className="text-[#3CF46B] font-semibold">A‑</span>
            </p>
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
            <p className="text-slate-300 text-sm mt-2">
              Low risk — stable payment history and strong Bluetooth consistency.
            </p>
          </motion.div>

          {/* Payment Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Payment Schedule</h3>
            <p className="text-slate-300 text-sm">
              Next Payment: <span className="text-white font-semibold">Oct 1</span>
            </p>
            <p className="text-slate-300 text-sm">
              Amount: <span className="text-[#3CF46B] font-semibold">$2,842.00</span>
            </p>
            <p className="text-slate-300 text-sm">
              Status: <span className="text-white font-semibold">On Time</span>
            </p>
          </motion.div>

          {/* Portfolio Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={Card}
          >
            <h3 className="text-lg font-semibold mb-2">Portfolio Analytics</h3>
            <p className="text-slate-300 text-sm">
              Total Properties: <span className="text-white font-semibold">3</span>
            </p>
            <p className="text-slate-300 text-sm">
              Avg Behavior Score: <span className="text-[#3CF46B] font-semibold">A</span>
            </p>
            <p className="text-slate-300 text-sm">
              Bluetooth Coverage: <span className="text-white font-semibold">89%</span>
            </p>
          </motion.div>

        </div>

        {/* ----------------------------- */}
        {/* ORG-LEVEL INTELLIGENCE */}
        {/* ----------------------------- */}

        {/* Org Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">
          <div className={Card}>
            <h3 className="text-xs text-slate-400">Pipeline</h3>
            <p className="mt-2 text-2xl font-semibold text-blue-400">
              {totalPipeline}
            </p>
          </div>

          <div className={Card}>
            <h3 className="text-xs text-slate-400">Active Loans</h3>
            <p className="mt-2 text-2xl font-semibold text-purple-400">
              {activeLoans}
            </p>
          </div>

          <div className={Card}>
            <h3 className="text-xs text-slate-400">Investors</h3>
            <p className="mt-2 text-2xl font-semibold text-amber-400">
              {totalInvestors}
            </p>
          </div>

          <div className={Card}>
            <h3 className="text-xs text-slate-400">Avg Risk Score</h3>
            <p className="mt-2 text-2xl font-semibold text-red-400">
              {avgRiskScore}
            </p>
          </div>
        </div>

        {/* Risk & Behavioral Averages */}
        <div className="grid gap-6 md:grid-cols-2 mt-10">
          <div className={Card}>
            <h3 className="text-xs text-slate-400">Average Behavioral Score</h3>
            <p className="mt-2 text-2xl font-semibold text-emerald-400">
              {avgBehaviorScore}
            </p>
          </div>
        </div>

        {/* Org Behavioral Rollups */}
        {OrgBehaviorRollups && (
          <OrgBehaviorRollups orgId={orgId} />
        )}

        {/* Risk Buckets */}
        {RiskBucketChart.length > 0 && (
          <RiskBucketChart data={useOwnerRiskBuckets} />
        )}

        {/* Performance Trends */}
        {performance.length > 0 && (
          <PerformanceChart data={performance} />
        )}
          {/* Mobile */}
          <OwnerMobileDashboard
            metrics={metrics}
            pipeline={pipeline}
            audit={audit}
            />

            {/* Desktop Tabs */}
             <div className="hidden md:block">
             <OwnerDashboardTabs
              metrics={metrics}
              pipeline={pipeline}
              audit={audit}
              behavior={behavior}
             risk={risk}
             performance={performance}
             />
             </div>

        {/* Pipeline Overview */}
        <div className={Card + " mt-16"}>
          <h2 className="text-xl font-semibold mb-4">Pipeline Overview</h2>

          <div className="space-y-4">
            {pipeline.map((app) => (
              <div
                key={app.id}
                className={`p-4 rounded-xl border ${
                  app.id === selected?.id
                    ? "border-emerald-500 bg-slate-900"
                    : "border-slate-800 bg-slate-900/40"
                }`}
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
          </div>
        </div>

        {/* Behavioral Intelligence for Selected Borrower */}
        {selected?.borrower?.userId && (
          <BehavioralPanel userId={selected.borrower.userId} />
        )}

        {/* Audit Log */}
        <div className={Card + " mt-16"}>
          <h2 className="text-xl font-semibold mb-4">Organization Audit Log</h2>

          <ul className="space-y-3 text-slate-300">
            {audit.map((a) => (
              <li
                key={a.id}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800"
              >
                <div className="font-bold">{a.action}</div>
                <div className="text-slate-400">{a.details}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Org Documents */}
        <div className={Card + " mt-16 mb-20"}>
          <h2 className="text-xl font-semibold mb-4">Organization Documents</h2>
          <p className="text-slate-400 text-sm mb-4">
            Operating agreements, investor packages, compliance documents, and org-level statements will appear here.
          </p>
          <div className="text-slate-500 text-xs">
            (Integrate your storage + PDF generation layer here)
          </div>
        </div>

      </section>
    </main>
  );
}
