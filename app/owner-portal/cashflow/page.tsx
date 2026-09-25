import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerCashflowPage() {
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
    include: { rentRoll: true, financials: true },
  });

  const mortgages = await prisma.mortgageAsset.findMany({
    where: { ownerId: user.id },
    include: { payments: true },
  });

  const rentIncome = properties.reduce(
    (sum, p) => sum + p.rentRoll.reduce((s, r) => s + r.rent, 0),
    0
  );

  const mortgageIncome = mortgages.reduce(
    (sum, m) => sum + m.payments.reduce((s, p) => s + p.amount, 0),
    0
  );

  const expenses = properties.reduce(
    (sum, p) => sum + (p.financials?.expenses ?? 0),
    0
  );

  const netCashflow = rentIncome + mortgageIncome - expenses;

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Cashflow</h1>

      <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 mb-10">
        <h2 className="text-2xl font-semibold mb-2">Net Cashflow</h2>
        <p className="text-3xl font-bold">
          {`$${netCashflow.toLocaleString()}`}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Rent Income</h2>
        <p className="text-xl font-bold mb-4">
          {`$${rentIncome.toLocaleString()}`}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Mortgage Payment Income</h2>
        <p className="text-xl font-bold mb-4">
          {`$${mortgageIncome.toLocaleString()}`}
        </p>
      </section>
    </main>
  );
}
