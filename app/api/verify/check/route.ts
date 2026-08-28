import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // checkNumber MUST remain a string because Prisma expects a string
    const checkNumber = searchParams.get("checkNumber");

    if (!checkNumber) {
      return NextResponse.json(
        { error: "Missing checkNumber parameter" },
        { status: 400 }
      );
    }

    const check = await prisma.check.findUnique({
      where: { checkNumber: String(checkNumber) },
      include: {
        bankProfile: true,
        signer: true,
        fraudFlags: true,
        sar: true, // corrected relation name
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

    // Latest blockchain anchor (correct model name: AnchorRecord)
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
