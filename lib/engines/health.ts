import { HealthDAL } from "@/lib/dal/health";
import { getPrisma } from "@/lib/db/prisma";

export async function computeSystemHealth() {
  const apiLatency = await computeApiLatency();
  const dbHealth = await computeDatabaseHealth();
  const engineHealth = await computeEngineHealth();
  const anomalies = await HealthDAL.getAnomalies(20);

  const score = computeHealthScore(apiLatency, dbHealth, engineHealth, anomalies);

  return {
    score,
    apiLatency,
    dbHealth,
    engineHealth,
    anomalies,
  };
}

async function computeApiLatency() {
  return {
    underwriting: randomLatency(),
    pricing: randomLatency(),
    fraud: randomLatency(),
    scoring: randomLatency(),
    pipeline: randomLatency(),
  };
}

async function computeDatabaseHealth() {
  const prisma = await getPrisma();

  const connections = await prisma.$queryRaw`SELECT count(*) FROM pg_stat_activity`;

  return {
    connections: Number(connections[0].count),
    status: Number(connections[0].count) < 50 ? "healthy" : "stressed",
  };
}

async function computeEngineHealth() {
  return {
    underwriting: randomHealth(),
    pricing: randomHealth(),
    fraud: randomHealth(),
    scoring: randomHealth(),
    pipeline: randomHealth(),
  };
}

function computeHealthScore(apiLatency: any, dbHealth: any, engineHealth: any, anomalies: any[]) {
  let score = 100;

  const avgLatency = Object.values(apiLatency).reduce((a: any, b: any) => a + b, 0) / 5;
  if (avgLatency > 500) score -= 20;

  if (dbHealth.status === "stressed") score -= 20;

  const unhealthyEngines = Object.values(engineHealth).filter((x: any) => x === "unhealthy").length;
  score -= unhealthyEngines * 10;

  score -= anomalies.length * 2;

  return Math.max(0, score);
}

function randomLatency() {
  return Math.floor(Math.random() * 400) + 50;
}

function randomHealth() {
  return Math.random() > 0.85 ? "unhealthy" : "healthy";
}
