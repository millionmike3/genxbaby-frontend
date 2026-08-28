"use client";

import { useState } from "react";

interface ChecksClientProps {
  profiles: any[];
}

interface CheckResult {
  error?: string;
  [key: string]: any;
}

export default function ChecksClient({ profiles }: ChecksClientProps) {
  const [bankId, setBankId] = useState("");
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  async function generateCheck() {
    try {
      const res = await fetch("/api/checks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankId: Number(bankId),
          payee,
          amount: Number(amount),
          memo,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error generating check:", err);
      setResult({ error: "Failed to generate check" });
    }
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Certified Checks</h1>

      {/* Bank Profiles List */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Available Bank Profiles</h2>

        {profiles.length === 0 && (
          <div className="text-gray-500 text-sm">No bank profiles found.</div>
        )}

        <ul className="space-y-2">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="p-4 border rounded-lg bg-[#111] text-gray-200 space-y-1"
            >
              <div className="font-semibold">{p.bankName}</div>
              <div className="text-sm">Routing: {p.routingNumber}</div>
              <div className="text-sm">Account: {p.accountNumber}</div>
              <div className="text-sm">Next Check #: {p.nextCheckNumber}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Check Generator */}
      <div className="space-y-4 p-6 border rounded-lg bg-[#111]">
        <select
          className="w-full p-2 rounded bg-[#222] text-gray-200"
          value={bankId}
          onChange={(e) => setBankId(e.target.value)}
        >
          <option value="">Select Bank Profile</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.bankName} ({p.accountNumber})
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 rounded bg-[#222] text-gray-200"
          placeholder="Payee"
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#222] text-gray-200"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#222] text-gray-200"
          placeholder="Memo (optional)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <button
          onClick={generateCheck}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          Generate Check
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="p-4 border rounded bg-[#111] text-gray-200">
          <h2 className="text-xl font-semibold mb-2">Check Created</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
