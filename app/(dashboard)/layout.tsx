"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import "./globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex">

        {/* Dashboard Sidebar */}
        <DashboardSidebar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </body>
    </html>
  );
}
