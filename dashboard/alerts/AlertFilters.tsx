"use client";

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}


interface AlertFiltersProps {
  alerts: Alert[];
  onFilter: (filtered: Alert[]) => void;
}

export default function AlertFilters({ alerts, onFilter }: AlertFiltersProps) {
  function filterBySeverity(sev: string) {
    if (sev === "ALL") {
      onFilter(alerts);
    } else {
      onFilter(alerts.filter((a) => a.severity === sev));
    }
  }

  return (
    <div className="gx-card p-4 rounded-xl mb-4 flex gap-3">
      {["ALL", "HIGH", "MEDIUM", "LOW", "INFO"].map((sev) => (
        <button
          key={sev}
          onClick={() => filterBySeverity(sev)}
          className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm"
        >
          {sev}
        </button>
      ))}
    </div>
  );
}
