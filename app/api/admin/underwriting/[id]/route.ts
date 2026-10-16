import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";
import { getPrisma } from "@/lib/prisma";

/* ============================
   Fraud Flags
============================ */
function getFraudFlags(app: any, score: any) {
  const flags: string[] = [];

  if (!app.employer) flags.push("Missing employer");
  if (!app.city) flags.push("Missing city");
  if (app.loanAmount > app.income * 3)
    flags.push("Loan amount exceeds 3× income");
  if ((app.dti ?? 0) > 45) flags.push("High DTI (>45%)");
  if (score.fraudScore > 150) flags.push("High fraud score");

  return flags;
}

/* ============================
   Persona Clustering
============================ */
function getPersona(app: any, score: any) {
  const { loanAmount, income, dti } = app;
  const { riskScore, fraudScore, impulsivenessScore } = score;

  if (fraudScore > 150) return "Potential Fraud";
  if (impulsivenessScore > 90) return "High Impulsiveness";
  if (dti && dti > 45) return "High Risk";
  if (income < 3000 && loanAmount > 15000) return "Low Income / High Ask";
  if (riskScore > 720) return "Stable Earner";

  return "General Borrower";
}

/* ============================
   GET Route
============================ */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const applicationId = params.id;

  /* ============================
     Admin JWT Authentication
  ============================= */
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value ?? null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: any;
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    payload = verified.payload;

    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();

  /* ============================
     Fetch Application
  ============================= */
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      borrower: true,
    },
  });

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  /* ============================
     Fetch Score
============================ */
  const score = await prisma.borrowerScore.findFirst({
    where: { applicationId },
    orderBy: { createdAt: "desc" },
  });

  if (!score) {
    return NextResponse.json(
      { error: "Score not found for this application" },
      { status: 404 }
    );
  }

  /* ============================
     Fraud Flags + Persona
============================ */
  const fraudFlags = getFraudFlags(application, score);
  const persona = getPersona(application, score);

  /* ============================
     Application Timeline
============================ */
  const timeline = await prisma.application.findMany({
    where: { borrowerId: application.borrowerId },
    orderBy: { createdAt: "desc" },
  });

  /* ============================
     Document Status (placeholder)
============================ */
  const documents = [
    { id: "id", type: "Government ID", status: "Missing", uploadedAt: null },
    { id: "paystubs", type: "Paystubs (30 days)", status: "Missing", uploadedAt: null },
    { id: "bank", type: "Bank Statements (60 days)", status: "Missing", uploadedAt: null },
    { id: "w2", type: "W‑2 / 1099", status: "Missing", uploadedAt: null },
    { id: "utility", type: "Utility Bill", status: "Missing", uploadedAt: null },
  ];

  return NextResponse.json({
    success: true,
    borrower: application.borrower,
    application,
    score,
    fraudFlags,
    persona,
    timeline,
    documents,
  });
}
