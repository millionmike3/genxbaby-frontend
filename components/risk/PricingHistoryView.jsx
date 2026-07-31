import { PricingHistoryTimeline } from "./PricingHistoryTimeline";

export function PricingHistoryView({ history }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pricing History</h1>
      <PricingHistoryTimeline history={history} />
    </div>
  );
}
