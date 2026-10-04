"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerMessagesPage() {
  const { applicationId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  async function load() {
    const res = await fetch(`/api/messages/${applicationId}`);
    const data = await res.json();
    if (data.success) setMessages(data.messages);
  }

  async function sendMessage() {
    if (!text.trim()) return;

    await fetch(`/api/messages/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderRole: "BORROWER",
        message: text,
      }),
    });

    setText("");
    load();
  }

  useEffect(() => {
    load();

    const evtSource = new EventSource(`/api/messages/${applicationId}/events`);
    evtSource.onmessage = () => load();

    return () => evtSource.close();
  }, [applicationId]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Message Center</h1>
        <p className="text-slate-400">
          Chat with your Loan Officer and Underwriter.
        </p>

        {/* Messages */}
        <div className="border border-slate-800 rounded p-6 space-y-4 h-[400px] overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id}>
              <p className="text-xs text-slate-500">
                {msg.senderRole} • {new Date(msg.createdAt).toLocaleString()}
              </p>
              <p className="text-slate-300">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 rounded text-sm font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
