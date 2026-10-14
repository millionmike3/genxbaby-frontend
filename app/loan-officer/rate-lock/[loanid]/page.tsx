"use server";

import { getPrisma } from "@/lib/db/prisma";

export default async function RateLockPage({ params }) {
  const prisma = await getPrisma();
  const loan = await prisma.loan.findUnique({ where: { id: params.loanId } });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Rate Lock</h1>

      <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-4">
        <p>Loan Amount: ${loan.loanAmount.toLocaleString()}</p>
        <p>Current Rate: {loan.currentRate.toFixed(3)}%</p>

        <form action={`/api/loan-officer/rate-lock/${loan.id}`} method="POST">
          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black rounded-lg">
            Lock Rate
          </button>
        </form>
      </section>
    </main>
  );
}
