"use client";
import { severityColors } from "./alertColors";

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}



interface AlertBadgeProps {
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
}

export default function AlertBadge({ severity }: AlertBadgeProps) {
  const colors: Record<AlertBadgeProps["severity"], string> = {
    HIGH: "bg-red-600 text-white",
    MEDIUM: "bg-yellow-500 text-black",
    LOW: "bg-green-600 text-white",
    INFO: "bg-blue-600 text-white"
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-semibold ${colors[severity]}`}
    >
      {severity}
    </span>
  );
}
