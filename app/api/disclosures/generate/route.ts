import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInitialDisclosures } from "@/lib/services/disclosures";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const formData = await request.formData();
  const applicationId = formData.get("applicationId") as string | null;

  if (!applicationId) {
    return NextResponse.json(
      { error: "Missing applicationId" },
      { status: 400 }
    );
  }

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!app) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  // Generate PDF and upload to Supabase
  const url = await generateInitialDisclosures(app);

  // Save disclosure record
  await prisma.disclosure.create({
    data: {
      applicationId,
      type: "initial",
      url,
    },
  });

  // Timeline event
  await prisma.timelineEvent.create({
    data: {
      applicationId,
      type: "disclosure_generated",
      message: "Initial disclosures generated",
    },
  });

  return NextResponse.json({ url });
}
