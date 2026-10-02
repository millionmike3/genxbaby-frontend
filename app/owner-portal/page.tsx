import OwnerDashboardWidgets from "./_components/OwnerDashboardWidgets";
import OwnerCharts from "./_components/charts/OwnerCharts";

export default function OwnerPortalHome() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Overview</h1>
        <p className="text-slate-300 text-lg">
          Welcome to your Owner Portal. Use the navigation to access your
          properties, mortgage assets, performance analytics, cashflow, and
          equity intelligence.
        </p>
      </div>

      {/* Dashboard Widgets */}
      <OwnerDashboardWidgets />

      {/* Charts */}
      <div className="mt-10">
        <OwnerCharts />
      </div>
    </div>
  );
}
