import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { walletClient } from "@/lib/viem";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";

export async function POST(req: Request) {
  try {
    // ---------------------------------------------
    // 1. Extract admin session cookie
    // ---------------------------------------------
    const cookie = (req as any).cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE
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
    // 3. Ensure admin role
    // ---------------------------------------------
    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // 4. Parse request body
    // ---------------------------------------------
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        { error: "Missing wallet address" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 5. Execute revokeRole transaction using shared walletClient
    // ---------------------------------------------
    const txHash = await walletClient.writeContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
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
