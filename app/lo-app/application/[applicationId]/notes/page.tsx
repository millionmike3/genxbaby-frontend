"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function LONotesPage() {
  const { applicationId } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState("");

  async function load() {
    const res = await fetch(`/api/notes/${applicationId}`);
    const data = await res.json();
    if (data.success) setNotes(data.notes);
  }

  async function addNote() {
    if (!text.trim()) return;

    await fetch(`/api/notes/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "LOAN_OFFICER",
        note: text,
      }),
    });

    setText("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Internal Notes</h1>
        <p className="text-slate-400">Visible to LO, UW, and Admin only.</p>

        <div className="border border-slate-800 rounded p-6 space-y-4 h-[400px] overflow-y-auto">
          {notes.map((n) => (
            <div key={n.id}>
              <p className="text-xs text-slate-500">
                {n.role} • {new Date(n.createdAt).toLocaleString()}
              </p>
              <p className="text-slate-300">{n.note}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
            placeholder="Add an internal note..."
          />
          <button
            onClick={addNote}
            className="px-4 py-2 bg-blue-600 rounded text-sm font-semibold"
          >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
