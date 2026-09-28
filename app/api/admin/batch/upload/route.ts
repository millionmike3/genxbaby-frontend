"use server";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function sha256(data: string) {
  return "0x" + crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    // Load server‑only modules at runtime
    const { prisma } = await import("@/lib/prisma");
    const { logAudit } = await import("@/lib/logAudit");
    const runFraudChecks = (await import("@/lib/runFraudChecks")).default;
    const anchorMerkleRoot = (await import("@/lib/anchorMerkleRoot")).default;

    const { rows } = await request.json();
    let created = 0;

    for (const row of rows) {
      const check = await prisma.check.create({
        data: {
          checkNumber: row.checkNumber,
          payee: row.payee,
          amount: row.amount,
          memo: row.memo,
          date: new Date(row.date),
          status: "issued",
          bankProfileId: 1,
          signerId: "default-signer",
        },
      });

      created++;

      await runFraudChecks(check.id);

      await logAudit("BATCH_CHECK_CREATED", {
        checkId: check.id,
        checkNumber: check.checkNumber,
      });
    }

    // ---------------------------------------------
    // REBUILD MERKLE ROOT FOR ALL CHECKS
    // ---------------------------------------------
    const checks = await prisma.check.findMany({
      orderBy: { createdAt: "desc" },
    });

    const leaves = checks.map((c) =>
      sha256(JSON.stringify({ id: c.id, checkNumber: c.checkNumber }))
    );

    let level = [...leaves];

    while (level.length > 1) {
      const next = [];

      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1] ?? left;
        next.push(sha256(left + right.replace("0x", "")));
      }

      level = next;
    }

    const root = level[0];

    await anchorMerkleRoot(root);

    return NextResponse.json({ success: true, count: created });
  } catch (err) {
    console.error("BATCH UPLOAD ERROR:", err);

    return NextResponse.json(
      { error: "Batch upload failed" },
      { status: 500 }
    );
  }
}
