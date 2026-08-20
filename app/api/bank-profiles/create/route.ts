import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const bankName = form.get("bankName") as string;
    const routingNumber = form.get("routingNumber") as string;
    const accountNumber = form.get("accountNumber") as string;
    const nextCheckNumber = Number(form.get("nextCheckNumber"));

    if (!bankName || !routingNumber || !accountNumber || isNaN(nextCheckNumber)) {
      return NextResponse.json(
        { error: "Missing or invalid bank profile fields" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy bank profile creation to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/bank-profiles/create`, {
      method: "POST",
      body: form, // send formData directly
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BANK PROFILE CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
