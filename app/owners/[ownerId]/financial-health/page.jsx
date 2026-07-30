import { FinancialHealthView } from "@/components/risk/FinancialHealthView";

export default async function Page({ params }) {
  const { ownerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/financial-health/${ownerId}/history`,
    { cache: "no-store" }
  );

  const history = await res.json();

  return (
    <div className="p-6">
      <FinancialHealthView ownerId={ownerId} history={history} />
    </div>
  );
}
