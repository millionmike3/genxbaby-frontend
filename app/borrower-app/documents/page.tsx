"use client";

import { useState } from "react";

type DocType =
  | "w2"
  | "paystub"
  | "bank_statement"
  | "id"
  | "purchase_contract"
  | "tax_return";

const REQUIRED_DOCS: { type: DocType; label: string }[] = [
  { type: "w2", label: "W-2" },
  { type: "paystub", label: "Recent Paystub" },
  { type: "bank_statement", label: "Bank Statement" },
  { type: "id", label: "Government ID" },
  { type: "purchase_contract", label: "Purchase Contract" },
  { type: "tax_return", label: "Tax Return" },
];

export default function BorrowerDocumentsPage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<Record<string, string>>({});

  async function handleUpload(type: DocType, file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        setUploaded((prev) => ({ ...prev, [type]: data.url }));
      }
    } catch {
      setError("Network error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Document Uploads</h1>
      <p className="text-sm text-slate-400 mb-6">
        Upload required documents to complete your mortgage application.
      </p>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      <div className="space-y-4">
        {REQUIRED_DOCS.map((doc) => (
          <div
            key={doc.type}
            className="flex items-center justify-between border border-slate-800 rounded-lg p-3 text-sm"
          >
            <div>
              <div className="font-semibold">{doc.label}</div>
              <div className="text-xs text-slate-400">
                {uploaded[doc.type]
                  ? "Uploaded"
                  : "Not uploaded"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) =>
                  handleUpload(doc.type, e.target.files?.[0] ?? null)
                }
                className="text-xs"
              />
            </div>
          </div>
        ))}
      </div>

      {uploading && (
        <p className="mt-4 text-xs text-slate-400">
          Uploading...
        </p>
      )}
    </main>
  );
}
