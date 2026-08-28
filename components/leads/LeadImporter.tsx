"use client";

import { useState } from "react";

interface LeadImporterProps {
  onImported: () => Promise<void>;
}

export default function LeadImporter({ onImported }: LeadImporterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleImport() {
    if (!file) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/leads/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setMessage(`Imported ${data.count || 0} leads.`);

      // 🔥 THIS IS THE IMPORTANT PART
      // Refresh the leads list in the parent page
      await onImported();
    } else {
      setMessage("Import failed.");
    }
  }

  return (
    <div className="gx-card p-6 rounded-xl mb-6">
      <h2 className="text-xl font-bold gx-text-primary mb-4">
        Import Leads (CSV)
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleImport}
        disabled={!file || loading}
        className="gx-btn-primary px-4 py-2 rounded-lg"
      >
        {loading ? "Importing..." : "Import"}
      </button>

      {message && <p className="text-gray-400 mt-3">{message}</p>}
    </div>
  );
}
