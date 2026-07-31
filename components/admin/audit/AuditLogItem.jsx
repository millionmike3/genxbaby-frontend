export default function AuditLogItem({ log, onSelect, selected }) {
  return (
    <div
      onClick={onSelect}
      className={`p-3 mb-3 rounded-lg cursor-pointer border 
        ${selected ? "border-neon-green bg-black" : "border-gray-700 bg-graphite"}
      `}
    >
      <p className="text-sm text-gray-300">
        <strong>Status:</strong> {log.decision.status}
      </p>
      <p className="text-sm text-gray-300">
        <strong>Tier:</strong> {log.decision.tier}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(log.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
