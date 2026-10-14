import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const fullName = String(data.get("fullName"));
  const email = String(data.get("email"));
  const phone = String(data.get("phone"));
  const accredited = String(data.get("accredited")) === "yes";
  const profile = String(data.get("profile"));
  const initialCommitmentRaw = data.get("initialCommitment");
  const initialCommitment = initialCommitmentRaw ? Number(initialCommitmentRaw) : null;

  const kycDoc = data.get("kycDoc") as File;
  const buffer = Buffer.from(await kycDoc.arrayBuffer());
  const kycUrl = await prisma.fileStorage.upload(buffer, kycDoc.name);

  // Upsert investor record
  const investor = await prisma.investor.upsert({
    where: { userId },
    update: {
      fullName,
      email,
      phone,
      accredited,
      profile,
      initialCommitment,
      kycVerified: true,
      kycDocUrl: kycUrl,
    },
    create: {
      userId,
      fullName,
      email,
      phone,
      accredited,
      profile,
      initialCommitment,
      kycVerified: true,
      kycDocUrl: kycUrl,
    },
  });

  // Fraud trigger
  await prisma.fraudEvent.create({
    data: {
      investorId: investor.id,
      eventType: "INVESTOR_ONBOARDING",
      metadata: {
        fullName,
        email,
        phone,
        accredited,
        profile,
        initialCommitment,
      },
    },
  });

  return NextResponse.redirect("/investor");
}
