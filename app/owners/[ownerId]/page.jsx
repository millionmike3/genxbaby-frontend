import { OwnerRiskProfile } from "@/components/risk/OwnerRiskProfile";

export default async function Page({ params }) {
  const { ownerId } = params;

  const dashboardRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/risk/dashboard/${ownerId}`,
    { cache: "no-store" }
  );
  const dashboard = await dashboardRes.json();

  const riskHistoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/risk/history/${ownerId}`,
    { cache: "no-store" }
  );
  const riskHistory = await riskHistoryRes.json();

  const pricingHistoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pricing/history/${ownerId}`,
    { cache: "no-store" }
  );
  const pricingHistory = await pricingHistoryRes.json();

  const banksRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/banking/list/${ownerId}`,
    { cache: "no-store" }
  );
  const banks = await banksRes.json();

  return (
    <div className="p-6">
      <OwnerRiskProfile
        ownerId={ownerId}
        dashboard={dashboard}
        riskHistory={riskHistory}
        pricingHistory={pricingHistory}
        banks={banks}
      />
    </div>
  );
}
