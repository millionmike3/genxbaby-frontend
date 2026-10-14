"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function EditPricingOverlayPage({ params }) {
  const prisma = await getPrisma();
  const overlay = await prisma.pricingOverlay.findUnique({
    where: { id: params.id },
  });

  if (!overlay) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Pricing overlay not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Edit Pricing Overlay
        </h1>

        <form
          action={`/api/owner/manage/pricing/overlays/${overlay.id}/update`}
          method="POST"
          className="space-y-6"
        >
          <Input
            label="Overlay Name"
            name="name"
            defaultValue={overlay.name}
          />

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Overlay Type</label>
            <select
              name="type"
              defaultValue={overlay.type}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="DTI">DTI</option>
              <option value="LTV">LTV</option>
              <option value="CLTV">CLTV</option>
              <option value="CREDIT">Credit Score</option>
              <option value="RESERVES">Reserves</option>
              <option value="FRAUD">Fraud Score</option>
              <option value="PRODUCT">Product Type</option>
              <option value="OCCUPANCY">Occupancy</option>
              <option value="PURPOSE">Loan Purpose</option>
              <option value="INVESTOR">Investor Specific</option>
            </select>
          </div>

          <Input
            label="Adjustment (bps)"
            name="adjustmentBps"
            type="number"
            defaultValue={overlay.adjustmentBps}
          />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save Changes
          </button>
        </form>

        <Link
          href="/owner/manage/pricing/overlays"
          className="text-slate-400 text-sm underline"
        >
          Back to Overlays
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
