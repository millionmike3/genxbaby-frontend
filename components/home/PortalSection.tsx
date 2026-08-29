"use client";

export default function PortalSection() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-6">
          A Unified Institutional Fintech Platform
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
          GenXBaby integrates AI underwriting, mortgage automation, identity intelligence,
          asset analytics, and blockchain‑verified audit trails into a single operating system
          for lenders, investors, and mission‑driven institutions.
        </p>

        {/* Portal Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <a
            href="/owners"
            className="px-6 py-3 rounded-lg bg-[#3CF46B] text-black font-semibold hover:bg-[#2DBA52] transition"
          >
            Owner Portal
          </a>

          <a
            href="/investors"
            className="px-6 py-3 rounded-lg bg-[#6D5AAC] text-white font-semibold hover:bg-[#5A4A92] transition"
          >
            Investor Portal
          </a>

          <a
            href="/borrowers"
            className="px-6 py-3 rounded-lg bg-[#0077D6] text-white font-semibold hover:bg-[#0062B1] transition"
          >
            Borrower Dashboard
          </a>
        </div>

      </div>
    </section>
  );
}
