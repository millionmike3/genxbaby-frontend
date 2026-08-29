"use client";

import Link from "next/link";

export default function InvestorPortalLanding() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 flex flex-col items-center justify-center">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(109,90,172,0.22),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(0,140,255,0.18),_transparent_60%)]" />

      <h1 className="text-4xl font-bold mb-4">Investor Portal</h1>

      <p className="text-gray-300 max-w-xl text-center leading-relaxed mb-10">
        Monitor allocations, performance analytics, borrower pipelines, and
        blockchain‑verified audit trails — built for institutional‑grade visibility.
      </p>

      <Link
        href="/login"
        className="px-8 py-3 rounded-lg bg-[#6D5AAC] text-white font-semibold hover:bg-[#5A4A92] transition shadow-[0_0_20px_rgba(109,90,172,0.45)]"
      >
        Log In to Continue
      </Link>
    </main>
  );
}
