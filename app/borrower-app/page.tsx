import { requireRole } from "@/lib/authz";

export default async function BorrowerPortal() {
  const session = await requireRole(["BORROWER", "borrower"]);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-semibold">Borrower Portal</h1>
        <p className="text-slate-400 text-sm">
          Welcome, {session.user?.id ?? "Borrower"}. Your loan status and documents are below.
        </p>
      </div>

      <section className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
        <h2 className="text-xl font-medium text-slate-200">Loan Status</h2>
        <p className="mt-2 text-slate-400">Your loan details will appear here.</p>
      </section>

      <section className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
        <h2 className="text-xl font-medium text-slate-200">Documents</h2>
        <p className="mt-2 text-slate-400">Uploaded borrower documents will appear here.</p>
      </section>
    </div>
  );
}
