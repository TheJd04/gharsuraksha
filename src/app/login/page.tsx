"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MockCaptcha } from "@/components/ui/mock-captcha";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isVerified) {
      setError("Please complete the security verification.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 fade-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🛡️</span>
            <span className="text-2xl font-bold gradient-text">GharSuraksha</span>
          </Link>
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 fade-in">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="pt-2">
            <MockCaptcha onVerify={setIsVerified} />
          </div>

          <button
            type="submit"
            disabled={loading || !isVerified}
            className="btn-primary w-full py-3 mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[var(--primary)] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
