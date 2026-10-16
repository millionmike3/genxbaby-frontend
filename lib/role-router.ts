import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt";

export async function routeByRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return "/login";

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const role = payload.role?.toUpperCase();

    const portalMap: Record<string, string> = {
      ADMIN: "/admin-portal",
      OWNER: "/owner-portal",
      INVESTOR: "/investor-portal",
      BORROWER: "/borrower-portal",
      UNDERWRITER: "/underwriter-portal",
      LOAN_OFFICER: "/loan-officer-portal",
      STAFF: "/staff-portal",
      SERVICING: "/servicing-portal",
      PROCESSING: "/processing-portal",
    };

    return portalMap[role] ?? "/login";
  } catch {
    return "/login";
  }
}
