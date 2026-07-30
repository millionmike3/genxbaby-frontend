"use client";

import { useEffect, useState } from "react";
import RiskScoreChart from "@/components/investor/charts/RiskScoreChart";
import BatchVolumeChart from "@/components/investor/charts/BatchVolumeChart";
import ExposureChart from "@/components/investor/charts/ExposureChart";

const POLYGONSCAN_BASE =
  process.env.NEXT_PUBLIC_POLYGONSCAN_BASE ||
  "https://amoy.polygonscan.com/tx/";

export default function InvestorDashboard() {
  const [batches, setBatches] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch anchored batches + metrics
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/investor/batches`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );

        const data = await res.json();
        setBatches(data.batches || []);
        setMetrics(data.metrics || null);

        // Fetch chart data
        const chartsRes = await fetch(
          `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/investor/charts`
        );
        const chartsJson = await chartsRes.json();
        setChartData(chartsJson);
      } catch (err) {
        console.error("Failed to load investor dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-6">Loading investor dashboard…</div>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-semibold">Investor Dashboard</h1>

      {/* Metrics */}
      {metrics && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-medium">Total Anchored Batches</h2>
            <p className="text-3xl font-bold">{metrics.totalBatches}</p>
          </div>

          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-medium">Avg Risk Score</h2>
            <p className="text-3xl font-bold">
              {metrics.avgRiskScore.toFixed(2)}
            </p>
          </div>

          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-medium">Total Applications Anchored</h2>
            <p className="text-3xl font-bold">{metrics.totalApplications}</p>
          </div>
        </section>
      )}

      {/* Charts */}
      {chartData && (
        <section className="space-y-10">
          <RiskScoreChart data={chartData.riskScores} />
          <BatchVolumeChart data={chartData.batchTimeline} />
          <ExposureChart data={chartData.exposureTimeline} />
        </section>
      )}

      {/* Anchored Batches Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anchored Batches</h2>

        {batches.length === 0 ? (
          <div>No anchored batches found.</div>
        ) : (
          <div className="overflow-auto border rounded bg-white">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Batch ID</th>
                  <th className="p-3">Applications</th>
                  <th className="p-3">Merkle Root</th>
                  <th className="p-3">Tx Hash</th>
                  <th className="p-3">Block</th>
                  <th className="p-3">Anchored At</th>
                </tr>
              </thead>

              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id} className="border-t">
                    <td className="p-3">{batch.id}</td>

                    <td className="p-3">
                      {batch.applicationIds.join(", ")}
                    </td>

                    <td className="p-3 break-all">{batch.merkleRoot}</td>

                    <td className="p-3 break-all">
                      <a
                        href={`${POLYGONSCAN_BASE}${batch.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {batch.txHash}
                      </a>
                    </td>

                    <td className="p-3">{batch.blockNumber}</td>

                    <td className="p-3">
                      {new Date(batch.anchoredAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
