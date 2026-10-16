import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function RiskDashboardPage() {
  // Correct cookie (NOT "session")
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Not authenticated");

  // Parse JWT
  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  // Fetch user (User.id is Int)
  const user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  if (!user) throw new Error("User not found");

  // Fetch owner (Owner.userId is Int)
  const owner = await prisma.owner.findFirst({
    where: { userId: user.id },
  });

  if (!owner) throw new Error("Owner record not found");

  // Fetch risk snapshots (adjust loanId mapping as needed)
  const riskSnapshots = await prisma.riskSnapshot.findMany({
    where: { loanId: { gt: 0 } },
  });

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Risk Dashboard</h1>

      {/* TODO: RiskHeatmap, TopRiskList, RiskTrendChart */}

      <pre className="bg-slate-800 p-4 rounded-lg border border-slate-700 mt-6">
        {JSON.stringify(riskSnapshots, null, 2)}
      </pre>
    </main>
  );
}
