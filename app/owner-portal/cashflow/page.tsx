import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalCashflowPage() {
  // Session validated in OwnerPortalLayout, but we still need userId
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

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
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Cashflow</h1>
        <p className="text-slate-300 text-lg">
          Review your monthly cashflow performance, including rental income,
          mortgage payment income, and operating expenses.
        </p>
      </div>

      {/* Net Cashflow */}
      <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-semibold mb-2">Net Cashflow</h2>
        <p className="text-4xl font-bold text-[#4EE38A]">
          {`$${netCashflow.toLocaleString()}`}
        </p>
      </section>

      {/* Income + Expenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rent Income */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-2">Rent Income</h3>
          <p className="text-3xl font-bold">{`$${rentIncome.toLocaleString()}`}</p>
        </div>

        {/* Mortgage Payment Income */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-2">Mortgage Payment Income</h3>
          <p className="text-3xl font-bold">{`$${mortgageIncome.toLocaleString()}`}</p>
        </div>

        {/* Expenses */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-2">Expenses</h3>
          <p className="text-3xl font-bold text-red-400">
            {`$${expenses.toLocaleString()}`}
          </p>
        </div>
      </div>

      {/* Future Enhancements */}
      <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">Cashflow Insights</h3>
        <p className="text-slate-300">
          Trend charts, month-over-month comparisons, and AI-driven cashflow
          forecasting will appear here.
        </p>
      </section>
    </div>
  );
}
