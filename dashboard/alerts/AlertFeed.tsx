"use client";

import AlertBadge from "./AlertBadge";

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}



interface AlertFeedProps {
  alerts: Alert[];
}

export default function AlertFeed({ alerts }: AlertFeedProps) {
  return (
    <div className="bg-white rounded shadow p-4 border">
      <h2 className="text-lg font-bold mb-4">Fraud Alerts</h2>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3">
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
    </div>
  );
}
