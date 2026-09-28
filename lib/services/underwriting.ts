import { getPrisma } from "@/lib/db/prisma";
import { classify } from "@/lib/scoring";
import { ScoringDAL } from "@/lib/dal/scoring";

type UnderwritingInput = {
  applicationId: string;
};

export async function runUnderwriting({ applicationId }: UnderwritingInput) {
  const prisma = await getPrisma();

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { borrower: true },
  });

  if (!app) throw new Error("Application not found");

  const scores = await ScoringDAL.getLatestScores(app.borrower.userId);

  const incomeMonthly = app.incomeMonthly ?? 0;
  const debtsMonthly = app.debtsMonthly ?? 0;
  const pitiMonthly = app.pitiMonthly ?? 0;

  const dti =
    incomeMonthly > 0 ? ((debtsMonthly + pitiMonthly) / incomeMonthly) * 100 : 0;

  const ltv =
    app.propertyValue && app.loanAmount
      ? (app.loanAmount / app.propertyValue) * 100
      : 0;

  const cltv =
    app.propertyValue && app.totalLiens
      ? (app.totalLiens / app.propertyValue) * 100
      : ltv;

  const reservesMonths =
    pitiMonthly > 0 ? (app.liquidAssets ?? 0) / pitiMonthly : 0;

  const riskBand = classify(scores?.riskScore ?? 0, "RISK");
  const fraudBand = scores?.fraudScore >= 80 ? "High" : "Normal";

  let decision: "approved" | "declined" | "refer" = "refer";
  let reasons: string[] = [];

  if (dti > 50) {
    decision = "declined";
    reasons.push(`DTI too high (${dti.toFixed(1)}%)`);
  }

  if (ltv > 97) {
    decision = "declined";
    reasons.push(`LTV too high (${ltv.toFixed(1)}%)`);
  }

  if (reservesMonths < 2) {
    decision = decision === "declined" ? "declined" : "refer";
    reasons.push(`Insufficient reserves (${reservesMonths.toFixed(1)} months)`);
  }

  if (fraudBand === "High") {
    decision = "declined";
    reasons.push("High fraud score");
  }

  if (
    decision !== "declined" &&
    dti <= 43 &&
    ltv <= 95 &&
    reservesMonths >= 3 &&
    fraudBand === "Normal"
  ) {
    decision = "approved";
  }

  const uwCase = await prisma.underwritingCase.upsert({
    where: { applicationId },
    update: {
      dti,
      ltv,
      cltv,
      reservesMonths,
      riskScore: scores?.riskScore ?? 0,
      fraudScore: scores?.fraudScore ?? 0,
      decision,
      reasons,
      status: decision,
    },
    create: {
      applicationId,
      dti,
      ltv,
      cltv,
      reservesMonths,
      riskScore: scores?.riskScore ?? 0,
      fraudScore: scores?.fraudScore ?? 0,
      decision,
      reasons,
      status: decision,
    },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId,
      type: "underwriting_update",
      message: `Automated underwriting decision: ${decision} (${reasons.join(
        "; "
      )})`,
    },
  });

  return uwCase;
}
