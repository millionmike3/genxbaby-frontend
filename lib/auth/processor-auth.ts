import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const SECRET = process.env.JWT_SECRET!;

export async function processorAuth() {
  // ----------------------------------------------------
  // 1. Extract unified auth cookie
  // ----------------------------------------------------
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login?error=missing-token");
  }

  // ----------------------------------------------------
  // 2. Verify JWT using JOSE
  // ----------------------------------------------------
  let payload: any;
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    payload = verified.payload;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    redirect("/login?error=invalid-token");
  }

  // ----------------------------------------------------
  // 3. Enforce PROCESSOR role (uppercase enum)
  // ----------------------------------------------------
  if (payload.role !== "PROCESSOR") {
    redirect("/login?error=not-processor");
  }

  // ----------------------------------------------------
  // 4. Return unified payload
  // ----------------------------------------------------
  return {
    userId: payload.userId,
    role: payload.role,
  };
}
