import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // checkNumber is STRING in your Prisma model
    const checkNumber = searchParams.get("checkNumber");

    if (!checkNumber) {
      return NextResponse.json(
        { valid: false, reason: "Missing checkNumber parameter" },
        { status: 400 }
      );
    }

    // Correct relations based on your schema:
    // - sarReports ❌ (does not exist)
    // - sar ✔ (correct)
    const check = await prisma.check.findUnique({
      where: { checkNumber },
      include: {
        bankProfile: true,
        signer: true,
        fraudFlags: true,
        sar: true,
      },
    });

    if (!check) {
      return NextResponse.json({
        valid: false,
        reason: "Check not found",
      });
    }

    // Check validity
    const valid = check.memo !== "VOIDED" && check.memo !== "REISSUED";

    // Correct model name:
    // - auditAnchor ❌ (does not exist)
    // - anchorRecord ✔ (your schema)
    const anchor = await prisma.anchorRecord.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      valid,
      reason: valid ? "Check is valid" : "Check is voided or reissued",

      // Raw check object
      check,

      // Bank profile (safe)
      bank: check.bankProfile
        ? {
            name: check.bankProfile.bankName,
            routing: check.bankProfile.routingNumber,
            account: check.bankProfile.accountNumber,
          }
        : null,

      signer: check.signer ?? null,
      fraudFlags: check.fraudFlags ?? [],
      sar: check.sar ?? [],

      // Correct anchor fields:
      // - root ❌
      // - merkleRoot ✔
      root: anchor?.merkleRoot || null,
      anchored: !!anchor,
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
