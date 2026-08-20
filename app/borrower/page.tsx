import { requireRole } from "@/lib/authz";

export default async function BorrowerPortal() {
  const session = await requireRole(["borrower"]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-semibold">Borrower Portal</h1>
        <p className="text-slate-400 text-sm">
          Welcome, {session.userId}. Your loan status and documents are below.
        </p>

        <section className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Loan Status</h2>
          <p className="text-slate-300 text-sm">
            (Integrate underwriting + funding status here)
          </p>
        </section>

        <section className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Required Documents</h2>
          <p className="text-slate-300 text-sm">
            (Upload bank statements, ID, income docs here)
          </p>
        </section>

        <section className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Disbursement Schedule</h2>
          <p className="text-slate-300 text-sm">
            (Show disbursement timeline here)
          </p>
        </section>
      </div>
    </main>
  );
}
