"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function InvestorDashboard() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/investor/dashboard");
        setPortfolio(res.portfolio);
        setDeals(res.deals);
      } catch (err) {
        console.error("Failed to load investor dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading investor dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Investor Dashboard</h1>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Invested</h2>
          <p className="text-2xl font-bold mt-2">${portfolio.totalInvested}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Returns</h2>
          <p className="text-2xl font-bold mt-2">${portfolio.totalReturns}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Active Deals</h2>
          <p className="text-2xl font-bold mt-2">{portfolio.activeDeals}</p>
        </div>
      </div>

      {/* Pipeline Deals */}
      <h2 className="text-xl font-semibold">Pipeline Deals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((d) => (
          <div key={d.id} className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-bold">{d.address}</h3>
            <p className="mt-2">Projected ROI: {d.projectedROI}%</p>
            <p>Raise Amount: ${d.raiseAmount}</p>
            <p>Status: {d.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
