"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminDashboardPage() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/notifications/stream`;

    const events = new EventSource(url);

    events.onopen = () => {
      setConnected(true);
      toast.success("Real-time admin notifications connected");
    };

    events.onerror = () => {
      setConnected(false);
      toast.error("Notification stream disconnected");
    };

    events.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          data.forEach((n) => {
            toast(n.message);
          });
        }
      } catch (err) {
        // Ignore malformed events
      }
    };

    return () => events.close();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold gx-text-primary">
        Admin Dashboard
      </h1>

      <div className="gx-card p-4">
        <p className="gx-text-secondary">
          Notification Stream:{" "}
          {connected ? (
            <span className="text-green-400 font-semibold">Connected</span>
          ) : (
            <span className="text-red-400 font-semibold">Disconnected</span>
          )}
        </p>
      </div>

      <div className="gx-card p-6 space-y-4">
        <h2 className="text-xl font-semibold gx-text-primary">
          System Overview
        </h2>

        <p className="gx-text-secondary">
          Real-time updates will appear as toast notifications whenever:
        </p>

        <ul className="list-disc pl-6 gx-text-secondary space-y-1">
          <li>Applications are approved</li>
          <li>Applications are rejected</li>
          <li>Underwriting is anchored</li>
          <li>Batches are anchored</li>
          <li>Audit logs are exported</li>
          <li>Admin actions occur</li>
        </ul>
      </div>
    </div>
  );
}
