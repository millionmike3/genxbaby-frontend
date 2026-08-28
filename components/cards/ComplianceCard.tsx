"use client";

import { ShieldAlert } from "lucide-react";

interface ComplianceCardProps {
  title: string;
  message: string;
  severity?: "low" | "medium" | "high";
}

export default function ComplianceCard(props: ComplianceCardProps) {
  const { title, message, severity = "medium" } = props;

  const severityStyles = {
    low: {
      border: "border-green-300",
      bg: "bg-green-50",
      text: "text-green-700",
    },
    medium: {
      border: "border-yellow-300",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
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
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${style.text} bg-opacity-10 bg-current`}>
          <ShieldAlert size={20} />
        </div>

        <span className={`font-semibold text-lg ${style.text}`}>
          {title}
        </span>
      </div>

      <p className="text-sm text-neutral-700 mt-3 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
