export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { walletClient } from "@/lib/viem";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";

export async function POST(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Extract admin session cookie
    // ---------------------------------------------
    const cookie = request.cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE
    // ---------------------------------------------
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    let payload: any;
    try {
      const verified = await jwtVerify(
        cookie,
        new TextEncoder().encode(secret)
      );
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Ensure admin role
    // ---------------------------------------------
    if (!payload?.role || payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // 4. Parse request body
    // ---------------------------------------------
    const body = await request.json();
    const wallet = body?.wallet;

    if (!wallet || typeof wallet !== "string" || !wallet.startsWith("0x")) {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 5. Validate contract address
    // ---------------------------------------------
    const registryAddress = process.env.CHECK_REGISTRY_ADDRESS;
    if (!registryAddress) {
      console.error("CHECK_REGISTRY_ADDRESS missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // ---------------------------------------------
    // 6. Execute revokeRole transaction
    // ---------------------------------------------
    const txHash = await walletClient.writeContract({
      address: registryAddress as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "revokeRole",
      args: ["DEFAULT_ADMIN_ROLE", wallet],
    });

    return NextResponse.json({
      success: true,
      txHash,
    });
  } catch (err) {
    console.error("REVOKE ROLE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to revoke role" },
      { status: 500 }
    );
  }
}
