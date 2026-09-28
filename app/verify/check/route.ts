import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
  try {
    const prisma = await getPrisma();
    const { searchParams } = new URL(req.url);

    // checkNumber is STRING in your Prisma model
    const checkNumber = searchParams.get("checkNumber");

    if (!checkNumber) {
      return NextResponse.json(
        { valid: false, reason: "Missing checkNumber parameter" },
        { status: 400 }
      );
    }

    const check = await prisma.check.findUnique({
      where: { checkNumber },
      include: {
        bankProfile: true,
        signer: true,
        fraudFlags: true,
        sar: true, // correct relation
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

    // Correct model name: anchorRecord ✔
    const anchor = await prisma.anchorRecord.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      valid,
      reason: valid ? "Check is valid" : "Check is voided or reissued",

      check,

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

      root: anchor?.merkleRoot || null,
      anchored: !!anchor,
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
