
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginResponse = {
  success?: boolean;
  role?: string;
  redirect?: string;
  error?: string;
  message?: string;
  user?: {
    id?: number | string;
    email?: string;
    username?: string;
    role?: string;
  } | null;
};

export default function LoginPageClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setRole(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data: LoginResponse = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(
          data.error ||
          data.message ||
          `Login failed (${res.status}).`
        );
        return;
      }

      if (!data.role || !data.redirect) {
        setError("Login succeeded, but the server did not provide a valid role and dashboard redirect.");
        return;
      }

      setRole(data.role);

      // The server has already set the HttpOnly authentication cookies.
      // Do not store access tokens in localStorage.

      router.replace(data.redirect);
      router.refresh();

    } catch (err) {
      console.error("LOGIN REQUEST ERROR:", err);
      setError("Unable to contact the login service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-500 to-blue-500 p-6">
      <div className="absolute w-96 h-96 bg-purple-400/40 blur-3xl rounded-full -z-10" />

      <form
        onSubmit={handleLogin}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl w-full max-w-sm space-y-6 text-white"
      >
        <h1 className="text-3xl font-bold text-center tracking-wide">
          GEN X BABY — LOGIN
        </h1>

        <p className="text-center text-white/70 text-sm -mt-3">
          Secure access required
        </p>

        {error && (
          <div
            role="alert"
            className="text-red-300 text-center font-medium"
          >
            {error}
          </div>
        )}

        {role && (
          <div className="text-green-300 text-center font-medium">
            Logged in as: {role}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            autoComplete="username"
            aria-label="Email"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/70 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            aria-label="Password"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/70 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-60 disabled:cursor-not-allowed text-white p-3 rounded-lg font-semibold tracking-wide border border-white/40 transition-all shadow-lg active:scale-[0.97]"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
