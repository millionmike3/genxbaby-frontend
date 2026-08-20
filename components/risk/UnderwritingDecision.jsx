"use client";

export default function UnderwritingDecision({ dashboard }) {
  if (!dashboard) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <p className="text-gray-500">No underwriting data available.</p>
      </div>
    );
  }

  const {
    finalRateBps,
    riskTier,
    riskScore,
    financialHealthScore,
    incomeVerificationScore,
  } = dashboard;

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-3">
      <h2 className="text-xl font-semibold">Underwriting Decision</h2>

      <div className="text-sm">
        <span className="font-semibold">Risk Tier:</span> {riskTier}
      </div>

      <div className="text-sm">
        <span className="font-semibold">Risk Score:</span> {riskScore}
      </div>

      <div className="text-sm">
        <span className="font-semibold">Financial Health:</span>{" "}
        {financialHealthScore}
      </div>

      <div className="text-sm">
        <span className="font-semibold">Income Verification:</span>{" "}
        {incomeVerificationScore}
      </div>

      <div className="text-sm">
        <span className="font-semibold">Final Rate:</span>{" "}
        {(finalRateBps / 100).toFixed(2)}%
      </div>

      <div className="pt-2 border-t text-lg font-bold">
        Decision: {riskTier <= 3 ? "APPROVED" : "REVIEW"}
      </div>
    </div>
  );
}
