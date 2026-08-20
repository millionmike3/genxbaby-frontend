import { requireRole } from "@/lib/authz";

export default async function InvestorPositionsPage() {
  const session = await requireRole(["investor"]);

  const positions = [
    { id: 1, note: "GX-2026-001", amount: 25000, yield: "8.2%" },
    { id: 2, note: "GX-2026-014", amount: 10000, yield: "7.9%" },
    { id: 3, note: "GX-2026-022", amount: 15000, yield: "8.5%" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-semibold">Investment Positions</h1>
        <p className="text-slate-400 text-sm">
          Your active notes and yields.
        </p>

        <div className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2">Note</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Yield</th>
              </tr>
            </thead>

            <tbody>
              {positions.map((p) => (
                <tr key={p.id} className="border-b border-slate-800">
                  <td className="py-2">{p.note}</td>
                  <td className="py-2">${p.amount.toLocaleString()}</td>
                  <td className="py-2">{p.yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
