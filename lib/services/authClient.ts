
type LoginResponse = {
  success?: boolean;
  role?: string;
  roles?: string[];
  user?: {
    id?: number | string;
    email?: string;
    username?: string;
    role?: string;
  } | null;
  error?: unknown;
  message?: unknown;
};

function extractErrorMessage(value: unknown): string | null {
  if (typeof value === "string") {
    return value.trim() || null;
  }

  if (Array.isArray(value)) {
    const messages = value
      .map(extractErrorMessage)
      .filter((message): message is string => Boolean(message));

    return messages.length > 0 ? messages.join(". ") : null;
  }

  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;

    for (const key of ["message", "error", "detail", "title"]) {
      const message = extractErrorMessage(object[key]);

      if (message) {
        return message;
      }
    }
  }

  return null;
}

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

  if (
    !res.ok ||
    data?.success !== true ||
    typeof data.role !== "string"
  ) {
    const serverMessage =
      extractErrorMessage(data?.error) ??
      extractErrorMessage(data?.message);

    throw new Error(
      serverMessage ||
      "Login failed. Please check your credentials and try again."
    );
  }

  return data;
}

// Legacy helpers retained temporarily for compatibility.
// Central authentication uses HttpOnly cookies instead.

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
