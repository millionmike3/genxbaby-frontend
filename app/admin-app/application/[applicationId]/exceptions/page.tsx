"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type DocItem = {
  id: string;
  label: string;
  type: string;
  exceptionReason?: string;
  exceptionApproved?: boolean;
};

export default function AdminDocumentExceptionManagerPage() {
  const { applicationId } = useParams();
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}/checklist`);
    const data = await res.json();
    if (data.success) {
      setDocs(
        data.documents.map((d: any) => ({
          id: d.id,
          label: d.label,
          type: d.type,
          exceptionReason: d.exceptionReason,
          exceptionApproved: d.exceptionApproved,
        }))
      );
    }
    setLoading(false);
  }

  async function setException(docId: string) {
    const reason = prompt("Enter exception reason:");
    if (!reason) return;
    await fetch(`/api/admin/exceptions/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docId, reason }),
    });
    load();
  }

  async function approveException(docId: string) {
    await fetch(`/api/admin/exceptions/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docId, approve: true }),
    });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading exceptions...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Document Exception Manager</h1>
        <p className="text-slate-400">
          Manage exceptions for missing or alternative documents.
        </p>

        <div className="space-y-3 border border-slate-800 rounded p-6">
          {docs.map((d) => (
            <div
              key={d.id}
              className="border-b border-slate-800 pb-3 mb-3 flex justify-between"
            >
              <div>
                <p className="font-semibold">{d.label}</p>
                <p className="text-xs text-slate-400">{d.type}</p>
                {d.exceptionReason && (
                  <p className="text-xs text-yellow-400 mt-1">
                    Exception: {d.exceptionReason}
                  </p>
                )}
                {d.exceptionApproved && (
                  <p className="text-xs text-green-400 mt-1">
                    Exception Approved
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setException(d.id)}
                  className="px-3 py-2 bg-slate-700 rounded text-xs font-semibold"
                >
                  Set Exception
                </button>
                {d.exceptionReason && !d.exceptionApproved && (
                  <button
                    onClick={() => approveException(d.id)}
                    className="px-3 py-2 bg-green-600 rounded text-xs font-semibold"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
