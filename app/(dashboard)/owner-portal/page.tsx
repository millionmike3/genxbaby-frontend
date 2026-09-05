use client;

import DashboardSidebar from @componentsDashboardSidebar;
import BluetoothScanner from @componentsBluetoothScanner;
import AnchoringDashboard from @componentsAnchoringDashboard;
import Timeline from @componentstimelineTimeline;

export default function OwnerDashboard() {
  return (
    div className=flex w-full h-full
      DashboardSidebar 

      main className=flex-1 p-6 space-y-8 overflow-y-auto bg-slate-950
        header className=space-y-2
          h1 className=text-2xl font-bold text-whiteOwner Intelligenceh1
          p className=text-sm text-gray-400
            Real‑time Bluetooth heatmaps, behavior sessions, and property‑level insights.
          p
        header

        BluetoothScanner 

        AnchoringDashboard 

        Timeline 
      main
    div
  );
}
