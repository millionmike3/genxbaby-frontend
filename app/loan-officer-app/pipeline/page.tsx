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

const STATUS_FILTERS = [
  "ALL",
  "IN_PROCESSING",
  "IN_UNDERWRITING",
  "CONDITIONAL_APPROVAL",
  "CLEAR_TO_CLOSE",
];

export default function LoanOfficerPipelinePage() {
  const [apps, setApps] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

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
        <p>Loading pipeline...</p>
      </div>
    );
  }

  const filtered = apps
    .filter((app) => {
      if (statusFilter === "ALL") return true;
      if (statusFilter === "CONDITIONAL_APPROVAL") {
        return app.milestone === "Conditional Approval";
      }
      if (statusFilter === "CLEAR_TO_CLOSE") {
        return app.milestone === "Clear to Close";
      }
      return app.status === statusFilter;
    })
    .filter((app) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        app.borrowerName.toLowerCase().includes(q) ||
        app.id.toLowerCase().includes(q)
      );
    });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pipeline View</h1>
            <p className="text-slate-400 mt-2">
              Filter and search your active applications.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by borrower or application ID..."
              className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>
                  {s === "ALL"
                    ? "All statuses"
                    : s.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="border border-slate-800 rounded p-6">
          {filtered.length === 0 ? (
            <p className="text-slate-400 text-sm">No applications match your filters.</p>
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
                  {filtered.map((app) => {
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
