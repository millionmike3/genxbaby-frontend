import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { createWalletClient, http } from "viem";
import { polygon} from "viem/chains";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { logAudit } from "@/lib/logAudit";

function sha256(data: string) {
  return "0x" + crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = (req as any).cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE (ESM SAFE)
    // ---------------------------------------------
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
      await jwtVerify(cookie, secret);
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Fetch all checks
    // ---------------------------------------------
    const checks = await prisma.check.findMany({
      orderBy: { createdAt: "desc" },
    });

    // ---------------------------------------------
    // 4. Build Merkle tree
    // ---------------------------------------------
    const leaves = checks.map((c) =>
      sha256(JSON.stringify({ id: c.id, checkNumber: c.checkNumber }))
    );

    let level = [...leaves];

    while (level.length > 1) {
      const next: string[] = [];

      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1] ?? left;
        next.push(sha256(left + right.replace("0x", "")));
      }

      level = next;
    }

    const root = level[0];

    // ---------------------------------------------
    // 5. Anchor Merkle root on-chain
    // ---------------------------------------------
    const client = createWalletClient({
      chain: polygon,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
      account: process.env.ADMIN_PRIVATE_KEY as `0x${string}`,
    });

    const tx = await client.writeContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "anchorAuditRoot",
      args: [root],
    });

    // ---------------------------------------------
    // 6. Save anchor record in database
    // ---------------------------------------------
    await prisma.auditAnchor.create({
      data: {
        root,
        count: checks.length,
      },
    });

    // ---------------------------------------------
    // 7. Audit log
    // ---------------------------------------------
    await logAudit("ANCHOR_MERKLE_ROOT", {
      root,
      count: checks.length,
    });

    return NextResponse.json({ success: true, root, tx });
  } catch (err) {
    console.error("ANCHOR ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
