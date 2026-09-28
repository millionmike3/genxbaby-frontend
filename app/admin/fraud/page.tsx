"use server";

import { Suspense } from "react";
import { getPrisma } from "@/lib/prisma";

async function getFraudEvents() {
  const prisma = await getPrisma();

  return prisma.fraudEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export default async function AdminFraudPage() {
  const events = await getFraudEvents();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Fraud Audit Viewer</h1>
      <p className="text-sm text-slate-400 mb-6">
        Anchored events, fraud scores, risk scores, and raw payloads.
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-4">
          {events.map((e) => {
            const payload = e.payload ?? {};
            const scores = payload?.scores ?? {};

            return (
              <div
                key={e.id}
                className="border border-slate-800 rounded-lg p-4 text-sm"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="font-semibold">
                      User: {e.userId ?? "Unknown"} · Event:{" "}
                      {payload?.eventId ?? "N/A"}
                    </div>
                    <div className="text-slate-400">
                      {new Date(e.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div>Fraud: {scores.fraud ?? 0}</div>
                    <div>Risk: {scores.risk ?? 0}</div>
                    <div>Impulsiveness: {scores.impulsiveness ?? 0}</div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-xs text-slate-400 mb-1">
                    Anchor Tx Hash
                  </div>
                  <div className="font-mono text-xs break-all">
                    {e.anchorTxHash || "N/A"}
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="cursor-pointer text-xs text-slate-400">
                    Raw payload
                  </summary>
                  <pre className="mt-2 text-xs bg-slate-900 p-3 rounded">
                    {JSON.stringify(payload, null, 2)}
                  </pre>
                </details>
              </div>
            );
          })}
        </div>
      </Suspense>
    </main>
  );
}
