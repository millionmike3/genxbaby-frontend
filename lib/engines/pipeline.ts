import { PipelineDAL } from "@/lib/dal/pipeline";

export async function computePipelinePerformance() {
  const events = await PipelineDAL.getAll();

  const grouped = groupByApplication(events);
  const performance = grouped.map(computePerformanceForApplication);

  return {
    totalApplications: grouped.length,
    avgVelocity: average(performance.map((p) => p.totalDuration)),
    avgConversion: average(performance.map((p) => p.conversionRate)),
    bottlenecks: computeBottlenecks(performance),
    applications: performance,
  };
}

function groupByApplication(events: any[]) {
  const map = new Map();

  for (const e of events) {
    if (!map.has(e.applicationId)) map.set(e.applicationId, []);
    map.get(e.applicationId).push(e);
  }

  return Array.from(map.values());
}

function computePerformanceForApplication(events: any[]) {
  const stages = {
    lead: null,
    started: null,
    submitted: null,
    underwriting: null,
    pricing: null,
    funded: null,
  };

  for (const e of events) {
    if (e.stage === "lead") stages.lead = e.timestamp;
    if (e.stage === "application-started") stages.started = e.timestamp;
    if (e.stage === "application-submitted") stages.submitted = e.timestamp;
    if (e.stage === "underwriting-complete") stages.underwriting = e.timestamp;
    if (e.stage === "pricing-complete") stages.pricing = e.timestamp;
    if (e.stage === "funded") stages.funded = e.timestamp;
  }

  const durations = {
    leadToStart: diff(stages.lead, stages.started),
    startToSubmit: diff(stages.started, stages.submitted),
    submitToUW: diff(stages.submitted, stages.underwriting),
    uwToPricing: diff(stages.underwriting, stages.pricing),
    pricingToFunding: diff(stages.pricing, stages.funded),
  };

  const totalDuration = Object.values(durations).reduce((a, b) => a + b, 0);

  const conversionRate =
    stages.funded && stages.lead ? 100 : stages.submitted ? 60 : 20;

  return {
    applicationId: events[0].applicationId,
    durations,
    totalDuration,
    conversionRate,
  };
}

function diff(a: any, b: any) {
  if (!a || !b) return 0;
  return (new Date(b).getTime() - new Date(a).getTime()) / 1000 / 60; // minutes
}

function average(arr: number[]) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function computeBottlenecks(performance: any[]) {
  const allDurations = performance.flatMap((p) =>
    Object.entries(p.durations)
  );

  const grouped: Record<string, number[]> = {};

  for (const [stage, duration] of allDurations) {
    if (!grouped[stage]) grouped[stage] = [];
    grouped[stage].push(duration);
  }

  const bottlenecks = Object.entries(grouped).map(([stage, durations]) => ({
    stage,
    avgDuration: average(durations),
  }));

  return bottlenecks.sort((a, b) => b.avgDuration - a.avgDuration);
}
