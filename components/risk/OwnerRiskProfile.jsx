import { RiskDashboard } from "./RiskDashboard";
import { RiskHistoryChart } from "./RiskHistoryChart";
import { RiskHistoryTimeline } from "./RiskHistoryTimeline";
import { PricingHistoryTimeline } from "./PricingHistoryTimeline";
import { OwnerBankPanel } from "./OwnerBankPanel";

export function OwnerRiskProfile({
  ownerId,
  dashboard,
  riskHistory,
  pricingHistory,
  banks,
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Owner Risk Profile</h1>

      {/* OWNER ID */}
      <div className="text-gray-600 text-sm">
        Owner ID: <span className="font-semibold">{ownerId}</span>
      </div>

      {/* RISK DASHBOARD */}
      <RiskDashboard data={dashboard} />

      {/* ⭐ NEW — INCOME VERIFICATION SCORE CARD */}
      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-semibold">Income Verification Score</h2>
        <div className="text-2xl font-bold">
          {dashboard.incomeVerificationScore ?? "N/A"}
        </div>
      </div>

      {/* RISK HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskHistoryChart history={riskHistory} />
        </div>
        <div className="lg:col-span-1">
          <RiskHistoryTimeline history={riskHistory} />
        </div>
      </div>

      {/* PRICING HISTORY */}
      <PricingHistoryTimeline history={pricingHistory} />

      {/* BANK PROFILES */}
      <OwnerBankPanel banks={banks} />
    </div>
  );
}
