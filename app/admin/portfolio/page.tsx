"use server";

import { getPrisma } from "@/lib/prisma";

async function getAdjustments() {
  const prisma = await getPrisma();

  return prisma.portfolioAdjustment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      investor: true,
    },
    take: 200,
  });
}

export default async function AdminPortfolioPage() {
  const adjustments = await getAdjustments();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio Adjustments</h1>
      <p className="text-sm text-slate-400 mb-6">
        Track and manage investor allocation changes across asset classes.
      </p>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">Investor</th>
            <th className="py-2 text-left">Asset Class</th>
            <th className="py-2 text-left">Old Value</th>
            <th className="py-2 text-left">New Value</th>
            <th className="py-2 text-left">Adjusted</th>
          </tr>
        </thead>

        <tbody>
          {adjustments.map((adj) => (
            <tr key={adj.id} className="border-b border-slate-900">
              <td className="py-2">{adj.investor?.name ?? "Unknown"}</td>
              <td className="py-2">{adj.assetClass}</td>
              <td className="py-2">{adj.oldValue}</td>
              <td className="py-2">{adj.newValue}</td>
              <td className="py-2">
                {new Date(adj.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
