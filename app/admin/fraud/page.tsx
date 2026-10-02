"use server";

import { Suspense } from "react";
import { getPrisma } from "@/lib/prisma";

//
// 1. Fraud Events (raw payloads, anchored hashes, scores)
//
async function getFraudEvents() {
  const prisma = await getPrisma();

  return prisma.fraudEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

//
// 2. Fraud Review Cases (admin review workflow)
//
async function getFraudReviews() {
  const prisma = await getPrisma();

  return prisma.fraudReview.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      investor: true,
      case: true,
    },
  });
}

export default async function AdminFraudPage() {
  const [events, reviews] = await Promise.all([
    getFraudEvents(),
    getFraudReviews(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Fraud Intelligence Dashboard</h1>
        <p className="text-sm text-slate-400">
          Anchored fraud events, behavioral scores, risk signals, and admin review actions.
        </p>
      </div>

      {/* ========================= */}
      {/* SECTION 1 — FRAUD EVENTS  */}
      {/* ========================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Fraud Audit Viewer</h2>

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
      </section>

      {/* ============================= */}
      {/* SECTION 2 — FRAUD REVIEW FLOW */}
      {/* ============================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Fraud Review Cases</h2>

        <div className="space-y-4">
          {reviews.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
            >
              <h3 className="text-xl font-semibold">{c.investor?.name ?? "Investor"}</h3>

              <p className="text-slate-300">
                Case: {c.case?.id ?? "Unknown Case"}
              </p>

              <p className="text-slate-300">
                Risk Score: {c.riskScore}
              </p>

              <p className="text-slate-400 text-sm">
                Status: {c.status}
              </p>

              {c.status === "OPEN" && (
                <div className="flex gap-3 mt-4">
                  {/* MARK REVIEWED */}
                  <form action="/api/admin/fraud/review" method="POST">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm font-semibold">
                      Mark Reviewed
                    </button>
                  </form>

                  {/* ESCALATE */}
                  <form action="/api/admin/fraud/escalate" method="POST">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold">
                      Escalate
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
