"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function EditBaseRatePage({ params }) {
  const prisma = await getPrisma();
  const rate = await prisma.baseRate.findUnique({
    where: { id: params.id },
  });

  if (!rate) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Base rate not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">Edit Base Rate</h1>

        <form
          action={`/api/owner/manage/pricing/base-rates/${rate.id}/update`}
          method="POST"
          className="space-y-6"
        >
          <Input
            label="Product Type"
            name="product"
            defaultValue={rate.product}
          />

          <Input
            label="Term (years)"
            name="term"
            type="number"
            defaultValue={rate.term}
          />

          <Input
            label="Base Rate (%)"
            name="rate"
            type="number"
            step="0.001"
            defaultValue={rate.rate}
          />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save Changes
          </button>
        </form>

        <Link
          href="/owner/manage/pricing/base-rates"
          className="text-slate-400 text-sm underline"
        >
          Back to Base Rates
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
        required
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
