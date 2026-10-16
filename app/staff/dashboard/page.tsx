import { auth, requireRole } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function StaffDashboard() {
  // 🔒 Enforce staff role
  await requireRole(["STAFF"]);

  // 🔐 Read verified session from auth_token (staff token)
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch staff record using unified session.user.id
  const staff = await prisma.staff.findUnique({
    where: { id: session.user.id },
    include: {
      tasks: true,
      loans: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Staff Dashboard
      </h1>

      <p className="text-slate-400 text-sm">
        Welcome back, {staff?.fullName}
      </p>

      <section className="space-y-4">
        {staff?.tasks.map((task) => (
          <div
            key={task.id}
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
          >
            <p className="text-slate-100 text-sm">
              <strong>Task:</strong> {task.title}
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Status:</strong> {task.status}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        {staff?.loans.map((loan) => (
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
          </div>
        ))}
      </section>
    </main>
  );
}
