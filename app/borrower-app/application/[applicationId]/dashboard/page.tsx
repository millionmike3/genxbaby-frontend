"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerDashboardPage() {
  const { applicationId } = useParams();

  const [app, setApp] = useState(null);
  const [docs, setDocs] = useState([]);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  async function load() {
    const appRes = await fetch(`/api/application/${applicationId}`);
    const appData = await appRes.json();

    const docRes = await fetch(`/api/application/${applicationId}/checklist`);
    const docData = await docRes.json();

    if (appData.success) setApp(appData.application);
    if (docData.success) {
      setDocs(docData.documents);
      const required = docData.documents.filter((d) => d.required).length;
      const satisfied = docData.documents.filter((d) => d.satisfied).length;
      setPercent(required ? Math.round((satisfied / required) * 100) : 0);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();

    const evtSource = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    evtSource.onmessage = () => load();

    return () => evtSource.close();
  }, [applicationId]);

  if (loading || !app) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-4xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-slate-400">
          Track your mortgage progress and complete your next steps.
        </p>

        {/* Milestone */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Current Milestone</h2>
          <p className="text-green-400 text-lg font-bold mt-2">
            {app.milestone}
          </p>
        </section>

        {/* Progress */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Document Progress</h2>

          <div className="w-full bg-slate-800 rounded h-4 overflow-hidden mt-3">
            <div
              className="bg-green-500 h-4 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-slate-300 mt-2 text-sm">
            {percent}% complete
          </p>
        </section>

        {/* Navigation */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Your Actions</h2>

          <div className="flex flex-col gap-3">
            <a
              href={`/borrower-app/application/${applicationId}/documents`}
              className="px-4 py-2 bg-green-600 rounded text-sm font-semibold"
            >
              Upload Documents
            </a>

            <a
              href={`/borrower-app/application/${applicationId}/next-steps`}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
            >
              View Next Steps
            </a>

            <a
              href={`/borrower-app/application/${applicationId}/timeline`}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
            >
              Milestone Timeline
            </a>

            <a
              href={`/borrower-app/application/${applicationId}/messages`}
              className="px-4 py-2 bg-blue-600 rounded text-sm font-semibold"
            >
              Message Your Loan Team
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
