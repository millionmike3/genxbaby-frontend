import { HealthDAL } from "@/lib/dal/health";

export async function checkAlerts(health: any) {
  if (health.score < 60) {
    await HealthDAL.logEvent("alert", { message: "System health degraded" });
  }

  if (health.apiLatency.underwriting > 800) {
    await HealthDAL.logEvent("alert", { message: "Underwriting engine slow" });
  }

  if (health.dbHealth.status === "stressed") {
    await HealthDAL.logEvent("alert", { message: "Database under stress" });
  }

  if (health.anomalies.length > 10) {
    await HealthDAL.logEvent("alert", { message: "High anomaly volume" });
  }
}
