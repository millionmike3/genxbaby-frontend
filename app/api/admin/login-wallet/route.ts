import { NextResponse } from "next/server";
import { verifyMessage, createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { CHECK_REGISTRY_ABI } from "@/lib/contract";

export async function POST(req: Request) {
  try {
    const { address, signature, message } = await req.json();

    if (!address || !signature || !message) {
      return NextResponse.json(
        { error: "Missing wallet login data" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 1. Verify signature (NO chain parameter allowed)
    // ---------------------------------------------
    const ok = await verifyMessage({
      address,
      message,
      signature,
    });

    if (!ok) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. On-chain role verification
    // ---------------------------------------------
    const client = createPublicClient({
      chain: polygon,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
    });

    const isAdminOnChain = await client.readContract({
      address: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
      abi: CHECK_REGISTRY_ABI,
      functionName: "isAdmin",
      args: [address],
    });

    if (!isAdminOnChain) {
      return NextResponse.json(
        { error: "On-chain role check failed" },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // 3. Proxy DB lookup + JWT creation to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/admin/login-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    const data = await response.json();

    // Backend returns: { success, token }
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // ---------------------------------------------
    // 4. Set admin session cookie
    // ---------------------------------------------
    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: "admin_session",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
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
