import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File;
    const userId = form.get("userId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Proxy borrower doc upload to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/borrower/docs/upload`, {
      method: "POST",
      body: form, // send FormData directly
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND BORROWER DOC UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Failed to upload borrower document" },
      { status: 500 }
    );
  }
}
