"use client";

import PublicSidebar from "@/components/PublicSidebar";
import TopNav from "@/components/TopNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      <PublicSidebar />

      <main className="flex-1 overflow-y-auto">
        <TopNav />
        {children}
      </main>
    </div>
  );
}
