import { CheckHistoryItem } from "./history/types";

export default async function ChecksPage() {
  // Fetch checks from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checks`, {
    cache: "no-store",
  });

  const checks: CheckHistoryItem[] = await res.json();

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-4 py-2">Check #</th>
          <th className="border px-4 py-2">Payee</th>
          <th className="border px-4 py-2">Amount</th>
        </tr>
      </thead>

      <tbody>
        {checks.map((c) => (
          <tr key={c.id}>
            <td className="border px-4 py-2">{c.checkNumber}</td>
            <td className="border px-4 py-2">{c.payee}</td>
            <td className="border px-4 py-2">${c.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
