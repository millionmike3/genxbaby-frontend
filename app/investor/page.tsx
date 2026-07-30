"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function InvestorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [investors, setInvestors] = useState<any[]>([]);
  const [pipeline, setPipeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const s = await api("/investor/stats");
        const i = await api("/investor/list");
        const p = await api("/investor/pipeline");

        setStats(s);
        setInvestors(i);
        setPipeline(p);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading investor dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-100">

      <h1 className="text-3xl font-bold">Investor Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Investors" value={stats.totalInvestors} color="blue" />
        <StatCard label="Avg Potential Score" value={stats.avgPotentialScore} color="purple" />
        <StatCard label="High‑Value Investors" value={stats.highValueInvestors} color="green" />
        <StatCard label="Pipeline Deals" value={stats.pipelineDeals} color="orange" />
      </div>

      {/* INVESTOR LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Investors</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Potential Score</th>
              <th className="py-2">Band</th>
              <th className="py-2">Phone</th>
            </tr>
          </thead>

          <tbody>
            {investors.map((inv) => (
              <tr key={inv.id} className="border-b">
                <td className="py-2">{inv.name}</td>
                <td className="py-2">{inv.email}</td>
                <td className="py-2">{inv.investorPotentialScore}</td>
                <td className="py-2">{inv.investorPotentialBand}</td>
                <td className="py-2">{inv.phone ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PIPELINE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Pipeline Deals</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Address</th>
              <th className="py-2">Projected ROI</th>
              <th className="py-2">Raise Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {pipeline.map((deal) => (
              <tr key={deal.id} className="border-b">
                <td className="py-2">{deal.address}</td>
                <td className="py-2">{deal.projectedROI}%</td>
                <td className="py-2">${deal.raiseAmount}</td>
                <td className="py-2">{deal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    </div>
  );
}
