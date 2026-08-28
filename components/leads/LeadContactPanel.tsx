"use client";

import { useState } from "react";

interface LeadContactPanelProps {
  leadId: string;
}

export default function LeadContactPanel({ leadId }: LeadContactPanelProps) {
  const [channel, setChannel] = useState<"phone" | "sms" | "email">("phone");
  const [outcome, setOutcome] = useState("connected");
  const [notes, setNotes] = useState("");

  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Lead Contact</h3>

      <div className="mb-4 text-sm text-gray-400">
        Lead ID: <span className="font-medium text-white">{leadId}</span>
      </div>

      {/* Contact Channel */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Channel</label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value as "phone" | "sms" | "email")}
          className="gx-input"
        >
          <option value="phone">Phone Call</option>
          <option value="sms">SMS</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Outcome */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Outcome</label>
        <select
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          className="gx-input"
        >
          <option value="connected">Connected</option>
          <option value="no-answer">No Answer</option>
          <option value="left-voicemail">Left Voicemail</option>
          <option value="wrong-number">Wrong Number</option>
        </select>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="gx-input h-24"
        />
      </div>

      <button className="gx-btn-primary w-full">Save Contact Attempt</button>
    </div>
  );
}
