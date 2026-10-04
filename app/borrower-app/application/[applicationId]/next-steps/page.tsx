"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerNextStepsPage() {
  const { applicationId } = useParams();

  const [milestone, setMilestone] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const appRes = await fetch(`/api/application/${applicationId}`);
    const appData = await appRes.json();

    const docRes = await fetch(`/api/application/${applicationId}/checklist`);
    const docData = await docRes.json();

    if (appData.success) setMilestone(appData.application.milestone);
    if (docData.success) setDocs(docData.documents);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading next steps...
      </div>
    );
  }

  const requiredDocs = docs.filter((d) => !d.satisfied);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Next Steps</h1>
        <p className="text-slate-400">
          Here’s what you need to do next to move your mortgage forward.
        </p>

        {/* Milestone */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Current Milestone</h2>
          <p className="text-green-400 text-lg font-bold mt-2">{milestone}</p>
        </section>

        {/* Required Docs */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Documents Needed</h2>

          {requiredDocs.length === 0 ? (
            <p className="text-slate-400 text-sm">
              All required documents have been uploaded.
            </p>
          ) : (
            requiredDocs.map((doc) => (
              <div
                key={doc.id}
                className="border border-slate-800 rounded p-3 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{doc.label}</p>
                  {doc.reason && (
                    <p className="text-xs text-slate-400">{doc.reason}</p>
                  )}
                </div>
                <a
                  href={`/borrower-app/application/${applicationId}/documents`}
                  className="text-blue-400 text-sm underline"
                >
                  Upload
                </a>
              </div>
            ))
          )}
        </section>

        {/* CTA */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Continue</h2>
          <p className="text-slate-400 text-sm mt-2">
            Upload your documents or review your application summary.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href={`/borrower-app/application/${applicationId}/documents`}
              className="px-4 py-2 bg-green-600 rounded text-sm font-semibold"
            >
              Upload Documents
            </a>
            <a
              href={`/borrower-app/application/${applicationId}/summary`}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
            >
              View Summary
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
