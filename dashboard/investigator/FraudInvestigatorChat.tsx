"use client";

import { useState } from "react";

interface FraudInvestigatorChatProps {
  apiUrl: string;
}

interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export default function FraudInvestigatorChat({ apiUrl }: FraudInvestigatorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const res = await fetch(`${apiUrl}/fraud/investigator/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      const reply: ChatMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error("Chat request failed:", err);
      const errorMsg: ChatMessage = { role: "system", content: "Error contacting fraud investigator service." };
      setMessages((prev) => [...prev, errorMsg]);
    }
  }

  return (
    <div className="gx-card p-6 space-y-4">
      <h2 className="text-lg font-bold">Fraud Investigator Chat</h2>

      <div className="border rounded p-4 h-64 overflow-y-auto bg-gray-50">
        {messages.map((m, idx) => (
          <div key={idx} className={`mb-2 ${m.role === "user" ? "text-blue-600" : m.role === "assistant" ? "text-green-600" : "text-red-600"}`}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="gx-btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  );
}
