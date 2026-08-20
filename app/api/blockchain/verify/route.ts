import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { checkId } = await req.json();

    if (!checkId) {
      return NextResponse.json(
        { error: "Missing checkId" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy blockchain verification to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/blockchain/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkId }),
    });

    // Backend returns JSON with:
    // { success, onChainHash, recomputedHash, match }
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BLOCKCHAIN VERIFY ERROR:", err);
    return NextResponse.json(
      { error: "Failed to verify check" },
      { status: 500 }
    );
  }
}
