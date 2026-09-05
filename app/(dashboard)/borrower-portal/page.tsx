"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import AnchoringDashboard from "@/components/AnchoringDashboard";
import Timeline from "@/components/timeline/Timeline";

const DEMO_USER_ID = 1; // replace with borrower auth context

export default function BorrowerDashboard() {
  return (
    <div className="flex w-full h-full">
      <DashboardSidebar />

      <main className="flex-1 p-6 space-y-8 overflow-y-auto bg-slate-950">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Your GenXBaby Dashboard</h1>
          <p className="text-sm text-gray-400">
            Track your sessions, pricing interactions, and behavioral history.
          </p>
        </header>

        <AnchoringDashboard />

        <Timeline />
      </main>
    </div>
  );
}
