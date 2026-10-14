import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AffordabilityResultPage() {
  const prisma = await getPrisma();

  const userId = "REPLACE_WITH_AUTH_USER_ID";

  const result = await prisma.affordabilityResult.findFirst({
    where: { borrowerId: userId },
    orderBy: { id: "desc" },
  });

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>No affordability result found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Affordability Result
        </h1>
      </header>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <p className="text-slate-300 text-sm">
          <strong>Max Loan Amount:</strong>{" "}
          ${result.maxLoanAmount.toLocaleString()}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Max Purchase Price:</strong>{" "}
          ${result.maxPurchasePrice.toLocaleString()}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Loan Type:</strong> {result.loanType}
        </p>
      </section>

      <Link
        href="/borrower"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
