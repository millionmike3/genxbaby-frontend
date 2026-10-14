"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function DeleteUnderwriterPage({ params }) {
  const prisma = await getPrisma();
  const underwriter = await prisma.underwriter.findUnique({
    where: { id: params.id },
  });

  if (!underwriter) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Underwriter not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-red-400">Delete Underwriter</h1>

        <p className="text-slate-300 text-sm">
          Are you sure you want to delete{" "}
          <strong>{underwriter.fullName}</strong>?
        </p>

        <form
          action={`/api/owner/manage/underwriters/${underwriter.id}/delete`}
          method="POST"
        >
          <button className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
            Yes, Delete Underwriter
          </button>
        </form>

        <Link
          href={`/owner/manage/underwriters/${underwriter.id}`}
          className="text-slate-400 text-sm underline"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}
