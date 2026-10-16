
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MortgageAdminPage() {
  await requireRole(["ADMIN"]);

  const mortgages = await prisma.MortgageAsset.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      borrower: true,
      
    },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white px-10 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">Mortgage Pipeline</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mortgages.map((loan) => (
          <Link
            key={loan.id}
            href={`/admin/mortgages/${loan.id}`}
            className="border border-neutral-700 bg-neutral-800/40 rounded-xl p-6 hover:border-[#3CF46B] transition"
          >
            <h2 className="text-xl font-semibold">
              {loan.borrower.fullName}
            </h2>

            <p className="text-sm text-neutral-400">
              {loan.property.address}
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <p>
                Status:{" "}
                <span className="text-[#3CF46B] font-bold">
                  {loan.status}
                </span>
              </p>

              <p>
                Loan Amount: $
                {loan.pricing?.loanAmount ?? loan.loanAmount ?? "—"}
              </p>

              <p>
                Pricing:{" "}
                {loan.pricing
                  ? `${loan.pricing.adjustedRate}%`
                  : "Not priced"}
              </p>

              <p>
                Fraud:{" "}
                {loan.fraud
                  ? `Score ${loan.fraud.riskScore}`
                  : "Not scanned"}
              </p>

              <p>
                UW:{" "}
                {loan.underwriting
                  ? loan.underwriting.decision
                  : "Not underwritten"}
              </p>

              <p>
                Conditions:{" "}
                {loan.conditions.length > 0
                  ? `${loan.conditions.length} open`
                  : "None"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
