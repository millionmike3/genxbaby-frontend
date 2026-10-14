
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerRateLockPage() {
  const prisma = await getPrisma();

  const borrowerId = "CURRENT_BORROWER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    include: { loan: true },
  });

  const loan = borrower.loan;

  const isLocked = loan.rateLocked;
  const lockExpiresAt = loan.lockExpiresAt;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Your Rate Lock
      </h1>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <p className="text-sm text-slate-300">
          This page confirms whether your interest rate is locked and when that lock expires.
        </p>

        {isLocked ? (
          <>
            <p className="text-lg font-semibold">
              Your rate is locked at {loan.finalRate.toFixed(3)}%.
            </p>
            <p className="text-sm text-slate-300">
              Lock expiration:{" "}
              {new Date(lockExpiresAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-slate-400 mt-3 whitespace-pre-line">
              Once your lock expires, your rate may change based on market conditions.
              Completing remaining steps before expiration helps keep your current rate.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-yellow-300">
              Your rate is not currently locked.
            </p>
            <p className="text-xs text-slate-400 mt-3 whitespace-pre-line">
              Your rate can move with the market until it is locked.
              If you’d like to lock your rate, contact your Loan Officer and they can walk you through the options.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
