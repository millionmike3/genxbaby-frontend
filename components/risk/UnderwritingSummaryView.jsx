"use client";

import RiskDashboard from "./RiskDashboard";
import RiskHistoryChart from "./RiskHistoryChart";
import PricingHistoryTimeline from "./PricingHistoryTimeline";
import OwnerBankPanel from "./OwnerBankPanel";
import UnderwritingDecision from "./UnderwritingDecision";

export default function UnderwritingSummaryView({ summary }) {
  const {
    owner,
    dashboard,
    riskHistory,
    pricingHistory,
    banks,
    incomeVerification,
  } = summary;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Underwriting Summary</h1>

      {/* OWNER CARD */}
      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">Owner</h2>
        <div className="text-sm text-gray-700">
          {owner.firstName} {owner.lastName}
        </div>
        <div className="text-sm text-gray-600">Owner ID: {owner.id}</div>
      </div>

      {/* RISK DASHBOARD */}
      <RiskDashboard data={dashboard} />

      {/* RISK HISTORY + PRICING HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskHistoryChart history={riskHistory} />
        </div>
        <div className="lg:col-span-1">
          <PricingHistoryTimeline history={pricingHistory} />
        </div>
      </div>

      {/* BANK PROFILES */}
      <OwnerBankPanel banks={banks} />

      {/* INCOME VERIFICATION CARD */}
      {incomeVerification && (
        <div className="border rounded-lg p-4 bg-white shadow space-y-2">
          <h2 className="text-xl font-semibold">Income Verification</h2>

          <div className="text-sm">
            <span className="font-semibold">Score:</span>{" "}
            {incomeVerification.incomeVerificationScore}
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-semibold">Gross Monthly Income:</span>{" "}
            ${incomeVerification.grossMonthlyIncome}
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-semibold">Net Monthly Income:</span>{" "}
            ${incomeVerification.netMonthlyIncome}
          </div>

          <div className="text-xs text-gray-600">
            Stability {incomeVerification.incomeStability} · Employer{" "}
            {incomeVerification.employerMatch} · Bank{" "}
            {incomeVerification.bankMatch}
          </div>
        </div>
      )}

      {/* UNDERWRITING DECISION */}
      <UnderwritingDecision dashboard={dashboard} />
    </div>
  );
}
