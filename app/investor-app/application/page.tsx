"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  borrowerName: string;
  amount: number;
  status: string;
  riskScore: number;
  fraudScore: number;
};

export default function InvestorApplicationPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);

  useEffect(() => {
    // TODO: replace with real API: /api/investor/applications
    (async () => {
      const mock: Application[] = [
        {
          id: "APP-001",
          borrowerName: "Jane Doe",
          amount: 350000,
          status: "Pending",
          riskScore: 0.42,
          fraudScore: 0.12,
        },
      ];
      setApplications(mock);
      setSelected(mock[0]);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Investor Application Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline / Application List */}
        <section className="lg:col-span-1 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Pipeline</h2>
          <ul className="space-y-3">
            {applications.map((app) => (
              <li
                key={app.id}
                className={`p-3 rounded-lg cursor-pointer border ${
                  selected?.id === app.id
                    ? "border-[#3CF46B] bg-neutral-800"
                    : "border-neutral-700 bg-neutral-900"
                }`}
                onClick={() => setSelected(app)}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{app.borrowerName}</span>
                  <span className="text-sm text-neutral-400">{app.status}</span>
                </div>
                <div className="text-sm text-neutral-400">
                  ${app.amount.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Application Detail + Fraud / Behavior / Persona */}
        <section className="lg:col-span-2 space-y-6">
          {/* Application Detail */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Application Detail</h2>
            {selected ? (
              <div className="space-y-2 text-sm text-neutral-300">
                <p>
                  <span className="font-semibold">ID:</span> {selected.id}
                </p>
                <p>
                  <span className="font-semibold">Borrower:</span>{" "}
                  {selected.borrowerName}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> $
                  {selected.amount.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selected.status}
                </p>
              </div>
            ) : (
              <p className="text-neutral-500">
                Select an application from the pipeline.
              </p>
            )}
          </div>

          {/* Fraud Scoring / Behavior Analytics / Persona Clustering */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Fraud Scoring</h3>
              <p className="text-neutral-400 text-sm">
                Fraud score, anomaly detection, and velocity checks will render
                here.
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Behavior Analytics</h3>
              <p className="text-neutral-400 text-sm">
                Session behavior, pricing interactions, and impulsiveness metrics
                will appear here.
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Persona Clustering</h3>
              <p className="text-neutral-400 text-sm">
                Borrower personas, cluster assignments, and risk tiers will load
                here.
              </p>
            </div>
          </div>

          {/* Audit Logging */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Audit Log</h2>
            <p className="text-neutral-400 text-sm">
              All investor actions on this application (views, notes, decisions)
              will be logged and displayed here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
