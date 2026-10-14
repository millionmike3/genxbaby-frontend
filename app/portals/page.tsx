"use client";

import Link from "next/link";

export default function MasterLoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-10 w-full max-w-lg space-y-10">
        <h1 className="text-3xl font-bold text-[#3CF46B] text-center">
          Select Your Portal
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Admin */}
          <Link
            href="/admin/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Admin Portal
          </Link>

          {/* Owner (system owner, NOT property owner) */}
          <Link
            href="/owner/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Owner Portal
          </Link>

          {/* Loan Officer */}
          <Link
            href="/loan-officer/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Loan Officer Portal
          </Link>

          {/* Underwriter */}
          <Link
            href="/underwriter/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Underwriter Portal
          </Link>

          {/* Staff */}
          <Link
            href="/staff/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Staff Portal
          </Link>

          {/* Borrower */}
          <Link
            href="/borrower/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Borrower Portal
          </Link>

          {/* Investor */}
          <Link
            href="/investor/login"
            className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-center font-semibold transition"
          >
            Investor Portal
          </Link>
        </div>
      </div>
    </main>
  );
}
