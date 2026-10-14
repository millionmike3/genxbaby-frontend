
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StockSanitizerDashboard() {
  const prisma = await getPrisma();

  // Fetch all stock entries from your Stock Sanitizer dataset
  const stocks = await prisma.stockSanitizer.findMany();

  // KPI calculations
  const totalStocks = stocks.length;
  const avgVolatility =
    stocks.reduce((acc, s) => acc + (s.volatility ?? 0), 0) / totalStocks || 0;
  const avgRisk =
    stocks.reduce((acc, s) => acc + (s.riskScore ?? 0), 0) / totalStocks || 0;
  const totalMarketValue = stocks.reduce(
    (acc, s) => acc + (s.price ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Stock Sanitizer Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Real‑time stock intelligence, risk scoring, and anomaly detection.
        </p>
      </header>

      {/* KPI STRIP */}
      <section className="grid grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Total Stocks</p>
          <p className="text-2xl font-bold">{totalStocks}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Avg Volatility</p>
          <p className="text-2xl font-bold">{avgVolatility.toFixed(2)}%</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Avg Risk Score</p>
          <p className="text-2xl font-bold">{avgRisk.toFixed(1)}/100</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Total Market Value</p>
          <p className="text-2xl font-bold">${totalMarketValue.toLocaleString()}</p>
        </div>
      </section>

      {/* GRID LAYOUT */}
      <section className="grid grid-cols-12 gap-6">
        {/* VOLATILITY PANEL */}
        <div className="col-span-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Volatility Analysis</h2>
          <p className="text-slate-400 text-sm mb-4">
            Shows stocks with abnormal volatility patterns.
          </p>

          <ul className="space-y-2 text-sm">
            {stocks
              .filter((s) => (s.volatility ?? 0) > 5)
              .map((s) => (
                <li key={s.id} className="text-slate-300">
                  {s.symbol}: {s.volatility}% volatility
                </li>
              ))}
          </ul>
        </div>

        {/* RISK PANEL */}
        <div className="col-span-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Risk Signals</h2>
          <p className="text-slate-400 text-sm mb-4">
            Highlights stocks with elevated risk scores.
          </p>

          <ul className="space-y-2 text-sm">
            {stocks
              .filter((s) => (s.riskScore ?? 0) > 70)
              .map((s) => (
                <li key={s.id} className="text-slate-300">
                  {s.symbol}: Risk Score {s.riskScore}
                </li>
              ))}
          </ul>
        </div>

        {/* SECTOR PANEL */}
        <div className="col-span-12 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Sector Exposure</h2>
          <p className="text-slate-400 text-sm mb-4">
            Distribution of stocks across sectors.
          </p>

          <ul className="grid grid-cols-4 gap-4 text-sm">
            {Object.entries(
              stocks.reduce((acc: any, s) => {
                acc[s.sector] = (acc[s.sector] || 0) + 1;
                return acc;
              }, {})
            ).map(([sector, count]) => (
              <li
                key={sector}
                className="bg-neutral-800 p-4 rounded-lg text-center"
              >
                <p className="text-slate-300">{sector}</p>
                <p className="text-xl font-bold">{count}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DATA TABLE */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Stock Table</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Symbol</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Volatility</th>
              <th className="text-left py-2">Risk Score</th>
              <th className="text-left py-2">Sector</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((s) => (
              <tr key={s.id} className="border-t border-neutral-800">
                <td className="py-2">{s.symbol}</td>
                <td className="py-2">${s.price}</td>
                <td className="py-2">{s.volatility}%</td>
                <td className="py-2">{s.riskScore}</td>
                <td className="py-2">{s.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CHECKBOOK LINK */}
      <Link
        href="/checkbook"
        className="inline-block px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f] transition"
      >
        Go to Certified Check Writing
      </Link>
    </main>
  );
}
