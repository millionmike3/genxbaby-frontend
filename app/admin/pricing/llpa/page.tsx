
import { requireRole } from "@/lib/auth";

export default async function LLPAAdminPage() {
  await requireRole(["admin"]);

  const res = await fetch("http://localhost:3000/api/pricing/llpa");
  const llpa = await res.json();

  return (
    <main className="min-h-screen bg-slate-900 text-white px-10 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">LLPA Grid</h1>

      <div className="overflow-auto border border-neutral-700 rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3">FICO / LTV</th>
              {Object.keys(llpa["fico_740"]).map((ltv) => (
                <th key={ltv} className="p-3">{ltv.replace("ltv_", "")}%</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.keys(llpa).map((fico) => (
              <tr key={fico} className="border-t border-neutral-700">
                <td className="p-3">{fico.replace("fico_", "")}</td>
                {Object.values(llpa[fico]).map((value, idx) => (
                  <td key={idx} className="p-3 text-[#3CF46B] font-bold">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
