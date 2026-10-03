"use server";

import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getPrisma } from "@/lib/db/prisma";

export default async function BorrowerStatusPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  const application = await prisma.borrowerApplication.findFirst({
    where: { borrowerId: Number(session.userId) },
    include: {
      underwriting: true,
      funding: true,
    },
  });

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Loan Status</h1>

      {!application ? (
        <p className="text-slate-400">No active loan application found.</p>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-2">Application Status</h2>
            <p className="text-2xl font-bold">{application.status}</p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-2">Underwriting</h2>
            <p className="text-slate-300">
              {application.underwriting?.summary ?? "Pending"}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-2">Funding</h2>
            <p className="text-slate-300">
              {application.funding?.status ?? "Not started"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
