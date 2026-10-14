"use client";

import { useState } from "react";

export default function StaffLoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/auth/staff/login", {
      method: "POST",
      body: formData,
    });

    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

    const json = await res.json();
    setError(json.error || "Login failed");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B] text-center">
          Staff Login
        </h1>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

