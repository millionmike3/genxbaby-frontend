"use client";

import { useState } from "react";

export default function UnderwritingActions({ applicationId }: { applicationId: string }) {
  const [reason, setReason] = useState("");

  async function returnForEdits() {
    await fetch(`/api/underwriting/${applicationId}/return`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
    alert("Returned for edits");
  }

  async function approve() {
    await fetch(`/api/underwriting/${applicationId}/approve`, {
      method: "POST",
    });
    alert("Approved");
  }

  async function deny() {
    await fetch(`/api/underwriting/${applicationId}/deny`, {
      method: "POST",
    });
    alert("Denied");
  }

  return (
    <div className="border border-slate-800 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">Underwriting Decision</h2>

      <textarea
        className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-slate-100"
        placeholder="Reason for return (optional)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={returnForEdits}
          className="bg-orange-400 text-black px-4 py-2 rounded-md"
        >
          Return for Edits
        </button>

        <button
          onClick={approve}
          className="bg-green-400 text-black px-4 py-2 rounded-md"
        >
          Approve
        </button>

        <button
          onClick={deny}
          className="bg-red-500 text-black px-4 py-2 rounded-md"
        >
          Deny
        </button>
      </div>
    </div>
  );
}
