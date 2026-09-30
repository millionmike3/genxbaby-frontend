import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

// VISX CHARTS
import FraudTrendChart from "./components/FraudTrendChart";
import RiskHistogram from "./components/RiskHistogram";
import ImpScatter from "./components/ImpScatter";
import DecisionDonut from "./components/DecisionDonut";
import ApplicationVelocityChart from "./components/ApplicationVelocityChart";
import FraudRiskHeatmap from "./components/FraudRiskHeatmap";
import { kmeans } from "./utils/kmeans";
import RiskPersonaClusters from "./components/RiskPersonaClusters";
import UnderwriterProductivityChart from "./components/UnderwriterProductivityChart";
import PipelineFunnelChart from "./components/PipelineFunnelChart";
import { fraudClusterEngine } from "./utils/fraudCluster";
import FraudClusterMap from "./components/FraudClusterMap";
import BehavioralTrajectoryMap from "./components/BehavioralTrajectoryMap";
import PortfolioBehavioralMap from "./components/PortfolioBehavioralMap";
import BehavioralVolatilityGauge from "./components/BehavioralVolatilityGauge";
import { computeBehavioralVolatilityIndex } from "./utils/bvi";
import { computeUPIMetrics } from "./utils/upi"
import UnderwriterPerformanceDashboard from "./components/UnderwriterPerformanceDashboard";


export default async function UnderwritingDashboard() {
  const prisma = getPrisma();

  const applications = await prisma.application.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      borrower: true,
      property: true,
      scoring: true,
    },
  });
  // Underwriter Performance Intelligence (UPI) Stats
