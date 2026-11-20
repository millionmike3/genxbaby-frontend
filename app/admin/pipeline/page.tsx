import "@/app/globals.css";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { computeMilestone } from "@/lib/pipeline";

const SECRET = process.env.JWT_SECRET!;

export const dynamic = "force-dynamic";

export default async function PipelineDashboardPage() {
  // ----------------------------------------------------
  // 1. Read unified auth cookie
  // ----------------------------------------------------
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Not authenticated</h1>
      </main>
    );
  }

  // ----------------------------------------------------
  // 2. Verify JWT using JOSE
  // ----------------------------------------------------
  let payload: any;
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    payload = verified.payload;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Invalid or expired token</h1>
      </main>
    );
  }

  // ----------------------------------------------------
  // 3. Enforce ADMIN role (uppercase enum)
  // ----------------------------------------------------
  if (payload.role !== "ADMIN") {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Forbidden</h1>
      </main>
    );
  }

  // ----------------------------------------------------
  // 4. Fetch pipeline applications
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // 5. Render dashboard
  // ----------------------------------------------------
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
