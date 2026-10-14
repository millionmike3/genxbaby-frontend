"use client";

import { useState } from "react";

export default function CreateLoanOfficerPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/owner/manage/loan-officers/create", {
      method: "POST",
      body: formData,
    });

    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

    const json = await res.json();
    setError(json.error || "Failed to create loan officer");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">Add Loan Officer</h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Full Name" name="fullName" />
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Create Loan Officer
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({ label, name, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
