import { PricingHistoryView } from "@/components/risk/PricingHistoryView";

export default async function Page({ params }) {
  const { ownerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pricing/history/${ownerId}`,
    { cache: "no-store" }
  );

  const history = await res.json();

  return (
    <div className="p-6">
      <PricingHistoryView history={history} />
    </div>
  );
}
