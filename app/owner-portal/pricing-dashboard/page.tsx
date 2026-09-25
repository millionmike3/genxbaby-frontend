import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function PricingDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  // fetch scenarios via /api/pricing/scenarios or directly from prisma
  // const scenarios = ...

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Pricing Dashboard</h1>

      {/* TODO: PricingSummary, ScenarioTable, LlpaBreakdown, MarginView */}
    </main>
  );
}
