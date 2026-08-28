"use client";

import AlertBadge from "./AlertBadge";

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}



interface AlertListProps {
  alerts: Alert[];
}

export default function AlertList({ alerts }: AlertListProps) {
  if (!alerts.length) {
    return <p className="text-gray-500">No alerts found.</p>;
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow">
          <AlertBadge severity={alert.severity} />

          <div>
            <p className="font-semibold text-black">{alert.message}</p>
            <p className="text-gray-500 text-sm">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
