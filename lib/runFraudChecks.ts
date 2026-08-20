import { runFraudChecks } from "./fraud/checkFraud";

export default async function runFraudChecksWrapper(checkId: string) {
  return runFraudChecks({ checkId });
}
