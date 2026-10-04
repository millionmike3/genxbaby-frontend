"use client";

import { useEffect, useState } from "react";

type PipelineApplication = {
  id: string;
  borrowerName: string;
  borrowerEmail: string;
  loanAmount: number | null;
  status: string;
  milestone: string;
  docsRequired: number;
  docsSatisfied: number;
  uwStatus: string | null;
};

type LoanOfficerMe = {
  id: string;
  name: string;
  email: string;
  applications: PipelineApplication[];
};

export default function LoanOfficerDashboardPage() {
  const [me, setMe] = useState<LoanOfficerMe | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/loan-officer/me");
      const data = await res.json();

      if (data.success) {
        setMe(data.data);
      }

      setLoading(false);
    }

    load();
  }, []);

  // Real-time SSE subscription
  useEffect(() => {
    const es = new EventSource(`/api/loan-officer/events`);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Document progress updates
        if (data.type === "DOC_PROGRESS_UPDATED") {
          setMe((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              applications: prev.applications.map((app) =>
                app.id === data.applicationId
                  ? {
                      ...app,
                      docsRequired: data.docsRequired,
                      docsSatisfied: data.docsSatisfied,
                    }
                  : app
              ),
            };
          });
        }

        // Underwriting status updates
        if (data.type === "UNDERWRITING_UPDATED") {
          setMe((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              applications: prev.applications.map((app) =>
                app.id === data.applicationId
                  ? { ...app, uwStatus: data.case.status }
                  : app
              ),
            };
          });
        }

        // Milestone updates
        if (data.type === "MILESTONE_UPDATED") {
          setMe((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              applications: prev.applications.map((app) =>
                app.id === data.applicationId
                  ? { ...app, milestone: data.milestone }
                  : app
              ),
            };
          });
        }
      } catch (e) {
        console.error("Event parse error", e);
      }
    };

    es.onerror = () => es.close();
    return () => es.close();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Loading your pipeline...</p>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        <p>Unable to load loan officer profile.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Loan Officer Dashboard</h1>
            <p className="text-slate-400 mt-2">
              {me.name} • {me.email}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Total Applications</p>
            <p className="text-2xl font-semibold">
              {me.applications.length}
            </p>
          </div>
        </section>

        {/* Pipeline */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Pipeline</h2>

          {me.applications.length === 0 ? (
            <p className="text-slate-400 text-sm">
              You have no active applications yet.
            </p>
          ) : (
            <div className="space-y-3">
              {me.applications.map((app) => {
                const docsPercent =
                  app.docsRequired > 0
                    ? Math.round(
                        (app.docsSatisfied / app.docsRequired) * 100
                      )
                    : 0;

                return (
                  <div
                    key={app.id}
                    className="border border-slate-800 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">
                        Application {app.id}
                      </p>
                      <p className="text-lg font-semibold">
                        {app.borrowerName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {app.borrowerEmail}
                      </p>
                      <p className="text-sm mt-1">
                        Loan Amount:{" "}
                        <span className="text-blue-400">
                          {app.loanAmount
                            ? `$${app.loanAmount.toLocaleString()}`
                            : "N/A"}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p>
                        Status:{" "}
                        <span className="text-blue-400">
                          {app.status}
                        </span>
                      </p>
                      <p>
                        Milestone:{" "}
                        <span className="text-green-400">
                          {app.milestone}
                        </span>
                      </p>
                      <p>
                        Underwriting:{" "}
                        <span className="text-yellow-400">
                          {app.uwStatus ?? "Not started"}
                        </span>
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-slate-400">
                          Documents: {app.docsSatisfied}/{app.docsRequired}
                        </p>
                        <div className="w-40 h-2 bg-slate-800 rounded overflow-hidden mt-1">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${docsPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                      <a
                        href={`/borrower-app/application/${app.id}/documents`}
                        className="px-3 py-2 bg-slate-800 rounded text-blue-300 text-center"
                      >
                        View Documents
                      </a>
                      <a
                        href={`/admin/underwriting/${app.id}`}
                        className="px-3 py-2 bg-slate-800 rounded text-green-300 text-center"
                      >
                        View Underwriting
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
