"use client";

import { useEffect, useState } from "react";

export default function InvestorApplicationPage({ params }) {
  const { applicationId } = params;

  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState(null);
  const [uw, setUw] = useState(null);
  const [fraud, setFraud] = useState(null);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        // Fetch application details
        const appRes = await fetch(`/api/investor/application/${applicationId}`);
        const appData = await appRes.json();
        setApp(appData.data);

        // Fetch underwriting case
        const uwRes = await fetch(`/api/investor/application/${applicationId}/underwriting`);
        const uwData = await uwRes.json();
        setUw(uwData.data);

        // Fetch fraud signals
        const fraudRes = await fetch(`/api/investor/application/${applicationId}/fraud`);
        const fraudData = await fraudRes.json();
        setFraud(fraudData.data);

        // Fetch documents
        const docRes = await fetch(`/api/investor/application/${applicationId}/documents`);
        const docData = await docRes.json();
        setDocs(docData.data || []);
      } catch (err) {
        console.error("Investor Portal Load Error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading investor application…
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Application not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold">Investor Application Overview</h1>

      {/* APPLICATION SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Application Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Borrower</div>
            <div className="text-lg font-bold">{app.borrowerName}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Property</div>
            <div className="text-lg font-bold">{app.propertyAddress}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Loan Amount</div>
            <div className="text-lg font-bold">${app.loanAmount}</div>
          </div>
        </div>
      </div>

      {/* UNDERWRITING */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Underwriting Snapshot</h2>

        {uw ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">DTI</div>
              <div className="text-lg font-bold">{(uw.dti * 100).toFixed(2)}%</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">LTV</div>
              <div className="text-lg font-bold">{(uw.ltv * 100).toFixed(2)}%</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Risk Score</div>
              <div className="text-lg font-bold">{uw.riskScore}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Investor Decision</div>
              <div className="text-lg font-bold text-blue-600">{uw.investorDecision}</div>
            </div>
          </div>
        ) : (
          <p>No underwriting case found.</p>
        )}
      </div>

      {/* FRAUD */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Fraud Signals</h2>

        {fraud ? (
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-lg font-bold">{fraud.score}</div>

            <div className="text-sm text-gray-500">Factors</div>
            <pre className="bg-gray-50 p-4 rounded-lg text-sm">
              {JSON.stringify(fraud.factors, null, 2)}
            </pre>
          </div>
        ) : (
          <p>No fraud signals found.</p>
        )}
      </div>

      {/* DOCUMENTS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Type</th>
              <th className="py-2">URL</th>
              <th className="py-2">Fraud Score</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((d, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">{d.type}</td>
                <td className="py-2">
                  <a href={d.url} className="text-blue-600 underline" target="_blank">
                    View
                  </a>
                </td>
                <td className="py-2">{d.fraudScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
