import { NextResponse } from "next/server";
import { publicClient } from "@/lib/viem";
import { CHECK_REGISTRY_ADDRESS, CHECK_REGISTRY_ABI } from "@/lib/constants";

export async function GET() {
  try {
    const logs = await publicClient.getLogs({
      address: CHECK_REGISTRY_ADDRESS,

      // ⭐ MUST be a single event, not an array
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

      // ⭐ bigint, not string
      fromBlock: 0n,

      // ⭐ valid BlockTag
      toBlock: "latest"
    });

    return NextResponse.json({ logs });
  } catch (err) {
    console.error("CHECK LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch check logs" },
      { status: 500 }
    );
  }
}
