"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerDocumentsPage() {
  const { applicationId } = useParams();

  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Load dynamic checklist
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/application/${applicationId}/checklist`);
      const data = await res.json();
      if (data.success) setDocs(data.documents);
      setLoading(false);
    }
    load();
  }, [applicationId]);

  // Upload + auto-satisfy
  async function handleUpload(e, docId) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docId", docId);
    formData.append("applicationId", applicationId);

    const res = await fetch(`/api/documents/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      // Refresh checklist after auto-satisfy
      const res2 = await fetch(`/api/application/${applicationId}/checklist`);
      const data2 = await res2.json();
      setDocs(data2.documents);
    }

    setUploading(false);
    e.target.value = "";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading checklist...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-3xl font-bold">Upload Required Documents</h1>
        <p className="text-slate-400">
          Upload the documents needed to move your mortgage application forward.
        </p>

        {/* Checklist */}
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="border border-slate-800 rounded p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">{doc.label}</p>
                {doc.reason && (
                  <p className="text-xs text-slate-400">{doc.reason}</p>
                )}
                <p
                  className={
                    doc.satisfied
                      ? "text-green-400 text-sm mt-1"
                      : "text-red-400 text-sm mt-1"
                  }
                >
                  {doc.satisfied ? "Completed" : "Required"}
                </p>
              </div>

              <div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading || doc.satisfied}
                  onChange={(e) => handleUpload(e, doc.id)}
                  className="text-sm text-slate-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
