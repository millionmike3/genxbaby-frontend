import { NextRequest, NextResponse } from "next/server";
import { publicClient } from "@/lib/viem";
import { CHECK_REGISTRY_ADDRESS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
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

    const { prisma } = await import("@/lib/prisma");

    const checks = await prisma.check.findMany({
      orderBy: { createdAt: "desc" }
    });

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
