"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionCardProps {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  description?: string;
}

export default function TransactionCard({
  id,
  type,
  amount,
  date,
  description,
}: TransactionCardProps) {
  const isCredit = type === "credit";

  return (
    <div className="w-full rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        {/* Icon + Description */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isCredit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {isCredit ? (
              <ArrowDownLeft size={20} />
            ) : (
              <ArrowUpRight size={20} />
            )}
          </div>

          <div>
            <p className="font-semibold text-neutral-800">
              {description || (isCredit ? "Credit" : "Debit")}
            </p>
            <p className="text-sm text-neutral-500">{date}</p>
          </div>
        </div>

        {/* Amount */}
        <div
          className={`text-lg font-bold ${
            isCredit ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCredit ? "+" : "-"}${amount.toLocaleString()}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-neutral-400">Transaction ID: {id}</div>
    </div>
  );
}
