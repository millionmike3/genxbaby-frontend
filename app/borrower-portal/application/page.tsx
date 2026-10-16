import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export default async function BorrowerApplicationPage() {
  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch application using unified session.user.id
  const application = await prisma.borrowerApplication.findFirst({
    where: { borrowerId: session.user.id },
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
