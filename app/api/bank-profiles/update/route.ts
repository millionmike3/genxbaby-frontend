import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const id = form.get("id") as string;
    const bankName = form.get("bankName") as string;
    const routingNumber = form.get("routingNumber") as string;
    const accountNumber = form.get("accountNumber") as string;
    const nextCheckNumber = Number(form.get("nextCheckNumber"));

    if (!id) {
      return NextResponse.json(
        { error: "Missing bank profile ID" },
        { status: 400 }
      );
    }

    if (!bankName || !routingNumber || !accountNumber || isNaN(nextCheckNumber)) {
      return NextResponse.json(
        { error: "Missing or invalid bank profile fields" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy update request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/bank-profiles/update`, {
      method: "POST",
      body: form, // send formData directly
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BANK PROFILE UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
