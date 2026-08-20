"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { logAudit } from "@/lib/logAudit";
import runFraudChecks from "@/lib/runFraudChecks";
import anchorMerkleRoot from "@/lib/anchorMerkleRoot";
import crypto from "crypto";

function sha256(data: string) {
  return "0x" + crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

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
          bankProfileId:  1,
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

    // ---------------------------------------------
    // ANCHOR MERKLE ROOT (FIXED: pass root)
    // ---------------------------------------------
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
