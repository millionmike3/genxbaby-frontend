"use client";

import { useState } from "react";

export default function PricingHistoryTimeline({ history }) {
  const [selected, setSelected] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <p className="text-gray-500">No pricing history available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* LEFT SIDE — TIMELINE LIST */}
      <div className="md:w-1/2 bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">Pricing History Timeline</h2>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`p-3 border rounded cursor-pointer ${
                selected?.id === item.id
                  ? "bg-blue-50 border-blue-400"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <p className="font-medium">
                {new Date(item.timestamp).toLocaleString()}
              </p>

              <p className="text-sm text-gray-600">
                {item.reason || "Pricing update"}
              </p>

              <p className="text-sm">
                New Price:{" "}
                <span className="font-semibold">${item.newPrice}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — DETAILS */}
      <div className="md:w-1/2 bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">Details</h2>

        {!selected && (
          <p className="text-gray-500">Select an entry to view details.</p>
        )}

        {selected && (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Timestamp</p>
              <p className="font-medium">
                {new Date(selected.timestamp).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Reason</p>
              <p className="font-medium">{selected.reason || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Old Price</p>
              <p className="font-medium">${selected.oldPrice}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">New Price</p>
              <p className="font-medium">${selected.newPrice}</p>
            </div>

            {selected.metadata && (
              <div>
                <p className="text-sm text-gray-500">Metadata</p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(selected.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
