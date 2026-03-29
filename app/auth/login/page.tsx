"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://match4marriage-api-production-54ea.up.railway.app";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+44");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) setHelpOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSendOtp = async () => {
    if (phone.replace(/\D/g, "").length < 7) { setError("Please enter a valid phone number."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Tenant-ID": "match4marriage" },
        body: JSON.stringify({ phone: phone.replace(/\s/g, ""), country_code: countryCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to send OTP");
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the 6-digit code."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Tenant-ID": "match4marriage" },
        body: JSON.stringify({ phone: phone.replace(/\s/g, ""), otp: code, country_code: countryCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Invalid OTP");
      // Store token and user info
      localStorage.setItem("auth_token", data.data?.access_token || data.data?.token || "");
      localStorage.setItem("user_profile", JSON.stringify(data.data?.user || {}));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (val: string, idx: number) => {
    const updated = [...otp];
    updated[idx] = val.replace(/\D/, "").slice(-1);
    setOtp(updated);
    if (val && idx < 5) (document.getElementById(`otp-login-${idx + 1}`) as HTMLInputElement)?.focus();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fdfbf9", fontFamily: "var(--font-poppins, sans-serif)" }}>

      {/* ── Site Header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(253,251,249,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(220,30,60,0.10)",
        padding: "0 32px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <Link href="/" style={{ textDecoration: "none", minHeight: "auto" }}>
          <img src="/images/logo.jpeg" alt="Match4Marriage" style={{ height: "44px", width: "auto", objectFit: "contain" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/contact" style={{ fontSize: "14px", fontWeight: 500, color: "#555", textDecoration: "none" }}
            onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#dc1e3c"}
            onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#555"}
          >Contact</Link>
          <div ref={helpRef} style={{ position: "relative" }}>
            <button onClick={() => setHelpOpen(!helpOpen)} style={{ fontSize: "14px", fontWeight: 500, color: helpOpen ? "#dc1e3c" : "#555", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
              Help
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: helpOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {helpOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: "#fff", borderRadius: "12px", minWidth: "160px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(220,30,60,0.1)", overflow: "hidden", zIndex: 100 }}>
                {[{ label: "FAQ", href: "/faq" }, { label: "Contact Us", href: "/contact" }].map((item) => (
                  <Link key={item.label} href={item.href} onClick={() => setHelpOpen(false)} style={{ display: "block", padding: "11px 18px", fontSize: "13px", fontWeight: 500, color: "#333", textDecoration: "none", borderBottom: "1px solid rgba(220,30,60,0.06)" }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(220,30,60,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "#dc1e3c"; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#333"; }}
                  >{item.label}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/auth/register" style={{ fontSize: "14px", fontWeight: 500, color: "#555", textDecoration: "none" }}>Register</Link>
          <Link href="/auth/login" style={{ fontSize: "14px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#dc1e3c,#a0153c)", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>Log In</Link>
        </div>
      </header>

      <div style={{ flex: 1, display: "flex" }}>
        {/* ── Left panel ── */}
        <div className="hidden lg:flex" style={{ width: "45%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", backgroundImage: "url('/couples/couple-hero.png')", backgroundSize: "cover", backgroundPosition: "center top", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,10,20,0.65) 0%, rgba(26,10,20,0.05) 35%, rgba(0,0,0,0) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "40px", width: "100%" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "26px", fontWeight: 700, color: "#fff", display: "block", marginBottom: "12px" }}>
                Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
              </span>
            </Link>
            <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: "10px" }}>Welcome Back</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>UK's most trusted elite Indian matrimonial service</p>
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 24px" }}>
          <Link href="/" className="lg:hidden" style={{ textDecoration: "none", marginBottom: "32px" }}>
            <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "24px", fontWeight: 700, color: "#1a0a14" }}>Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage</span>
          </Link>

          <div style={{ width: "100%", maxWidth: "440px" }}>
            <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#1a0a14", marginBottom: "6px" }}>Log In</h1>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
              New here? <Link href="/auth/register" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Create a free profile</Link>
            </p>

            {step === "phone" ? (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Phone Number</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ padding: "12px 8px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", width: "90px" }}>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+1">🇨🇦 +1</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="7700 900000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      style={{ flex: 1, padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none" }}
                    />
                  </div>
                </div>

                {error && <div style={{ marginBottom: "16px", padding: "12px 16px", background: "rgba(220,30,60,0.05)", border: "1px solid rgba(220,30,60,0.2)", borderRadius: "10px" }}><p style={{ fontSize: "12px", color: "#dc1e3c", margin: 0 }}>{error}</p></div>}

                <button onClick={handleSendOtp} disabled={loading} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#dc1e3c,#a0153c)", color: "#fff", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(220,30,60,0.25)" }}>
                  {loading ? "Sending OTP…" : "Send OTP →"}
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: "13px", color: "#555", marginBottom: "20px" }}>
                  Enter the 6-digit code sent to <strong>{countryCode} {phone}</strong>
                  <button onClick={() => { setStep("phone"); setOtp(["","","","","",""]); setError(""); }} style={{ marginLeft: "8px", fontSize: "12px", color: "#dc1e3c", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Change</button>
                </p>

                <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-login-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => { if (e.key === "Backspace" && !digit && i > 0) (document.getElementById(`otp-login-${i - 1}`) as HTMLInputElement)?.focus(); }}
                      style={{ width: "52px", height: "56px", textAlign: "center", fontSize: "22px", fontWeight: 700, border: "1px solid rgba(220,30,60,0.2)", borderRadius: "10px", outline: "none", color: "#1a0a14", background: "#fff" }}
                    />
                  ))}
                </div>

                {error && <div style={{ marginBottom: "16px", padding: "12px 16px", background: "rgba(220,30,60,0.05)", border: "1px solid rgba(220,30,60,0.2)", borderRadius: "10px" }}><p style={{ fontSize: "12px", color: "#dc1e3c", margin: 0 }}>{error}</p></div>}

                <button onClick={handleVerifyOtp} disabled={loading} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#dc1e3c,#a0153c)", color: "#fff", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(220,30,60,0.25)" }}>
                  {loading ? "Verifying…" : "Log In →"}
                </button>

                <button onClick={handleSendOtp} disabled={loading} style={{ width: "100%", marginTop: "12px", padding: "12px", background: "transparent", color: "#dc1e3c", borderRadius: "10px", fontSize: "13px", fontWeight: 600, border: "1px solid rgba(220,30,60,0.2)", cursor: "pointer" }}>
                  Resend OTP
                </button>
              </>
            )}

            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#ccc" }}>🔒 SSL Secured · GDPR Compliant · UK Registered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
