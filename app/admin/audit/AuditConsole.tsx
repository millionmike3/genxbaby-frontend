"use client";

import { useEffect, useMemo, useState } from "react";
import { exportPDF } from "./exportPDF";
import { exportFullDashboardReport } from "./exportFullDashboardReport";
import ActorDrilldownModal from "./components/ActorDrilldownModal";

type AuditConsoleProps = {
  initialTimeline: any[];
  heatmap: {
    buckets: Record<string, number>;
    max: number;
  };
  fraudHeatmap: {
    buckets: Record<string, number>;
    max: number;
  };
  fraudScores: any[];
  adminScores: any[];
  anomalyScores: any[];
  actorRiskScores: any[];
  actorGraph: {
    nodes: any[];
    edges: any[];
  };
  userRole: string;
};

export default function AuditConsole({
  initialTimeline,
  heatmap,
  fraudHeatmap,
  fraudScores,
  adminScores,
  anomalyScores,
  actorRiskScores,
  actorGraph,
  userRole,
}: AuditConsoleProps) {
  const [timeline, setTimeline] = useState(initialTimeline);
  const [actorFilter, setActorFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [selected, setSelected] = useState<any | null>(null);
  const [actorDrilldown, setActorDrilldown] = useState<any | null>(null);
  // Real-time streaming (SSE)
  useEffect(() => {
    const es = new EventSource("/api/admin/audit/stream");

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setTimeline((prev) => [data, ...prev]);
      } catch (err) {
        console.error("Stream parse error:", err);
      }
    };

    es.onerror = () => {
      es.close();
    };

    return () => es.close();
  }, []);

  const filtered = useMemo(() => {
    return timeline.filter((item) => {
      const actor =
        item.details?.actor ||
        item.details?.wallet ||
        item.details?.address ||
        "";

      const ts = item.createdAt ? new Date(item.createdAt) : null;

      if (
        actorFilter &&
        !String(actor).toLowerCase().includes(actorFilter.toLowerCase())
      ) {
        return false;
      }

      if (
        eventFilter &&
        !item.action.toLowerCase().includes(eventFilter.toLowerCase())
      ) {
        return false;
      }

      if (fromDate && ts && ts < new Date(fromDate)) return false;
      if (toDate && ts && ts > new Date(toDate)) return false;

      return true;
    });
  }, [timeline, actorFilter, eventFilter, fromDate, toDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  function exportCSV() {
    const rows = filtered.map((item) => ({
      source: item.source,
      action: item.action,
      createdAt: item.createdAt,
      details: JSON.stringify(item.details),
    }));

    const header = "source,action,createdAt,details\n";

    const body = rows
      .map(
        (r) =>
          `${r.source},${r.action},${r.createdAt},${JSON.stringify(r.details).replace(
            /"/g,
            '""'
          )}`
      )
      .join("\n");

    const blob = new Blob([header + body], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_timeline.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="space-y-10">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
          placeholder="Filter by actor (wallet/address)"
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
        />

        <input
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
          placeholder="Filter by event type"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        />

        <input
          type="date"
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button
            onClick={exportCSV}
            className="px-3 py-2 text-xs rounded bg-slate-800 hover:bg-slate-700 border border-slate-600"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportPDF(filtered)}
            className="px-3 py-2 text-xs rounded bg-slate-800 hover:bg-slate-700 border border-slate-600"
          >
            Export PDF
          </button>

          <button
            onClick={() =>
              exportFullDashboardReport({
                timeline,
                heatmap,
                fraudHeatmap,
                fraudScores,
                adminScores,
                anomalyScores,
                actorRiskScores,
              })
            }
            className="px-3 py-2 text-xs rounded bg-slate-800 hover:bg-slate-700 border border-slate-600"
          >
            Export Full Dashboard PDF
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Showing {pageItems.length} of {filtered.length} events • Page {page} /{" "}
          {totalPages}
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Source</th>
              <th className="py-2">Action</th>
              <th className="py-2">Actor</th>
              <th className="py-2">Timestamp</th>
              <th className="py-2">Details</th>
            </tr>
          </thead>

          <tbody>
            {pageItems.map((item, idx) => {
              const actor =
                item.details?.actor ||
                item.details?.wallet ||
                item.details?.address ||
                "";

              return (
                <tr
                  key={idx}
                  className="border-b border-slate-800 hover:bg-slate-800/60 cursor-pointer"
                  onClick={() => setSelected(item)}
                >
                  <td className="py-2 text-slate-300">{item.source}</td>
                  <td className="py-2 text-slate-300">{item.action}</td>

                  <td
                    className="py-2 text-slate-300 font-mono break-all underline cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActorDrilldown(actor);
                    }}
                  >
                    {actor || "—"}
                  </td>

                  <td className="py-2 text-slate-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "—"}
                  </td>

                  <td className="py-2 text-slate-400">
                    <span className="inline-block px-2 py-1 rounded bg-slate-800 text-slate-300">
                      View
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 mt-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2 py-1 text-xs rounded bg-slate-800 disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-2 py-1 text-xs rounded bg-slate-800 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      {/* Activity Heatmap */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3">Activity Heatmap</h2>
        <p className="text-xs text-slate-400 mb-4">
          Darker cells indicate higher activity. Each cell represents one hour.
        </p>

        <div className="grid grid-cols-12 gap-1">
          {Object.entries(heatmap.buckets).map(([key, value]) => {
            const count = value as number; // ⭐ FIX
            const intensity = count / heatmap.max;
            const color = `rgba(16, 185, 129, ${Math.max(0.15, intensity)})`;

            const [year, month, day, hour] = key.split("-");
            const label = `${month}/${day}/${year} — ${hour}:00 (${count} events)`;

            return (
              <div
                key={key}
                className="h-6 rounded transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ backgroundColor: color }}
                title={label}
              ></div>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 mt-4 text-xs text-slate-400">
          <span>Low</span>
          <div className="flex-1 h-2 bg-gradient-to-r from-emerald-700/20 to-emerald-500"></div>
          <span>High</span>
        </div>
      </section>

      {/* Fraud Heatmap */}
      <section className="border border-rose-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3 text-rose-300">
          Fraud Heatmap
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Highlights hours with suspected fraud activity.
        </p>

        <div className="grid grid-cols-12 gap-1">
          {Object.entries(fraudHeatmap.buckets).map(([key, value]) => {
            const count = value as number; // ⭐ FIX
            const intensity = count / fraudHeatmap.max;
            const color = `rgba(244, 63, 94, ${Math.max(0.2, intensity)})`;

            const [year, month, day, hour] = key.split("-");
            const label = `${month}/${day}/${year} — ${hour}:00 (${count} fraud events)`;

            return (
              <div
                key={key}
                className="h-6 rounded transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ backgroundColor: color }}
                title={label}
              ></div>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 mt-4 text-xs text-slate-400">
          <span>Low</span>
          <div className="flex-1 h-2 bg-gradient-to-r from-rose-700/20 to-rose-500"></div>
          <span>High</span>
        </div>
      </section>
      {/* Fraud Scoring */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3">Fraud Scoring</h2>

        {fraudScores.length === 0 ? (
          <p className="text-slate-400 text-sm">No fraud indicators detected.</p>
        ) : (
          <ul className="space-y-2 text-xs text-slate-200">
            {fraudScores.map((f, idx) => (
              <li
                key={idx}
                className="border border-slate-700 rounded p-3 bg-slate-800/60"
              >
                <strong>Score:</strong> {f.score}
                <br />
                <strong>Action:</strong> {f.action}
                <pre className="mt-1 bg-slate-800/40 p-2 rounded text-[11px] whitespace-pre-wrap">
                  {JSON.stringify(f.details, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Admin Scoring */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3">Admin Activity Leaderboard</h2>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Admin</th>
              <th className="py-2">Score</th>
            </tr>
          </thead>

          <tbody>
            {adminScores.map((s, idx) => (
              <tr key={idx} className="border-b border-slate-800">
                <td className="py-2 text-slate-300">{s.actor}</td>
                <td className="py-2 text-slate-300">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Actor Risk Scorecard */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3">Actor Risk Scorecard</h2>

        {actorRiskScores.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No actors with computed risk scores.
          </p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2">Actor</th>
                <th className="py-2">Risk Score</th>
                <th className="py-2">Events</th>
              </tr>
            </thead>

            <tbody>
              {actorRiskScores.map((a, idx) => (
                <tr key={idx} className="border-b border-slate-800">
                  <td className="py-2 text-slate-300 font-mono break-all">
                    {a.actor}
                  </td>
                  <td className="py-2 text-slate-300">{a.score}</td>
                  <td className="py-2 text-slate-300">{a.events}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {/* Actor Relationship Graph */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3">
          Actor Relationship Graph (Wallet ↔ Checks ↔ Roles)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200">
          {/* Nodes */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Nodes</h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {actorGraph.nodes.map((n, idx) => (
                <li
                  key={idx}
                  className="border border-slate-700 rounded px-2 py-1 bg-slate-800/60"
                >
                  <span className="font-semibold">{n.type}:</span>{" "}
                  <span className="font-mono break-all">{n.id}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Edges */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Edges</h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {actorGraph.edges.map((e, idx) => (
                <li
                  key={idx}
                  className="border border-slate-700 rounded px-2 py-1 bg-slate-800/60"
                >
                  <span className="font-mono break-all">{e.from}</span>{" "}
                  <span className="text-slate-400">→</span>{" "}
                  <span className="font-mono break-all">{e.to}</span>{" "}
                  <span className="text-slate-500">({e.type})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* AI Anomaly Scores */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-3">AI Anomaly Scores</h2>

        {anomalyScores.length === 0 ? (
          <p className="text-slate-400 text-sm">No anomalies detected.</p>
        ) : (
          <ul className="space-y-2 text-xs text-slate-200">
            {anomalyScores.map((a, idx) => (
              <li
                key={idx}
                className="border border-slate-700 rounded p-3 bg-slate-800/60"
              >
                <strong>{a.type}</strong> — Score {a.score}
                <br />
                <strong>Action:</strong> {a.action}
                <pre className="mt-1 bg-slate-800/40 p-2 rounded text-[11px] whitespace-pre-wrap">
                  {JSON.stringify(a.details, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Actor Drilldown Modal */}
      {actorDrilldown && (
        <ActorDrilldownModal
          actor={actorDrilldown}
          timeline={timeline}
          userRole={userRole}
          onClose={() => setActorDrilldown(null)}
        />
      )}

      {/* View Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Audit Event Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-200">
              <div>
                <span className="font-semibold">Source:</span> {selected.source}
              </div>

              <div>
                <span className="font-semibold">Action:</span> {selected.action}
              </div>

              <div>
                <span className="font-semibold">Timestamp:</span>{" "}
                {selected.createdAt
                  ? new Date(selected.createdAt).toLocaleString()
                  : "—"}
              </div>

              <div>
                <span className="font-semibold">Details:</span>
                <pre className="mt-1 bg-slate-800/60 p-3 rounded text-[11px] whitespace-pre-wrap">
                  {JSON.stringify(selected.details, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
