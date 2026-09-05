"use client";

import { GenXBabyLogoMobile } from "@/components/branding/genxbaby-logos";

export function Footer() {
  return (
    <footer className="w-full py-16 px-6 md:px-12 lg:px-20 bg-black text-white border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <GenXBabyLogoMobile />

        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} GenXBaby — Behavioral Intelligence Platform
        </p>
      </div>
    </footer>
  );
}
