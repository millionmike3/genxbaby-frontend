"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const TIMELINE = [
  "Application Submitted",
  "In Processing",
  "In Underwriting",
  "Conditional Approval",
  "Docs In Progress",
  "Docs Complete",
  "Clear to Close",
];

export default function BorrowerTimelinePage() {
  const { applicationId } = useParams();
  const [milestone, setMilestone] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}`);
    const data = await res.json();

    if (data.success) {
      setMilestone(data.application.milestone);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();

    // Live updates via SSE
    const evtSource = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    evtSource.onmessage = () => load();

    return () => evtSource.close();
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading timeline...
      </div>
    );
  }

  const currentIndex = TIMELINE.indexOf(milestone);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Milestone Timeline</h1>
        <p className="text-slate-400">
          Track your progress through the mortgage process.
        </p>

        <div className="space-y-6">
          {TIMELINE.map((step, index) => {
            const completed = index <= currentIndex;

            return (
              <div
                key={step}
                className="flex items-center gap-4 border border-slate-800 rounded p-4"
              >
                <div
                  className={
                    completed
                      ? "w-4 h-4 bg-green-500 rounded-full"
                      : "w-4 h-4 bg-slate-700 rounded-full"
                  }
                />

                <p
                  className={
                    completed
                      ? "text-green-400 font-semibold"
                      : "text-slate-400"
                  }
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
