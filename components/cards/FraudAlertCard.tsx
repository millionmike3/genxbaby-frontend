"use client";

import { AlertTriangle } from "lucide-react";

interface FraudAlertCardProps {
  title: string;
  message: string;
  severity?: "low" | "medium" | "high";
}

export default function FraudAlertCard({
  title,
  message,
  severity = "high",
}: FraudAlertCardProps) {
  const severityStyles = {
    low: {
      border: "border-yellow-300",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    medium: {
      border: "border-orange-300",
      bg: "bg-orange-50",
      text: "text-orange-700",
    },
    high: {
      border: "border-red-400",
      bg: "bg-red-50",
      text: "text-red-700",
    },
  };

  const style = severityStyles[severity];

  return (
    <div
      className={`rounded-md p-5 shadow-card border ${style.border} ${style.bg} transition-all duration-200`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${style.text} bg-opacity-10 bg-current`}>
          <AlertTriangle size={20} />
        </div>

        <span className={`font-semibold text-lg ${style.text}`}>
          {title}
        </span>
      </div>

      {/* Message */}
      <p className="text-sm text-neutral-700 mt-3 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
