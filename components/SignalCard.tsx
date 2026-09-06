"use client";

interface SignalCardProps {
  title: string;
  value: number | string | null;
  status?: string;        // added
  description?: string;   // added
}

export default function SignalCard({
  title,
  value,
  status,
  description,
}: SignalCardProps) {
  // Determine color based on status
  function getStatusColor(status: string | undefined) {
    if (!status) return "text-gray-400";

    const s = status.toLowerCase();

    if (s.includes("good")) return "text-green-500";
    if (s.includes("warn")) return "text-yellow-500";
    return "text-red-500";
  }

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow">
      <h2 className="text-lg font-semibold mb-2 text-white">{title}</h2>

      <div className="text-4xl font-bold text-white mb-3">
        {value ?? "—"}
      </div>

      {description && (
        <p className="text-gray-400 text-sm mb-3">{description}</p>
      )}

      {status && (
        <span className={`text-sm font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      )}
    </div>
  );
}
