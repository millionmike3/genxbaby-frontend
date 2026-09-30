type Props = {
  data: {
    underwriterId: string;
    riskAnomaly: number;
    fraudAnomaly: number;
    decisionAnomaly: number;
    biasAnomaly: number;
    speedAnomaly: number;
    totalAnomalyScore: number;
  }[];
};

export default function UnderwriterAnomalyChart({ data }: Props) {
  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#4EE38A]">Anomaly Detection</h2>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2 text-left">Underwriter</th>
            <th className="py-2 text-left">Risk</th>
            <th className="py-2 text-left">Fraud</th>
            <th className="py-2 text-left">Decision</th>
            <th className="py-2 text-left">Bias</th>
            <th className="py-2 text-left">Speed</th>
            <th className="py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.underwriterId} className="border-b border-slate-800">
              <td className="py-2">{u.underwriterId}</td>
              <td className="py-2">{u.riskAnomaly.toFixed(2)}</td>
              <td className="py-2">{u.fraudAnomaly.toFixed(2)}</td>
              <td className="py-2">{u.decisionAnomaly.toFixed(2)}</td>
              <td className="py-2">{u.biasAnomaly.toFixed(2)}</td>
              <td className="py-2">{u.speedAnomaly.toFixed(2)}</td>
              <td className="py-2 text-[#4EE38A] font-bold">
                {u.totalAnomalyScore.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
