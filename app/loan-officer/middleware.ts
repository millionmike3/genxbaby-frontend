import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: any) {
  const session = req.cookies.get("session")?.value;

  if (!session) return NextResponse.next();

  try {
    const { payload } = await jwtVerify(
      session,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    // Loan Officer protected routes
    if (req.nextUrl.pathname.startsWith("/loan-officer")) {
      if (payload.role !== "LOAN_OFFICER") {
        return NextResponse.redirect(new URL("/loan-officer/login", req.url));
      }
    }
  } catch (e) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
