import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function RiskDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();
  const ownerId = Number(session.userId);

  const riskSnapshots = await prisma.riskSnapshot.findMany({
    where: { loanId: { gt: 0 } }, // adjust to your owner/loan mapping
  });

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Risk Dashboard</h1>

      {/* TODO: RiskHeatmap, TopRiskList, RiskTrendChart */}
    </main>
  );
}
