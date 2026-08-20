import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { publicClient, walletClient } from "@/lib/viem";
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
    // 4. On-chain admin role check (READ)
    // ---------------------------------------------
    const isAdminOnChain = await publicClient.readContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "isAdmin",
      args: [wallet],
    });

    // ---------------------------------------------
    // 5. Optional: Example WRITE using walletClient
    // (not executed, just showing capability)
    // ---------------------------------------------
    // const txHash = await walletClient.writeContract({
    //   address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
    //   abi: CHECK_REGISTRY_ABI,
    //   functionName: "touch", // example function
    //   args: [],
    // });

    return NextResponse.json({
      onchain: isAdminOnChain,
      // txHash, // if you enable writes
    });
  } catch (err) {
    console.error("ONCHAIN ADMIN CHECK ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
