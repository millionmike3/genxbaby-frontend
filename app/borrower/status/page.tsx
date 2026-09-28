import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function BorrowerStatusPage() {
  // 1. Read JWT from cookie
  const cookieStore = await cookies();
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

  // 5. Fetch borrower + latest application
  const borrower = await prisma.borrower.findUnique({
    where: { userId: user.id },
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          underwriting: true,
          fraudEvents: true,
          documents: true,
        },
      },
    },
  });

  const app = borrower?.applications[0] ?? null;
  const uw = app?.underwriting ?? null;

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Loan Status</h1>

      {!app ? (
        <p className="text-slate-400">
          No active application found. Start your first application to see live
          underwriting and fraud intelligence.
        </p>
      ) : (
        <>
          {/* Current Status */}
          <section className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold mb-4">Current Status</h2>

            <ul className="space-y-3 text-slate-300">
              <li>
                <strong>Application Status:</strong> {app.status}
              </li>
              <li>
                <strong>Underwriting:</strong>{" "}
                {uw?.status ?? "Not started"}
              </li>
              <li>
                <strong>Behavior Score:</strong>{" "}
                {app.behaviorScore?.toFixed(2) ?? "—"}
              </li>
              <li>
                <strong>Fraud Score:</strong>{" "}
                {app.fraudScore?.toFixed(2) ?? "—"}
              </li>
              <li>
                <strong>Routing Score:</strong>{" "}
                {app.routingScore?.toFixed(2) ?? "—"}
              </li>
            </ul>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Timeline</h2>

            <div className="space-y-4 text-slate-300">
              <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700">
                <strong>Step 1:</strong> Application Submitted
              </div>
              <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700">
                <strong>Step 2:</strong> Documents Uploaded
              </div>
              <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700">
                <strong>Step 3:</strong> Underwriting Review
              </div>
              <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700">
                <strong>Step 4:</strong> Investor Decision
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
