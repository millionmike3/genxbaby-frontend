"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function LODocumentReviewPage() {
  const { applicationId } = useParams();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}/checklist`);
    const data = await res.json();
    if (data.success) setDocs(data.documents);
    setLoading(false);
  }

  async function updateDoc(docId: string, action: string) {
    await fetch(`/api/lo/documents/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, docId, action }),
    });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading documents...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Document Review</h1>

        {docs.map((d) => (
          <div key={d.id} className="border border-slate-800 rounded p-4">
            <p className="font-semibold">{d.label}</p>
            <p className="text-slate-400 text-sm">{d.reason}</p>

            {d.fileUrl && (
              <a
                href={d.fileUrl}
                target="_blank"
                className="text-blue-400 underline text-sm mt-2 inline-block"
              >
                View Document
              </a>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updateDoc(d.id, "APPROVE")}
                className="px-3 py-2 bg-green-600 rounded text-sm font-semibold"
              >
                Approve
              </button>

              <button
                onClick={() => updateDoc(d.id, "REJECT")}
                className="px-3 py-2 bg-red-600 rounded text-sm font-semibold"
              >
                Reject
              </button>

              <button
                onClick={() => updateDoc(d.id, "REQUEST_REUPLOAD")}
                className="px-3 py-2 bg-blue-600 rounded text-sm font-semibold"
              >
                Request Re-upload
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
