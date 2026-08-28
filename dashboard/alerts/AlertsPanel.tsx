"use client";

import { useEffect, useState } from "react";
import { initAlertsSocket } from "./alerts.socket";
import AlertToast from "./AlertToast";
import AlertFeed from "./AlertFeed";

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}


interface AlertsPanelProps {
  apiUrl: string;
  ownerId: string;
}

export default function AlertsPanel({ apiUrl, ownerId }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [toast, setToast] = useState<Alert | null>(null);

  useEffect(() => {
    const socket = initAlertsSocket(`${apiUrl}/alerts/stream`, (incoming) => {
      setAlerts((prev) => [incoming, ...prev]);
      setToast(incoming);

      setTimeout(() => setToast(null), 5000);
    });

    return () => socket.close();
  }, [apiUrl]);

  return (
    <>
      {toast && <AlertToast alert={toast} />}
      <AlertFeed alerts={alerts} />
    </>
  );
}
