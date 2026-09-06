"use client";

import React, { useEffect, useState } from "react";

type CaseSummary = {
  id: number;
  borrowerName: string;
  propertyAddress: string;
  loanAmount: number;
  decision: string;
  merkleRoot: string | null;
  anchoredTxHash: string | null;
};

export default function AnchoringDashboard() {
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [selectedTx, setSelectedTx] = useState<string | null>(null);
  const [verification, setVerification] = useState<any>(null);

  useEffect(() => {
    fetch("/admin/underwriting/cases")
      .then((res) => res.json())
      .then(setCases);
  }, []);

  const verify = async (txHash: string) => {
    setSelectedTx(txHash);
    const res = await fetch(`/blockchain/verify/${txHash}`);
    const data = await res.json();
    setVerification(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Anchored Underwriting Cases</h2>

      <table className="w-full text-left border border-slate-700 bg-slate-900 text-slate-200">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-2">Case</th>
            <th className="p-2">Borrower</th>
            <th className="p-2">Property</th>
            <th className="p-2">Loan</th>
            <th className="p-2">Decision</th>
            <th className="p-2">Tx Hash</th>
            <th className="p-2">Verify</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c) => (
            <tr key={c.id} className="border-t border-slate-700">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.borrowerName}</td>
              <td className="p-2">{c.propertyAddress}</td>
              <td className="p-2">${c.loanAmount.toLocaleString()}</td>
              <td className="p-2">{c.decision}</td>
              <td className="p-2">{c.anchoredTxHash ?? "Pending"}</td>
              <td className="p-2">
                {c.anchoredTxHash && (
                  <button
                    onClick={() => verify(c.anchoredTxHash!)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {verification && (
        <div className="mt-6 bg-slate-800 p-4 rounded border border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            Verification for {selectedTx}
          </h3>
          <pre className="text-slate-300 mt-2">
            {JSON.stringify(verification, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
