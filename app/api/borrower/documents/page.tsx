"use client";

import { useState } from "react";

export default function BorrowerDocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState("government_id");
  const [message, setMessage] = useState("");

  async function upload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const res = await fetch("/api/borrower/documents/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (json.success) {
      setMessage("Uploaded successfully!");
    } else {
      setMessage(json.error || "Upload failed");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <h1 className="text-3xl font-bold text-[#3CF46B] mb-6">
        Upload Documents
      </h1>

      <div className="space-y-4 max-w-md">
        <select
          className="bg-neutral-900 border border-neutral-700 p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="government_id">Government ID</option>
          <option value="paystubs">Paystubs (30 days)</option>
          <option value="bank_statements">Bank Statements (60 days)</option>
          <option value="w2_1099">W‑2 / 1099</option>
          <option value="utility_bill">Utility Bill</option>
        </select>

        <input
          type="file"
          className="text-sm"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={upload}
          className="bg-[#3CF46B] text-black px-4 py-2 rounded font-semibold"
        >
          Upload
        </button>

        {message && <p className="text-slate-300">{message}</p>}
      </div>
    </div>
  );
}
