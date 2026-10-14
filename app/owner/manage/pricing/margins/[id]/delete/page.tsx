"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function DeleteMarginRulePage({ params }) {
  const prisma = await getPrisma();
  const rule = await prisma.marginControl.findUnique({
    where: { id: params.id },
  });

  if (!rule) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Margin rule not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-red-400">
          Delete Margin Rule
        </h1>

        <p className="text-slate-300 text-sm">
          Are you sure you want to delete the margin rule{" "}
          <strong>{rule.name}</strong>?
        </p>

        <form
          action={`/api/owner/manage/pricing/margins/${rule.id}/delete`}
          method="POST"
        >
          <button className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
            Yes, Delete Margin Rule
          </button>
        </form>

        <Link
          href="/owner/manage/pricing/margins"
          className="text-slate-400 text-sm underline"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}
