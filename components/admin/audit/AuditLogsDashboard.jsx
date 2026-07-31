import AuditLogItem from "./AuditLogItem";
import AuditLogDetails from "./AuditLogDetails";
import { useState } from "react";

export default function AuditLogsDashboard({ data }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neon-green">
        Admin Audit Log Dashboard
      </h1>

      <p className="text-gray-400">
        Application ID: <span className="text-white">{data.applicationId}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: List of audit logs */}
        <div className="bg-graphite p-4 rounded-lg shadow max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-neon-green mb-4">
            Audit History ({data.count})
          </h2>

          {data.logs.map((log) => (
            <AuditLogItem
              key={log.id}
              log={log}
              onSelect={() => setSelected(log)}
              selected={selected?.id === log.id}
            />
          ))}
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2">
          {selected ? (
            <AuditLogDetails log={selected} />
          ) : (
            <div className="bg-graphite p-6 rounded-lg shadow text-gray-400">
              Select an audit entry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
