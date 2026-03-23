"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#fdfbf9", fontFamily: "var(--font-poppins, sans-serif)" }}>

      {/* Left panel */}
      <div className="hidden lg:flex" style={{
        width: "45%", flexDirection: "column", justifyContent: "center", alignItems: "center",
        background: "linear-gradient(160deg, #1a0a14 0%, #2d0f20 60%, #3b1428 100%)",
        padding: "60px 48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(220,30,60,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", border: "1px solid rgba(220,30,60,0.1)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "360px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#fff", display: "block", marginBottom: "48px" }}>
              Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
            </span>
          </Link>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>💍</div>
          <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "30px", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "16px" }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "40px" }}>
            Your perfect match could be waiting. Sign in to continue your journey.
          </p>
          {[
            "Hand-picked, verified profiles only",
            "Complete discretion guaranteed",
            "UK registered & GDPR compliant",
            "Dedicated advisor support",
          ].map((point) => (
            <div key={point} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", textAlign: "left" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(220,30,60,0.3)", border: "1px solid rgba(220,30,60,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "10px", color: "#dc1e3c" }}>✓</span>
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 24px" }}>

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden" style={{ textDecoration: "none", marginBottom: "32px" }}>
          <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "24px", fontWeight: 700, color: "#1a0a14" }}>
            Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
          </span>
        </Link>

        <div style={{ width: "100%", maxWidth: "440px" }}>

          <>
            <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#1a0a14", marginBottom: "6px" }}>
              Sign in
            </h1>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
              New here?{" "}
              <Link href="/auth/register" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Create a free profile</Link>
            </p>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "12px 48px 12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#aaa" }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <a href="#" style={{ fontSize: "12px", color: "#dc1e3c", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
            </div>

            {error && (
              <div style={{ marginBottom: "16px", padding: "12px 16px", background: "rgba(220,30,60,0.05)", border: "1px solid rgba(220,30,60,0.2)", borderRadius: "10px" }}>
                <p style={{ fontSize: "12px", color: "#dc1e3c", margin: 0 }}>• {error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                background: "linear-gradient(135deg, #dc1e3c, #a0153c)",
                color: "#fff",
                borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
              }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
              <span style={{ fontSize: "12px", color: "#bbb" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
            </div>

            <button
              onClick={() => window.location.href = "/api/auth/login?connection=google-oauth2"}
              style={{
                width: "100%", padding: "12px", borderRadius: "10px",
                border: "1px solid rgba(0,0,0,0.12)", background: "#fff",
                fontSize: "14px", fontWeight: 500, color: "#333",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </>

          {/* Footer trust */}
          <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#ccc" }}>🔒 SSL Secured · GDPR Compliant · UK Registered</p>
          </div>

        </div>
      </div>
    </div>
  );
}
