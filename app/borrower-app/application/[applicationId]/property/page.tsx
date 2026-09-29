"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveProperty } from "./actions";

export default function PropertyPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveProperty(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/declarations`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Subject Property (1003)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Enter details about the property you are purchasing or refinancing.
      </p>

      <form action={onSubmit} className="space-y-6">
        {/* Address */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Property Address
          </label>
          <input
            name="propertyAddress"
            required
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">City</label>
            <input
              name="propertyCity"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">State</label>
            <input
              name="propertyState"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Zip</label>
            <input
              name="propertyZip"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
        </div>

        {/* Occupancy */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Occupancy Type
          </label>
          <select
            name="occupancyType"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">Select...</option>
            <option value="primary">Primary Residence</option>
            <option value="secondary">Secondary Residence</option>
            <option value="investment">Investment Property</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">Select...</option>
            <option value="single_family">Single Family</option>
            <option value="condo">Condo</option>
            <option value="townhome">Townhome</option>
            <option value="multi_family">Multi‑Family</option>
            <option value="manufactured">Manufactured Home</option>
          </select>
        </div>

        {/* Financials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Purchase Price
            </label>
            <input
              type="number"
              name="purchasePrice"
              min={0}
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Estimated Value
            </label>
            <input
              type="number"
              name="estimatedValue"
              min={0}
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
        </div>

        {/* Loan Amount */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            name="loanAmount"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Down Payment
          </label>
          <input
            type="number"
            name="downPayment"
            min={0}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Down Payment Source */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Down Payment Source
          </label>
          <select
            name="downPaymentSource"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">Select...</option>
            <option value="savings">Savings</option>
            <option value="gift">Gift Funds</option>
            <option value="sale_of_home">Sale of Home</option>
            <option value="retirement">Retirement Withdrawal</option>
            <option value="other">Other</option>
          </select>
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
