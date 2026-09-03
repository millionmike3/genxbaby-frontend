"use client";

import "./globals.css";

import PublicSidebar from "@/components/PublicSidebar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex">

        {/* Public Sidebar */}
        <PublicSidebar />


        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </body>
    </html>
  );
}
