
import Link from "next/link";

export default async function PricingEnginePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Pricing Engine</h1>

      <p className="text-slate-300 text-sm">
        Admin and Owner control all pricing logic across the LOS hierarchy.
      </p>

      <section className="flex flex-col gap-4 text-sm">
        <Link
          href="/owner/manage/pricing/llpa"
          className="text-[#3CF46B] underline"
        >
          Edit LLPA Grid
        </Link>

        <Link
          href="/owner/manage/pricing/investor"
          className="text-[#3CF46B] underline"
        >
          Investor Pricing
        </Link>
      </section>
    </main>
  );
}
