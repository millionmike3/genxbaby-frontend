"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  borrowerName: string;
  amount: number;
  status: string;
  fraudScore?: number;
  behaviorScore?: number;
  persona?: string;
};

type Note = {
  id: string;
  author: string;
  role: string;
  text: string;
  createdAt: string;
};

type Document = {
  id: string;
  type: string;
  url: string;
  status: string;
};

type AuditEvent = {
  id: string;
  actor: string;
  role: string;
  action: string;
  createdAt: string;
};

export default function AdminApplicationPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [audit, setAudit] = useState<AuditEvent[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // TODO: Replace with real API calls
    (async () => {
      const mockApps: Application[] = [
        {
          id: "APP-ADM-001",
          borrowerName: "Sarah Johnson",
          amount: 420000,
          status: "UW Review",
          fraudScore: 0.18,
          behaviorScore: 0.62,
          persona: "Planner",
        },
      ];
      setApplications(mockApps);
      setSelected(mockApps[0]);

      const mockNotes: Note[] = [
        {
          id: "NOTE-1",
          author: "Admin Turner",
          role: "admin",
          text: "Requested UW to re-evaluate fraud score.",
          createdAt: new Date().toISOString(),
        },
      ];
      setNotes(mockNotes);

      const mockDocs: Document[] = [
        {
          id: "DOC-1",
          type: "Income",
          url: "#",
          status: "Verified",
        },
        {
          id: "DOC-2",
          type: "Credit",
          url: "#",
          status: "Pending Review",
        },
      ];
      setDocuments(mockDocs);

      const mockAudit: AuditEvent[] = [
        {
          id: "AUD-1",
          actor: "UW Davis",
          role: "uw",
          action: "Updated risk score",
          createdAt: new Date().toISOString(),
        },
        {
          id: "AUD-2",
          actor: "LO Brown",
          role: "lo",
          action: "Added borrower note",
          createdAt: new Date().toISOString(),
        },
      ];
      setAudit(mockAudit);
    })();
  }, []);

  function handleAddNote() {
    if (!newNote.trim()) return;
    const note: Note = {
      id: `NOTE-${Date.now()}`,
      author: "Admin",
      role: "admin",
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote("");
    // TODO: POST to /api/admin/notes
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Admin Application Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline */}
        <section className="lg:col-span-1 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Pipeline</h2>
          <ul className="space-y-3">
            {applications.map((app) => (
              <li
                key={app.id}
                className={`p-3 rounded-lg cursor-pointer border ${
                  selected?.id === app.id
                    ? "border-[#3CF46B] bg-neutral-800"
                    : "border-neutral-700 bg-neutral-900"
                }`}
                onClick={() => setSelected(app)}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{app.borrowerName}</span>
                  <span className="text-sm text-neutral-400">{app.status}</span>
                </div>
                <div className="text-sm text-neutral-400">
                  ${app.amount.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Panels */}
        <section className="lg:col-span-2 space-y-6">
          {/* Application Detail */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Application Detail</h2>
            {selected ? (
              <div className="space-y-2 text-sm text-neutral-300">
                <p>
                  <span className="font-semibold">ID:</span> {selected.id}
                </p>
                <p>
                  <span className="font-semibold">Borrower:</span>{" "}
                  {selected.borrowerName}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> $
                  {selected.amount.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selected.status}
                </p>
              </div>
            ) : (
              <p className="text-neutral-500">
                Select an application from the pipeline.
              </p>
            )}
          </div>

          {/* Fraud / Behavior / Persona */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Fraud Score</h3>
              <p className="text-neutral-400 text-sm">
                {selected?.fraudScore ?? "N/A"}
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Behavior Score</h3>
              <p className="text-neutral-400 text-sm">
                {selected?.behaviorScore ?? "N/A"}
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Persona</h3>
              <p className="text-neutral-400 text-sm">
                {selected?.persona ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Document Review */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Document Review</h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex justify-between border border-neutral-700 p-3 rounded-lg"
                >
                  <span>{doc.type}</span>
                  <span className="text-neutral-400">{doc.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>

            <textarea
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm mb-3"
              rows={3}
              placeholder="Add an admin note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />

            <button
              onClick={handleAddNote}
              className="bg-[#3CF46B] text-black font-semibold px-4 py-2 rounded-lg text-sm mb-4"
            >
              Add Note
            </button>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{note.author}</span>
                    <span className="text-xs text-neutral-500">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-neutral-300">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Audit Log</h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {audit.map((event) => (
                <div
                  key={event.id}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">
                      {event.actor} ({event.role})
                    </span>
                    <span className="text-xs text-neutral-500">
                      {new Date(event.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-neutral-300">{event.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Underwriting Intelligence */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">
              Underwriting Intelligence
            </h2>
            <p className="text-neutral-400 text-sm">
              Risk tiers, fraud clusters, persona clusters, and underwriting
              recommendations will appear here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
