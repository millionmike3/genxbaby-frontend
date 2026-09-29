"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveLiabilities } from "./actions";

export default function LiabilitiesPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveLiabilities(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/property`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Liabilities & Monthly Debts (1003)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Enter your recurring monthly debt obligations. These help determine your debt‑to‑income ratio.
      </p>

      <form action={onSubmit} className="space-y-6">
        {/* Credit Cards */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Credit Card Payments (Monthly)
          </label>
          <input
            type="number"
            name="creditCardPayments"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Auto Loans */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Auto Loan Payments (Monthly)
          </label>
          <input
            type="number"
            name="autoLoanPayments"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Student Loans */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Student Loan Payments (Monthly)
          </label>
          <input
            type="number"
            name="studentLoanPayments"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Personal Loans */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Personal Loan Payments (Monthly)
          </label>
          <input
            type="number"
            name="personalLoanPayments"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Collections */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Collections Payments (Monthly)
          </label>
          <input
            type="number"
            name="collectionsPayments"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Other Debt */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Other Debt Payments (Monthly)
          </label>
          <input
            type="number"
            name="otherDebtPayments"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="
              bg-[#4EE38A] 
              text-black 
              font-semibold 
              px-6 py-2 
              rounded-md 
              hover:bg-[#3bc978] 
              transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {isPending ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
