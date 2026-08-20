"use client";

export default function RiskDashboard({ data }) {
  if (!data) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <div className="text-gray-500 text-sm">No dashboard data available.</div>
      </div>
    );
  }

  const {
    riskScore,
    riskLevel,
    financialHealth,
    incomeVerification,
    flags,
  } = data;

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-4">
      <h2 className="text-xl font-semibold">Risk Dashboard</h2>

      <div className="text-sm">
        <span className="font-semibold">Risk Score:</span> {riskScore ?? "N/A"}
      </div>

      <div className="text-sm">
        <span className="font-semibold">Risk Level:</span> {riskLevel ?? "N/A"}
      </div>

      {financialHealth && (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Financial Health:</span>{" "}
          {financialHealth.status}
        </div>
      )}

      {incomeVerification && (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Income Verification Score:</span>{" "}
          {incomeVerification.incomeVerificationScore}
        </div>
      )}

      {flags && flags.length > 0 && (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Flags:</span>{" "}
          {flags.join(", ")}
        </div>
      )}
    </div>
  );
}
