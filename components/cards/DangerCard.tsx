"use client";

interface DangerCardProps {
  message: string;
}

export default function DangerCard({ message }: DangerCardProps) {
  return (
    <div className="bg-surface border border-danger rounded-md p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="text-danger font-semibold text-lg">⚠️</div>
        <div className="text-textPrimary text-sm">{message}</div>
      </div>
    </div>
  );
}
