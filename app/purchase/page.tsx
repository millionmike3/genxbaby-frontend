"use client";

import { useState } from "react";
import Image from "next/image";

export default function PurchasePage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const sendEmail = async (e) => {
    e.preventDefault();

    await fetch("/api/contact-purchase", {
      method: "POST",
      body: JSON.stringify(form),
    });

    alert("Message sent!");
  };

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto text-slate-200">

      {/* Header Image */}
      <Image
        src="/images/purchase.jpg"
        alt="Purchase GenXBaby Owner or Admin Account"
        width={1600}
        height={900}
        className="rounded-xl mb-10"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-white">
        Purchase an Owner or Admin Account
      </h1>

      {/* Intro Text */}
      <p className="text-lg leading-relaxed mb-10">
        Owner Accounts and Admin Accounts unlock
        enterprise‑grade intelligence, governance, behavioral analytics, fraud
        detection, certified check management, and full ecosystem oversight.
        These accounts are designed for nonprofits, portfolio owners, commercial
        buyers, and enterprise operators who require institutional‑level control.
      </p>

      {/* Contact Form */}
      <form onSubmit={sendEmail} className="space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Your Message"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          rows={5}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition"
        >
          Contact Sales
        </button>
      </form>
    </section>
  );
}
