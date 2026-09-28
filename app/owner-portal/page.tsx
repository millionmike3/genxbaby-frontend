import { headers } from "next/headers";
import OwnerDashboardWidgets from "./_components/OwnerDashboardWidgets";
import OwnerCharts from "./_components/charts/OwnerCharts";

export default function OwnerPortalHome() {
  const pathname = headers().get("x-pathname") || "/owner-portal";

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Overview</h1>
      <p className="text-slate-300 mb-8">
        Welcome to your Owner Portal. Use the navigation to access your
        properties, mortgage assets, performance analytics, cashflow, and
        equity intelligence.
      </p>

      {/* Dashboard Widgets */}
      <OwnerDashboardWidgets />

      <div className="text-xs text-slate-500 mt-4">
        <strong>Current Route:</strong> {pathname}
      </div>
      <OwnerCharts />

    </div>
  );
}
