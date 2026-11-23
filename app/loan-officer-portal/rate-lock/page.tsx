
import { requireRole } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function RateLockPage() {
  const session = await requireRole(["LOAN_OFFICER"]);
  const prisma = getPrisma();

  const rateLocks = await prisma.rateLock.findMany({
    where: {
      application: {
        is: {
          loanOfficer: {
            is: {
              userId: session.userId,
            },
          },
        },
      },
    },
    include: {
      application: {
        select: {
          id: true,
          loanAmount: true,
          propertyAddress: true,
          propertyCity: true,
          propertyState: true,
          loanPurpose: true,
          noteRate: true,
        },
      },
    },
    orderBy: {
      locked_at: "desc",
    },
  });

  const now = new Date();

  const activeLocks = rateLocks.filter(
    (lock) => new Date(lock.expires_at) > now
  );

  const expiredLocks = rateLocks.filter(
    (lock) => new Date(lock.expires_at) <= now
  );

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
            Loan Operations
          </p>
          <h1 className="mt-2 text-3xl font-bold">Rate Lock Management</h1>
          <p className="mt-2 text-sm text-slate-400">
            Review rate locks associated with your assigned loan applications.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total Rate Locks</p>
            <p className="mt-2 text-3xl font-bold">{rateLocks.length}</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Active Locks</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {activeLocks.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Expired Locks</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {expiredLocks.length}
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="text-lg font-semibold">Rate Lock Records</h2>
            <p className="mt-1 text-sm text-slate-400">
              Rate lock history for your assigned applications.
            </p>
          </div>

          {rateLocks.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-lg font-semibold">No rate locks found</h3>
              <p className="mt-2 text-sm text-slate-400">
                Rate locks will appear here when they are associated with your
                assigned loan applications.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Application</th>
                    <th className="px-5 py-4">Property</th>
                    <th className="px-5 py-4">Loan Amount</th>
                    <th className="px-5 py-4">Locked Rate</th>
                    <th className="px-5 py-4">Locked At</th>
                    <th className="px-5 py-4">Expires</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {rateLocks.map((lock) => {
                    const expired = new Date(lock.expires_at) <= now;
                    const property = [
                      lock.application.propertyAddress,
                      lock.application.propertyCity,
                      lock.application.propertyState,
                    ]
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <tr key={lock.id} className="hover:bg-slate-800/50">
                        <td className="px-5 py-4 font-medium">
                          {lock.application.id}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {property || "Not provided"}
                        </td>

                        <td className="px-5 py-4">
                          {lock.application.loanAmount != null
                            ? `$${lock.application.loanAmount.toLocaleString()}`
                            : "—"}
                        </td>

                        <td className="px-5 py-4 font-semibold text-emerald-400">
                          {lock.locked_rate.toFixed(3)}%
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {new Date(lock.locked_at).toLocaleDateString()}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {new Date(lock.expires_at).toLocaleDateString()}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              expired
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            {expired ? "Expired" : "Active"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
