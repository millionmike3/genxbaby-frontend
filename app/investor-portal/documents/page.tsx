import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function InvestorDocumentsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  // Fetch investor documents (K-1s, statements, reports, agreements, etc.)
  const docs = await prisma.investorDocument.findMany({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Document Center</h1>
        <p className="text-slate-300 text-lg">
          Access your K‑1s, statements, reports, and agreements in one place.
        </p>
      </div>

      {/* Empty state */}
      {docs.length === 0 && (
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-300">
            No documents are available yet. Your tax forms and statements will
            appear here once generated.
          </p>
        </div>
      )}

      {/* Documents list */}
      {docs.length > 0 && (
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {doc.title ?? doc.type ?? "Document"}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  {doc.type && <span className="mr-2">{doc.type}</span>}
                  {doc.period && <span>• Period: {doc.period}</span>}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Uploaded: {doc.createdAt.toDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {doc.fileUrl && (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-700 text-slate-100 text-sm font-medium hover:bg-slate-600 transition"
                  >
                    View
                  </a>
                )}
                {doc.downloadUrl && (
                  <a
                    href={doc.downloadUrl}
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-600 text-slate-100 text-sm font-medium hover:bg-slate-700 transition"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
