import OwnerCharts from "../_components/charts/OwnerCharts";
import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalOverviewPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "OWNER") throw new Error("Unauthorized: owner role required");

  const prisma = await getPrisma();

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) throw new Error("User not found");

  const owner = await prisma.owner.findFirst({ where: { userId: user.id } });
  if (!owner) throw new Error("Owner record not found");

  const ownershipEntities = await prisma.ownershipEntity.findMany({
    where: { ownerId: owner.userId },
    include: {
      properties: { include: { financials: true, ownerEquity: true, rentRoll: true } },
    },
  });

  const mortgageAssets = await prisma.mortgageAsset.findMany({
    where: { ownerId: owner.id },
    include: {
      performance: true,
      payments: { orderBy: { date: "desc" }, take: 5 },
      borrower: true,
    },
  });

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Owner Portal</h1>
        <p className="text-slate-300 text-lg">
          Welcome, {user.email}. This dashboard reflects your real estate holdings,
          mortgage assets, cashflow, equity, and performance analytics.
        </p>
      </div>

      {/* Charts Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Portfolio Overview</h2>
        <OwnerCharts />
      </section>

      {/* Ownership Entities */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Ownership Entities</h2>
        {/* ... existing entity rendering ... */}
      </section>

      {/* Mortgage Assets */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Mortgage Assets</h2>
        {/* ... existing mortgage rendering ... */}
      </section>
    </main>
  );
}
