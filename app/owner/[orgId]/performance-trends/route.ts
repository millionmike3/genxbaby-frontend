import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  const token = req.headers.get("authorization") || "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY_URL}/owner/${params.orgId}/performance`,
    { headers: { Authorization: token } }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
