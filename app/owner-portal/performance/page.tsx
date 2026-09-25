import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPerformancePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  const properties = await prisma.property.findMany({
    where: { ownershipEntity: { ownerId: user.id } },
    include: {
      financials: true,
      ownerEquity: true,
    },
  });

  const mortgages = await prisma.mortgageAsset.findMany({
    where: { ownerId: user.id },
    include: { performance: true },
  });

  const totalEquity =
    properties.reduce(
      (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
      0
    ) +
    mortgages.reduce(
      (sum, m) => sum + (m.performance?.riskScore ?? 0) * 1000,
      0
    );

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Performance</h1>

      <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 mb-10">
        <h2 className="text-2xl font-semibold mb-2">Total Equity</h2>
        <p className="text-3xl font-bold">
          {`$${totalEquity.toLocaleString()}`}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Property Performance</h2>
        {properties.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900/40 p-4 rounded-lg border border-slate-700 mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">
              {p.address}, {p.city}
            </h3>
            <p>
              <strong>NOI:</strong>{" "}
              {p.financials?.noi
                ? `$${p.financials.noi.toLocaleString()}`
                : "—"}
            </p>
            <p>
              <strong>Cap Rate:</strong>{" "}
              {p.financials?.capRate
                ? `${p.financials.capRate.toFixed(2)}%`
                : "—"}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Mortgage Performance</h2>
        {mortgages.map((m) => (
          <div
            key={m.id}
            className="bg-slate-900/40 p-4 rounded-lg border border-slate-700 mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">
              Loan #{m.id} — {m.status}
            </h3>
            <p>
              <strong>Risk Score:</strong>{" "}
              {m.performance?.riskScore?.toFixed(2) ?? "—"}
            </p>
            <p>
              <strong>LTV:</strong>{" "}
              {m.performance?.ltv
                ? `${(m.performance.ltv * 100).toFixed(1)}%`
                : "—"}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
