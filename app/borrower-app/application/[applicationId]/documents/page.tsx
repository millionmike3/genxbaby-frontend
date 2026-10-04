"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BorrowerDocument = {
  id: string;
  type: string;
  fileUrl: string;
  status: string;
  notes?: string | null;
};

type ChecklistItem = {
  type: string;
  label: string;
  required: boolean;
};

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { type: "id", label: "Government ID", required: true },
  { type: "paystub", label: "Recent Paystubs", required: true },
  { type: "w2", label: "W-2 / 1099", required: true },
  { type: "bank_statement", label: "Bank Statements", required: true },
  { type: "tax_return", label: "Tax Returns (if self-employed)", required: false },
];

export default function BorrowerDocumentsPage() {
  const { applicationId } = useParams();
  const [docs, setDocs] = useState<BorrowerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("id");

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

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicationId", String(applicationId));
    formData.append("type", selectedType);

    const res = await fetch("/api/documents/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setDocs((prev) => [...prev, data.document]);
    }

    setUploading(false);
    e.target.value = "";
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
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold">Upload Your Documents</h1>
          <p className="text-slate-400 mt-2">
            Help us verify your information and move your application forward.
          </p>
        </section>

        {/* Checklist */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Required Documents</h2>
          <ul className="space-y-2 text-slate-300">
            {DEFAULT_CHECKLIST.map((item) => {
              const uploaded = docs.some((d) => d.type === item.type);
              return (
                <li key={item.type} className="flex items-center justify-between">
                  <div>
                    <span>{item.label}</span>
                    {item.required && (
                      <span className="ml-2 text-xs text-red-400">Required</span>
                    )}
                  </div>
                  <span
                    className={
                      uploaded
                        ? "text-green-400 text-sm"
                        : "text-slate-500 text-sm"
                    }
                  >
                    {uploaded ? "Uploaded" : "Not uploaded"}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Upload control */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Upload a Document</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Document Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white"
              >
                {DEFAULT_CHECKLIST.map((item) => (
                  <option key={item.type} value={item.type}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Choose File
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleUpload}
                disabled={uploading}
                className="text-sm text-slate-300"
              />
              {uploading && (
                <p className="text-xs text-slate-400 mt-1">
                  Uploading...
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Existing documents */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Uploaded Documents</h2>
          {docs.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No documents uploaded yet.
            </p>
          ) : (
            <ul className="space-y-3 text-slate-300 text-sm">
              {docs.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between border border-slate-800 rounded px-3 py-2"
                >
                  <div>
                    <p className="font-semibold">
                      {
                        DEFAULT_CHECKLIST.find((c) => c.type === doc.type)
                          ?.label ?? doc.type
                      }
                    </p>
                    <p className="text-xs text-slate-500">
                      Status: {doc.status}
                    </p>
                    {doc.notes && (
                      <p className="text-xs text-slate-400 mt-1">
                        Underwriter note: {doc.notes}
                      </p>
                    )}
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs underline"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
