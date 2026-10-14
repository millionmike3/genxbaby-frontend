"use server";

import { priceMortgage } from "@/lib/mortgage/pricing";
import { runFraudChecks } from "@/lib/mortgage/fraud";
import { underwriteMortgage } from "@/lib/mortgage/underwriting";
import { addCondition, updateConditionStatus } from "@/lib/mortgage/conditions";
import { markClearToClose, fundMortgage } from "@/lib/mortgage/funding";

export async function actionPriceMortgage(mortgageId: number) {
  return await priceMortgage({
    mortgageId,
    fico: 720,
    ltv: 80,
    loanAmount: 450000,
    occupancy: "primary",
    propertyType: "SFR",
    loanType: "conventional",
  });
}

export async function actionFraudScan(mortgageId: number) {
  return await runFraudChecks(mortgageId);
}

export async function actionUnderwrite(mortgageId: number) {
  return await underwriteMortgage(mortgageId);
}

export async function actionAddCondition(mortgageId: number, text: string) {
  return await addCondition(mortgageId, text);
}

export async function actionClearCondition(conditionId: number) {
  return await updateConditionStatus(conditionId, "CLEARED");
}

export async function actionMarkCTC(mortgageId: number) {
  return await markClearToClose(mortgageId);
}

export async function actionFund(mortgageId: number) {
  return await fundMortgage(mortgageId);
}
