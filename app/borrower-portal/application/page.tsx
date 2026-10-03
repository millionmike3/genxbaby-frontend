"use server";

import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getPrisma } from "@/lib/db/prisma";

export default async function BorrowerApplicationPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  const application = await prisma.borrowerApplication.findFirst({
    where: { borrowerId: Number(session.userId) },
  });

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Loan Application</h1>

      {!application ? (
        <p className="text-slate-400">No application found.</p>
      ) : (
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-4">
          <p>
            <strong>Loan Amount:</strong>{" "}
            ${application.loanAmount.toLocaleString()}
          </p>
          <p>
            <strong>Purpose:</strong> {application.purpose}
          </p>
          <p>
            <strong>Status:</strong> {application.status}
          </p>
        </div>
      )}
    </div>
  );
}
