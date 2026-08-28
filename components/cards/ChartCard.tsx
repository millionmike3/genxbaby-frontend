"use client";

import React from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode; // your chart goes here
}

export default function ChartCard({
  title,
  description,
  children,
}: ChartCardProps) {
  return (
    <div className="w-full rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-500 mt-1">{description}</p>
        )}
      </div>

      {/* Chart Container */}
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
