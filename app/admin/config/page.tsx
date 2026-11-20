import "@/app/globals.css";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { ReactNode } from "react";

const SECRET = process.env.JWT_SECRET!;

export const dynamic = "force-dynamic";

export default async function AdminConfigPage() {
  // ----------------------------------------------------
  // 1. Read unified auth cookie
  // ----------------------------------------------------
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Not authenticated</h1>
      </main>
    );
  }

  // ----------------------------------------------------
  // 2. Verify JWT using JOSE
  // ----------------------------------------------------
  let payload: any;
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    payload = verified.payload;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Invalid or expired token</h1>
      </main>
    );
  }

  // ----------------------------------------------------
  // 3. Enforce ADMIN role (uppercase enum)
  // ----------------------------------------------------
  if (payload.role !== "ADMIN") {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Forbidden</h1>
      </main>
    );
  }

  // ----------------------------------------------------
  // 4. Render admin configuration page
  // ----------------------------------------------------
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
