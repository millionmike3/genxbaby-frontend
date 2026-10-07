"use client";

import { useEffect, useState } from "react";

type UWApplication = {
  id: string;
  borrowerName: string;
  amount: number;
  status: string;
  fraudScore?: number;
  behaviorScore?: number;
  persona?: string;
};

export default function UnderwriterAppHome() {
  const [pipeline, setPipeline] = useState<UWApplication[]>([]);
  const [selected, setSelected] = useState<UWApplication | null>(null);

  useEffect(() => {
    // TODO: Replace with real API: /api/uw/applications
    (async () => {
      const mock: UWApplication[] = [
        {
          id: "UW-APP-001",
          borrowerName: "Marcus Hill",
          amount: 510000,
          status: "UW Review",
          fraudScore: 0.22,
          behaviorScore: 0.71,
          persona: "Strategist",
        },
        {
          id: "UW-APP-002",
          borrowerName: "Alicia Gomez",
          amount: 285000,
          status: "Conditions",
          fraudScore: 0.09,
          behaviorScore: 0.44,
          persona: "Planner",
        },
      ];
      setPipeline(mock);
      setSelected(mock[0]);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Underwriter Portal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline */}
        <section className="lg:col-span-1 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Pipeline</h2>
          <ul className="space-y-3">
            {pipeline.map((app) => (
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

        {/* Main Panels */}
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

          {/* Fraud / Behavior / Persona */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Fraud Score</h3>
              <p className="text-neutral-400 text-sm">
                {selected?.fraudScore ?? "N/A"}
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Behavior Score</h3>
              <p className="text-neutral-400 text-sm">
                {selected?.behaviorScore ?? "N/A"}
              </p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <h3 className="text-lg font-semibold mb-2">Persona</h3>
              <p className="text-neutral-400 text-sm">
                {selected?.persona ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Underwriting Intelligence */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">
              Underwriting Intelligence
            </h2>
            <p className="text-neutral-400 text-sm">
              Risk tiers, fraud clusters, persona clusters, and underwriting
              recommendations will appear here.
            </p>
          </div>

          {/* Conditions */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Conditions</h2>
            <p className="text-neutral-400 text-sm">
              UW conditions, pending items, and borrower requirements will load
              here.
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Milestones</h2>
            <p className="text-neutral-400 text-sm">
              Application milestones (submitted, LO review, UW review, cleared
              to close) will appear here.
            </p>
          </div>

          {/* Decisions */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Decision</h2>
            <p className="text-neutral-400 text-sm">
              Approve, deny, suspend, or request additional conditions.
            </p>
          </div>

          {/* Audit Log */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Audit Log</h2>
            <p className="text-neutral-400 text-sm">
              All UW actions on this application will be logged and displayed
              here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
