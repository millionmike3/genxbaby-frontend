"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { saveEmployment } from "./actions";

export default function EmploymentPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await saveEmployment(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/income`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-2">
        Employment Information (1003)
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Tell us about your current employment.
      </p>

      <form action={onSubmit} className="space-y-6">
        {/* Employer Name */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Employer Name
          </label>
          <input
            name="employerName"
            required
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Job Title
          </label>
          <input
            name="jobTitle"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Employment Type
          </label>
          <select
            name="employmentType"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          >
            <option value="">Select...</option>
            <option value="W2">W2 Employee</option>
            <option value="1099">1099 Contractor</option>
            <option value="self_employed">Self-Employed</option>
            <option value="retired">Retired</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </div>

        {/* Years in Profession */}
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Years in Profession
          </label>
          <input
            type="number"
            name="yearsInProfession"
            min={0}
            step={0.5}
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
