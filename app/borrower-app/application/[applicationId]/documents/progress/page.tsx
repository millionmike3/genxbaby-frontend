"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerDocumentProgressTracker() {
  const { applicationId } = useParams();

  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [milestone, setMilestone] = useState("");

  // Load checklist + pipeline progress
  async function load() {
    const res = await fetch(`/api/application/${applicationId}/checklist`);
    const data = await res.json();

    if (data.success) {
      setDocs(data.documents);

      const required = data.documents.filter((d) => d.required).length;
      const satisfied = data.documents.filter((d) => d.satisfied).length;

      setPercent(required > 0 ? Math.round((satisfied / required) * 100) : 0);
    }

    // Load milestone
    const res2 = await fetch(`/api/application/${applicationId}`);
    const appData = await res2.json();
    if (appData.success) {
      setMilestone(appData.application.milestone);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();

    // SSE listener for live updates
    const evtSource = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    evtSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (
        payload.type === "DOC_PROGRESS_UPDATED" ||
        payload.type === "MILESTONE_UPDATED"
      ) {
        load();
      }
    };

    return () => evtSource.close();
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading progress...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-3xl font-bold">Document Progress</h1>
        <p className="text-slate-400">
          Track your progress as you complete required documents.
        </p>

        {/* Progress Bar */}
        <div className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Completion Progress</h2>

          <div className="w-full bg-slate-800 rounded h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-slate-300 mt-2 text-sm">
            {percent}% complete
          </p>
        </div>

        {/* Milestone */}
        <div className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Current Milestone</h2>
          <p className="text-green-400 text-lg font-bold">{milestone}</p>
        </div>

        {/* Checklist */}
        <div className="border border-slate-800 rounded p-6 space-y-4">
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
        </div>
      </div>
    </main>
  );
}
