"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const applicationId = params.get("applicationId");
  const uwId = params.get("uwId");

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!applicationId) return;

    async function fetchApp() {
      const res = await fetch(`/api/application/${applicationId}`);
      const data = await res.json();
      setApplication(data.application);
      setLoading(false);
    }

    fetchApp();
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading your application...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-2">Application Submitted</h1>
          <p className="text-slate-400">
            Thank you, your mortgage application has been successfully submitted.
          </p>
        </section>

        {/* IDs */}
        <section className="border border-slate-800 rounded p-6 space-y-2">
          <h2 className="text-xl font-semibold">Submission Details</h2>
          <p><strong>Application ID:</strong> {applicationId}</p>
          <p><strong>Underwriting Case ID:</strong> {uwId}</p>
        </section>

        {/* Timeline */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Timeline</h2>

          <ul className="space-y-2 text-slate-300">
            <li>✓ Application Submitted</li>
            <li>✓ Borrower Profile Created</li>
            <li>✓ Employment, Income, Assets & Liabilities Recorded</li>
            <li>✓ Property Details Captured</li>
            <li>✓ Underwriting Case Opened</li>
            <li>⏳ Awaiting Underwriter Review</li>
          </ul>
        </section>

        {/* Next Steps */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Next Steps</h2>

          <ul className="space-y-2 text-slate-300">
            <li>• Upload required documents</li>
            <li>• Watch for underwriting updates</li>
            <li>• Respond to any requests from your loan officer</li>
          </ul>
        </section>

        {/* Button */}
        <section className="text-center">
          <button
            onClick={() => router.push(`/borrower-app/application/${applicationId}/review`)}
            className="px-6 py-3 bg-blue-600 rounded text-white font-semibold"
          >
            View Application
          </button>
        </section>

      </div>
    </main>
  );
}
