export default function AuditLogDetails({ log }) {
  return (
    <div className="bg-graphite p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold text-neon-green">
        Audit Log Details
      </h2>

      {/* Decision */}
      <section>
        <h3 className="text-lg font-semibold text-gray-200">Decision</h3>
        <p className="text-gray-300"><strong>Status:</strong> {log.decision.status}</p>
        <p className="text-gray-300"><strong>Tier:</strong> {log.decision.tier}</p>
        <p className="text-gray-300"><strong>Rate:</strong> {log.decision.rate}%</p>
        <p className="text-gray-300"><strong>Notes:</strong> {log.decision.notes}</p>
      </section>

      {/* Risk */}
      <section>
        <h3 className="text-lg font-semibold text-gray-200">Risk Snapshot</h3>
        <p className="text-gray-300"><strong>Risk Tier:</strong> {log.risk.tier}</p>
        <p className="text-gray-300"><strong>Risk Score:</strong> {log.risk.score}</p>

        <h4 className="text-md text-gray-400 mt-2">Fraud Signals</h4>
        <ul className="list-disc ml-6 text-red-400">
          {log.risk.fraudSignals.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      {/* Merkle */}
      <section>
        <h3 className="text-lg font-semibold text-gray-200">Merkle Snapshot</h3>
        <p className="text-gray-300 break-all">
          <strong>Leaf:</strong> {log.merkle.leaf}
        </p>
        <p className="text-gray-300 break-all">
          <strong>Root:</strong> {log.merkle.root}
        </p>

        <pre className="text-xs text-gray-400 bg-black p-2 rounded-lg overflow-x-auto mt-2">
          {JSON.stringify(log.merkle.tree, null, 2)}
        </pre>
      </section>

      {/* Polygon */}
      <section>
        <h3 className="text-lg font-semibold text-gray-200">Polygon Anchoring</h3>
        <p className="text-gray-300 break-all">
          <strong>Tx Hash:</strong> {log.anchor.txHash || "N/A"}
        </p>
        <p className="text-gray-300">
          <strong>Block:</strong> {log.anchor.block || "N/A"}
        </p>
        <p className="text-gray-300">
          <strong>Success:</strong> {log.anchor.success ? "Yes" : "No"}
        </p>

        {log.anchor.txHash && (
          <a
            href={`https://amoy.polygonscan.com/tx/${log.anchor.txHash}`}
            target="_blank"
            className="text-neon-green underline mt-4 inline-block"
          >
            View on PolygonScan
          </a>
        )}
      </section>
    </div>
  );
}
