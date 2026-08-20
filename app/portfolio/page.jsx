import { PortfolioRiskDashboard } from "@/components/risk/PortfolioRiskDashboard";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolio/risk-summary`,
    { cache: "no-store" }
  );

  const summary = await res.json();

  return (
    <div className="p-6">
      <PortfolioRiskDashboard summary={summary} />
    </div>
  );
}
