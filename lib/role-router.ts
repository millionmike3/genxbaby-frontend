
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";

const ROLE_REDIRECTS: Record<string, string> = {
  ADMIN: "/admin-portal",
  OWNER: "/owner-portal",
  UNDERWRITER: "/underwriter-portal",
  INVESTOR: "/investor-portal",
  LOAN_OFFICER: "/loan-officer-portal",
  PROCESSOR: "/processor-portal",
  SERVICING: "/servicing-portal",
  STAFF: "/staff-portal",
  BORROWER: "/borrower-portal",
};

export async function routeByRole(): Promise<string> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return "/login";
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (typeof payload.role !== "string") {
      return "/login";
    }

    const role = payload.role.trim().toUpperCase();

    return ROLE_REDIRECTS[role] ?? "/login";
  } catch (error) {
    console.error("ROLE ROUTING TOKEN VERIFICATION FAILED:", error);
    return "/login";
  }
}
