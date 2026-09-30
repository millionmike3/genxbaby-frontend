type Props = {
  data: {
    underwriterId: string;
    frames: {
      t: number;
      decision: string;
      riskScore: number;
      fraudScore: number;
      bias: number;
      speed: number;
      createdAt: Date;
    }[];
  };
};

export default function UnderwriterReplayTimeline({ data }: Props) {
  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#4EE38A]">
        Behavioral Replay Timeline
      </h2>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2 text-left">t</th>
            <th className="py-2 text-left">Decision</th>
            <th className="py-2 text-left">Risk</th>
            <th className="py-2 text-left">Fraud</th>
            <th className="py-2 text-left">Bias</th>
            <th className="py-2 text-left">Speed (ms)</th>
            <th className="py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.frames.map((f) => (
            <tr key={f.t} className="border-b border-slate-800">
              <td className="py-2">{f.t}</td>
              <td className="py-2">{f.decision}</td>
              <td className="py-2">{f.riskScore}</td>
              <td className="py-2">{f.fraudScore}</td>
              <td className="py-2">{f.bias}</td>
              <td className="py-2">{f.speed}</td>
              <td className="py-2">{new Date(f.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
