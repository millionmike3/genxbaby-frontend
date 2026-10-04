"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerConditionsPage() {
  const { applicationId } = useParams();

  const [conditions, setConditions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}/checklist`);
    const data = await res.json();

    if (data.success) {
      setConditions(
        data.documents.filter((d) => d.type === "CONDITION")
      );
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

  async function uploadCondition(e, docId) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docId", docId);
    formData.append("applicationId", applicationId);

    await fetch(`/api/documents/upload`, {
      method: "POST",
      body: formData,
    });

    await load();
    setUploading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading conditions...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Clear Your Conditions</h1>
        <p className="text-slate-400">
          Upload documents to satisfy underwriting conditions.
        </p>

        {conditions.length === 0 ? (
          <p className="text-slate-400 text-sm">No conditions required.</p>
        ) : (
          conditions.map((c) => (
            <div
              key={c.id}
              className="border border-slate-800 rounded p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">{c.label}</p>
                <p className="text-xs text-slate-400">{c.reason}</p>
                <p
                  className={
                    c.satisfied
                      ? "text-green-400 text-sm mt-1"
                      : "text-red-400 text-sm mt-1"
                  }
                >
                  {c.satisfied ? "Completed" : "Required"}
                </p>
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={uploading || c.satisfied}
                onChange={(e) => uploadCondition(e, c.id)}
                className="text-sm text-slate-300"
              />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
