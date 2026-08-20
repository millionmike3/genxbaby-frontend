import { RiskTierEditor } from "@/components/risk/RiskTierEditor";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/risk/tiers`,
    { cache: "no-store" }
  );

  const tiers = await res.json();

  return (
    <div className="p-6">
      <RiskTierEditor tiers={tiers} />
    </div>
  );
}
