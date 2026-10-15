import { requireRole } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { computeMilestone } from "@/lib/pipeline"; // your utilities

export const dynamic = "force-dynamic";

export default async function PipelineDashboardPage() {
  await requireRole(["admin"]);
  const admin = await getCurrentUser();

  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Not authenticated</h1>
      </main>
    );
  }

  const apps = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      underwriting: true,
      pipelineOutput: true,
      loanServicingEvents: true,
      servicingEventScore: true,
      servicingRiskSignal: true,
      servicingRecord: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10 space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-[#3CF46B]">Pipeline Dashboard</h1>
        <p className="text-slate-300 mt-2">
          Real‑time underwriting & document pipeline intelligence.
        </p>
      </header>

      <section className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold">Applications</h2>

        <table className="w-full text-left">
          <thead className="text-slate-400 border-b border-neutral-700">
            <tr>
              <th className="py-2">ID</th>
              <th>Status</th>
              <th>Milestone</th>
              <th>Docs</th>
              <th>Underwriting</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((app) => {
              const pipeline = app.pipelineOutput;
              const milestone = pipeline
                ? computeMilestone(app, pipeline)
                : "—";

              const docs =
                pipeline?.docsRequired > 0
                  ? `${pipeline.docsSatisfied}/${pipeline.docsRequired} (${pipeline.docsPercent.toFixed(
                      0
                    )}%)`
                  : "—";

              return (
                <tr key={app.id} className="border-b border-neutral-800">
                  <td className="py-2">{app.id}</td>
                  <td>{app.status}</td>
                  <td className="text-[#3CF46B] font-semibold">{milestone}</td>
                  <td>{docs}</td>
                  <td>{app.underwriting?.status ?? "—"}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
