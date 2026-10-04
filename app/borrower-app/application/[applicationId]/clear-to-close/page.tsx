"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerClearToClosePage() {
  const { applicationId } = useParams();
  const [milestone, setMilestone] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}`);
    const data = await res.json();
    if (data.success) setMilestone(data.application.milestone);
    setLoading(false);
  }

  useEffect(() => {
    load();

    const evtSource = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    evtSource.onmessage = () => load();

    return () => evtSource.close();
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const isCTC = milestone === "Clear to Close";

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10 text-center">

        <h1 className="text-4xl font-bold">
          {isCTC ? "🎉 Clear to Close!" : "Your Application Status"}
        </h1>

        <p className="text-slate-400 text-lg">
          {isCTC
            ? "Congratulations! Your mortgage application has been fully approved."
            : `Current milestone: ${milestone}`}
        </p>

        {isCTC && (
          <div className="border border-slate-800 rounded p-6 space-y-4">
            <h2 className="text-xl font-semibold">What Happens Next?</h2>

            <ul className="space-y-2 text-slate-300 text-left">
              <li>• Your closing package will be prepared.</li>
              <li>• A closing date will be scheduled.</li>
              <li>• You will receive instructions for final signatures.</li>
            </ul>

            <p className="text-green-400 font-semibold mt-4">
              You're almost home!
            </p>
          </div>
        )}

        <a
          href={`/borrower-app/application/${applicationId}/summary`}
          className="px-6 py-3 bg-green-600 rounded text-sm font-semibold inline-block"
        >
          View Application Summary
        </a>
      </div>
    </main>
  );
}
