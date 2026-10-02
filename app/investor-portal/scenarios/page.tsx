import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function InvestorScenariosPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  const risk = await prisma.investorRiskScore.findFirst({
    where: { investorId: Number(session.userId) },
  });

  const equity = await prisma.investorEquitySnapshot.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const baseEquity = equity?.totalEquity ?? 0;
  const riskScore = risk?.score ?? 0.5;

  const scenarios = [
    {
      name: "Rate Shock",
      description: "Rapid interest rate increase impacting credit and real estate exposures.",
      impactPct: -0.15 * riskScore,
    },
    {
      name: "Recession",
      description: "Broad economic slowdown with earnings compression and spread widening.",
      impactPct: -0.25 * riskScore,
    },
    {
      name: "Liquidity Crunch",
      description: "Market liquidity dries up, widening bid‑ask spreads and slowing exits.",
      impactPct: -0.2 * riskScore,
    },
    {
      name: "Bull Market",
      description: "Risk assets rally, spreads tighten, and valuations expand.",
      impactPct: 0.18 * (1 - riskScore),
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Scenario Analysis</h1>
        <p className="text-slate-300 text-lg">
          Hypothetical portfolio impacts under different market scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((s) => {
          const projectedEquity = baseEquity * (1 + s.impactPct);

          return (
            <div
              key={s.name}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-3"
            >
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="text-slate-300 text-sm">{s.description}</p>

              <div className="flex flex-col gap-1 text-sm text-slate-300">
                <p>
                  <strong>Estimated Impact:</strong>{" "}
                  {(s.impactPct * 100).toFixed(1)}%
                </p>
                <p>
                  <strong>Current Equity:</strong>{" "}
                  {baseEquity
                    ? `$${baseEquity.toLocaleString()}`
                    : "—"}
                </p>
                <p>
                  <strong>Projected Equity:</strong>{" "}
                  {baseEquity
                    ? `$${projectedEquity.toLocaleString()}`
                    : "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 text-sm text-slate-400">
        <p>
          These scenarios are illustrative and based on your current risk score
          and equity profile. They are not guarantees, but help you understand
          how sensitive your portfolio may be to different market environments.
        </p>
      </div>
    </div>
  );
}
