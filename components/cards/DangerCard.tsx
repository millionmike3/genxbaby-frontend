export default function DangerCard({ message }) {
  return (
    <div className="bg-surface border border-danger rounded-md p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-danger"></div>
        <span className="text-danger font-medium">Transaction Failed</span>
      </div>

      <p className="text-textSecondary text-sm mt-2">{message}</p>
    </div>
  );
}
