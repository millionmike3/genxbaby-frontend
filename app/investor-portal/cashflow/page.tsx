import { getPrisma } from "@/lib/db/prisma";
import { auth, requireRole } from "@/lib/auth";
import { InvestorCashflowChart } from "../_components/InvestorCharts";

export default async function InvestorCashflowPage() {
  // 🔒 Enforce investor role
  try {
    await requireRole(["INVESTOR"]);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Unauthorized: Investor access required
      </div>
    );
  }

  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Unauthorized: Invalid session
      </div>
    );
  }

  const prisma = await getPrisma();

  // Fetch last 12 capital flow events
  const flows = await prisma.investorCapitalFlow.findMany({
    where: { investorId: Number(session.user.id) },
    orderBy: { createdAt: "asc" },
    take: 12,
  });

  const chartData = flows.map((f) => ({
    label: f.createdAt.toLocaleDateString(),
    amount: f.amount,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Cashflow</h1>
        <p className="text-slate-300 text-lg">
          Your distributions, reinvestments, and contributions over time.
        </p>
      </div>

      <InvestorCashflowChart data={chartData} />

      <div className="space-y-4">
        {flows
          .slice()
          .reverse()
          .map((f) => (
            <div
              key={f.id}
              className="bg-s