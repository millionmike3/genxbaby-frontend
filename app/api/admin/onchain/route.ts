import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";

export async function GET(req: Request) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = (req as any).cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE (ESM SAFE)
    // ---------------------------------------------
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    let payload;
    try {
      const verified = await jwtVerify(cookie, secret);
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Ensure admin has a wallet assigned
    // ---------------------------------------------
    const wallet = payload.wallet as string;

    if (!wallet) {
      return NextResponse.json(
        { error: "Admin has no wallet assigned" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Create public client for on-chain check
    // ---------------------------------------------
    const client = createPublicClient({
      chain: polygonAmoy,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
    });

    // ---------------------------------------------
    // 5. Check on-chain admin role
    // ---------------------------------------------
    const isAdminOnChain = await client.readContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
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
