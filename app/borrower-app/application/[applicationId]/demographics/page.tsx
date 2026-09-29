"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveDemographics } from "./actions";

export default function DemographicsPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveDemographics(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/review`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Demographic Information (HMDA Required)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        You may select “I do not wish to provide this information” for any category.
      </p>

      <form action={onSubmit} className="space-y-6">
        {/* Ethnicity */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">Ethnicity</label>
          <select
            name="ethnicity"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">I do not wish to provide</option>
            <option value="hispanic">Hispanic or Latino</option>
            <option value="not_hispanic">Not Hispanic or Latino</option>
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">Race</label>
          <select
            name="race"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">I do not wish to provide</option>
            <option value="white">White</option>
            <option value="black">Black or African American</option>
            <option value="asian">Asian</option>
            <option value="native_american">American Indian or Alaska Native</option>
            <option value="pacific_islander">Native Hawaiian or Pacific Islander</option>
          </select>
        </div>

        {/* Sex */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">Sex</label>
          <select
            name="sex"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">I do not wish to provide</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Collection Method */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Method of Collection
          </label>
          <select
            name="collectionMethod"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="self_reported">Self‑Reported</option>
            <option value="visual_observation">Visual Observation</option>
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
