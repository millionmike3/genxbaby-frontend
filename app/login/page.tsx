"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/services/authClient";
import { dashboardMap } from "@/lib/auth/dashboard-map";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError(null);
    setLoading(true);

    try {
      const data = await login(email, password);
      const destination = dashboardMap[data.role];

      if (!destination) {
        throw new Error("Your account has an unrecognized role. Please contact support.");
      }

      router.replace(destination);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", paddingTop: 40 }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
        autoComplete="username"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
        autoComplete="current-password"
        required
      />

      <button
        onClick={handleLogin}
        disabled={loading || !email.trim() || !password}
        style={{ width: "100%" }}
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </div>
  );
}
