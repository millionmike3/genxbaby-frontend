"use client";

import { useState } from "react";
import {
  actionPriceMortgage,
  actionFraudScan,
  actionUnderwrite,
  actionAddCondition,
  actionClearCondition,
  actionMarkCTC,
  actionFund,
} from "./actions";

export default function ClientView({ loan }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function run(action: Function, ...args: any[]) {
    setLoading(true);
    const result = await action(...args);
    setMessage(JSON.stringify(result, null, 2));
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white px-10 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Loan #{loan.id} — {loan.borrower.fullName}
      </h1>

      {/* ACTION BUTTONS */}
      <section className="space-y-4">
        <button onClick={() => run(actionPriceMortgage, loan.id)} className="btn-primary">
          Run Pricing Engine
        </button>

        <button onClick={() => run(actionFraudScan, loan.id)} className="btn-primary">
          Run Fraud Scan
        </button>

        <button onClick={() => run(actionUnderwrite, loan.id)} className="btn-primary">
          Run Underwriting Engine
        </button>

        <button onClick={() => run(actionAddCondition, loan.id, "New condition")} className="btn-primary">
          Add Condition
        </button>

        <button onClick={() => run(actionMarkCTC, loan.id)} className="btn-primary">
          Mark Clear To Close
        </button>

        <button onClick={() => run(actionFund, loan.id)} className="btn-primary">
          Fund Loan
        </button>
      </section>

      {/* CONDITIONS */}
      <section className="bg-neutral-800/40 p-6 rounded-xl border border-neutral-700">
        <h2 className="text-xl font-semibold mb-3">Conditions</h2>
        <ul className="space-y-2">
          {loan.conditions.map((c) => (
            <li key={c.id} className="flex justify-between">
              <span>{c.text} — {c.status}</span>
              <button
                onClick={() => run(actionClearCondition, c.id)}
                className="text-[#3CF46B]"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* OUTPUT */}
      {message && (
        <pre className="bg-black/40 p-4 rounded-lg text-sm overflow-auto">
          {message}
        </pre>
      )}
    </main>
  );
}
