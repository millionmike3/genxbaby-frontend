"use client";

import { useState } from "react";

export default function LeadContactPanel({ leadId }) {
  const [channel, setChannel] = useState<"phone" | "sms" | "email">("phone");
  const [outcome, setOutcome] = useState("connected");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogContact() {
    setLoading(true);
    setMessage("");

    const res = await fetch(`/api/leads/${leadId}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, outcome, notes }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setMessage("Contact attempt logged.");
      setNotes("");
    } else {
      setMessage("Failed to log contact.");
    }
  }

  return (
    <div className="gx-card p-6 rounded-xl">
      <h2 className="text-xl font-bold gx-text-primary mb-4">Contact Lead</h2>

      <div className="space-y-3">
        <div>
          <p className="text-gray-400 mb-1">Channel</p>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as any)}
            className="bg-[#111118] text-white p-2 rounded-lg"
          >
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div>
          <p className="text-gray-400 mb-1">Outcome</p>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="bg-[#111118] text-white p-2 rounded-lg"
          >
            <option value="connected">Connected</option>
            <option value="no_answer">No Answer</option>
            <option value="left_message">Left Message</option>
            <option value="bad_number">Bad Number</option>
            <option value="opt_out">Opt Out</option>
          </select>
        </div>

        <div>
          <p className="text-gray-400 mb-1">Notes</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-[#111118] text-white p-2 rounded-lg"
            rows={3}
          />
        </div>

        <button
          onClick={handleLogContact}
          disabled={loading}
          className="gx-btn-primary px-4 py-2 rounded-lg"
        >
          {loading ? "Logging..." : "Log Contact"}
        </button>

        {message && <p className="text-gray-400 mt-2">{message}</p>}
      </div>
    </div>
  );
}
