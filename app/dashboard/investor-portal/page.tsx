"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import UltraFavorable from "@/components/UltraFavorable";
import RiskPanel from "@/components/risk/RiskPanel";
import Timeline from "@/components/timeline/Timeline";

const DEMO_USER_ID = 1; // replace with investor context later

export default function InvestorDashboard() {
  return (
    <div className="flex w-full h-full">
      <DashboardSidebar />

      <main className="flex-1 p-6 space-y-8 overflow-y-auto bg-slate-950">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Investor Intelligence</h1>
          <p className="text-sm text-gray-400">
            Pricing, risk signals, and behavioral timelines for portfolio decisions.
          </p>
        </header>

        <UltraFavorable active={true} />


        <RiskPanel userId={DEMO_USER_ID} />

        <Timeline />
      </main>
    </div>
  );
}
