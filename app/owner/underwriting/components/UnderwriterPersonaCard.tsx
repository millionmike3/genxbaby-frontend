type Props = {
  data: { underwriterId: string; persona: string }[];
};

export default function UnderwriterPersonaCard({ data }: Props) {
  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#4EE38A]">Risk Personas</h2>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-2 text-left">Underwriter</th>
            <th className="py-2 text-left">Persona</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.underwriterId} className="border-b border-slate-800">
              <td className="py-2">{u.underwriterId}</td>
              <td className="py-2 text-[#4EE38A] font-bold">{u.persona}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
