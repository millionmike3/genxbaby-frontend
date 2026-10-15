import { requireRole } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminConfigPage() {
  await requireRole(["admin"]);
  const admin = await getCurrentUser();

  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Not authenticated</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10 space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-[#3CF46B]">
          Configuration & Integrations
        </h1>
        <p className="text-slate-300 mt-2">
          Manage system‑wide integrations, API keys, and platform configuration.
        </p>
      </header>

      <section className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold">Platform Integrations</h2>

        <ul className="space-y-3 text-slate-300">
          <li>• Pricing Engine</li>
          <li>• Fraud Intelligence Engine</li>
          <li>• Underwriting Engine</li>
          <li>• Behavioral Intelligence Layer</li>
          <li>• Bluetooth Intelligence Layer</li>
          <li>• Investor Scoring Engine</li>
          <li>• Mortgage Asset Intelligence</li>
          <li>• Ownership Entity Intelligence</li>
        </ul>
      </section>

      <section className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold">System Configuration</h2>

        <p className="text-slate-300">
          Add configuration controls here (API keys, toggles, environment
          settings, etc.).
        </p>
      </section>
    </main>
  );
}
