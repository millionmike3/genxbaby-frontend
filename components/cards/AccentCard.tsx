"use client";

import { ReactNode } from "react";

interface AccentCardProps {
  title: string;
  children: ReactNode;
}

export default function AccentCard(
  { title, children }: AccentCardProps
) {
  return (
    <div className="bg-surface border border-electricBlue rounded-md p-5 shadow-card">
      <h3 className="text-electricBlue font-semibold text-lg">{title}</h3>
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}
