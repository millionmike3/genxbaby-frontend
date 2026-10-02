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
import { computeUPIMetrics } from "./utils/upi";
import UnderwriterPerformanceDashboard from "./components/UnderwriterPerformanceDashboard";
import { computeUPIDrift } from "./utils/upiDrift";
import { computeUPIReplay } from "./utils/upiReplay";
import UnderwriterDriftChart from "./components/UnderwriterDriftChart";
import UnderwriterReplayTimeline from "./components/UnderwriterReplayTimeline";

export default async function UnderwritingDashboard() {
  const prisma = getPrisma();

  const applications = await prisma.application.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      borrower: true,
      timelineEvents: true,
      timeline: true,
      documents: true,
      disclosures: true,
      underwriting: true,
      fraudEvents: true,
      milestones: true,
      aiScoring: true,
    },
  });

  const underwriterStats = await prisma.underwriterDecision.groupBy({
    by: ["underwriterId"],
    _avg: { decisionTimeMs: true },
    _count: { decision: true },
  });

  const total = applications.length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const denied = applications.filter((a) => a.status === "denied").length;
  const returned = applications.filter((a) => a.status === "returned").length;
  const submitted = applications.filter((a) => a.status === "submitted").length;

  const upiMetrics = computeUPIMetrics(underwriterStats);
  const upiDrift = computeUPIDrift(underwriterStats);
  const upiReplay = computeUPIReplay(applications);

  const fraudTrend = applications
    .map((a) => ({
      date: a.updatedAt,
      score: a.aiScoring?.score ?? 0,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const velocityData = applications
    .map((a) => ({
      date: new Date(a.updatedAt.toDateString()),
      count: 1,
    }))
    .reduce((acc, curr) => {
      const existing = acc.find((d) => d.date.getTime() === curr.date.getTime());
      if (existing) existing.count += 1;
      else acc.push(curr);
      return acc;
    }, [] as { date: Date; count: number }[])
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const riskScores = applications.map((a) => a.aiScoring?.score ?? 0);

  const scatterData = applications.map((a) => ({
    risk: a.aiScoring?.score ?? 0,
    impulsiveness: a.aiScoring?.score ?? 0,
  }));

  const heatmapData = applications.slice(0, 10).map((a) => ({
    day: a.updatedAt.toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
    fraud: a.aiScoring?.score ?? 0,
    risk: a.aiScoring?.score ?? 0,
  }));

  const personaData = applications.map((a) => ({
    fraud: a.aiScoring?.score ?? 0,
    risk: a.aiScoring?.score ?? 0,
    impulsiveness: a.aiScoring?.score ?? 0,
  }));

  const { assignments } = kmeans(personaData, 3);

  const productivityData = applications
    .map((a) => ({
      day: a.updatedAt.toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
      decisions: a.status === "approved" || a.status === "denied" ? 1 : 0,
      avgDecisionTime: 0,
    }))
    .reduce((acc, curr) => {
      const existing = acc.find((d) => d.day === curr.day);
      if (existing) {
        existing.decisions += curr.decisions;
        existing.avgDecisionTime = (existing.avgDecisionTime + curr.avgDecisionTime) / 2;
      } else {
        acc.push(curr);
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

  const funnelData = {
    submitted,
    inReview: applications.filter((a) => a.status === "in_review").length,
    returned,
    approved,
    denied,
  };

  const fraudClusterData = applications.map((a) => ({
    fraud: a.aiScoring?.score ?? 0,
    risk: a.aiScoring?.score ?? 0,
    impulsiveness: a.aiScoring?.score ?? 0,
  }));

  const { assignments: fraudAssignments } = fraudClusterEngine(fraudClusterData, 4);

  const trajectoryData = applications.map((a) => ({
    timestamp: a.updatedAt,
    fraud: a.aiScoring?.score ?? 0,
    risk: a.aiScoring?.score ?? 0,
    impulsiveness: a.aiScoring?.score ?? 0,
  }));

  const portfolioBehaviorData = applications.map((a) => ({
    borrowerId: a.borrowerId,
    timestamp: a.updatedAt,
    fraud: a.aiScoring?.score ?? 0,
    risk: a.aiScoring?.score ?? 0,
    impulsiveness: a.aiScoring?.score ?? 0,
  }));

  const BVI = computeBehavioralVolatilityIndex(portfolioBehaviorData);

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#4EE38A] mb-4">
        Underwriting Intelligence Dashboard
      </h1>

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

        {/* BVI GAUGE */}
        <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 flex flex-col items-start justify-center h-[240px]">
          <h2 className="text-lg font-semibold text-[#4EE38A] mb-2">
            Behavioral Volatility Index (Portfolio Stability)
          </h2>

          <BehavioralVolatilityGauge score={BVI} />

          <div className="text-slate-300 text-sm mt-2">
            Stability Score (0–100)
          </div>
        </div>

        {/* RISK HISTOGRAM */}
        <RiskHistogram scores={riskScores} />
        <RiskPersonaClusters data={personaData} assignments={assignments} />
        <UnderwriterPerformanceDashboard data={upiMetrics} />

        <ImpScatter data={scatterData} />
        <FraudRiskHeatmap data={heatmapData} />
        <BehavioralTrajectoryMap data={trajectoryData} />
        <PortfolioBehavioralMap data={portfolioBehaviorData} />

        <UnderwriterDriftChart data={upiDrift} />
        <UnderwriterReplayTimeline data={{ frames: upiReplay }} />

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
                  {app.propertyAddress ?? "—"}
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
