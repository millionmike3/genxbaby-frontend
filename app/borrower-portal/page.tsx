"use client";

import Link from "next/link";

export default function BorrowerPortalLanding() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 flex flex-col items-center justify-center">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,119,214,0.22),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(60,244,107,0.18),_transparent_60%)]" />

      <h1 className="text-4xl font-bold mb-4">Borrower Dashboard</h1>

      <p className="text-gray-300 max-w-xl text-center leading-relaxed mb-10">
        Track loan status, underwriting progress, document requests, and
        communication updates — all in one streamlined borrower experience.
      </p>

      <Link
        href="/login"
        className="px-8 py-3 rounded-lg bg-[#0077D6] text-white font-semibold hover:bg-[#0062B1] transition shadow-[0_0_20px_rgba(0,119,214,0.45)]"
      >
        Log In to Continue
      </Link>
    </main>
  );
}
