"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res?.token) {
        localStorage.setItem("token", res.token);
        router.push("/dashboard");
      } else {
        setError("Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-6">
      <div className="gx-card p-10 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold gx-text-primary text-center mb-8">
          Login
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-[#111118] border border-white/10 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-[#111118] border border-white/10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="gx-btn-primary w-full py-3 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="gx-text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
