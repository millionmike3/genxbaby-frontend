"use client";

import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import OwnersPage from "../owners/OwnersPage";
import AlertsPanel from "./AlertsPanel";

interface AppDashboardProps {
  apiUrl: string;
}

export default function AppDashboard({ apiUrl }: AppDashboardProps) {
  const [page, setPage] = useState("owners");

  return (
    <div className="flex">
      <Sidebar onNavigate={setPage} />

      <div className="flex-1 p-6">
        {page === "owners" && <OwnersPage apiUrl={apiUrl} />}
        {page === "alerts" && <AlertsPanel apiUrl={apiUrl} ownerId="admin" />}
      </div>
    </div>
  );
}
