import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function BorrowerDocsPage() {
  // 1. Read JWT from cookie
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  // 2. Validate session
  const session = await getSession(token);
  if (!session) {
    throw new Error("Not authenticated");
  }

  // 3. Enforce borrower role
  if (session.role !== "borrower") {
    throw new Error("Unauthorized: borrower role required");
  }

  // 4. Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 5. Fetch borrower + latest application + documents + AI layers
  const borrower = await prisma.borrower.findUnique({
    where: { userId: user.id },
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          documents: {
            include: {
              classifications: true,
              ocrExtractions: true,
              semanticScores: true,
              riskSignals: true,
            },
          },
        },
      },
    },
  });

  const app = borrower?.applications[0] ?? null;
  const docs = app?.documents ?? [];

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Documents</h1>

      {!app ? (
        <p className="text-slate-400">
          No application found. Start your first application to upload
          documents.
        </p>
      ) : (
        <>
          {/* Upload UI */}
          <section className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>

            <input
              type="file"
              className="block w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-slate-300"
            />

            <button className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
              Upload
            </button>
          </section>

          {/* Document List */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>

            {docs.length === 0 ? (
              <p className="text-slate-400">No documents uploaded yet.</p>
            ) : (
              <ul className="space-y-4">
                {docs.map((doc) => (
                  <li
                    key={doc.id}
                    className="bg-slate-800/40 p-4 rounded-lg border border-slate-700"
                  >
                    <p>
                      <strong>Type:</strong> {doc.type}
                    </p>
                    <p>
                      <strong>Fraud Score:</strong>{" "}
                      {doc.fraudScore?.toFixed(2) ?? "—"}
                    </p>
                    <p>
                      <strong>URL:</strong> {doc.url}
                    </p>

                    {/* AI Layers */}
                    <div className="mt-3 text-sm text-slate-400">
                      {doc.classifications.length > 0 && (
                        <p>
                          <strong>Classification:</strong>{" "}
                          {doc.classifications[0].category} (
                          {doc.classifications[0].confidence.toFixed(2)})
                        </p>
                      )}

                      {doc.ocrExtractions.length > 0 && (
                        <p>
                          <strong>OCR Fields:</strong>{" "}
                          {JSON.stringify(doc.ocrExtractions[0].fields)}
                        </p>
                      )}

                      {doc.semanticScores.length > 0 && (
                        <p>
                          <strong>Semantic Score:</strong>{" "}
                          {doc.semanticScores[0].score.toFixed(2)}
                        </p>
                      )}

                      {doc.riskSignals.length > 0 && (
                        <p>
                          <strong>Risk Signal:</strong>{" "}
                          {doc.riskSignals[0].signalType} (
                          {doc.riskSignals[0].strength.toFixed(2)})
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
