"use client";

import { useState } from "react";

export function IncomeVerificationView({ ownerId, history }) {
  const [loading, setLoading] = useState(false);

  async function runIncomeVerification() {
    try {
      setLoading(true);

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/income-verification/${ownerId}/evaluate`,
        { method: "POST" }
      );

      // Reload page to show new snapshot
      location.reload();
    } catch (err) {
      console.error("Income Verification Error:", err);
      alert("Failed to run income verification.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Income Verification</h1>

      <div className="text-sm text-gray-600">Owner ID: {ownerId}</div>

      {/* RUN INCOME VERIFICATION BUTTON */}
      <button
        onClick={runIncomeVerification}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Running…" : "Run Income Verification"}
      </button>

      {/* SNAPSHOTS LIST */}
      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">Snapshots</h2>

        {history.length === 0 && (
          <div className="text-gray-500 text-sm">
            No income verification snapshots yet.
          </div>
        )}

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {history.map((h) => (
            <div key={h.id} className="border rounded p-3 bg-gray-50">
              <div className="text-xs text-gray-500">
                {new Date(h.timestamp).toLocaleString()}
              </div>

              <div className="text-sm font-semibold">
                Source: {h.sourceType}
              </div>

              <div className="text-sm">
                Gross: ${h.grossMonthlyIncome} · Net: ${h.netMonthlyIncome}
              </div>

              <div className="text-xs text-gray-600">
                Stability {h.incomeStability} · Employer {h.employerMatch} · Bank{" "}
                {h.bankMatch}
              </div>

              <div className="text-sm mt-1">
                Income Verification Score:{" "}
                <span className="font-semibold">
                  {h.incomeVerificationScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
