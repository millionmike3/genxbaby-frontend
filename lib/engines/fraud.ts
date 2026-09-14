import { FraudDAL } from "@/lib/dal/fraud";

export async function runFraudScan(app: any, scoring: any, environment: any) {
  await FraudDAL.addTimelineEvent(app.id, "Fraud scan started");

  const deviceCount = environment.deviceCount ?? 0;
  const bluetoothDensity = environment.bluetoothDensity ?? 0;
  const environmentRisk = environment.riskScore ?? 0;

  await FraudDAL.addTimelineEvent(app.id, "Device intelligence collected");

  const signals = detectSignals(app, scoring, environment);
  await FraudDAL.addTimelineEvent(app.id, "Fraud signals detected");

  const anomalies = detectAnomalies(app, scoring, environment);
  await FraudDAL.addTimelineEvent(app.id, "Behavior anomalies detected");

  const fraudScore = computeFraudScore(signals, anomalies, environmentRisk);
  await FraudDAL.addTimelineEvent(app.id, "Fraud score generated");

  const result = {
    fraudScore,
    signals,
    anomalies,
    deviceCount,
    bluetoothDensity,
    environmentRisk,
  };

  await FraudDAL.save(app.id, result);

  return result;
}

function detectSignals(app: any, scoring: any, environment: any) {
  const signals = [];

  if (scoring.impulsivenessScore > 70) signals.push("High impulsiveness");
  if (scoring.riskScore > 80) signals.push("High behavioral risk");
  if (environment.deviceCount > 20) signals.push("High device density");
  if (environment.bluetoothDensity > 50) signals.push("Suspicious Bluetooth activity");

  if (app.email && app.email.includes("+")) signals.push("Email aliasing");

  return signals;
}

function detectAnomalies(app: any, scoring: any, environment: any) {
  const anomalies = [];

  if (app.loanAmount > 500000 && scoring.riskScore > 70) {
    anomalies.push({ label: "High loan + high risk", value: "Mismatch" });
  }

  if (environment.riskScore > 80) {
    anomalies.push({ label: "Environment risk", value: "Unusual location" });
  }

  return anomalies;
}

function computeFraudScore(signals: string[], anomalies: any[], environmentRisk: number) {
  let score = 0;

  score += signals.length * 10;
  score += anomalies.length * 15;
  score += environmentRisk * 0.5;

  return Math.min(100, Math.round(score));
}
