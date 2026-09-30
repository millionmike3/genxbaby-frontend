import { getPrisma } from "@/lib/prisma";
import { integrateUPI } from "@/app/owner/underwriting/utils/upiIntegrator";

import UnderwriterUPIScoreCard from "@/app/owner/underwriting/components/UnderwriterUPIScoreCard";
import UnderwriterRiskAlignmentChart from "@/app/owner/underwriting/components/UnderwriterRiskAlignmentChart";
import UnderwriterFraudAlignmentChart from "@/app/owner/underwriting/components/UnderwriterFraudAlignmentChart";
import UnderwriterPerformanceDashboard from "@/app/owner/underwriting/components/UnderwriterPerformanceDashboard";

export default async function UnderwriterPerformancePage() {
  const prisma = getPrisma();
  const upi = await integrateUPI(prisma);

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#4EE38A] mb-4">
        Underwriter Performance Intelligence
      </h1>

      {/* UPI Score Leaderboard */}
      <UnderwriterUPIScoreCard data={upi.upiScores} />

      {/* Speed + Volume */}
      <UnderwriterPerformanceDashboard data={upi.baseMetrics} />

      {/* Risk Alignment */}
      <UnderwriterRiskAlignmentChart data={upi.riskMetrics} />

      {/* Fraud Alignment */}
      <UnderwriterFraudAlignmentChart data={upi.fraudMetrics} />

      {/* Accuracy */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#4EE38A] mb-4">Accuracy</h2>
        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 text-left">Underwriter</th>
              <th className="py-2 text-left">Accuracy (%)</th>
            </tr>
          </thead>
          <tbody>
            {upi.accuracyMetrics.map((u) => (
              <tr key={u.underwriterId} className="border-b border-slate-800">
                <td className="py-2">{u.underwriterId}</td>
                <td className="py-2">{u.accuracy.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bias */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#4EE38A] mb-4">Bias Indicators</h2>
        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 text-left">Underwriter</th>
              <th className="py-2 text-left">FICO Bias</th>
              <th className="py-2 text-left">Income Bias</th>
              <th className="py-2 text-left">Property Bias</th>
            </tr>
          </thead>
          <tbody>
            {upi.biasMetrics.map((u) => (
              <tr key={u.underwriterId} className="border-b border-slate-800">
                <td className="py-2">{u.underwriterId}</td>
                <td className="py-2">{u.ficoBias.toFixed(1)}</td>
                <td className="py-2">{u.incomeBias.toFixed(1)}</td>
                <td className="py-2">{u.propertyBias.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
