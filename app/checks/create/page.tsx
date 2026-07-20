"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CreateCheckPage() {
  const [bankProfiles, setBankProfiles] = useState<any[]>([]);
  const [signers, setSigners] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedSigner, setSelectedSigner] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Load bank profiles
  useEffect(() => {
    async function load() {
      try {
        const res = await api("/checks/banks");
        setBankProfiles(res);
      } catch (err) {
        console.error("Failed to load bank profiles:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Load signers when bank changes
  useEffect(() => {
    async function loadSigners() {
      if (!selectedBank) return;
      try {
        const res = await api(`/checks/signers?bank=${selectedBank}`);
        setSigners(res);
      } catch (err) {
        console.error("Failed to load signers:", err);
      }
    }
    loadSigners();
  }, [selectedBank]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    try {
      await api("/checks/create", {
        method: "POST",
        body: JSON.stringify({
          bankId: selectedBank,
          signerId: selectedSigner,
          checkNumber,
          payee,
          amount,
          memo,
          date,
        }),
      });

      setSuccess(true);
      setCheckNumber("");
      setPayee("");
      setAmount("");
      setMemo("");
      setDate("");
    } catch (err) {
      console.error("Failed to create check:", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading check creation...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Create Check</h1>

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Check created successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow max-w-xl">

        {/* Bank Profile */}
        <div>
          <label className="block font-medium mb-1">Bank Profile</label>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            required
          >
            <option value="">Select Bank</option>
            {bankProfiles.map((b) => (
              <option key={b.id} value={b.id}>
                {b.bankName}
              </option>
            ))}
          </select>
        </div>

        {/* Signer */}
        <div>
          <label className="block font-medium mb-1">Signer</label>
          <select
            className="border rounded-lg p-2 w-full"
            value={selectedSigner}
            onChange={(e) => setSelectedSigner(e.target.value)}
            required
          >
            <option value="">Select Signer</option>
            {signers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Check Number */}
        <div>
          <label className="block font-medium mb-1">Check Number</label>
          <input
            type="number"
            className="border rounded-lg p-2 w-full"
            value={checkNumber}
            onChange={(e) => setCheckNumber(e.target.value)}
            required
          />
        </div>

        {/* Payee */}
        <div>
          <label className="block font-medium mb-1">Payee</label>
          <input
            type="text"
            className="border rounded-lg p-2 w-full"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            className="border rounded-lg p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Memo */}
        <div>
          <label className="block font-medium mb-1">Memo</label>
          <input
            type="text"
            className="border rounded-lg p-2 w-full"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            className="border rounded-lg p-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Create Check
        </button>
      </form>
    </div>
  );
}
