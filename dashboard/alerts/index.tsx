"use client";

import AlertsPanel from "./AlertsPanel";

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email?: string;
    apiUrl: string;   // ← REQUIRED
  };
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="p-6">
      <AlertsPanel apiUrl={user.apiUrl} ownerId={user.id} />
    </div>
  );
}
