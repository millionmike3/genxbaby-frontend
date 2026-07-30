"use client";

import { useEffect, useState } from "react";

export default function AuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const [actor, setActor] = useState("");
  const [action, setAction] = useState("");
  const [target, setTarget] = useState("");
  const [q, setQ] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [detail, setDetail] = useState<any | null>(null);

  async function load() {
    setLoading(true);

    const base = process.env.NEXT_PUBLIC_UNDERWRITING_API;
    const params = new URLSearchParams();

    if (actor) params.set("actor", actor);
    if (action) params.set("action", action);
    if (target) params.set("target", target);
    if (q) params.set("q", q);
    if (start) params.set("start", start);
    if (end) params.set("end", end);

    params.set("page", String(page));

    const res = await fetch(`${base}/api/admin/audit/list?${params}`, {
      headers: { "x-user-id": localStorage.getItem("userId") || "" }
    });

    const json = await res.json();
    setLogs(json.logs || []);
    setTotal(json.total || 0);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [page]);

  function resetFilters() {
    setActor("");
    setAction("");
    setTarget("");
    setQ("");
    setStart("");
    setEnd("");
    setPage(1);
    load();
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Audit Log</h1>

      {/* Export Buttons */}
      <div className="flex space-x-4">
        <a
          href={`${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/audit/export`}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download CSV
        </a>

        <a
          href={`${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/audit/export-json`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Export JSON
        </a>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded p-4 bg-gray-50">
        <input className="border p-2" placeholder="Actor" value={actor} onChange={(e) => setActor(e.target.value)} />
        <input className="border p-2" placeholder="Action" value={action} onChange={(e) => setAction(e.target.value)} />
        <input className="border p-2" placeholder="Target" value={target} onChange={(e) => setTarget(e.target.value)} />

        <input className="border p-2 md:col-span-3" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />

        <div className="flex space-x-2 md:col-span-3">
          <input type="date" className="border p-2 flex-1" value={start} onChange={(e) => setStart(e.target.value)} />
          <input type="date" className="border p-2 flex-1" value={end} onChange={(e) => setEnd(e.target.value)} />
          <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded">Apply</button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading audit logs…</div>
      ) : logs.length === 0 ? (
        <div>No audit logs found.</div>
      ) : (
        <div className="overflow-auto border rounded bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Actor</th>
                <th className="p-3">Action</th>
                <th className="p-3">Target</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-3">{log.id}</td>
                  <td className="p-3">{log.actor}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.target}</td>
                  <td className="p-3">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setDetail(log)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex space-x-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold">Audit Log Details</h2>

            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(detail, null, 2)}
            </pre>

            <button
              onClick={() => setDetail(null)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
