"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveDeclarations } from "./actions";

export default function DeclarationsPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveDeclarations(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/demographics`);
    });
  }

  const yesNo = (
    name: string,
    label: string
  ) => (
    <div className="space-y-2">
      <label className="block text-sm text-slate-300">{label}</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-slate-200">
          <input type="radio" name={name} value="yes" className="accent-[#4EE38A]" />
          Yes
        </label>
        <label className="flex items-center gap-2 text-slate-200">
          <input type="radio" name={name} value="no" className="accent-[#4EE38A]" />
          No
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Declarations (1003)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Please answer the following federally required declaration questions.
      </p>

      <form action={onSubmit} className="space-y-6">
        {yesNo("bankruptcy", "Have you declared bankruptcy in the last 7 years?")}
        {yesNo("foreclosure", "Have you had property foreclosed in the last 7 years?")}
        {yesNo("judgments", "Are you presently a party to any lawsuit or judgments?")}
        {yesNo("delinquentFederalDebt", "Are you delinquent on any federal debt?")}
        {yesNo("alimonyChildSupport", "Do you pay alimony or child support?")}
        {yesNo("coMakerEndorser", "Are you a co‑maker or endorser on a note?")}
        {yesNo("ownershipInterest", "Do you have ownership interest in another property?")}
        {yesNo("outstandingLiens", "Are there any outstanding liens on the property?")}
        {yesNo("militaryService", "Are you currently serving or have you served in the military?")}

        {/* Citizenship */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Citizenship Status
          </label>
          <select
            name="citizenshipStatus"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">Select...</option>
            <option value="us_citizen">U.S. Citizen</option>
            <option value="permanent_resident">Permanent Resident</option>
            <option value="non_resident">Non‑Resident Alien</option>
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
