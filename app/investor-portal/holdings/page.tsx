import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { InvestorHoldingsTreeMap } from "../_components/InvestorHoldingsTreeMap";

export default async function InvestorHoldingsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  // Fetch holdings with fund + metadata
  const holdings = await prisma.investorHolding.findMany({
    where: { investorId: Number(session.userId) },
    include: {
      fund: true,
      performance: true,
    },
  });

  // TreeMap data
  const treeData = holdings.map((h) => ({
    name: h.fund?.name ?? "Unknown Fund",
    value: h.currentValue ?? 0,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Holdings</h1>
        <p className="text-slate-300 text-lg">
          Your active investment positions and allocation breakdown.
        </p>
      </div>

      {/* Holdings TreeMap */}
      <InvestorHoldingsTreeMap data={treeData} />

      {/* Holdings Cards */}
      <div className="space-y-6">
        {holdings.map((h) => (
          <div
            key={h.id}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
          >
            <h3 className="text-xl font-semibold">{h.fund?.name}</h3>

            <p className="text-slate-300 mt-2">
              <strong>Value:</strong>{" "}
              {`$${h.currentValue.toLocaleString()}`}
            </p>

            <p className="text-slate-300">
              <strong>Return:</strong>{" "}
              {h.performance?.returnPct
                ? `${(h.performance.returnPct * 100).toFixed(2)}%`
                : "—"}
            </p>

            {h.fund?.sector && (
              <p className="text-slate-400 text-sm mt-2">
                <strong>Sector:</strong> {h.fund.sector}
              </p>
            )}

            {h.fund?.region && (
              <p className="text-slate-400 text-sm">
                <strong>Region:</strong> {h.fund.region}
              </p>
            )}

            {h.fund?.strategy && (
              <p className="text-slate-400 text-sm">
                <strong>Strategy:</strong> {h.fund.strategy}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
