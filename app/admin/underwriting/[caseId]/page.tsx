import { prisma } from "@/lib/prisma";

export default async function UnderwritingCaseDetailPage({ params }: { params: Promise<{ caseId: string }> }) {
  // Next.js 16: params is a Promise
  const { caseId } = await params;

  const c = await prisma.underwritingCase.findUnique({
    where: { id: caseId },
    include: {
      application: {
        include: {
          timelineEvents: true,
        },
      },
    },
  });

  if (!c) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Underwriting Case Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Underwriting Case {c.id}</h1>
      <p className="text-sm text-slate-400 mb-4">
        Application: {c.applicationId} · Status: {c.status} · Risk: {c.riskScore}
      </p>

      <h2 className="text-sm font-semibold mb-2">Application Timeline</h2>
      <div className="space-y-2 text-xs">
        {c.application.timelineEvents
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((e) => (
            <div key={e.id} className="border border-slate-800 rounded p-2">
              <div className="text-slate-400">
                {new Date(e.createdAt).toLocaleString()}
              </div>
              <div>{e.message}</div>
            </div>
          ))}
      </div>
    </main>
  );
}
