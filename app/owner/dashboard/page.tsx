
import { Suspense } from "react";

async function fetchJSON(url: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data ?? [];
}

async function getDashboardData() {
  const [
    performance,
    conversion,
    velocity,
    applications,
    borrowers,
    investors,
    fraudEvents,
    scoring,
    environment,
  ] = await Promise.all([
    fetchJSON("/api/analytics/pipeline/performance"),
    fetchJSON("/api/analytics/pipeline/conversion"),
    fetchJSON("/api/analytics/pipeline/velocity"),
    fetchJSON("/api/admin/applications"),
    fetchJSON("/api/admin/borrowers"),
    fetchJSON("/api/admin/investors"),
    fetchJSON("/api/admin/fraud"),
    fetchJSON("/api/admin/scoring"),
    fetchJSON("/api/admin/environment"),
  ]);

  return {
    performance,
    conversion,
    velocity,
    applications,
    borrowers,
    investors,
    fraudEvents,
    scoring,
    environment,
  };
}

export default async function OwnerDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>

      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardGrid data={data} />
      </Suspense>
    </div>
  );
}

function DashboardGrid({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard
        title="Total Applications"
        value={data.applications.length}
      />

      <DashboardCard
        title="Total Borrowers"
        value={data.borrowers.length}
      />

      <DashboardCard
        title="Total Investors"
        value={data.investors.length}
      />

      <DashboardCard
        title="Fraud Events (Last 200)"
        value={data.fraudEvents.length}
      />

      <DashboardCard
        title="Scoring Records"
        value={data.scoring.length}
      />

      <DashboardCard
        title="Environment Readings"
        value={data.environment.length}
      />

      <DashboardCard
        title="Pipeline Velocity"
        value={data.velocity?.velocity ?? "—"}
      />

      <DashboardCard
        title="Conversion Rate"
        value={`${data.conversion?.conversionRate ?? 0}%`}
      />

      <DashboardCard
        title="Pipeline Performance"
        value={data.performance?.score ?? "—"}
      />
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
