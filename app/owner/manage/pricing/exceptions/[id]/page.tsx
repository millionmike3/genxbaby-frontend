"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function EditPricingExceptionPage({ params }) {
  const prisma = await getPrisma();
  const ex = await prisma.pricingException.findUnique({
    where: { id: params.id },
  });

  if (!ex) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Pricing exception not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Edit Pricing Exception
        </h1>

        <form
          action={`/api/owner/manage/pricing/exceptions/${ex.id}/update`}
          method="POST"
          className="space-y-6"
        >
          <Input label="Exception Name" name="name" defaultValue={ex.name} />

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Scope</label>
            <select
              name="scope"
              defaultValue={ex.scope}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="LOAN_OFFICER">Loan Officer</option>
              <option value="BRANCH">Branch</option>
              <option value="PRODUCT">Product</option>
              <option value="INVESTOR">Investor</option>
              <option value="CORPORATE">Corporate</option>
              <option value="RISK">Risk Override</option>
            </select>
          </div>

          <Input
            label="Adjustment (bps)"
            name="adjustmentBps"
            type="number"
            defaultValue={ex.adjustmentBps}
          />

          <Input
            label="Expires At (optional)"
            name="expiresAt"
            type="date"
            defaultValue={
              ex.expiresAt ? ex.expiresAt.toISOString().substring(0, 10) : ""
            }
          />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save Changes
          </button>
        </form>

        <Link
          href="/owner/manage/pricing/exceptions"
          className="text-slate-400 text-sm underline"
        >
          Back to Exceptions
        </Link>
      </div>
    </main>
  );
}

function Input({ label, name, type = "text", defaultValue }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
