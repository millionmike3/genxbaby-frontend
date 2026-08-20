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

export const AnchoringDashboard: React.FC = () => {
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [selectedTx, setSelectedTx] = useState<string | null>(null);
  const [verification, setVerification] = useState<any>(null);

  useEffect(() => {
    fetch("/admin/underwriting/cases")
      .then(res => res.json())
      .then(setCases);
  }, []);

  const verify = async (txHash: string) => {
    setSelectedTx(txHash);
    const res = await fetch(`/blockchain/verify/${txHash}`);
    const data = await res.json();
    setVerification(data);
  };

  return (
    <div>
      <h2>Anchored Underwriting Cases</h2>
      <table>
        <thead>
          <tr>
            <th>Case</th>
            <th>Borrower</th>
            <th>Property</th>
            <th>Loan</th>
            <th>Decision</th>
            <th>Tx Hash</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.borrowerName}</td>
              <td>{c.propertyAddress}</td>
              <td>{c.loanAmount}</td>
              <td>{c.decision}</td>
              <td>{c.anchoredTxHash ?? "Pending"}</td>
              <td>
                {c.anchoredTxHash && (
                  <button onClick={() => verify(c.anchoredTxHash!)}>
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {verification && (
        <div style={{ marginTop: 20 }}>
          <h3>Verification for {selectedTx}</h3>
          <pre>{JSON.stringify(verification, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
