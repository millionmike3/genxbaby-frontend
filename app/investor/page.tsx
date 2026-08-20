import { requireRole } from "@/lib/authz";

export default async function InvestorPortal() {
  // Enforce investor-only access
  const session = await requireRole(["investor"]);

  // Placeholder data — replace with your DAL later
  const portfolioValue = "$482,900";
  const activeNotes = 12;
  const avgYield = "8.4%";
  const recentActivity = [
    { id: 1, type: "Funding", amount: "$25,000", date: "2026-07-12" },
    { id: 2, type: "Interest Payment", amount: "$1,480", date: "2026-07-01" },
    { id: 3, type: "Funding", amount: "$10,000", date: "2026-06-22" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">
            Investor Portal
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Welcome back, {session.userId}. Your positions and cash flows are updated in real time.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs text-slate-400">Portfolio Value</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-400">
              {portfolioValue}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs text-slate-400">Active Notes</p>
            <p className="mt-2 text-2xl font-semibold text-blue-400">
              {activeNotes}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs text-slate-400">Average Yield</p>
            <p className="mt-2 text-2xl font-semibold text-purple-400">
              {avgYield}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Recent Activity
          </h2>

          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={item.id} className="border-b border-slate-800">
                  <td className="py-2 text-slate-300">{item.type}</td>
                  <td className="py-2 text-slate-300">{item.amount}</td>
                  <td className="py-2 text-slate-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Documents & Statements */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Documents & Statements
          </h2>

          <p className="text-slate-400 text-sm mb-4">
            Your monthly statements, agreements, and tax documents will appear here.
          </p>

          <div className="text-slate-500 text-xs">
            (Integrate your PDF generation + storage layer here)
          </div>
        </div>

      </div>
    </div>
  );
}
