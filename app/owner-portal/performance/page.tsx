"use server";

import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalPerformancePage() {
  // Session validated in layout, but we still need userId
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

  // Fetch owner + properties + financials
  const owner = await prisma.owner.findFirst({
    where: { userId: user.id },
    include: {
      properties: {
        include: {
          financials: true,
        },
      },
    },
  });

  // Aggregate metrics
  const metrics = (() => {
    if (!owner || owner.properties.length === 0) {
      return [
        { label: "NOI", value: "—", note: "No properties found" },
        { label: "Cap Rate", value: "—", note: "No properties found" },
        { label: "Cash-on-Cash", value: "—", note: "No properties found" },
        { label: "DSCR", value: "—", note: "No properties found" },
      ];
    }

    const financials = owner.properties
      .map((p) => p.financials)
      .filter(Boolean);

    const totalNOI = financials.reduce(
      (sum, f) => sum + (f?.noi ?? 0),
      0
    );

    const avgCapRate =
      financials.length > 0
        ? financials.reduce((sum, f) => sum + (f?.capRate ?? 0), 0) /
          financials.length
        : 0;

    return [
      {
        label: "NOI",
        value: `$${totalNOI.toLocaleString()}`,
        note: "Portfolio total NOI",
      },
      {
        label: "Cap Rate",
        value: `${avgCapRate.toFixed(2)}%`,
        note: "Portfolio blended",
      },
      {
        label: "Cash-on-Cash",
        value: "9.8%",
        note: "Current year (placeholder)",
      },
      {
        label: "DSCR",
        value: "1.45x",
        note: "Debt service coverage (placeholder)",
      },
    ];
  })();

  return (
    <div className="space-y-10 text-white">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Performance</h1>
        <p className="text-slate-300 text-lg">
          Review key performance indicators for your portfolio, including NOI,
          cap rate, cash-on-cash returns, and debt service coverage.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-sm text-slate-300">{m.label}</h3>
            <p className="text-3xl font-semibold mt-2">{m.value}</p>
            <p className="text-xs text-slate-400 mt-1">{m.note}</p>
          </div>
        ))}
      </div>

      {/* Future Enhancements Placeholder */}
      <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">Performance Insights</h3>
        <p className="text-slate-300">
          Advanced analytics such as trend charts, year-over-year comparisons,
          and AI-driven performance scoring will appear here.
        </p>
      </div>
    </div>
  );
}
