"use client";

import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        
        {/* Global Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

      </body>
    </html>
  );
}
