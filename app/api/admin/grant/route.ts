import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { walletClient } from "@/lib/viem";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";

export async function POST(request: NextRequest) {
  try {
    const { targetWallet, email, role } = await request.json();

    if (!targetWallet || !email || !role) {
      return NextResponse.json(
        { error: "Missing admin grant fields" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 1. On-chain grant using shared walletClient
    // ---------------------------------------------
    const txHash = await walletClient.writeContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "grantAdmin",
      args: [targetWallet],
    });

    // ---------------------------------------------
    // 2. Proxy DB update to backend (frontend has no admin model)
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const backendResponse = await fetch(`${backendUrl}/api/admin/grant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetWallet,
        email,
        role,
        txHash,
      }),
    });

    const backendData = await backendResponse.json();

    return NextResponse.json(
      {
        success: true,
        txHash,
        backend: backendData,
      },
      { status: backendResponse.status }
    );
  } catch (err) {
    console.error("FRONTEND ADMIN GRANT ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
