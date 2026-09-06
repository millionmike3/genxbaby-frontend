"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import AdminIdentityBanner from "@/components/AdminIdentityBanner";
import AnchoringDashboard from "@/components/AnchoringDashboard";
import BluetoothScanner from "@/components/BluetoothScanner";
import UltraFavorable from "@/components/UltraFavorable";
import QuickActionsDock from "@/components/QuickActionsDock";
import Timeline from "@/components/timeline/Timeline";
import RiskPanel from "@/components/risk/RiskPanel";
import UnderwritingPanel from "@/components/risk/UnderwritingPanel";

const DEMO_USER_ID = 1; // replace with real user context later

export default function AdminDashboard() {
  return (
    <div className="flex w-full h-full">
      <DashboardSidebar />

      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <AdminIdentityBanner />

        <QuickActionsDock collapsed={false} />


        <AnchoringDashboard />

        <BluetoothScanner />

        <UltraFavorable active={false} />


        <RiskPanel userId={DEMO_USER_ID} />

        <UnderwritingPanel userId={DEMO_USER_ID} />

        <Timeline />
      </main>
    </div>
  );
}
