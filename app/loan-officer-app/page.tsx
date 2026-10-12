"use client";

import { useEffect, useState } from "react";
import BehavioralPanel from "../underwriting-app/components/BehavioralPanel";

type LOPipelineItem = {
  id: string;
  borrowerName: string;
  amount: number;
  status: string;
  stage: string;
  userId?: string;
};

type LONote = {
  id: string;
  text: string;
  author: string;
  role: string;
  createdAt: string;
};

export default function LoanOfficerPortal() {
  const [pipeline, setPipeline] = useState<LOPipelineItem[]>([]);
  const [selected, setSelected] = useState<LOPipelineItem | null>(null);
  const [notes, setNotes] = useState<LONote[]>([]);
  const [newNote, setNewNote] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("gx_token") : null;

  useEffect(() => {
    async function loadPipeline() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/loan-officer/pipeline`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());

        if (Array.isArray(res) && res.length > 0) {
          setPipeline(res);
          setSelected(res[0]);
          await loadNotes(res[0].id);
        } else {
          const mock: LOPipelineItem[] = [
            {
              id: "LO-APP-001",
              borrowerName: "Marcus Hill",
              amount: 510000,
              status: "LO Review",
              stage: "Pre-Approval",
              userId: "USER-001",
            },
            {
              id: "LO-APP-002",
              borrowerName: "Alicia Gomez",
              amount: 285000,
              status: "Docs Out",
              stage: "Processing",
              userId: "USER-002",
            },
          ];
          setPipeline(mock);
          setSelected(mock[0]);
        }
      } catch (err) {
        console.error("LO pipeline error:", err);
      }
    }

    async function loadNotes(appId: string) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/loan-officer/applications/${appId}/notes`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());

        if (Array.isArray(res)) setNotes(res);
      } catch (err) {
        console.error("LO notes error:", err);
      }
    }

    loadPipeline();
  }, []);

  async function handleSelect(app: LOPipelineItem) {
    setSelected(app);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/loan-officer/applications/${app.id}/notes`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());

      if (Array.isArray(res)) setNotes(res);
    } catch (err) {
      console.error("LO notes load error:", err);
    }
  }

  async function handleAddNote() {
    if (!selected || !newNote.trim()) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/loan-officer/applications/${selected.id}/notes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newNote.trim(),
            author: "Loan Officer",
            role: "loan_officer",
          }),
        }
      );

      setNotes((prev) => [
        {
          id: `LO-NOTE-${Date.now()}`,
          text: newNote.trim(),
          author: "Loan Officer",
          role: "loan_officer",
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setNewNote("");
    } catch (err) {
      console.error("LO add note error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Loan Officer Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline */}
        <section className="lg:col-span-1 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Pipeline</h2>
          <ul className="space-y-3">
            {pipeline.map((app) => (
              <li
                key={app.id}
                className={`p-3 rounded-lg cursor-pointer border ${
                  selected?.id === app.id
                    ? "border-[#3CF46B] bg-neutral-800"
                    : "border-neutral-700 bg-neutral-900"
                }`}
                onClick={() => handleSelect(app)}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{app.borrowerName}</span>
                  <span className="text-sm text-neutral-400">
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-neutral-400">
                  ${app.amount.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500">{app.stage}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Panels */}
        <section className="lg:col-span-2 space-y-6">
          {/* Application Summary */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Application Summary</h2>
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
                <p>
                  <span className="font-semibold">Stage:</span>{" "}
                  {selected.stage}
                </p>
              </div>
            ) : (
              <p className="text-neutral-500">
                Select an application from the pipeline.
              </p>
            )}
          </div>

          {/* Behavioral Intelligence */}
          {selected?.userId && (
            <BehavioralPanel userId={selected.userId} />
          )}

          {/* Borrower Engagement */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">
              Borrower Engagement
            </h2>
            <p className="text-neutral-400 text-sm">
              Call attempts, email touches, SMS, and portal logins will appear
              here to show engagement.
            </p>
          </div>

          {/* Notes */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <div className="mb-4 flex gap-4">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a borrower note..."
                className="flex-1 p-3 rounded-lg bg-[#222] border border-gray-700"
              />
              <button
                onClick={handleAddNote}
                className="px-6 py-3 bg-[#3CF46B] text-black font-bold rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="space-y-3">
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

          {/* Tasks */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <p className="text-neutral-400 text-sm">
              Borrower follow-ups, document requests, and internal LO tasks will
              be surfaced here.
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Milestones</h2>
            <p className="text-neutral-400 text-sm">
              LO milestones (pre-approval issued, disclosures sent, docs
              received) will appear here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
