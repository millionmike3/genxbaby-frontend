import { NextRequest,  NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const form = await request.formData();
    const id = form.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { error: "Missing bank profile ID" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy delete request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/bank-profiles/delete`, {
      method: "POST",
      body: form, // send formData directly
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BANK PROFILE DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
