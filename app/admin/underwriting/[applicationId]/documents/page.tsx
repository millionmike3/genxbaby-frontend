"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BorrowerDocument = {
  id: string;
  type: string;
  fileUrl: string;
  status: string;
  notes?: string | null;
  createdAt: string;
};

export default function UnderwriterDocumentsPage() {
  const { applicationId } = useParams();

  const [docs, setDocs] = useState<BorrowerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Load documents
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/documents/${applicationId}/list`);
      const data = await res.json();

      if (data.success) {
        setDocs(data.data);
      }

      setLoading(false);
    }

    load();
  }, [applicationId]);

  // SSE subscription for real-time updates
  useEffect(() => {
    const es = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "DOC_UPLOADED") {
          setDocs((prev) => [...prev, data.document]);
        }

        if (data.type === "DOC_STATUS_UPDATED") {
          setDocs((prev) =>
            prev.map((d) =>
              d.id === data.document.id ? data.document : d
            )
          );
        }
      } catch (e) {
        console.error("Event parse error", e);
      }
    };

    es.onerror = () => es.close();
    return () => es.close();
  }, [applicationId]);

  async function updateStatus(
    documentId: string,
    status: string,
    notes?: string
  ) {
    setUpdating(documentId);

    const res = await fetch(`/api/documents/${documentId}/update-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });

    const data = await res.json();

    if (data.success) {
      setDocs((prev) =>
        prev.map((d) => (d.id === documentId ? data.document : d))
      );
    }

    setUpdating(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading documents...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold">Document Review</h1>
          <p className="text-slate-400 mt-2">
            Application {applicationId}
          </p>
        </section>

        {/* Document List */}
        <section className="space-y-6">
          {docs.length === 0 ? (
            <p className="text-slate-400">No documents uploaded yet.</p>
          ) : (
            docs.map((doc) => (
              <div
                key={doc.id}
                className="border border-slate-800 rounded p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold capitalize">
                      {doc.type.replace("_", " ")}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Uploaded: {new Date(doc.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm mt-1">
                      Status:{" "}
                      <span className="text-blue-400">{doc.status}</span>
                    </p>
                    {doc.notes && (
                      <p className="text-xs text-slate-400 mt-1">
                        Notes: {doc.notes}
                      </p>
                    )}
                  </div>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-sm"
                  >
                    View Document
                  </a>
                </div>

                {/* Status Controls */}
                <div className="space-y-3">
                  <textarea
                    placeholder="Add notes (optional)"
                    defaultValue={doc.notes ?? ""}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
                    onChange={(e) =>
                      setDocs((prev) =>
                        prev.map((d) =>
                          d.id === doc.id
                            ? { ...d, notes: e.target.value }
                            : d
                        )
                      )
                    }
                  />

                  <div className="flex items-center gap-3">
                    <button
                      disabled={updating === doc.id}
                      onClick={() =>
                        updateStatus(doc.id, "accepted", doc.notes)
                      }
                      className="px-4 py-2 bg-green-600 rounded text-white text-sm"
                    >
                      Accept
                    </button>

                    <button
                      disabled={updating === doc.id}
                      onClick={() =>
                        updateStatus(doc.id, "rejected", doc.notes)
                      }
                      className="px-4 py-2 bg-red-600 rounded text-white text-sm"
                    >
                      Reject
                    </button>

                    <button
                      disabled={updating === doc.id}
                      onClick={() =>
                        updateStatus(doc.id, "needs_clarification", doc.notes)
                      }
                      className="px-4 py-2 bg-yellow-600 rounded text-white text-sm"
                    >
                      Needs Clarification
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
