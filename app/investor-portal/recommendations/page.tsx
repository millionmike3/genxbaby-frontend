import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function InvestorRecommendationsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  const risk = await prisma.investorRiskScore.findFirst({
    where: { investorId: Number(session.userId) },
  });

  const div = await prisma.investorDiversificationAnalytics.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const alloc = await prisma.investorAllocationDynamics.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const equity = await prisma.investorEquitySnapshot.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const factors = div?.factors ?? {};
  const allocation = alloc?.allocation ?? {};

  const recommendations: string[] = [];

  if ((risk?.score ?? 0) > 0.75) {
    recommendations.push(
      "Your risk score is elevated. Consider shifting a portion of capital into lower‑volatility strategies."
    );
  }

  if ((risk?.score ?? 0) < 0.35) {
    recommendations.push(
      "Your risk score is conservative. If your horizon is long, you may be under‑allocated to growth assets."
    );
  }

  if (Object.keys(allocation).length > 0) {
    const entries = Object.entries(allocation).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );
    const [topLabel, topValue] = entries[0];
    if ((topValue as number) > 0.4) {
      recommendations.push(
        `You have significant concentration in ${topLabel}. Consider diversifying to reduce single‑bucket exposure.`
      );
    }
  }

  if (factors["liquidity"] && factors["liquidity"] < 0.3) {
    recommendations.push(
      "Your liquidity factor is low. Increasing exposure to more liquid positions can improve flexibility."
    );
  }

  if (factors["concentration"] && factors["concentration"] > 0.6) {
    recommendations.push(
      "Portfolio concentration is high. Spreading capital across more sectors or regions may reduce idiosyncratic risk."
    );
  }

  if (equity?.growthYtd && equity.growthYtd < 0) {
    recommendations.push(
      "Your year‑to‑date equity growth is negative. Review underperforming holdings and consider rebalancing."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Your current portfolio profile appears balanced. Continue monitoring risk, diversification, and performance over time."
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">AI‑Driven Recommendations</h1>
        <p className="text-slate-300 text-lg">
          Insights based on your risk, diversification, allocation, and equity profile.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
          >
            <p className="text-slate-200 text-sm">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
