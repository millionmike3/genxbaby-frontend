"use client";

export default function PortalSection() {
  return (
    <section className="relative py-20 px-6 rounded-font">
      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-5xl font-extrabold text-white mb-6 neon-green-glow rounded-font">
          Access the GenXBaby Ecosystem
        </h2>

        {/* Subtitle */}
        <p className="text-soft text-xl leading-relaxed max-w-3xl mx-auto mb-12 rounded-font">
          Purpose‑built portals for owners, investors, and borrowers — each powered by
          AI‑driven underwriting, real‑time analytics, and blockchain‑verified audit trails.
        </p>

        {/* Portal Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          {/* OWNER PORTAL */}
          <a
            href="/owner-portal"
            className="
              px-6 py-3 rounded-xl bg-[#3CF46B] text-black font-semibold
              hover:bg-[#2DBA52] transition
              shadow-[0_0_20px_rgba(60,244,107,0.45)]
            "
          >
            Owner Portal
          </a>

          {/* INVESTOR PORTAL */}
          <a
            href="/investor-portal"
            className="
              px-6 py-3 rounded-xl bg-[#6D5AAC] text-white font-semibold
              hover:bg-[#5A4A92] transition
              shadow-[0_0_20px_rgba(109,90,172,0.45)]
            "
          >
            Investor Portal
          </a>

          {/* BORROWER DASHBOARD */}
          <a
            href="/borrower-portal"
            className="
              px-6 py-3 rounded-xl bg-[#0077D6] text-white font-semibold
              hover:bg-[#0062B1] transition
              shadow-[0_0_20px_rgba(0,119,214,0.45)]
            "
          >
            Borrower Dashboard
          </a>

          {/* ADMIN LOGIN — Fluorescent Cyan */}
          <a
            href="/admin/login"
            className="
              px-6 py-3 rounded-xl font-semibold
              bg-[#00eaff] text-black
              hover:bg-[#00eaff]/80 hover:shadow-[0_0_15px_#00eaff]
              transition-all
            "
          >
            Admin Login
          </a>

        </div>

      </div>
    </section>
  );
}
