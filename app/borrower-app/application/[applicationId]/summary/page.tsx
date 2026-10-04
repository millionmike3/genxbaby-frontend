"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerApplicationSummaryPage() {
  const { applicationId } = useParams();

  const [app, setApp] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}`);
    const data = await res.json();

    const res2 = await fetch(`/api/application/${applicationId}/checklist`);
    const data2 = await res2.json();

    if (data.success) setApp(data.application);
    if (data2.success) setDocs(data2.documents);

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
        Loading summary...
      </div>
    );
  }

  const required = docs.filter((d) => d.required).length;
  const satisfied = docs.filter((d) => d.satisfied).length;
  const percent = required > 0 ? Math.round((satisfied / required) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Application Summary</h1>

        {/* Milestone */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Current Milestone</h2>
          <p className="text-green-400 text-lg font-bold mt-2">
            {app.milestone}
          </p>
        </section>

        {/* Borrower Info */}
        <section className="border border-slate-800 rounded p-6 space-y-2">
          <h2 className="text-xl font-semibold">Borrower Information</h2>
          <p>{app.borrower?.firstName} {app.borrower?.lastName}</p>
          <p className="text-slate-400 text-sm">{app.borrower?.email}</p>
        </section>

        {/* Property */}
        <section className="border border-slate-800 rounded p-6 space-y-2">
          <h2 className="text-xl font-semibold">Property</h2>
          <p>{app.propertyAddress ?? "Not provided"}</p>
        </section>

        {/* Document Progress */}
        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Document Progress</h2>

          <div className="w-full bg-slate-800 rounded h-4 overflow-hidden mt-3">
            <div
              className="bg-green-500 h-4 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-slate-300 mt-2 text-sm">
            {percent}% complete ({satisfied}/{required})
          </p>
        </section>

        {/* Checklist */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Required Documents</h2>

          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border border-slate-800 rounded p-3"
            >
              <div>
                <p className="font-semibold">{doc.label}</p>
                {doc.reason && (
                  <p className="text-xs text-slate-400">{doc.reason}</p>
                )}
              </div>

              <span
                className={
                  doc.satisfied
                    ? "text-green-400 text-sm"
                    : "text-red-400 text-sm"
                }
              >
                {doc.satisfied ? "Completed" : "Required"}
              </span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
