"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoanOfficerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/loan-officer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!data.success) {
      setError(data.error ?? "Login failed");
      return;
    }

    router.push("/loan-officer/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded p-8 w-full max-w-sm space-y-4 text-white"
      >
        <h1 className="text-xl font-semibold">Loan Officer Login</h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm text-slate-300">Email</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-800 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-800 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-600 rounded text-sm font-semibold"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
