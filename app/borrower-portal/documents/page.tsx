"use server";

import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getPrisma } from "@/lib/db/prisma";

export default async function BorrowerDisbursementPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  const disbursement = await prisma.disbursement.findFirst({
    where: { borrowerId: Number(session.userId) },
  });

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Disbursement</h1>

      {!disbursement ? (
        <p className="text-slate-400">No disbursement scheduled.</p>
      ) : (
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <p className="text-xl font-semibold mb-2">Scheduled Date</p>
          <p className="text-3xl font-bold">
            {disbursement.date.toLocaleDateString()}
          </p>

          <p className="text-xl font-semibold mt-4 mb-2">Amount</p>
          <p className="text-3xl font-bold text-[#4EE38A]">
            ${disbursement.amount.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
