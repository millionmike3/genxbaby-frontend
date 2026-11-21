
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/services/authClient";
import { dashboardMap } from "@/lib/auth/dashboard-map";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const data = await login(email.trim(), password);

      const role = (
        data.role ||
        data.user?.role ||
        ""
      ).trim().toUpperCase();

      const destination = dashboardMap[role];

      if (!destination) {
        throw new Error(
          "Your account has an unrecognized role. Please contact support."
        );
      }

      router.replace(destination);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#24105c] via-[#6336b5] to-[#1767bd] px-5 py-12">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-blue-300/30 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

      {/* Login card */}
      <section className="relative z-10 w-full max-w-md">

        <form
          onSubmit={handleLogin}
          className="space-y-7 rounded-3xl border border-white/25 bg-white/10 p-7 text-white shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-10"
        >

          {/* Brand */}
          <div className="space-y-3 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 shadow-lg">
              <span className="text-2xl font-black tracking-tight">
                GX
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-wider sm:text-4xl">
              GEN X BABY
            </h1>

            <p className="text-sm font-medium tracking-wide text-white/75">
              Secure Business Portal
            </p>

            <div className="mx-auto h-1 w-16 rounded-full bg-white/70" />

          </div>

          {/* Welcome message */}
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-semibold">
              Welcome Back
            </h2>

            <p className="text-sm text-white/70">
              Sign in to access your account and dashboard.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-xl border border-red-300/40 bg-red-500/20 px-4 py-3 text-sm text-white"
            >
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white/90"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
              disabled={loading}
              className="w-full rounded-xl border border-white/25 bg-white/15 px-4 py-3.5 text-white outline-none transition placeholder:text-white/50 focus:border-white/70 focus:bg-white/20 focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white/90"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
                className="w-full rounded-xl border border-white/25 bg-white/15 px-4 py-3.5 pr-20 text-white outline-none transition placeholder:text-white/50 focus:border-white/70 focus:bg-white/20 focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Sign in */}
          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/20 px-5 py-4 font-bold tracking-wide text-white shadow-lg transition duration-200 hover:bg-white/30 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden="true"
              />
            )}

            {loading ? "Signing In..." : "SIGN IN"}
          </button>

          {/* Security note */}
          <div className="border-t border-white/20 pt-5 text-center">
            <p className="text-xs leading-relaxed text-white/65">
              Protected authentication. Authorized access only.
            </p>

            <p className="mt-2 text-xs text-white/50">
              GEN X BABY Financial Platform
            </p>
          </div>

        </form>
      </section>
    </main>
  );
}
