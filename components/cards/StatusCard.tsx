export default function StatusCard({ status }) {
  return (
    <div className="bg-surface border border-border rounded-md p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-success"></div>
        <span className="text-textPrimary font-medium">{status}</span>
      </div>

      <p className="text-textSecondary text-sm mt-2">
        All identity checks have passed.
      </p>
    </div>
  );
}
