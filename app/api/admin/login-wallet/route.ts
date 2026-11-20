import { NextRequest, NextResponse } from "next/server";
import { verifyMessage, createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; // ⭐ REQUIRED

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

    // ⭐ 3. Fetch the admin user from your database
    const user = await prisma.user.findUnique({
      where: { walletAddress: address.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Admin wallet not found in database" },
        { status: 403 }
      );
    }

    // ⭐ 4. Create JWT with REAL values
    const token = jwt.sign(
  {
    userId: user.id,        // REQUIRED
    ownerId: user.ownerId,  // optional
    role: user.role,        // REQUIRED
  },
    JWT_SECRET,
    { expiresIn: "7d" }
    );

    // ⭐ 5. Create response object FIRST
    const res = NextResponse.json({ success: true });

    // ⭐ 6. Set cookie
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;

  } catch (err) {
    console.error("ADMIN WALLET LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
