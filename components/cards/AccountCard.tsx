"use client";

import { ReactNode } from "react";

interface AccountCardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: ReactNode;
}

export default function AccountCard({
  title,
  subtitle,
  children,
  icon,
}: AccountCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-card">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="text-electricBlue text-xl">
            {icon}
          </div>
        )}

        <div>
          <h3 className="text-textPrimary font-semibold text-lg">
            {title}
          </h3>

          {subtitle && (
            <p className="text-textSecondary text-sm mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}
