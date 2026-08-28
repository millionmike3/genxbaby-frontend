"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Clock } from "lucide-react";

interface UnderwritingCardProps {
  id: string;
  borrowerName: string;
  loanAmount: number;
  status: "approved" | "pending" | "declined";
  score: number;
  createdAt: string;
}

export default function UnderwritingCard({
  id,
  borrowerName,
  loanAmount,
  status,
  score,
  createdAt,
}: UnderwritingCardProps) {
  const statusConfig = {
    approved: {
      label: "Approved",
      color: "text-green-600",
      bg: "bg-green-100",
      icon: <ShieldCheck size={20} />,
    },
    pending: {
      label: "Pending Review",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: <Clock size={20} />,
    },
    declined: {
      label: "Declined",
      color: "text-red-600",
      bg: "bg-red-100",
      icon: <AlertTriangle size={20} />,
    },
  };

  const cfg = statusConfig[status];

  return (
    <div className="w-full rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">
            {borrowerName}
          </h3>

          <p className="text-sm text-neutral-500">
            Underwriting ID: {id}
          </p>
        </div>

        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${cfg.bg} ${cfg.color}`}>
          {cfg.icon}
          <span className="text-sm font-medium">{cfg.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">Loan Amount</p>
          <p className="text-xl font-bold text-neutral-800">
            ${loanAmount.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">Risk Score</p>
          <p
            className={`text-xl font-bold ${
              score >= 75
                ? "text-green-600"
                : score >= 50
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {score}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-neutral-400">
        Created: {new Date(createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
