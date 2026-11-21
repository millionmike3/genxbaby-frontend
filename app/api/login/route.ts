import { NextRequest, NextResponse } from "next/server";
import { POST as backendLogin } from "../auth/backend-login/route";

export const runtime = "nodejs";

const roleRedirects: Record<string, string> = {
  OWNER: "/owner-portal",
  ADMIN: "/admin-portal",
  INVESTOR: "/investor-portal",
  PROCESSOR: "/processor-portal",
  UNDERWRITER: "/underwriter-portal",
  LOAN_OFFICER: "/loan-officer-portal",
  SERVICING: "/servicing-portal",
  STAFF: "/staff-portal",
  BORROWER: "/borrower-portal",
};

export async function POST(request: NextRequest) {
  try {
    const upstreamResponse = await backendLogin(request);

    if (!upstreamResponse.ok) {
      return upstreamResponse;
    }

    const data = await upstreamResponse.clone().json().catch(() => null);

    if (
      !data?.success ||
      typeof data.role !== "string" ||
      !roleRedirects[data.role]
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Login response did not contain a recognized role.",
        },
        { status: 502 }
      );
    }

    const response = NextResponse.json(
      {
        ...data,
        redirect: roleRedirects[data.role],
      },
      { status: upstreamResponse.status }
    );

    for (const cookie of upstreamResponse.cookies.getAll()) {
      response.cookies.set(cookie);
    }

    return response;
  } catch (error) {
    console.error("LOGIN ROUTE DELEGATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to complete login.",
      },
      { status: 500 }
    );
  }
}