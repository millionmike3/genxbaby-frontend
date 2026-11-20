type LoginResponse = {
  success?: boolean;
  role?: string;
  user?: {
    id?: number | string;
    email?: string;
    username?: string;
    role?: string;
  } | null;
  error?: string;
};

export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/backend-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null) as LoginResponse | null;

  if (!res.ok || data?.success !== true || typeof data.role !== "string") {
    throw new Error(data?.error || "Login failed. Please check your credentials.");
  }

  return data;
}

// Legacy helpers retained temporarily for compatibility.
// The central login no longer stores or reads authentication tokens here.
export function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
}

export function getRole() {
  return typeof window !== "undefined"
    ? localStorage.getItem("role")
    : null;
}
