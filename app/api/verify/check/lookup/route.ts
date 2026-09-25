import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkNumber = searchParams.get("checkNumber");

    if (!checkNumber) {
      return NextResponse.json(
        { error: "Missing checkNumber parameter" },
        { status: 400 }
      );
    }

    // FIX — checkNumber is NOT unique → use findFirst
    const check = await prisma.check.findFirst({
      where: { checkNumber: String(checkNumber) },
      include: {
        signer: true,

        // FIX — correct relation names
        FraudFlag: true,
        SuspiciousActivityReport: true,
      },
    });

    if (!check) {
      return NextResponse.json({
        valid: false,
        reason: "Check not found",
      });
    }

    // FIX — fetch bank profile manually
    const profile = await prisma.bankProfile.findUnique({
      where: { id: check.bankProfileId }
    });

    const valid = check.memo !== "VOIDED" && check.memo !== "REISSUED";

    const anchor = await prisma.anchorRecord.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      valid,
      reason: valid ? "Check is valid" : "Check is voided or reissued",

      check,

      bank: profile
        ? {
            name: profile.bankName,
            routing: profile.routingNumber,
            account: profile.accountNumber,
          }
        : null,

      signer: check.signer ?? null,

      // FIX — correct relation names
      fraudFlags: check.FraudFlag ?? [],
      sar: check.SuspiciousActivityReport ?? [],

      root: anchor?.merkleRoot || null,
      anchored: !!anchor,
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
