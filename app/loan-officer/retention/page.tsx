
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function LoanOfficerRetentionPage() {
  const prisma = await getPrisma();

  const clients = await prisma.borrowerRetentionAnalytics.findMany({
    include: {
      borrower: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      retentionScore: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Client Retention Intelligence
      </h1>

      <p className="text-slate-300 text-sm">
        Review borrower retention scores and available analytics signals
        to identify relationships that may need attention.
      </p>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        {clients.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No borrower retention analytics records are available yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left py-2">Borrower</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Phone</th>
                  <th className="text-left py-2">Retention Score</th>
                  <th className="text-left py-2">Analytics Signals</th>
                  <th className="text-left py-2">Last Updated</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((record) => {
                  const borrower = record.borrower;
                  const score = record.retentionScore;

                  const borrowerName = borrower
                    ? borrower.fullName ||
                      `${borrower.firstName} ${borrower.lastName}`
                    : "Unassigned borrower";

                  const signalCount = Array.isArray(record.signals)
                    ? record.signals.length
                    : record.signals
                      ? 1
                      : 0;

                  return (
                    <tr
                      key={record.id}
                      className="border-t border-neutral-800"
                    >
                      <td className="py-3">{borrowerName}</td>
                      <td className="py-3">
                        {borrower?.email || "—"}
                      </td>
                      <td className="py-3">
                        {borrower?.phone || "—"}
                      </td>
                      <td className="py-3">
                        <span
                          className={
                            score == null
                              ? "text-slate-400"
                              : score >= 80
                                ? "text-green-400"
                                : score >= 50
                                  ? "text-yellow-300"
                                  : "text-red-400"
                          }
                        >
                          {score == null ? "Not scored" : score.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3">{signalCount}</td>
                      <td className="py-3 text-slate-300">
                        {new Date(record.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
