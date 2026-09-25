import { NextRequest, NextResponse } from "next/server";
import { publicClient } from "@/lib/viem";
import { prisma } from "@/lib/prisma";
import { CHECK_REGISTRY_ADDRESS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Fetch blockchain CheckCreated logs
    // ---------------------------------------------
    const logs = await publicClient.getLogs({
      address: CHECK_REGISTRY_ADDRESS,
      event: {
        type: "event",
        name: "CheckCreated",
        inputs: [
          { indexed: true, name: "id", type: "string" },
          { indexed: false, name: "checkNumber", type: "uint256" },
          { indexed: false, name: "amount", type: "uint256" },
          { indexed: false, name: "memo", type: "string" },
          { indexed: false, name: "payee", type: "string" },
          { indexed: false, name: "date", type: "uint256" }
        ]
      },
      fromBlock: 0n,
      toBlock: "latest"
    });

    // ---------------------------------------------
    // 2. Fetch DB checks (sorted newest first)
    // ---------------------------------------------
    const checks = await prisma.check.findMany({
      orderBy: { createdAt: "desc" }
    });

    // ---------------------------------------------
    // 3. Return combined result
    // ---------------------------------------------
    return NextResponse.json({
      logs: logs ?? [],
      checks: checks ?? []
    });
  } catch (err) {
    console.error("CHECK LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load checks" },
      { status: 500 }
    );
  }
}
