"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(60,244,107,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(255,255,255,0.06),_transparent_60%)]" />

      <div className="flex flex-col items-center text-center max-w-3xl">
        <Image
          src="/genxbaby-logo.png"
          alt="Gen X Baby Logo"
          width={260}
          height={260}
          className="mb-6 drop-shadow-[0_0_25px_rgba(60,244,107,0.7)]"
        />

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            GEN X BABY
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-400 max-w-xl">
          Neon‑green energy. Metallic precision. A unified ecosystem for youth innovation,
          community resilience, and strategic funding.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="#portal"
            className="px-6 py-3 rounded-full bg-[#3CF46B] text-black font-semibold shadow-[0_0_25px_rgba(60,244,107,0.8)] hover:bg-[#32d45f] transition"
          >
            Enter the Ecosystem
          </Link>
          <Link
            href="#dashboard"
            className="px-6 py-3 rounded-full border border-gray-600 text-gray-200 hover:bg-white/5 transition"
          >
            View System Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
