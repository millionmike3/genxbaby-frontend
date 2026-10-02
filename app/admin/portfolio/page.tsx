import { getPrisma } from "@/lib/db/prisma";

export default async function AdminPortfolioPage() {
  const prisma = await getPrisma();

  const adjustments = await prisma.portfolioAdjustment.findMany({
    orderBy: { createdAt: "desc" },
    include: { investor: true },
  });

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Portfolio Adjustments</h1>

      {adjustments.map((adj) => (
        <div key={adj.id} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold">{adj.investor.name}</h2>
          <p className="text-slate-300">{adj.assetClass}</p>
          <p className="text-slate-400 text-sm">
            {adj.oldValue} → {adj.newValue}
          </p>
          <p className="text-slate-500 text-xs mt-4">{adj.createdAt.toDateString()}</p>
        </div>
      ))}
    </div>
  );
}
