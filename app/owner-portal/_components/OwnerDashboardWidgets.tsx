import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerDashboardWidgets() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const prisma = await getPrisma();
  const ownerId = Number(session.userId);

  // Fetch properties
  const properties = await prisma.property.findMany({
    where: { ownershipEntity: { ownerId } },
    include: {
      ownerEquity: true,
      rentRoll: true,
      financials: true,
    },
  });

  // Fetch mortgage assets
  const mortgageAssets = await prisma.mortgageAsset.findMany({
    where: { ownerId },
    include: {
      payments: true,
    },
  });

  // KPI Calculations
  const totalProperties = properties.length;

  const totalEquity = properties.reduce(
    (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
    0
  );

  const totalRentIncome = properties.reduce(
    (sum, p) => sum + p.rentRoll.reduce((s, r) => s + r.rent, 0),
    0
  );

  const totalMortgageIncome = mortgageAssets.reduce(
    (sum, m) => sum + m.payments.reduce((s, p) => s + p.amount, 0),
    0
  );

  const totalCashflow = totalRentIncome + totalMortgageIncome;

  const totalMortgageAssets = mortgageAssets.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Total Properties */}
      <WidgetCard
        title="Total Properties"
        value={totalProperties}
        color="bg-blue-600"
      />

      {/* Total Equity */}
      <WidgetCard
        title="Total Equity"
        value={`$${totalEquity.toLocaleString()}`}
        color="bg-green-600"
      />

      {/* Total Cashflow */}
      <WidgetCard
        title="Total Cashflow"
        value={`$${totalCashflow.toLocaleString()}`}
        color="bg-purple-600"
      />

      {/* Total Mortgage Assets */}
      <WidgetCard
        title="Mortgage Assets"
        value={totalMortgageAssets}
        color="bg-orange-600"
      />

      {/* Rent Roll Income */}
      <WidgetCard
        title="Rent Roll Income"
        value={`$${totalRentIncome.toLocaleString()}`}
        color="bg-teal-600"
      />

      {/* Mortgage Payment Income */}
      <WidgetCard
        title="Mortgage Payment Income"
        value={`$${totalMortgageIncome.toLocaleString()}`}
        color="bg-red-600"
      />
    </div>
  );
}

function WidgetCard({ title, value, color }) {
 return (
  <div
    className={`p-6 rounded-xl text-white shadow-lg border border-slate-700 ${color}`}
  >
    {children}
  </div>
)
};
