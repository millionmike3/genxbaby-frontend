"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function EditStaffPage({ params }) {
  const prisma = await getPrisma();
  const staff = await prisma.staff.findUnique({
    where: { id: params.id },
  });

  if (!staff) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Staff member not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">Edit Staff Member</h1>

        <form
          action={`/api/owner/manage/staff/${staff.id}/update`}
          method="POST"
          className="space-y-6"
        >
          <Input
            label="Full Name"
            name="fullName"
            defaultValue={staff.fullName}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            defaultValue={staff.email}
          />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save Changes
          </button>
        </form>

        <Link
          href="/owner/manage/staff"
          className="text-slate-400 text-sm underline"
        >
          Back to Staff List
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
