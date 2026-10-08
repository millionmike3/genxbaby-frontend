import { NextRequest, NextResponse } from "next/server";
import { verifyMessage, createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { address, signature, message } = await request.json();

    if (!address || !signature || !message) {
      return NextResponse.json(
        { error: "Missing wallet login data" },
        { status: 400 }
      );
    }

    // 1. Verify signature
    const ok = await verifyMessage({ address, message, signature });
    if (!ok) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. On-chain admin check
    const client = createPublicClient({
      chain: polygon,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL!)
    });

    const isAdmin = await client.readContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "isAdmin",
      args: [address]
    });

    if (!isAdmin) {
      return NextResponse.json(
        { error: "On-chain admin check failed" },
        { status: 403 }
      );
    }

    // 3. Create JWT
    const token = jwt.sign(
      { address, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 4. Set admin cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return res;
  } catch (err) {
    console.error("ADMIN WALLET LOGIN ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
