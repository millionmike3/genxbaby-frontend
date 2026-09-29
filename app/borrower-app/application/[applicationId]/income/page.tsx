"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveIncome } from "./actions";

export default function IncomePage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveIncome(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/assets`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Income Information (1003)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Enter your annual income amounts. We will calculate monthly totals automatically.
      </p>

      <form action={onSubmit} className="space-y-6">
        {/* W2 Income */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            W‑2 Income (Annual)
          </label>
          <input
            type="number"
            name="w2IncomeAnnual"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* 1099 Income */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            1099 Contractor Income (Annual)
          </label>
          <input
            type="number"
            name="contractorIncomeAnnual"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Self Employment */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Self‑Employment Income (Annual)
          </label>
          <input
            type="number"
            name="selfEmploymentIncomeAnnual"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Other Income */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Other Income (Annual)
          </label>
          <input
            type="number"
            name="otherIncomeAnnual"
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
