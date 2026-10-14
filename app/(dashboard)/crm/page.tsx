import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CRMDashboard() {
  const prisma = await getPrisma();

  // Fetch CRM data
  const borrowers = await prisma.borrower.findMany({
    include: {
      MortgageAsset: true,          // FIXED
      borrowerDocuments: true,      // if you meant "notes"
    },
    orderBy: { createdAt: "desc" },
  });

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Borrowers with mortgage assets
  const applications = borrowers.filter((b) => b.MortgageAsset.length > 0);

  // KPI calculations
  const totalBorrowers = borrowers.length;
  const totalLeads = leads.length;
  const activeApps = applications.length;
  const openTasks = tasks.filter((t) => t.status !== "COMPLETED").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          CRM Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Manage borrowers, leads, applications, tasks, and communication.
        </p>
      </header>

      {/* KPI STRIP */}
      <section className="grid grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Borrowers</p>
          <p className="text-2xl font-bold">{totalBorrowers}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Leads</p>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Active Applications</p>
          <p className="text-2xl font-bold">{activeApps}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs">Open Tasks</p>
          <p className="text-2xl font-bold">{openTasks}</p>
        </div>
      </section>

      {/* GRID LAYOUT */}
      <section className="grid grid-cols-12 gap-6">
        {/* BORROWERS PANEL */}
        <div className="col-span-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Borrowers</h2>

          <ul className="space-y-3 text-sm">
            {borrowers.map((b) => (
              <li
                key={b.id}
                className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
              >
                <p className="text-slate-100">
                  <strong>{b.fullName}</strong>
                </p>
                <p className="text-slate-400 text-xs">{b.email}</p>
                <p className="text-slate-300 text-sm">
                  Status:{" "}
                  {b.MortgageAsset[0]?.status ?? "No Application"}
                </p>

                <Link
                  href={`/crm/borrower/${b.id}`}
                  className="text-[#3CF46B] text-xs underline"
                >
                  View File
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LEADS PANEL */}
        <div className="col-span-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Leads</h2>

          <ul className="space-y-3 text-sm">
            {leads.map((l) => (
              <li
                key={l.id}
                className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
              >
                <p className="text-slate-100">
                  <strong>{l.fullName}</strong>
                </p>
                <p className="text-slate-400 text-xs">{l.email}</p>
                <p className="text-slate-300 text-sm">
                  Source: {l.source}
                </p>

                <Link
                  href={`/crm/lead/${l.id}`}
                  className="text-[#3CF46B] text-xs underline"
                >
                  View Lead
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* TASKS PANEL */}
        <div className="col-span-12 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Tasks</h2>

          <ul className="space-y-3 text-sm">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
              >
                <p className="text-slate-100">
                  <strong>{t.title}</strong>
                </p>
                <p className="text-slate-300 text-sm">
                  Status: {t.status}
                </p>

                <Link
                  href={`/crm/task/${t.id}`}
                  className="text-[#3CF46B] text-xs underline"
                >
                  View Task
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PIPELINE VIEW */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Pipeline</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Borrower</th>
              <th className="text-left py-2">Loan Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Updated</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => {
              const m = app.MortgageAsset[0];
              return (
                <tr key={app.id} className="border-t border-neutral-800">
                  <td className="py-2">{app.fullName}</td>
                  <td className="py-2">
                    ${m?.loanAmount?.toLocaleString() ?? "0"}
                  </td>
                  <td className="py-2">{m?.status ?? "N/A"}</td>
                  <td className="py-2">
                    {m?.updatedAt
                      ? new Date(m.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* LINKS */}
      <section className="flex gap-4">
        <Link
          href="/loan-officer/dashboard"
          className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          Loan Officer Dashboard
        </Link>

        <Link
          href="/underwriter/dashboard"
          className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          Underwriter Dashboard
        </Link>

        <Link
          href="/staff/dashboard"
          className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          Staff Dashboard
        </Link>
      </section>
    </main>
  );
}
