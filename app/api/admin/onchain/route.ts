export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { publicClient } from "@/lib/viem";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";

export async function GET(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = request.cookies.get("admin_token")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Not authenticated" },
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
    // 3. Ensure admin role + wallet
    // ---------------------------------------------
    if (!payload?.role || payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const wallet = payload?.wallet;
    if (!wallet) {
      return NextResponse.json(
        { error: "Admin has no wallet assigned" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Validate contract address
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
    // 5. On-chain admin role check
    // ---------------------------------------------
    const isAdminOnChain = await publicClient.readContract({
      address: registryAddress as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "isAdmin",
      args: [wallet],
    });

    return NextResponse.json({ onchain: isAdminOnChain });
  } catch (err) {
    console.error("ONCHAIN ADMIN CHECK ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
