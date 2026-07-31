import { RiskHistoryTimeline } from "./RiskHistoryTimeline";
import { RiskHistoryChart } from "./RiskHistoryChart";

export function RiskHistoryView({ history }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Risk History</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskHistoryChart history={history} />
        </div>
        <div className="lg:col-span-1">
          <RiskHistoryTimeline history={history} />
        </div>
      </div>
    </div>
  );
}
