"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MockCaptcha } from "@/components/ui/mock-captcha";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Auto sign-in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Please log in.");
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
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Start protecting your home today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 fade-in">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="label">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Rahul Sharma"
              required
              autoComplete="name"
            />
          </div>

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
              placeholder="Min 6 characters"
              required
              minLength={8}
              autoComplete="new-password"
            />
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Must contain 8+ chars, 1 uppercase, 1 number, 1 special character.</p>
          </div>

          <div className="pt-2">
            <MockCaptcha onVerify={setIsVerified} />
          </div>

          <button
            type="submit"
            disabled={loading || !isVerified}
            className="btn-primary w-full py-3 mt-4"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
