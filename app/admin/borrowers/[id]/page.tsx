"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BorrowerCRM({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [borrower, setBorrower] = useState<any>(null);
  const [behavior, setBehavior] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const resBorrower = await fetch(`/api/admin/borrowers/${id}`);
        const resBehavior = await fetch(`/api/admin/behavior/${id}`);

        const borrowerData = await resBorrower.json();
        const behaviorData = await resBehavior.json();

        setBorrower(borrowerData || null);
        setBehavior(behaviorData || null);
      } catch (err) {
        console.error("Borrower CRM error:", err);
      }
    }

    load();
  }, [id]);

  if (!borrower) {
    return (
      <div className="min-h-screen p-10 text-xl">
        Loading borrower…
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100 dark:bg-[#0f0f0f] text-black dark:text-white space-y-10">
      {/* Back Link */}
      <Link
        href="/admin/borrowers"
        className="text-blue-500 dark:text-blue-400 underline"
      >
        ← Back to Borrowers
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold">
        Borrower CRM — {borrower.email || borrower.name || "Unknown"}
      </h1>

      {/* Borrower Summary */}
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow space-y-3">
        <h2 className="text-xl font-semibold">Borrower Overview</h2>

        <p><strong>Name:</strong> {borrower.name}</p>
        <p><strong>Email:</strong> {borrower.email}</p>
        <p><strong>Phone:</strong> {borrower.phone}</p>
        <p><strong>Status:</strong> {borrower.status}</p>

        <p><strong>Created:</strong> {new Date(borrower.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(borrower.updatedAt).toLocaleString()}</p>
      </div>

      {/* Behavior Summary */}
      {behavior && (
        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow space-y-3">
          <h2 className="text-xl font-semibold">Behavior Profile</h2>

          <p><strong>Pillar:</strong> {behavior.profile?.pillar}</p>
          <p><strong>Sessions:</strong> {behavior.profile?.sessionsCount}</p>

          <p><strong>Avg IS:</strong> {behavior.profile?.avgImpulsivenessScore?.toFixed(1)}</p>
          <p><strong>Max IS:</strong> {behavior.profile?.maxImpulsivenessScore?.toFixed(1)}</p>

          <p>
            <strong>Level:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                behavior.profile?.impulsivenessLevel === "stable"
                  ? "bg-green-600 text-white"
                  : behavior.profile?.impulsivenessLevel === "reactive"
                  ? "bg-yellow-500 text-black"
                  : behavior.profile?.impulsivenessLevel === "impulsive"
                  ? "bg-orange-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {behavior.profile?.impulsivenessLevel?.toUpperCase()}
            </span>
          </p>
        </div>
      )}

      {/* Behavior Sessions */}
      {behavior?.sessions && (
        <>
          <h2 className="text-xl font-semibold">Behavior Sessions</h2>

          <div className="space-y-6">
            {behavior.sessions.map((s: any, idx: number) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow space-y-2"
              >
                <h3 className="text-lg font-semibold">
                  {s.page} —{" "}
                  <span className="font-bold">
                    IS {s.impulsivenessScore.toFixed(1)}
                  </span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Clicks:</strong> {s.clickCount}</p>
                  <p><strong>Burst Index:</strong> {s.burstIndex}</p>

                  <p><strong>Rage Score:</strong> {s.rageClickScore.toFixed(2)}</p>
                  <p><strong>Volatility:</strong> {s.sessionVolatility.toFixed(2)}</p>

                  <p><strong>Form Fill Time:</strong> {s.formFillTimeMs} ms</p>
                  <p><strong>Abandoned Forms:</strong> {s.abandonedFormsCount}</p>

                  <p><strong>Avg Time on Page:</strong> {s.avgTimeOnPageMs} ms</p>
                  <p><strong>Pillar:</strong> {s.pillar}</p>
                </div>

                <p>
                  <strong>Started:</strong>{" "}
                  {new Date(s.startedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Ended:</strong>{" "}
                  {new Date(s.endedAt).toLocaleString()}
                </p>

                <div
                  className={`mt-4 p-3 rounded-lg text-white ${
                    s.impulsivenessScore >= 80
                      ? "bg-red-600"
                      : s.impulsivenessScore >= 60
                      ? "bg-orange-600"
                      : s.impulsivenessScore >= 40
                      ? "bg-yellow-600 text-black"
                      : "bg-green-600"
                  }`}
                >
                  Impulsiveness Score: {s.impulsivenessScore.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
