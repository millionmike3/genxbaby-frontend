import { getPrisma } from "@/lib/db/prisma";
import { auth, requireRole } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function LoanOfficerDashboard() {
  // 🔒 Enforce loan officer role
  try {
    await requireRole(["LOAN_OFFICER"]);
  } catch {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Unauthorized: Loan Officer access required</h1>
      </main>
    );
  }

  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Unauthorized: Invalid session</h1>
      </main>
    );
  }

  const prisma = await getPrisma();

  // Fetch loan officer using unified session.user.id
  const officer = await prisma.loanOfficer.findUnique({
    where: { id: session.user.id },
    include: {
      loans: true,
    },
  });

  if (!officer) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Officer not found</h1>
      </main>
    );
  }

  return (
    <DashboardClient
      initialOfficer={{
        id: officer.id,
        fullName: officer.fullName,
        email: officer.email,
        loans: officer.loans,
      }}
    />
  );
}
