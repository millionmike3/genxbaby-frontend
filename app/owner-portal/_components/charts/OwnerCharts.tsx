import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

import CashflowTrendChart from "./CashflowTrendChart";
import EquityGrowthChart from "./EquityGrowthChart";
import RentRollTrendChart from "./RentRollTrendChart";
import MortgagePaymentTrendChart from "./MortgagePaymentTrendChart";

export default async function OwnerCharts() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const prisma = await getPrisma();
  const ownerId = Number(session.userId);

  const properties = await prisma.property.findMany({
    where: { ownershipEntity: { ownerId } },
    include: {
      ownerEquity: true,
      rentRoll: true,
    },
  });

  const mortgageAssets = await prisma.mortgageAsset.findMany({
    where: { ownerId },
    include: { payments: true },
  });

  // Build chart data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const cashflowData = months.map((m) => ({
    month: m,
    cashflow:
      properties.reduce(
        (sum, p) => sum + p.rentRoll.reduce((s, r) => s + r.rent, 0),
        0
      ) +
      mortgageAssets.reduce(
        (sum, a) => sum + a.payments.reduce((s, p) => s + p.amount, 0),
        0
      ),
  }));

  const equityData = months.map((m) => ({
    month: m,
    equity: properties.reduce(
      (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
      0
    ),
  }));

  const rentRollData = months.map((m) => ({
    month: m,
    rent: properties.reduce(
      (sum, p) => sum + p.rentRoll.reduce((s, r) => s + r.rent, 0),
      0
    ),
  }));

  const mortgagePaymentData = months.map((m) => ({
    month: m,
    payments: mortgageAssets.reduce(
      (sum, a) => sum + a.payments.reduce((s, p) => s + p.amount, 0),
      0
    ),
  }));

  return (
    <div className="space-y-12">
      <CashflowTrendChart data={cashflowData} />
      <EquityGrowthChart data={equityData} />
      <RentRollTrendChart data={rentRollData} />
      <MortgagePaymentTrendChart data={mortgagePaymentData} />
    </div>
  );
}
