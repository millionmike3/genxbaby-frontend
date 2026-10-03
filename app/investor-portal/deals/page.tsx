"use server";

import { getPrisma } from "@/lib/db/prisma";

export default async function InvestorDealsPage() {
  const prisma = await getPrisma();

  const deals = await prisma.deal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Deals</h1>
      <p className="text-slate-300 text-lg">
        Explore available deals and investment opportunities.
      </p>

      <div className="space-y-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
          >
            <h2 className="text-xl font-semibold">{deal.name}</h2>
            <p className="text-slate-400">{deal.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
