"use client";

import { useEffect, useState } from "react";
import BehavioralPanel from "../underwriting-app/components/BehavioralPanel";

export default function BorrowerPortal() {
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [notes, setNotes] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [audit, setAudit] = useState([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("gx_token") : null;

  const borrowerId =
    typeof window !== "undefined" ? localStorage.getItem("gx_userId") : null;

  useEffect(() => {
    if (!borrowerId) return;

    async function load() {
      try {
        // Application
        const app = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setApplication(app);

        // Documents
        const docs = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}/documents`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setDocuments(docs);

        // Conditions
        const cond = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}/conditions`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setConditions(cond);

        // Milestones
        const ms = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}/milestones`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setMilestones(ms);

        // Notes
        const nts = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}/notes`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setNotes(nts);

        // Pricing
        const pr = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}/pricing`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setPricing(pr);

        // Audit
        const ad = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/borrower/application/${borrowerId}/audit`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());
        setAudit(ad);
      } catch (err) {
        console.error("Borrower portal load error:", err);
      }
    }

    load();
  }, [borrowerId]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Borrower Portal
      </h1>

      {/* Application Summary */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Loan Application</h2>

        {application ? (
          <div className="space-y-2 text-sm text-neutral-300">
            <p>
              <span className="font-semibold">Loan ID:</span> {application.id}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> $
              {application.amount.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {application.status}
            </p>
            <p>
              <span className="font-semibold">Stage:</span>{" "}
              {application.stage}
            </p>
          </div>
        ) : (
          <p className="text-neutral-500">Loading your application...</p>
        )}
      </div>

      {/* Behavioral Intelligence */}
      {application?.userId && (
        <BehavioralPanel userId={application.userId} />
      )}

      {/* Documents */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mt-10">
        <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
        <div className="space-y-3">
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

      {/* Conditions */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mt-10">
        <h2 className="text-xl font-semibold mb-4">Your Conditions</h2>
        <ul className="space-y-2 text-neutral-300">
          {conditions.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </div>

      {/* Milestones */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mt-10">
        <h2 className="text-xl font-semibold mb-4">Milestones</h2>
        <ul className="space-y-2 text-neutral-300">
          {milestones.map((m) => (
            <li key={m.id}>
              <span className="font-semibold">{m.label}</span>: {m.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Notes / Messages */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mt-10">
        <h2 className="text-xl font-semibold mb-4">Messages From Your Team</h2>
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

      {/* Pricing */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mt-10">
        <h2 className="text-xl font-semibold mb-4">Pricing</h2>
        <ul className="space-y-2 text-neutral-300">
          {pricing.map((p) => (
            <li key={p.id}>
              {p.description}: {p.value}
            </li>
          ))}
        </ul>
      </div>

      {/* Audit Log */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 mt-10 mb-20">
        <h2 className="text-xl font-semibold mb-4">Audit Log</h2>
        <ul className="space-y-2 text-neutral-300">
          {audit.map((a) => (
            <li key={a.id}>
              <span className="font-semibold">{a.action}</span> — {a.details}
              <div className="text-xs text-neutral-500">
                {new Date(a.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
