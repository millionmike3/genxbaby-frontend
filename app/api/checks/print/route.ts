import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      bank,
      signer,
      checkNumber,
      payee,
      amount,
      memo,
      date,
      routingNumber,
      accountNumber
    } = body;

    // Basic validation (frontend only)
    if (!checkNumber || !payee || !amount || !bank || !signer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy print‑PDF generation request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/checks/print`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Backend returns raw PDF bytes
    const pdfBytes = await response.arrayBuffer();

    return new NextResponse(pdfBytes, {
      status: response.status,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=check-print.pdf",
      },
    });
  } catch (error) {
    console.error("FRONTEND PRINT PDF ERROR:", error);
    return NextResponse.json(
      { error: "Failed to generate print PDF" },
      { status: 500 }
    );
  }
}
