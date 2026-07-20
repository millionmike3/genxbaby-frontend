"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col">

      {/* NAVBAR */}
      <header className="gx-glass h-20 flex items-center justify-between px-8">
        <h1 className="text-2xl font-bold gx-text-primary">GenXBaby</h1>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/investor" className="hover:gx-text-primary">Investors</Link>
          <Link href="/borrower" className="hover:gx-text-primary">Borrowers</Link>
          <Link href="/checks/verify" className="hover:gx-text-primary">Verify Check</Link>
          <Link href="/dashboard" className="hover:gx-text-primary">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="gx-btn-ghost px-4 py-2 rounded-lg"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="gx-btn-primary px-4 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-4xl md:text-6xl font-bold gx-text-primary mb-6">
          The Future of Community Finance
        </h2>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          GenXBaby connects investors, borrowers, and nonprofits through a secure,
          transparent financial ecosystem. Build trust. Build community. Build wealth.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link
            href="/investor"
            className="gx-btn-primary px-8 py-4 rounded-xl text-lg"
          >
            Investor Portal
          </Link>

          <Link
            href="/borrower"
            className="gx-btn-secondary px-8 py-4 rounded-xl text-lg"
          >
            Borrower Portal
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 bg-[#111118]">
        <h3 className="text-3xl font-bold text-center mb-12 gx-text-primary">
          Why GenXBaby?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">

          <div className="gx-card p-8 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-3">Secure Check Registry</h4>
            <p className="text-gray-400">
              Create, track, and verify checks with full transparency.
            </p>
          </div>

          <div className="gx-card p-8 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-3">Investor Insights</h4>
            <p className="text-gray-400">
              Real‑time dashboards for portfolio performance and deal pipeline.
            </p>
          </div>

          <div className="gx-card p-8 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-3">Borrower Tools</h4>
            <p className="text-gray-400">
              Simple loan applications, underwriting status, and funding progress.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="gx-glass py-10 text-center text-gray-500">
        © {new Date().getFullYear()} GenXBaby — All Rights Reserved
      </footer>
    </div>
  );
}
