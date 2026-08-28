"use client";

import { ReactNode } from "react";

interface BaseCardProps {
  title: string;
  children: ReactNode;
}

export default function BaseCard(
  { title, children }: BaseCardProps
) {
  return (
    <div className="bg-surface border border-border rounded-md shadow-card p-6">
      <h3 className="text-textPrimary font-semibold text-lg">{title}</h3>
      <div className="text-textSecondary text-sm mt-2">
        {children}
      </div>
    </div>
  );
}
