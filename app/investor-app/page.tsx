import { requireRole } from "@/lib/authz";
import BehavioralPanel from "../underwriting-app/components/BehavioralPanel";

export default async function InvestorPortal() {
  // Enforce investor-only access
  const session = await requireRole(["investor"]);

  // Placeholder portfolio data — replace with DAL later
  const portfolioValue = "$482,900";
  const activeNotes = 12;
  const avgYield = "8.4%";
  const recentActivity = [
    { id: 1, type: "Funding", amount: "$25,000", date: "2026-07-12" },
    { id: 2, type: "Interest Payment", amount: "$1,480", date: "2026-07-01" },
    { id: 3, type: "Funding", amount: "$10,000", date: "2026-06-22" },
  ];

  // Placeholder positions — replace with DAL later
  const positions = [
    {
      id: "INV-POS-001",
      dealName: "Queens Multifamily Bridge",
      tranche: "Senior",
      committed: 1000000,
      funded: 750000,
      status: "Active",
      borrowerUserId: "USER-001",
    },
    {
      id: "INV-POS-002",
      dealName: "Bronx Rehab Loan",
      tranche: "Mezzanine",
      committed: 500000,
      funded: 250000,
      status: "Active",
      borrowerUserId: "USER-002",
    },
  ];

  const selected = positions[0];

  // Placeholder distributions — replace with DAL later
  const distributions = [
    { id: "DIST-001", period: "2026-06", amount: 1480, status: "Paid" },
    { id: "DIST-002", period: "2026-05", amount: 1520, status: "Paid" },
    { id: "DIST-003", period: "2026-04", amount: 1490, status: "Paid" },
  ];

  // Placeholder notes — replace with DAL later
  const notes = [
    {
      id: "INV-NOTE-001",
      text: "Borrower requested extension on rehab timeline.",
      author: "Investor Relations",
      role: "investor_relations",
      createdAt: "2026-07-01T10:22:00Z",
    },
    {
      id: "INV-NOTE-002",
      text: "Distribution processed successfully.",
      author: "Operations",
      role: "ops",
      createdAt: "2026-06-15T09:10:00Z",
    },
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
            Welcome back, {session.user?.id}. Your positions and cash flows are updated in real time.
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

        {/* Positions */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Your Positions
          </h2>

          <div className="space-y-4">
            {positions.map((pos) => (
              <div
                key={pos.id}
                className={`p-4 rounded-xl border ${
                  pos.id === selected.id
                    ? "border-emerald-500 bg-slate-900"
                    : "border-slate-800 bg-slate-900/40"
                }`}
              >
                <div className="font-semibold text-slate-100">
                  {pos.dealName}
                </div>
                <div className="text-slate-400 text-sm">
                  Tranche: {pos.tranche}
                </div>
                <div className="text-slate-400 text-sm">
                  Committed: ${pos.committed.toLocaleString()}
                </div>
                <div className="text-slate-400 text-sm">
                  Funded: ${pos.funded.toLocaleString()}
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  Status: {pos.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Position Summary */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Position Summary
          </h2>

          <div className="space-y-2 text-sm text-slate-300">
            <p><span className="font-semibold">Deal:</span> {selected.dealName}</p>
            <p><span className="font-semibold">Tranche:</span> {selected.tranche}</p>
            <p><span className="font-semibold">Committed:</span> ${selected.committed.toLocaleString()}</p>
            <p><span className="font-semibold">Funded:</span> ${selected.funded.toLocaleString()}</p>
            <p><span className="font-semibold">Status:</span> {selected.status}</p>
          </div>
        </div>

        {/* Behavioral Intelligence on Borrower */}
        {selected.borrowerUserId && (
          <BehavioralPanel userId={selected.borrowerUserId} />
        )}

        {/* Distributions */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Distributions
          </h2>

          <ul className="space-y-2 text-slate-300">
            {distributions.map((d) => (
              <li key={d.id}>
                <span className="font-semibold">{d.period}</span>: ${d.amount.toLocaleString()} ({d.status})
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Notes
          </h2>

          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800"
              >
                <div className="font-bold">{note.author}</div>
                <div className="text-slate-300">{note.text}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk & Performance */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Risk & Performance
          </h2>

          <p className="text-slate-400 text-sm">
            Deal-level risk metrics, DSCR, LTV, and performance trends will appear here.
          </p>
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
