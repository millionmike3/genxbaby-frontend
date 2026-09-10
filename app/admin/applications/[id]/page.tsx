import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Prisma } from "@prisma/client";

type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    borrower: true;
    documents: true;
    disclosures: true;
    underwriting: true;
    timeline: {
      orderBy: { createdAt: "desc" };
    };
  };
}>;

async function getApplication(id: string): Promise<ApplicationWithRelations | null> {
  return prisma.application.findUnique({
    where: { id },
    include: {
      borrower: true,
      documents: true,
      disclosures: true,
      underwriting: true,
      timeline: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const app = await getApplication(params.id);

  if (!app) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
      </main>
    );
  }

  const uw = app.underwriting;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <section>
        <h1 className="text-3xl font-bold mb-2">Application {app.id}</h1>
        <p className="text-slate-400 text-sm">
          Borrower: {app.borrower.fullName} — {app.borrower.email}
        </p>
      </section>

      {/* ACTIONS */}
      <section className="flex gap-3">
        <form action="/api/underwriting/run" method="post">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-slate-700 text-white text-sm font-semibold"
          >
            Run Auto‑UW
          </button>
        </form>

        <form action="/api/investor/pricing/run" method="post">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold"
          >
            Run Pricing
          </button>
        </form>

        <form action="/api/disclosures/generate" method="post">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-black text-sm font-semibold"
          >
            Generate Disclosures
          </button>
        </form>
      </section>

      {/* UNDERWRITING SUMMARY */}
      <section>
        <h2 className="text-xl font-bold mb-3">Underwriting Summary</h2>

        {uw ? (
          <div className="border border-slate-800 rounded p-4 space-y-2 text-sm">
            <div>DTI: {uw.dti != null ? uw.dti.toFixed(2) : "N/A"}%</div>
            <div>LTV: {uw.ltv != null ? uw.ltv.toFixed(2) : "N/A"}%</div>
            <div>CLTV: {uw.cltv != null ? uw.cltv.toFixed(2) : "N/A"}%</div>
            <div>
              Reserves:{" "}
              {uw.reservesMonths != null
                ? uw.reservesMonths.toFixed(1)
                : "N/A"}{" "}
              months
            </div>

            <div>Risk Score: {uw.riskScore ?? "N/A"}</div>
            <div>Fraud Score: {uw.fraudScore ?? "N/A"}</div>
            <div>Status: {uw.status ?? "N/A"}</div>

            {uw.investorDecision && (
              <>
                <div>Investor Decision: {uw.investorDecision}</div>
                <div>LLPA: {uw.llpa != null ? uw.llpa.toFixed(3) : "N/A"}</div>
                <div>
                  Final Rate:{" "}
                  {uw.finalRate != null ? uw.finalRate.toFixed(3) : "N/A"}%
                </div>
              </>
            )}

            {uw.reasons && uw.reasons.length > 0 && (
              <div className="pt-2">
                <div className="font-semibold">Reasons:</div>
                <ul className="list-disc ml-6 text-slate-400">
                  {uw.reasons.map((reason: string, index: number) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No underwriting case yet.</p>
        )}
      </section>

      {/* DOCUMENTS */}
      <section>
        <h2 className="text-xl font-bold mb-3">Documents</h2>

        <div className="space-y-3">
          {app.documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-slate-800 rounded p-3 flex justify-between items-center text-sm"
            >
              <div>
                <div className="font-semibold">{doc.type}</div>
                <div className="text-slate-400 text-xs">
                  {new Date(doc.createdAt).toLocaleString()}
                </div>

                {doc.fraudSignals && doc.fraudSignals.length > 0 && (
                  <ul className="list-disc ml-4 text-red-400 text-xs mt-1">
                    {doc.fraudSignals.map((signal: string, index: number) => (
                      <li key={index}>{signal}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-2">
                <a
                  href={doc.url}
                  target="_blank"
                  className="px-3 py-1 rounded bg-slate-700 text-white text-xs font-semibold"
                >
                  View
                </a>

                <form action="/api/fraud/documents/run" method="post">
                  <input type="hidden" name="documentId" value={doc.id} />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold"
                  >
                    Fraud Scan
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLOSURES */}
      <section>
        <h2 className="text-xl font-bold mb-3">Disclosures</h2>

        <div className="space-y-3">
          {app.disclosures.map((disclosure) => (
            <div
              key={disclosure.id}
              className="border border-slate-800 rounded p-3 flex justify-between items-center text-sm"
            >
              <div>
                <div className="font-semibold">
                  {disclosure.type === "initial"
                    ? "Initial Disclosures"
                    : disclosure.type}
                </div>
                <div className="text-slate-400 text-xs">
                  {new Date(disclosure.createdAt).toLocaleString()}
                </div>
              </div>

              <a
                href={disclosure.url ?? undefined}
                target="_blank"
                className="px-3 py-1 rounded bg-[#4EE38A] text-black text-xs font-semibold"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section>
        <h2 className="text-xl font-bold mb-3">Timeline</h2>

        <div className="space-y-3">
          {app.timeline.map((event) => (
            <div
              key={event.id}
              className="border border-slate-800 rounded p-3 text-sm"
            >
              <div className="font-semibold">{event.type ?? "Event"}</div>
              <div className="text-slate-400">{event.message ?? ""}</div>
              <div className="text-slate-500 text-xs">
                {new Date(event.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
