import { getPrisma } from "@/lib/db/prisma";
import { auth, requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function UnderwriterDashboard() {
  // 🔒 Enforce underwriter role
  try {
    await requireRole(["UNDERWRITER"]);
  } catch {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Unauthorized</h1>
      </main>
    );
  }

  // 🔐 Read verified session
  const session = await auth();
  if (!session?.user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Unauthorized</h1>
      </main>
    );
  }

  const prisma = await getPrisma();

  // ⭐ Underwriter ID comes from payload.id
  const underwriter = await prisma.underwriter.findUnique({
    where: { userId: Number(session.user.id) },
    include: {
      loans: true,
    },
  });

  if (!underwriter) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>No underwriter record found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Underwriter Dashboard
      </h1>

      <p className="text-slate-400 text-sm">
        Welcome back, {underwriter.fullName}
      </p>

      <section className="space-y-4">
        {underwriter.loans.map((loan) => (
          <div
            key={loan.id}
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <p className="text-slate-100 text-sm">
              <strong>Borrower:</strong> {loan.borrowerName}
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Status:</strong> {loan.status}
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Loan Amount:</strong> ${loan.loanAmount.toLocaleString()}
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Conditions:</strong> {loan.conditions || "None"}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
