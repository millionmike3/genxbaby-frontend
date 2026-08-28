"use client";

interface DataCardProps {
  label: string;
  value: string | number;
  change?: string | number;
}

export default function DataCard({ label, value, change }: DataCardProps) {
  return (
    <div className="bg-surface border border-border rounded-md p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-textPrimary font-medium">{label}</span>
        <span className="text-textSecondary">{value}</span>
      </div>

      {change !== undefined && (
        <div className="text-electricBlue text-sm mt-2">
          {change}
        </div>
      )}
    </div>
  );
}
