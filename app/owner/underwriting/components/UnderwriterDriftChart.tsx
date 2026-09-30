type Props = {
  data: {
    underwriterId: string;
    riskDrift: number;
    fraudDrift: number;
    decisionDrift: number;
    speedDrift: number;
    biasDrift: number;
  }[];
};

export default function UnderwriterDriftChart({ data }: Props) {
  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#4EE38A]">Behavioral Drift</h2>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2 text-left">Underwriter</th>
            <th className="py-2 text-left">Risk Drift</th>
            <th className="py-2 text-left">Fraud Drift</th>
            <th className="py-2 text-left">Decision Drift</th>
            <th className="py-2 text-left">Speed Drift</th>
            <th className="py-2 text-left">Bias Drift</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.underwriterId} className="border-b border-slate-800">
              <td className="py-2">{u.underwriterId}</td>
              <td className="py-2">{u.riskDrift.toFixed(3)}</td>
              <td className="py-2">{u.fraudDrift.toFixed(3)}</td>
              <td className="py-2">{u.decisionDrift.toFixed(3)}</td>
              <td className="py-2">{u.speedDrift.toFixed(3)}</td>
              <td className="py-2">{u.biasDrift.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
