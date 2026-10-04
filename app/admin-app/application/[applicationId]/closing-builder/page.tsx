"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type DocItem = {
  id: string;
  label: string;
  type: string;
  fileUrl?: string;
  includeInClosing: boolean;
};

export default function AdminClosingPackageBuilderPage() {
  const { applicationId } = useParams();
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}/checklist`);
    const data = await res.json();
    if (data.success) {
      setDocs(
        data.documents.map((d: any) => ({
          id: d.id,
          label: d.label,
          type: d.type,
          fileUrl: d.fileUrl,
          includeInClosing: d.includeInClosing ?? false,
        }))
      );
    }
    setLoading(false);
  }

  async function toggle(docId: string) {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, includeInClosing: !d.includeInClosing } : d
      )
    );
  }

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/closing-package/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docs }),
    });
    setSaving(false);
    alert("Closing package configuration saved.");
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading closing package builder...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Closing Package Builder</h1>
        <p className="text-slate-400">
          Select which documents will be included in the final closing package.
        </p>

        <div className="space-y-3 border border-slate-800 rounded p-6">
          {docs.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between border-b border-slate-800 py-2"
            >
              <div>
                <p className="font-semibold">{d.label}</p>
                <p className="text-xs text-slate-400">{d.type}</p>
              </div>
              <div className="flex items-center gap-3">
                {d.fileUrl && (
                  <a
                    href={d.fileUrl}
                    target="_blank"
                    className="text-blue-400 underline text-sm"
                  >
                    View
                  </a>
                )}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={d.includeInClosing}
                    onChange={() => toggle(d.id)}
                  />
                  Include
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={saving}
          onClick={save}
          className="px-4 py-2 bg-green-600 rounded text-sm font-semibold"
        >
          {saving ? "Saving..." : "Save Closing Package"}
        </button>
      </div>
    </main>
  );
}
