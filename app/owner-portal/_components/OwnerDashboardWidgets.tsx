import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerDashboardWidgets() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Not authenticated");

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  // Your DB uses uppercase enum values
  if (session.role !== "OWNER") throw new Error("Unauthorized");

  const prisma = await getPrisma();

  // Owner.userId is INT → session.id is INT
  const owner = await prisma.owner.findFirst({
    where: { userId: session.userId },
  });

  if (!owner) throw new Error("Owner record not found");

  // OwnershipEntity.ownerId is INT → use owner.userId
  const properties = await prisma.property.findMany({
    where: { ownershipEntity: { ownerId: owner.userId } },
    include: {
      ownerEquity: true,
      rentRoll: true,
      financials: true,
    },
  });

  // MortgageAsset.ownerId is STRING → use owner.id (UUID)
  const mortgageAssets = await prisma.mortgageAsset.findMany({
    where: { ownerId: owner.id },
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
      <WidgetCard title="Total Properties" value={totalProperties} color="bg-blue-600" />
      <WidgetCard title="Total Equity" value={`$${totalEquity.toLocaleString()}`} color="bg-green-600" />
      <WidgetCard title="Total Cashflow" value={`$${totalCashflow.toLocaleString()}`} color="bg-purple-600" />
      <WidgetCard title="Mortgage Assets" value={totalMortgageAssets} color="bg-orange-600" />
      <WidgetCard title="Rent Roll Income" value={`$${totalRentIncome.toLocaleString()}`} color="bg-teal-600" />
      <WidgetCard title="Mortgage Payment Income" value={`$${totalMortgageIncome.toLocaleString()}`} color="bg-red-600" />
    </div>
  );
}

function WidgetCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl text-white shadow-lg border border-slate-700 ${color}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
