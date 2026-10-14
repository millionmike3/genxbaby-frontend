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
  fullName: string;
  email: string;
  loans: PipelineApplication[];
};

export default function DashboardClient({
  initialOfficer,
}: {
  initialOfficer: LoanOfficerMe;
}) {
  const [me, setMe] = useState<LoanOfficerMe | null>(initialOfficer);
  const [loading, setLoading] = useState(false);

  // Load fresh data on mount
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/loan-officer/me");
      const data = await res.json();

      if (data.success) {
        setMe(data.data);
      }
    }

    load();
  }, []);

  // Real-time SSE subscription
  useEffect(() => {
    const es = new EventSource(`/api/loan-officer/events`);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (!me) return;

        // Document progress updates
        if (data.type === "DOC_PROGRESS_UPDATED") {
          setMe((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              loans: prev.loans.map((loan) =>
                loan.id === data.applicationId
                  ? {
                      ...loan,
                      docsRequired: data.docsRequired,
                      docsSatisfied: data.docsSatisfied,
                    }
                  : loan
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
              loans: prev.loans.map((loan) =>
                loan.id === data.applicationId
                  ? { ...loan, uwStatus: data.case.status }
                  : loan
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
              loans: prev.loans.map((loan) =>
                loan.id === data.applicationId
                  ? { ...loan, milestone: data.milestone }
                  : loan
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
  }, [me]);

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
              {me.fullName} • {me.email}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Total Applications</p>
            <p className="text-2xl font-semibold">{me.loans.length}</p>
          </div>
        </section>

        {/* Pipeline */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Pipeline</h2>

          {me.loans.length === 0 ? (
            <p className="text-slate-400 text-sm">
              You have no active applications yet.
            </p>
          ) : (
            <div className="space-y-3">
              {me.loans.map((loan) => {
                const docsPercent =
                  loan.docsRequired > 0
                    ? Math.round(
                        (loan.docsSatisfied / loan.docsRequired) * 100
                      )
                    : 0;

                return (
                  <div
                    key={loan.id}
                    className="border border-slate-800 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">
                        Application {loan.id}
                      </p>
                      <p className="text-lg font-semibold">
                        {loan.borrowerName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {loan.borrowerEmail}
                      </p>
                      <p className="text-sm mt-1">
                        Loan Amount:{" "}
                        <span className="text-blue-400">
                          {loan.loanAmount
                            ? `$${loan.loanAmount.toLocaleString()}`
                            : "N/A"}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p>
                        Status:{" "}
                        <span className="text-blue-400">{loan.status}</span>
                      </p>
                      <p>
                        Milestone:{" "}
                        <span className="text-green-400">
                          {loan.milestone}
                        </span>
                      </p>
                      <p>
                        Underwriting:{" "}
                        <span className="text-yellow-400">
                          {loan.uwStatus ?? "Not started"}
                        </span>
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-slate-400">
                          Documents: {loan.docsSatisfied}/{loan.docsRequired}
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
                        href={`/borrower-app/application/${loan.id}/documents`}
                        className="px-3 py-2 bg-slate-800 rounded text-blue-300 text-center"
                      >
                        View Documents
                      </a>
                      <a
                        href={`/admin/underwriting/${loan.id}`}
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
