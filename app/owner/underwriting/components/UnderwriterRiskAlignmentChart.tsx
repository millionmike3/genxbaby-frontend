type Props = {
  data: {
    underwriterId: string;
    alignmentRate: number;
    misalignmentRate: number;
    criticalRate: number;
  }[];
};

export default function UnderwriterRiskAlignmentChart({ data }: Props) {
  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#4EE38A]">Risk Alignment</h2>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2 text-left">Underwriter</th>
            <th className="py-2 text-left">Aligned (%)</th>
            <th className="py-2 text-left">Misaligned (%)</th>
            <th className="py-2 text-left">Critical (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.underwriterId} className="border-b border-slate-800">
              <td className="py-2">{u.underwriterId}</td>
              <td className="py-2 text-green-400">{u.alignmentRate.toFixed(1)}</td>
              <td className="py-2 text-yellow-300">{u.misalignmentRate.toFixed(1)}</td>
              <td className="py-2 text-red-400">{u.criticalRate.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
