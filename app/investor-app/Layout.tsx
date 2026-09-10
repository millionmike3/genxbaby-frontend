"use client";

import PublicSidebar from "@/components/PublicSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      <PublicSidebar />

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
