import { RiskHistoryView } from "@/components/risk/RiskHistoryView";

export default async function Page({ params }) {
  const { ownerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/risk/history/${ownerId}`,
    { cache: "no-store" }
  );

  const history = await res.json();

  return (
    <div className="p-6">
      <RiskHistoryView history={history} />
    </div>
  );
}
