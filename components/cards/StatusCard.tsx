"use client";

interface StatusCardProps {
  status: string;
}

export default function StatusCard({ status }: StatusCardProps) {
  return (
    <div className="bg-surface border border-border rounded-md p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-electricBlue"></div>
        <span className="text-electricBlue font-medium">Status</span>
      </div>

      <p className="text-textSecondary text-sm mt-2">{status}</p>
    </div>
  );
}
