"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InvestorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // TODO: Replace with your real auth logic
    router.push("/investor-portal");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">
        <h1 className="text-3xl font-bold mb-6">Investor Login</h1>

        <p className="text-slate-400 mb-6">
          Access deal intelligence, underwriting metrics, portfolio analytics, and certified check tools.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-400 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
