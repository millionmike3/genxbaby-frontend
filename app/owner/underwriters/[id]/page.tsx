import { getPrisma } from "@/lib/prisma";
import { integrateUPI } from "@/app/owner/underwriting/utils/upiIntegrator";

import UnderwriterUPIScoreCard from "@/app/owner/underwriting/components/UnderwriterUPIScoreCard";
import UnderwriterRiskAlignmentChart from "@/app/owner/underwriting/components/UnderwriterRiskAlignmentChart";
import UnderwriterFraudAlignmentChart from "@/app/owner/underwriting/components/UnderwriterFraudAlignmentChart";
import UnderwriterPerformanceDashboard from "@/app/owner/underwriting/components/UnderwriterPerformanceDashboard";

export default async function UnderwriterProfilePage({ params }: { params: { id: string } }) {
  const prisma = getPrisma();
  const upi = await integrateUPI(prisma);

  const underwriterId = params.id;

  // Extract all metrics for this underwriter
  const score = upi.upiScores.find((u) => u.underwriterId === underwriterId);
  const base = upi.baseMetrics.find((u) => u.underwriterId === underwriterId);
  const accuracy = upi.accuracyMetrics.find((u) => u.underwriterId === underwriterId);
  const bias = upi.biasMetrics.find((u) => u.underwriterId === underwriterId);
  const risk = upi.riskMetrics.find((u) => u.underwriterId === underwriterId);
  const fraud = upi.fraudMetrics.find((u) => u.underwriterId === underwriterId);

  // Decision history
  const decisions = await prisma.underwriterDecision.findMany({
    where: { underwriterId },
    orderBy: { createdAt: "desc" },
    include: {
      application: {
        select: {
          id: true,
          scoring: true,
          borrower: true,
          property: true,
        },
      },
    },
  });

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#4EE38A] mb-4">
        Underwriter Profile: {underwriterId}
      </h1>

      {/* UPI Score */}
      <UnderwriterUPIScoreCard data={[score!]} />

      {/* Speed + Volume */}
      <UnderwriterPerformanceDashboard data={[base!]} />

      {/* Risk Alignment */}
      <UnderwriterRiskAlignmentChart data={[risk!]} />

      {/* Fraud Alignment */}
      <UnderwriterFraudAlignmentChart data={[fraud!]} />

      {/* Accuracy */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#4EE38A] mb-4">Accuracy</h2>
        <p className="text-slate-300 text-lg">{accuracy?.accuracy.toFixed(1)}%</p>
      </div>

      {/* Bias */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#4EE38A] mb-4">Bias Indicators</h2>
        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 text-left">FICO Bias</th>
              <th className="py-2 text-left">Income Bias</th>
              <th className="py-2 text-left">Property Bias</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-2">{bias?.ficoBias.toFixed(1)}</td>
              <td className="py-2">{bias?.incomeBias.toFixed(1)}</td>
              <td className="py-2">{bias?.propertyBias.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Decision History */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#4EE38A] mb-4">Decision History</h2>

        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 text-left">Application</th>
              <th className="py-2 text-left">Decision</th>
              <th className="py-2 text-left">Risk</th>
              <th className="py-2 text-left">Fraud</th>
              <th className="py-2 text-left">Borrower</th>
              <th className="py-2 text-left">Property</th>
              <th className="py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((d) => (
              <tr key={d.id} className="border-b border-slate-800">
                <td className="py-2">{d.application?.id}</td>
                <td className="py-2">{d.decision}</td>
                <td className="py-2">{d.application?.scoring?.riskScore}</td>
                <td className="py-2">{d.application?.scoring?.fraudScore}</td>
                <td className="py-2">
                  {d.application?.borrower?.firstName} {d.application?.borrower?.lastName}
                </td>
                <td className="py-2">{d.application?.property?.propertyAddress}</td>
                <td className="py-2">{new Date(d.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
