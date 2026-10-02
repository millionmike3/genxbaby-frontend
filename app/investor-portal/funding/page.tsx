"use client";

import { useState } from "react";

export default function InvestorFundingPage() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"CONTRIBUTION" | "WITHDRAWAL">(
    "CONTRIBUTION"
  );
  const [message, setMessage] = useState("");

  async function submitRequest() {
    if (!amount) return;

    const res = await fetch("/api/investor/funding", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        type,
      }),
    });

    if (res.ok) {
      setMessage("Your request has been submitted.");
      setAmount("");
    } else {
      setMessage("Something went wrong.");
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Funding & Withdrawals</h1>
        <p className="text-slate-300 text-lg">
          Add capital or request a distribution from your investment account.
        </p>
      </div>

      <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-6">
        <div className="space-y-2">
          <label className="text-slate-300 text-sm">Request Type</label>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "CONTRIBUTION" | "WITHDRAWAL")
            }
            className="bg-slate-700 text-slate-100 p-2 rounded-lg border border-slate-600"
          >
            <option value="CONTRIBUTION">Add Capital</option>
            <option value="WITHDRAWAL">Request Distribution</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-slate-300 text-sm">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-slate-700 text-slate-100 p-2 rounded-lg border border-slate-600 w-full"
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={submitRequest}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg"
        >
          Submit Request
        </button>

        {message && (
          <p className="text-slate-300 text-sm mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}
