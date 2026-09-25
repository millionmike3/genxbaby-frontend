import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerEquityPage() {
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
    include: { ownerEquity: true },
  });

  const totalEquity = properties.reduce(
    (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
    0
  );

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Equity</h1>

      <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 mb-10">
        <h2 className="text-2xl font-semibold mb-2">Total Equity</h2>
        <p className="text-3xl font-bold">
          {`$${totalEquity.toLocaleString()}`}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Property Equity</h2>

        {properties.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900/40 p-4 rounded-lg border border-slate-700 mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">
              {p.address}, {p.city}
            </h3>
            <p>
              <strong>Equity:</strong>{" "}
              {p.ownerEquity
                ? `$${p.ownerEquity.equityAmount.toLocaleString()}`
                : "—"}
            </p>
            <p>
              <strong>Equity %:</strong>{" "}
              {p.ownerEquity?.equityPercent ?? "—"}%
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
