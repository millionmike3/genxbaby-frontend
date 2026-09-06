"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import BluetoothScanner from "@/components/BluetoothScanner";
import AnchoringDashboard from "@/components/AnchoringDashboard";
import Timeline from "@/components/timeline/Timeline";

export default function OwnerDashboard() {
  return (
    <div className="flex w-full h-full">
      <DashboardSidebar />

      <main className="flex-1 p-6 space-y-8 overflow-y-auto bg-slate-950">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Owner Intelligence</h1>
          <p className="text-sm text-gray-400">
            Real‑time Bluetooth heatmaps, behavior sessions, and property‑level insights.
          </p>
        </header>

        <BluetoothScanner />

        <AnchoringDashboard />

        <Timeline />
      </main>
    </div>
  );
}
