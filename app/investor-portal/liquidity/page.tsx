import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { InvestorLiquidityStressChart } from "../_components/InvestorLiquidityStressChart";

export default async function InvestorLiquidityPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  const div = await prisma.investorDiversificationAnalytics.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const factors = div?.factors ?? {};

  const liquid = factors["liquidity_0_30"] ?? 0.2;
  const shortTerm = factors["liquidity_30_90"] ?? 0.3;
  const midTerm = factors["liquidity_90_180"] ?? 0.3;
  const longTerm = factors["liquidity_180_plus"] ?? 0.2;

  const stressData = [
    {
      scenario: "Mild Stress",
      liquid: liquid * 0.9,
      shortTerm: shortTerm * 0.95,
      midTerm: midTerm * 1.05,
      longTerm: longTerm * 1.1,
    },
    {
      scenario: "Moderate Stress",
      liquid: liquid * 0.75,
      shortTerm: shortTerm * 0.85,
      midTerm: midTerm * 1.15,
      longTerm: longTerm * 1.25,
    },
    {
      scenario: "Severe Stress",
      liquid: liquid * 0.5,
      shortTerm: shortTerm * 0.7,
      midTerm: midTerm * 1.3,
      longTerm: longTerm * 1.5,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Liquidity Stress Test</h1>
        <p className="text-slate-300 text-lg">
          See how your portfolio behaves under different liquidity stress scenarios.
        </p>
      </div>

      <InvestorLiquidityStressChart data={stressData} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-300">Liquid (0–30d)</h3>
          <p className="text-3xl font-semibold mt-2">
            {(liquid * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-300">Short-Term (30–90d)</h3>
          <p className="text-3xl font-semibold mt-2">
            {(shortTerm * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-300">Mid-Term (90–180d)</h3>
          <p className="text-3xl font-semibold mt-2">
            {(midTerm * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-sm text-slate-300">Long-Term (180d+)</h3>
          <p className="text-3xl font-semibold mt-2">
            {(longTerm * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
