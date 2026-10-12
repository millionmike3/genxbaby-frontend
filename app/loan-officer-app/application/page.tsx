"use client";

import { useEffect, useState } from "react";

type BorrowerApplication = {
  id: string;
  borrowerName: string;
  amount: number;
  status: string;
};

type Note = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export default function LoanOfficerApplicationPage() {
  const [applications, setApplications] = useState<BorrowerApplication[]>([]);
  const [selected, setSelected] = useState<BorrowerApplication | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // TODO: replace with real API: /api/lo/applications
    (async () => {
      const mockApps: BorrowerApplication[] = [
        {
          id: "APP-LO-001",
          borrowerName: "John Smith",
          amount: 275000,
          status: "In Review",
        },
      ];
      setApplications(mockApps);
      setSelected(mockApps[0]);

      const mockNotes: Note[] = [
        {
          id: "NOTE-1",
          author: "LO Turner",
          text: "Requested updated income docs.",
          createdAt: new Date().toISOString(),
        },
      ];
      setNotes(mockNotes);
    })();
  }, []);

  function handleAddNote() {
    if (!newNote.trim()) return;
    const note: Note = {
      id: `NOTE-${Date.now()}`,
      author: "Current LO",
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote("");
    // TODO: POST to /api/lo/notes
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Loan Officer Application Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LO Pipeline UI */}
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

        {/* Application Detail + Borrower Assignment + Document Review */}
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

          {/* Borrower Assignment System */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Borrower Assignment</h2>
            <p className="text-neutral-400 text-sm mb-3">
              Assign this borrower to a specific LO or team.
            </p>
            <div className="flex gap-3">
              <input
                className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-64"
                placeholder="Assign to LO (email or name)"
              />
              <button className="bg-[#3CF46B] text-black font-semibold px-4 py-2 rounded-lg text-sm">
                Assign
              </button>
            </div>
          </div>

          {/* Document Review Page */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Document Review</h2>
            <p className="text-neutral-400 text-sm mb-3">
              Uploaded documents (income, assets, credit, collateral) will be
              listed and reviewed here.
            </p>
            <ul className="text-sm text-neutral-300 space-y-2">
              <li>• Income docs (W‑2, 1040, paystubs)</li>
              <li>• Asset statements (bank, retirement)</li>
              <li>• Credit report summary</li>
              <li>• Collateral / appraisal docs</li>
            </ul>
          </div>

          {/* LO Notes / Comments System */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Notes & Comments</h2>
            <div className="space-y-3 mb-4">
              <textarea
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                rows={3}
                placeholder="Add a note about this borrower or application..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button
                onClick={handleAddNote}
                className="bg-[#3CF46B] text-black font-semibold px-4 py-2 rounded-lg text-sm"
              >
                Add Note
              </button>
            </div>

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

          {/* Audit Logging + Underwriting Intelligence Hooks */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">
              Audit & Underwriting Intelligence
            </h2>
            <p className="text-neutral-400 text-sm mb-2">
              All LO actions (assignments, notes, document decisions) will be
              logged here and surfaced to underwriting intelligence.
            </p>
            <p className="text-neutral-400 text-sm">
              This section will later connect to:
              <br />• Fraud scoring integration
              <br />• Behavior analytics
              <br />• Persona clustering
              <br />• Underwriting intelligence dashboard
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
