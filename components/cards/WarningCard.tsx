"use client";

interface WarningCardProps {
  message: string;
}

export default function WarningCard({ message }: WarningCardProps) {
  return (
    <div className="bg-surface border border-warning rounded-md p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-warning"></div>
        <span className="text-warning font-medium">Risk Review</span>
      </div>

      <p className="text-textSecondary text-sm mt-2">{message}</p>
    </div>
  );
}