const underwriterStats = await prisma.underwriterDecision.groupBy({
  by: ["underwriterId"],
  _avg: {
    decisionTimeMs: true,
  },
  _count: {
    decision: true,
  },
});


  const total = applications.length;

  const approved = applications.filter((a) => a.status === "approved").length;
  const denied = applications.filter((a) => a.status === "denied").length;
  const returned = applications.filter((a) => a.status === "returned").length;
  const submitted = applications.filter((a) => a.status === "submitted").length;
  const upiMetrics = computeUPIMetrics(underwriterStats);

  // Fraud Trend Data (7-day rolling)
  const fraudTrend = applications
    .map((a) => ({
      date: a.updatedAt,
      score: a.scoring?.fraudScore ?? 0,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
    // Application Velocity (daily count)
const velocityData = applications
  .map((a) => ({
    date: new Date(a.updatedAt.toDateString()), // normalize to day
    count: 1,
  }))
  .reduce((acc, curr) => {
    const existing = acc.find((d) => d.date.getTime() === curr.date.getTime());
    if (existing) existing.count += 1;
    else acc.push(curr);
    return acc;
  }, [] as { date: Date; count: number }[])
  .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Risk Histogram Data
  const riskScores = applications.map((a) => a.scoring?.riskScore ?? 0);

  // Impulsiveness Scatter Data
  const scatterData = applications.map((a) => ({
    risk: a.scoring?.riskScore ?? 0,
    impulsiveness: a.scoring?.impulsivenessScore ?? 0,
  }));

  // Fraud/Risk Heatmap Data (last 10 days)
const heatmapData = applications.slice(0, 10).map((a) => ({
  day: a.updatedAt.toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
  fraud: a.scoring?.fraudScore ?? 0,
  risk: a.scoring?.riskScore ?? 0,
}));

// Persona clustering data
const personaData = applications.map((a) => ({
  fraud: a.scoring?.fraudScore ?? 0,
  risk: a.scoring?.riskScore ?? 0,
  impulsiveness: a.scoring?.impulsivenessScore ?? 0,
}));

const { assignments } = kmeans(personaData, 3);

// Underwriter Productivity Metrics
const productivityData = applications
  .map((a) => ({
    day: a.updatedAt.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    }),
    decisions: a.status === "approved" || a.status === "denied" ? 1 : 0,
    avgDecisionTime: a.scoring?.decisionTime ?? 0,
  }))
  .reduce((acc, curr) => {
    const existing = acc.find((d) => d.day === curr.day);
    if (existing) {
      existing.decisions += curr.decisions;
      existing.avgDecisionTime =
        (existing.avgDecisionTime + curr.avgDecisionTime) / 2;
    } else {
      acc.push(curr);
    }
    return acc;
  }, [] as { day: string; decisions: number; avgDecisionTime: number }[])
  .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

// Pipeline Funnel Data
const funnelData = {
  submitted,
  inReview: applications.filter((a) => a.status === "in_review").length,
  returned,
  approved,
  denied,
};

// Fraud Cluster AI Data
const fraudClusterData = applications.map((a) => ({
  fraud: a.scoring?.fraudScore ?? 0,
  risk: a.scoring?.riskScore ?? 0,
  impulsiveness: a.scoring?.impulsivenessScore ?? 0,
}));

const { assignments: fraudAssignments } = fraudClusterEngine(fraudClusterData, 4);

// Behavioral Trajectory Data
const trajectoryData = applications.map((a) => ({
  timestamp: a.updatedAt,
  fraud: a.scoring?.fraudScore ?? 0,
  risk: a.scoring?.riskScore ?? 0,
  impulsiveness: a.scoring?.impulsivenessScore ?? 0,
}));

const portfolioBehaviorData = applications.map((a) => ({
  borrowerId: a.borrowerId,
  timestamp: a.updatedAt,
  fraud: a.scoring?.fraudScore ?? 0,
  risk: a.scoring?.riskScore ?? 0,
  impulsiveness: a.scoring?.impulsivenessScore ?? 0,
}));

const BVI = computeBehavioralVolatilityIndex(portfolioBehaviorData);



  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#4EE38A] mb-4">
        Underwriting Intelligence Dashboard
      </h1>

      {/* FULL-WIDTH ANALYTICS SECTION */}
      <div className="space-y-10 border border-slate-800 bg-slate-900 rounded-lg p-8">

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-6">
          <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
            <div className="text-xs text-slate-400">Total Applications</div>
            <div className="text-3xl font-bold text-[#4EE38A]">{total}</div>
          </div>

          <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
            <div className="text-xs text-slate-400">Approved</div>
            <div className="text-3xl font-bold text-green-400">{approved}</div>
          </div>

          <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
            <div className="text-xs text-slate-400">Denied</div>
            <div className="text-3xl font-bold text-red-400">{denied}</div>
          </div>

          <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
            <div className="text-xs text-slate-400">Returned</div>
            <div className="text-3xl font-bold text-orange-300">{returned}</div>
          </div>
        </div>

        {/* DECISION DONUT */}
        <DecisionDonut approved={approved} denied={denied} returned={returned} />

        {/* FRAUD TREND */}
        <FraudTrendChart data={fraudTrend} />
        <ApplicationVelocityChart data={velocityData} />
        <UnderwriterProductivityChart data={productivityData} />
        <PipelineFunnelChart data={funnelData} />
        <FraudClusterMap
        data={fraudClusterData.map((d) => ({ fraud: d.fraud, risk: d.risk }))}
         assignments={fraudAssignments}
        />
         
        <BehavioralVolatilityGauge score={BVI} />

        {/* RISK HISTOGRAM */}
        <RiskHistogram scores={riskScores} />
        <RiskPersonaClusters data={personaData} assignments={assignments} />
        <UnderwriterPerformanceDashboard data={upiMetrics} />

        {/* IMPULSIVENESS SCATTER */}
        <ImpScatter data={scatterData} />
        <FraudRiskHeatmap data={heatmapData} />
        <BehavioralTrajectoryMap data={trajectoryData} />
        <PortfolioBehavioralMap data={portfolioBehaviorData} />


      </div>

      {/* APPLICATIONS TABLE */}
      <div className="border border-slate-800 rounded-lg">
        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/40">
              <th className="py-3 px-2 text-left">Borrower</th>
              <th className="py-3 px-2 text-left">Property</th>
              <th className="py-3 px-2 text-left">Status</th>
              <th className="py-3 px-2 text-left">Updated</th>
              <th className="py-3 px-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-slate-800">
                <td className="py-3 px-2">
                  {app.borrower?.firstName} {app.borrower?.lastName}
                </td>

                <td className="py-3 px-2">
                  {app.property?.propertyAddress ?? "—"}
                </td>

                <td className="py-3 px-2">
                  <span
                    className={
                      app.status === "submitted"
                        ? "text-yellow-300"
                        : app.status === "approved"
                        ? "text-green-400"
                        : app.status === "denied"
                        ? "text-red-400"
                        : app.status === "returned"
                        ? "text-orange-300"
                        : "text-slate-400"
                    }
                  >
                    {app.status}
                  </span>
                </td>

                <td className="py-3 px-2">
                  {new Date(app.updatedAt).toLocaleString()}
                </td>

                <td className="py-3 px-2">
                  <Link
                    href={`/owner/applications/${app.id}`}
                    className="text-[#4EE38A] hover:underline"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
