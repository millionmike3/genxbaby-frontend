"use client";

import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Breadcrumb from "./Breadcrumb";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gx-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Navigation */}
        <TopNav />

        {/* Page Content */}
        <main className="p-10">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
