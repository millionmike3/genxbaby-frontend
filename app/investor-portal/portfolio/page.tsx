"use server";

import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getPrisma } from "@/lib/db/prisma";

export default async function InvestorPortfolioPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  const investments = await prisma.investment.findMany({
    where: { investorId: Number(session.userId) },
    include: {
      deal: true,
    },
  });

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
      <p className="text-slate-300 text-lg">
        Review your active and historical investments.
      </p>

      {investments.length === 0 ? (
        <p className="text-slate-400">No investments found.</p>
      ) : (
        <div className="space-y-6">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
            >
              <h2 className="text-xl font-semibold">
                {inv.deal?.name ?? "Unnamed Deal"}
              </h2>
              <p className="text-slate-400 text-sm">
                Invested: ${inv.amount.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">
                Status: {inv.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
