import { IncomeVerificationView } from "@/components/risk/IncomeVerificationView";

export default async function Page({ params }) {
  const { ownerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/income-verification/${ownerId}/history`,
    { cache: "no-store" }
  );

  const history = await res.json();

  return (
    <div className="p-6">
      <IncomeVerificationView ownerId={ownerId} history={history} />
    </div>
  );
}
