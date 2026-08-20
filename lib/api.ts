// ===============================
//  API CLIENT FOR GENXBABY FRONTEND
// ===============================

export const API_BASE = "https://genxbaby-backend-production.up.railway.app";

// Safely read token only on client
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// Generic API wrapper
export async function api(path: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}

// ===============================
//  UNDERWRITING
// ===============================

export async function fetchUnderwritingResult(applicationId: string) {
  const token = getToken();

  const res = await fetch(
    `${API_BASE}/api/admin/underwriting/${applicationId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch underwriting result");
  }

  return res.json();
}

// ===============================
//  AUTH HELPERS
// ===============================

export async function login(email: string, password: string) {
  return api("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function me() {
  return api("/api/admin/me", { method: "GET" });
}

// ===============================
//  CHECKS
// ===============================

export async function fetchCheck(checkId: string) {
  return api(`/api/checks/${checkId}`, { method: "GET" });
}

export async function fetchCheckHistory(checkId: string) {
  return api(`/api/checks/history?checkId=${checkId}`, { method: "GET" });
}

// ===============================
//  BANK PROFILES
// ===============================

export async function listBankProfiles() {
  return api("/api/bank-profiles/list", { method: "GET" });
}

export async function getBankProfile(id: string) {
  return api(`/api/bank-profiles/details/${id}`, { method: "GET" });
}
