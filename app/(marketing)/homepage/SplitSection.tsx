"use client";

import Image from "next/image";

export function SplitSection() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE — TEXT */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Built for speed, intelligence, and trust.
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            GenXBaby connects real‑time behavioral analytics, Bluetooth proximity
            intelligence, and pricing engines into one unified experience. 
            Whether you're underwriting, analyzing risk, or managing borrower 
            interactions — everything is designed to move fast and feel effortless.
          </p>

          <ul className="space-y-3 text-gray-400 text-base">
            <li>• Real‑time behavioral volatility tracking</li>
            <li>• Bluetooth‑driven proximity intelligence</li>
            <li>• LLPA‑aware pricing risk signals</li>
            <li>• Unified underwriting engine</li>
          </ul>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-white/10">
          <Image
            src="/marketing/split-preview.png"
            alt="GenXBaby Intelligence Preview"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>
      </div>
    </section>
  );
}
