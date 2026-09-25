type InsightsProps = {
  score: {
    overallScore: number;
    equityScore: number;
    cashflowScore: number;
    riskScore: number;
    dscrScore: number;
    diversificationScore: number;
  };
  valuation: {
    totalValue: number;
    impliedCapRate: number;
    impliedNOI: number;
    riskAdjustedValue: number;
  };
  propertiesCount: number;
  mortgagesCount: number;
};

export default function PortfolioInsights({
  score,
  valuation,
  propertiesCount,
  mortgagesCount,
}: InsightsProps) {
  const insights: string[] = [];

  if (score.riskScore < 60) {
    insights.push(
      "Risk score is elevated. Consider reducing leverage or refinancing high‑LTV loans."
    );
  }

  if (score.cashflowScore < 50) {
    insights.push(
      "Cashflow score is moderate. Review expenses and rent roll to improve NOI."
    );
  }

  if (score.diversificationScore < 50) {
    insights.push(
      "Portfolio is concentrated. Explore adding properties in new markets or asset types."
    );
  }

  if (valuation.impliedCapRate < 5) {
    insights.push(
      "Implied cap rate is low. Market may be rich—evaluate whether to harvest gains."
    );
  }

  if (valuation.riskAdjustedValue < valuation.totalValue * 0.9) {
    insights.push(
      "Risk‑adjusted value is meaningfully below total value. Risk premium is impacting valuation."
    );
  }

  if (propertiesCount === 0 && mortgagesCount > 0) {
    insights.push(
      "You hold mortgage assets without direct property exposure. Consider balancing with real estate equity."
    );
  }

  if (insights.length === 0) {
    insights.push("Portfolio is balanced with healthy risk and cashflow metrics.");
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="text-xl font-semibold mb-4">Portfolio Insights</h3>
      <ul className="space-y-2 text-sm text-slate-200">
        {insights.map((text, idx) => (
          <li key={idx} className="border border-slate-700 rounded-lg px-3 py-2">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
