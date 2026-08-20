"use client";

import { useState } from "react";
import AuditLogItem from "./AuditLogItem";
import AuditLogDetails from "./AuditLogDetails";

export default function AuditLogsDashboard({ data }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* LEFT SIDE — LOG LIST */}
      <div className="md:w-1/2 bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">Audit Logs</h2>

        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {(!data || data.length === 0) && (
            <p className="text-gray-500">No audit logs found.</p>
          )}

          {data &&
            data.map((log) => (
              <AuditLogItem
                key={log.id}
                log={log}
                onClick={() => setSelected(log)}
                isSelected={selected?.id === log.id}
              />
            ))}
        </div>
      </div>

      {/* RIGHT SIDE — DETAILS */}
      <div className="md:w-1/2 bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">Details</h2>

        {!selected && (
          <p className="text-gray-500">Select a log to view details.</p>
        )}

        {selected && <AuditLogDetails log={selected} />}
      </div>
    </div>
  );
}
