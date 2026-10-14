"use server";

import { getPrisma } from "@/lib/db/prisma";

export default async function PricingSummaryPage({ params }) {
  const prisma = await getPrisma();
  const loan = await prisma.loan.findUnique({ where: { id: params.loanId } });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Pricing Summary</h1>

      <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-4">
        <p>Base Rate: {loan.baseRate.toFixed(3)}%</p>
        <p>LLPA: {loan.llpaBps} bps</p>
        <p>Overlays: {loan.overlayBps} bps</p>
        <p>Margins: {loan.marginBps} bps</p>
        <p>Delivery: {loan.deliveryBps} bps</p>
        <p>Exceptions: {loan.exceptionBps} bps</p>

        <h2 className="text-xl font-bold text-white">
          Final Rate: {loan.finalRate.toFixed(3)}%
        </h2>
      </section>
    </main>
  );
}
