export default function DataCard({ label, value, change }) {
  return (
    <div className="bg-surface border border-border rounded-md p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-textSecondary text-sm">{label}</span>
        <span className="text-success text-sm font-medium">{change}</span>
      </div>

      <div className="text-textPrimary font-semibold text-2xl mt-2">
        {value}
      </div>

      <div className="text-textMuted text-xs mt-1">
        Updated moments ago
      </div>
    </div>
  );
}
