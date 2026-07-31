export function UnderwritingDecision({ dashboard }) {
  const { tier, pricingPreview } = dashboard;

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-2">
      <h2 className="text-xl font-semibold">Underwriting Decision</h2>

      <div className="text-sm">
        <span className="font-semibold">Tier:</span> {tier}
      </div>

      <div className="text-sm">
        <span className="font-semibold">Final Rate:</span>{" "}
        {pricingPreview.finalRatePercent}%
      </div>

      <div className="text-sm text-gray-600">
        Base {pricingPreview.baseRatePercent}% · Margin{" "}
        {pricingPreview.marginPercent}%
      </div>
    </div>
  );
}
