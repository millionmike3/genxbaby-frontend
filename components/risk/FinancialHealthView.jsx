"use client";

import { FinancialHealthChart } from "./FinancialHealthChart";

export default function ComponentName({ ownerId, history }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Health</h1>

      <div className="text-gray-600 text-sm">
        Owner ID: {ownerId}
      </div>

      <FinancialHealthChart history={history} />

      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">Snapshots</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {history.map((h) => (
            <div key={h.id} className="border rounded p-3 bg-gray-50">
              <div className="text-xs text-gray-500">
                {new Date(h.timestamp).toLocaleString()}
              </div>

              <div className="text-sm font-semibold">
                Score: {h.financialHealthScore}
              </div>

              <div className="text-xs text-gray-600">
                Liquidity {h.liquidityScore} · Income {h.incomeStability} · CashFlow {h.cashFlowScore}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
