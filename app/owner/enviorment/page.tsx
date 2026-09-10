// app/owner/environment/page.tsx
import { EnvironmentDAL } from "@/lib/dal/environment";

export default async function OwnerEnvironmentPage() {
  const readings = await EnvironmentDAL.getHeatmap();

  // group by location
  const byLocation = readings.reduce<Record<string, typeof readings>>(
    (acc, r) => {
      acc[r.locationId] = acc[r.locationId] || [];
      acc[r.locationId].push(r);
      return acc;
    },
    {}
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Environment Heatmap</h1>
      <p className="text-sm text-slate-400 mb-6">
        Bluetooth density, device counts, and risk overlays per location.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(byLocation).map(([locationId, list]) => {
          const latest = list[0];
          const avgDensity =
            list.reduce((a, r) => a + r.bluetoothDensity, 0) / list.length;
          const avgDevices =
            list.reduce((a, r) => a + r.deviceCount, 0) / list.length;
          const avgRisk =
            list.reduce((a, r) => a + (r.riskScore ?? 0), 0) / list.length;

          const riskBand =
            avgRisk < 30 ? "Low" : avgRisk < 60 ? "Medium" : "High";

          return (
            <div
              key={locationId}
              className="border border-slate-800 rounded-lg p-4 text-sm"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <div className="font-semibold">Location: {locationId}</div>
                  <div className="text-slate-400 text-xs">
                    Last reading:{" "}
                    {new Date(latest.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div>Risk: {riskBand}</div>
                  <div className="text-xs text-slate-400">
                    Score: {avgRisk.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded">
                  <div className="text-slate-400">Avg Density</div>
                  <div className="text-lg font-semibold">
                    {avgDensity.toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-900 p-3 rounded">
                  <div className="text-slate-400">Avg Devices</div>
                  <div className="text-lg font-semibold">
                    {avgDevices.toFixed(1)}
                  </div>
                </div>
                <div className="bg-slate-900 p-3 rounded">
                  <div className="text-slate-400">Avg Risk</div>
                  <div className="text-lg font-semibold">
                    {avgRisk.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* simple heat strip */}
              <div className="mt-4 h-2 w-full bg-slate-900 rounded overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.min(avgRisk, 100)}%`,
                    background:
                      avgRisk < 30
                        ? "#4EE38A"
                        : avgRisk < 60
                        ? "#FACC15"
                        : "#F97316",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
