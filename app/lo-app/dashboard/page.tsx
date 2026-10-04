"use client";

import { useEffect, useState } from "react";

type ApplicationSummary = {
  id: string;
  borrowerName: string;
  milestone: string;
  status: string;
  docsRequired: number;
  docsSatisfied: number;
  createdAt: string;
};

export default function LoanOfficerDashboardPage() {
  const [apps, setApps] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/lo/pipeline", { cache: "no-store" });
    const data = await res.json();

    if (data.success) {
      setApps(
        data.applications.map((app: any) => ({
          id: app.id,
          borrowerName: `${app.borrower?.firstName ?? ""} ${
            app.borrower?.lastName ?? ""
          }`.trim() || "Unknown Borrower",
          milestone: app.milestone,
          status: app.status,
          docsRequired: app.pipelineOutput?.docsRequired ?? 0,
          docsSatisfied: app.pipelineOutput?.docsSatisfied ?? 0,
          createdAt: app.createdAt,
        }))
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    load();

    const evtSource = new EventSource("/api/admin/pipeline/events");
    evtSource.onmessage = () => load();

    return () => evtSource.close();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Loading Loan Officer Dashboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Loan Officer Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Monitor your pipeline, document progress, and borrower status.
            </p>
          </div>
        </header>

        {/* Pipeline summary */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Pipeline Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <StatCard
              label="Total Applications"
              value={apps.length.toString()}
            />
            <StatCard
              label="In Underwriting"
              value={
                apps.filter((a) => a.status === "IN_UNDERWRITING").length.toString()
              }
            />
            <StatCard
              label="Conditional Approvals"
              value={
                apps.filter((a) => a.milestone === "Conditional Approval").length.toString()
              }
            />
            <StatCard
              label="Clear to Close"
              value={
                apps.filter((a) => a.milestone === "Clear to Close").length.toString()
              }
            />
          </div>
        </section>

        {/* Pipeline table */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Active Pipeline</h2>

          {apps.length === 0 ? (
            <p className="text-slate-400 text-sm">No active applications.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-800">
                    <th className="py-2 pr-4">Borrower</th>
                    <th className="py-2 pr-4">Application ID</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Milestone</th>
                    <th className="py-2 pr-4">Docs</th>
                    <th className="py-2 pr-4">Created</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app) => {
                    const docsPercent =
                      app.docsRequired > 0
                        ? Math.round(
                            (app.docsSatisfied / app.docsRequired) * 100
                          )
                        : 0;

                    return (
                      <tr
                        key={app.id}
                        className="border-b border-slate-900 hover:bg-slate-900/40"
                      >
                        <td className="py-2 pr-4">{app.borrowerName}</td>
                        <td className="py-2 pr-4">{app.id}</td>
                        <td className="py-2 pr-4">{app.status}</td>
                        <td className="py-2 pr-4">{app.milestone}</td>
                        <td className="py-2 pr-4">
                          {app.docsSatisfied}/{app.docsRequired} ({docsPercent}%)
                        </td>
                        <td className="py-2 pr-4">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 pr-4">
                          <div className="flex gap-2">
                            <a
                              href={`/lo-app/application/${app.id}`}
                              className="text-blue-400 underline"
                            >
                              View
                            </a>
                            <a
                              href={`/lo-app/application/${app.id}/messages`}
                              className="text-slate-400 underline"
                            >
                              Message
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-800 rounded p-4">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
