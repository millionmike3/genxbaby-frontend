"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function EditDeliveryPricingRulePage({ params }) {
  const prisma = await getPrisma();
  const rule = await prisma.deliveryPricing.findUnique({
    where: { id: params.id },
  });

  if (!rule) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Delivery pricing rule not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Edit Delivery Pricing Rule
        </h1>

        <form
          action={`/api/owner/manage/pricing/delivery/${rule.id}/update`}
          method="POST"
          className="space-y-6"
        >
          <Input
            label="Delivery Window (days)"
            name="deliveryWindowDays"
            type="number"
            defaultValue={rule.deliveryWindowDays}
          />

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Delivery Type</label>
            <select
              name="deliveryType"
              defaultValue={rule.deliveryType}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="MANDATORY">Mandatory</option>
              <option value="BEST_EFFORTS">Best Efforts</option>
            </select>
          </div>

          <Input
            label="Adjustment (bps)"
            name="adjustmentBps"
            type="number"
            defaultValue={rule.adjustmentBps}
          />

          <Input
            label="Investor Name (optional)"
            name="investorName"
            defaultValue={rule.investorName || ""}
          />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save Changes
          </button>
        </form>

        <Link
          href="/owner/manage/pricing/delivery"
          className="text-slate-400 text-sm underline"
        >
          Back to Delivery Pricing
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
        required={name !== "investorName"}
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
