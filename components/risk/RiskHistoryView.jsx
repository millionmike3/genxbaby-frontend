"use client";

import RiskHistoryTimeline from "./RiskHistoryTimeline";
import RiskHistoryChart from "./RiskHistoryChart";

export default function RiskHistoryView({ history }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Risk History</h1>

      {!history || history.length === 0 ? (
        <div className="border rounded-lg p-4 bg-white shadow">
          <p className="text-gray-500">No risk history available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CHART */}
          <div className="lg:col-span-2">
            <RiskHistoryChart history={history} />
          </div>

          {/* TIMELINE */}
          <div className="lg:col-span-1">
            <RiskHistoryTimeline history={history} />
          </div>
        </div>
      )}
    </div>
  );
}
