"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveAssets } from "./actions";

export default function AssetsPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveAssets(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/liabilities`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Assets & Reserves (1003)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Enter your verifiable assets. These help determine your financial strength and reserves.
      </p>

      <form action={onSubmit} className="space-y-6">
        {/* Checking */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Checking Account Balance
          </label>
          <input
            type="number"
            name="checkingBalance"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Savings */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Savings Account Balance
          </label>
          <input
            type="number"
            name="savingsBalance"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Cash */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Cash On Hand
          </label>
          <input
            type="number"
            name="cashOnHand"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Retirement */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Retirement Accounts (401k, IRA)
          </label>
          <input
            type="number"
            name="retirementBalance"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Investments */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Investment Accounts (Stocks, Bonds)
          </label>
          <input
            type="number"
            name="investmentBalance"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Other */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Other Verifiable Assets
          </label>
          <input
            type="number"
            name="otherAssets"
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
