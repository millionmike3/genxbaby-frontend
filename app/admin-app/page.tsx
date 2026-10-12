"use client";

import { useEffect, useState } from "react";
import BehavioralPanel from "./components/BehavioralPanel";

export default function AdminApplicationPage() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);

  const [notes, setNotes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [audit, setAudit] = useState([]);

  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("gx_token");

    async function loadPipeline() {
      const apps = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/admin/applications`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());

      setApplications(apps);

      if (apps.length > 0) {
        setSelected(apps[0]);
        await loadApplication(apps[0].id, token);
      }
    }

    async function loadApplication(id, token) {
      const notesRes = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/admin/applications/${id}/notes`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());
      setNotes(notesRes);

      const docsRes = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/admin/applications/${id}/documents`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());
      setDocuments(docsRes);

      const auditRes = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/admin/applications/${id}/audit`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());
      setAudit(auditRes);
    }

    loadPipeline();
  }, []);

  async function handleAddNote() {
    if (!newNote.trim() || !selected) return;

    const token = localStorage.getItem("gx_token");

    await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/admin/applications/${selected.id}/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newNote.trim(),
          author: "Admin Turner",
          role: "admin",
        }),
      }
    );

    setNotes((prev) => [
      {
        id: `NOTE-${Date.now()}`,
        text: newNote.trim(),
        author: "Admin Turner",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setNewNote("");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Admin Application Portal
      </h1>

      {/* Pipeline */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-[#3CF46B]">Pipeline</h2>
        <div className="grid grid-cols-3 gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelected(app)}
              className={`p-4 rounded-xl border cursor-pointer ${
                selected?.id === app.id
                  ? "border-[#3CF46B] bg-[#0f0f0f]"
                  : "border-gray-700"
              }`}
            >
              <div className="font-bold">{app.borrowerName}</div>
              <div className="text-sm text-gray-400">{app.loanType}</div>
              <div className="text-sm text-gray-400">
                {app.status || "Pending"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Detail */}
      {selected && (
        <div className="mb-10 p-6 bg-[#111] rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4 text-[#3CF46B]">
            Application Detail
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>Borrower: {selected.borrowerName}</div>
            <div>Loan Type: {selected.loanType}</div>
            <div>Amount: ${selected.amount}</div>
            <div>Status: {selected.status}</div>
          </div>
        </div>
      )}

      {/* Behavioral Intelligence */}
      {selected?.userId && (
        <BehavioralPanel userId={selected.userId} />
        
      )}

      {/* Notes */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#3CF46B]">Notes</h2>

        <div className="mb-4 flex gap-4">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 p-3 rounded-lg bg-[#222] border border-gray-700"
          />
          <button
            onClick={handleAddNote}
            className="px-6 py-3 bg-[#3CF46B] text-black font-bold rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-[#111] rounded-xl border border-gray-800"
            >
              <div className="font-bold">{note.author}</div>
              <div className="text-gray-300">{note.text}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#3CF46B]">Documents</h2>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-[#111] rounded-xl border border-gray-800"
            >
              <div className="font-bold">{doc.name}</div>
              <div className="text-gray-400">{doc.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit */}
      <div className="mt-10 mb-20">
        <h2 className="text-xl font-bold mb-4 text-[#3CF46B]">Audit Log</h2>

        <div className="space-y-4">
          {audit.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-[#111] rounded-xl border border-gray-800"
            >
              <div className="font-bold">{event.action}</div>
              <div className="text-gray-300">{event.details}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(event.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
