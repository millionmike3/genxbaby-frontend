"use client";

import { useEffect, useState } from "react";

export default function InvestorDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/investor/dashboard", {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-300">Loading investor dashboard…</p>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-sm">
          Failed to load investor dashboard
        </p>
      </div>
    );
  }

  const { investor, portfolio, allocations } = data;

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6 space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Investor Dashboard
        </h1>
        <p className="text-slate-400 mt-2">
          Welcome back, {investor.fullName}
        </p>
      </header>

      {/* Portfolio Summary */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-4">
          Portfolio Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <p className="text-slate-400">Total Invested</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${portfolio?.totalInvested.toLocaleString()}
            </p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <p className="text-slate-400">Average Yield</p>
            <p className="text-2xl font-bold text-white mt-1">
              {portfolio?.avgYield}%
            </p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <p className="text-slate-400">Average Risk Score</p>
            <p className="text-2xl font-bold text-white mt-1">
              {portfolio?.avgRiskScore}
            </p>
          </div>
        </div>
      </section>

      {/* Allocations */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-4">
          Allocations
        </h2>

        {allocations.length === 0 ? (
          <p className="text-slate-400">No allocations yet.</p>
        ) : (
          <ul className="space-y-4">
            {allocations.map((a: any) => (
              <li
                key={a.id}
                className="border border-neutral-800 rounded-lg p-4 bg-neutral-800/40"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  {/* Borrower + Loan */}
                  <div>
                    <p className="font-semibold text-slate-200">
                      {a.application.borrower.fullName}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Loan Amount: ${a.application.loanAmount.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Income: ${a.application.income.toLocaleString()}
                    </p>
                  </div>

                  {/* Yield + Risk */}
                  <div className="text-right">
                    <p className="text-[#3CF46B] font-bold text-lg">
                      Yield: {a.yield}%
                    </p>
                    <p className="text-slate-400 text-sm">
                      Risk Score: {a.riskScore}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Fraud Score: {a.fraudScore}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
