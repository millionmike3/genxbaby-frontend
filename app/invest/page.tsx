"use client";

import { useState } from "react";
import Image from "next/image";

export default function InvestPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const sendEmail = async (e) => {
    e.preventDefault();

    await fetch("/api/contact-invest", {
      method: "POST",
      body: JSON.stringify(form),
    });

    alert("Message sent!");
  };

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto text-slate-200">
      
      {/* Header Image */}
      <Image
        src="/invest.jpg"
        alt="Invest with GenXBaby"
        width={1600}
        height={900}
        className="rounded-xl mb-10"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-white">
        Invest With GenXBaby
      </h1>

      {/* Intro Text */}
      <p className="text-lg leading-relaxed mb-10">
        Learn more about purchasing an Investor Account, accessing deal
        intelligence, and leveraging GenXBaby’s underwriting engine. Our
        investor ecosystem provides real‑time deal grading, ARV/DSCR/NOI
        automation, behavioral intelligence scoring, and lender suitability
        matching — giving investors a powerful advantage in today’s market.
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
          className="px-6 py-3 bg-[#3CF46B] text-black font-bold rounded-full hover:bg-[#32d45f] transition"
        >
          Contact GenXBaby
        </button>
      </form>
    </section>
  );
}
