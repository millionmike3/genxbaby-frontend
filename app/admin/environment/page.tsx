import { Suspense } from "react";

async function getEnvironmentReadings(limit = 50) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/environment?limit=${limit}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? [];
}

export default async function EnvironmentPage() {
  const readings = await getEnvironmentReadings();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Environment Readings</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <EnvironmentTable rows={readings} />
      </Suspense>
    </div>
  );
}

function EnvironmentTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Location</th>
          <th className="px-4 py-2 text-left">Device Count</th>
          <th className="px-4 py-2 text-left">Bluetooth Density</th>
          <th className="px-4 py-2 text-left">Risk Score</th>
          <th className="px-4 py-2 text-left">Timestamp</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((env) => (
          <tr key={env.id} className="border-t">
            <td className="px-4 py-2">{env.locationId}</td>

            <td className="px-4 py-2">
              {env.deviceCount ?? 0}
            </td>

            <td className="px-4 py-2">
              {env.bluetoothDensity ?? 0}
            </td>

            <td className="px-4 py-2">
              {env.riskScore ?? 0}
            </td>

            <td className="px-4 py-2">
              {env.timestamp
                ? new Date(env.timestamp).toLocaleString()
                : "—"}
            </td>

            <td className="px-4 py-2">
              {new Date(env.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
