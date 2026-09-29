"use client";

import { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { savePersonalInfo } from "./actions";

export default function PersonalPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      await savePersonalInfo(applicationId, formData);
      router.push(`/borrower-app/application/${applicationId}/employment`);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Borrower Information (1003)
      </h1>

      <form action={onSubmit} className="space-y-6">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Middle Initial
            </label>
            <input
              name="middleInitial"
              maxLength={1}
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Suffix
            </label>
            <input
              name="suffix"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
        </div>

        {/* DOB, SSN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Social Security Number
            </label>
            <input
              type="password"
              name="ssn"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Street Address
            </label>
            <input
              name="address"
              required
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                City
              </label>
              <input
                name="city"
                required
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                State
              </label>
              <input
                name="state"
                required
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Zip
              </label>
              <input
                name="zip"
                required
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Years at Address
              </label>
              <input
                type="number"
                name="yearsAtAddress"
                min={0}
                step={0.5}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
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
