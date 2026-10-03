"use server";

import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalEquityPage() {
  // Session validated in OwnerPortalLayout, but we still need userId
  const cookieStore = await cookies(); // MUST be awaited in Next.js 16
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) throw new Error("User not found");

  // Fetch owner + properties + equity + financials
  const owner = await prisma.owner.findFirst({
    where: { userId: user.id },
    include: {
      properties: {
        include: {
          ownerEquity: true,
          financials: true,
        },
      },
    },
  });

  // Compute equity metrics
  const totalEquity = owner?.properties.reduce(
    (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
    0
  ) ?? 0;

  const loanPaydownYTD = owner?.properties.reduce(
    (sum, p) => sum + (p.financials?.loanPaydownYTD ?? 0),
    0
  ) ?? 0;

  const appreciationYTD = owner?.properties.reduce(
    (sum, p) => sum + (p.financials?.appreciationYTD ?? 0),
    0
  ) ?? 0;

  const equityData = [
    { label: "Total Equity", value: `$${totalEquity.toLocaleString()}` },
    { label: "Loan Paydown (YTD)", value: `$${loanPaydownYTD.toLocaleString()}` },
    { label: "Appreciation (YTD)", value: `$${appreciationYTD.toLocaleString()}` },
  ];

  return (
    <div className="space-y-10 text-white">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Equity</h1>
        <p className="text-slate-300 text-lg">
          Track your equity growth across your portfolio, including loan
          paydown, appreciation, and total owner equity.
        </p>
      </div>

      {/* Equity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {equityData.map((e) => (
          <div
            key={e.label}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-sm text-slate-300">{e.label}</h3>
            <p className="text-3xl font-semibold mt-2">{e.value}</p>
          </div>
        ))}
      </div>

      {/* Future Enhancements */}
      <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">Equity Insights</h3>
        <p className="text-slate-300">
          Detailed equity charts, appreciation trends, and loan amortization
          breakdowns will appear here as your portfolio intelligence expands.
        </p>
      </section>
    </div>
  );
}
