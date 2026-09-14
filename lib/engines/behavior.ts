import { BehaviorDAL } from "@/lib/dal/behavior";

export async function runBehaviorEngine(applicationId: string) {
  const events = await BehaviorDAL.getEvents(applicationId);

  const metrics = computeMetrics(events);
  const profile = computeBehaviorProfile(metrics);

  await BehaviorDAL.saveProfile(applicationId, profile);

  return profile;
}

function computeMetrics(events: any[]) {
  const metrics = {
    appSpeed: 0,
    hesitation: 0,
    revisions: 0,
    deviceSwitches: 0,
    sessionDuration: 0,
    scrollDepth: 0,
    rageClicks: 0,
  };

  for (const e of events) {
    if (e.type === "field-input") metrics.hesitation += e.hesitation ?? 0;
    if (e.type === "field-revision") metrics.revisions += 1;
    if (e.type === "device-switch") metrics.deviceSwitches += 1;
    if (e.type === "scroll") metrics.scrollDepth = Math.max(metrics.scrollDepth, e.depth);
    if (e.type === "rage-click") metrics.rageClicks += 1;
    if (e.type === "session-end") metrics.sessionDuration = e.duration;
  }

  metrics.appSpeed = computeAppSpeed(events);

  return metrics;
}

function computeAppSpeed(events: any[]) {
  const start = events.find((e) => e.type === "session-start");
  const end = events.find((e) => e.type === "session-end");

  if (!start || !end) return 0;

  return (new Date(end.timestamp).getTime() - new Date(start.timestamp).getTime()) / 1000;
}

function computeBehaviorProfile(metrics: any) {
  const impulsiveness = computeImpulsiveness(metrics);
  const stability = computeStability(metrics);
  const consistency = computeConsistency(metrics);
  const anomalyScore = computeAnomalyScore(metrics);

  return {
    impulsiveness,
    stability,
    consistency,
    anomalyScore,
    metrics,
  };
}

function computeImpulsiveness(m: any) {
  let score = 0;

  score += m.appSpeed * 0.5;
  score += m.rageClicks * 5;
  score += m.deviceSwitches * 10;

  return Math.min(100, Math.round(score));
}

function computeStability(m: any) {
  let score = 100;

  score -= m.revisions * 2;
  score -= m.deviceSwitches * 5;

  return Math.max(0, Math.round(score));
}

function computeConsistency(m: any) {
  let score = 100;

  score -= m.hesitation * 0.5;
  score -= m.revisions * 1;

  return Math.max(0, Math.round(score));
}

function computeAnomalyScore(m: any) {
  let score = 0;

  if (m.rageClicks > 3) score += 20;
  if (m.deviceSwitches > 2) score += 30;
  if (m.revisions > 10) score += 25;

  return Math.min(100, score);
}
