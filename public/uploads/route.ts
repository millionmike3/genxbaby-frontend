import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { emitUnderwritingEvent } from "@/app/api/underwriting/[applicationId]/events/route";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const applicationId = formData.get("applicationId") as string;
    const type = formData.get("type") as string;

    if (!file || !applicationId || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    const document = await prisma.borrowerDocument.create({
      data: {
        applicationId,
        borrowerId: "TODO", // you can fill this in later
        type,
        fileUrl,
        status: "uploaded",
      },
    });

    // Real-time event for underwriters + loan officers
    emitUnderwritingEvent(applicationId, {
      type: "DOC_UPLOADED",
      document,
    });

    return NextResponse.json({ success: true, document });
  } catch (err) {
    console.error("Document Upload Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
