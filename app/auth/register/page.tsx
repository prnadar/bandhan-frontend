"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Method = "phone" | "email";

const steps = ["Your Details", "Verify", "Done"];

export default function RegisterPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("phone");
  const [step, setStep] = useState(0); // 0 = details, 1 = verify, 2 = done
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Form fields
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setOtpSent(true);
  };

  const handleNext = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    if (step < 2) setStep(step + 1);
    else router.push("/onboarding");
  };

  const handleOtpChange = (val: string, idx: number) => {
    const updated = [...otp];
    updated[idx] = val.replace(/\D/, "").slice(-1);
    setOtp(updated);
    if (val && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  };

  const isStep0Valid = name.trim() && gender && (method === "phone" ? phone.length === 10 : email.includes("@")) && agreed;
  const isStep1Valid = otp.every((d) => d !== "");

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#fdfbf9", fontFamily: "var(--font-poppins, sans-serif)" }}>

      {/* Left panel — branding */}
      <div className="hidden lg:flex" style={{
        width: "45%", flexDirection: "column", justifyContent: "center", alignItems: "center",
        background: "linear-gradient(160deg, #1a0a14 0%, #2d0f20 60%, #3b1428 100%)",
        padding: "60px 48px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative rings */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(220,30,60,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", border: "1px solid rgba(220,30,60,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "-120px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(255,216,122,0.08)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "360px" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#fff", display: "block", marginBottom: "48px" }}>
              Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
            </span>
          </Link>

          <div style={{ fontSize: "48px", marginBottom: "24px" }}>💍</div>

          <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "32px", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "16px" }}>
            Find Your Perfect Match
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "40px" }}>
            Join the UK's most trusted elite Indian matrimonial service. Every profile is personally verified by our team.
          </p>

          {/* Trust points */}
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

      {/* Right panel — form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 24px" }}>

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden" style={{ textDecoration: "none", marginBottom: "32px" }}>
          <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "24px", fontWeight: 700, color: "#1a0a14" }}>
            Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
          </span>
        </Link>

        <div style={{ width: "100%", maxWidth: "440px" }}>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "36px" }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: i < step ? "#22c55e" : i === step ? "#dc1e3c" : "rgba(0,0,0,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, color: i <= step ? "#fff" : "#aaa",
                    flexShrink: 0,
                  }}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: i === step ? 600 : 400, color: i === step ? "#dc1e3c" : "#aaa" }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: "32px", height: "1px", background: i < step ? "#22c55e" : "rgba(0,0,0,0.1)" }} />}
              </div>
            ))}
          </div>

          {/* ── STEP 0: Details ── */}
          {step === 0 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "26px", fontWeight: 700, color: "#1a0a14", marginBottom: "6px" }}>
                Create your profile
              </h1>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
                Already registered? <Link href="/auth/login" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Log in</Link>
              </p>

              {/* Name */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Gender */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>I am a</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {["Bride", "Groom"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      style={{
                        padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                        border: `2px solid ${gender === g ? "#dc1e3c" : "rgba(220,30,60,0.15)"}`,
                        background: gender === g ? "rgba(220,30,60,0.06)" : "#fff",
                        color: gender === g ? "#dc1e3c" : "#888",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      {g === "Bride" ? "👰 Bride" : "🤵 Groom"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Method toggle */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>Register via</label>
                <div style={{ display: "flex", background: "rgba(0,0,0,0.04)", borderRadius: "10px", padding: "4px", gap: "4px" }}>
                  {(["phone", "email"] as Method[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      style={{
                        flex: 1, padding: "9px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                        background: method === m ? "#fff" : "transparent",
                        color: method === m ? "#dc1e3c" : "#888",
                        border: "none", cursor: "pointer",
                        boxShadow: method === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      {m === "phone" ? "📱 Mobile" : "✉️ Email"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone or Email input */}
              {method === "phone" ? (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Mobile Number</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", background: "#fff", overflow: "hidden" }}>
                    <span style={{ padding: "12px 14px", fontSize: "14px", color: "#555", borderRight: "1px solid rgba(220,30,60,0.1)", whiteSpace: "nowrap", background: "#fafafa" }}>🇮🇳 +91</span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/, "").slice(0, 10))}
                      style={{ flex: 1, padding: "12px 16px", fontSize: "14px", color: "#1a0a14", background: "transparent", border: "none", outline: "none" }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              )}

              {/* Terms checkbox */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "24px", padding: "14px", background: "rgba(220,30,60,0.03)", borderRadius: "10px", border: "1px solid rgba(220,30,60,0.08)" }}>
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: "2px", accentColor: "#dc1e3c", width: "16px", height: "16px", flexShrink: 0, cursor: "pointer" }}
                />
                <label htmlFor="agree" style={{ fontSize: "12px", color: "#666", lineHeight: 1.7, cursor: "pointer" }}>
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Terms & Conditions</Link>
                  {" "}and{" "}
                  <Link href="/privacy" target="_blank" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Privacy Policy</Link>
                  . I confirm I am 18+ and legally eligible to use this service.
                </label>
              </div>

              <button
                onClick={handleNext}
                disabled={!isStep0Valid || loading}
                style={{
                  width: "100%", padding: "14px",
                  background: isStep0Valid ? "linear-gradient(135deg, #dc1e3c, #a0153c)" : "rgba(0,0,0,0.08)",
                  color: isStep0Valid ? "#fff" : "#aaa",
                  borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                  border: "none", cursor: isStep0Valid ? "pointer" : "not-allowed",
                  boxShadow: isStep0Valid ? "0 4px 16px rgba(220,30,60,0.25)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {loading ? "Please wait…" : "Continue →"}
              </button>
            </div>
          )}

          {/* ── STEP 1: Verify ── */}
          {step === 1 && (
            <div>
              <button onClick={() => setStep(0)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#888", marginBottom: "20px", padding: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                ← Back
              </button>
              <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "26px", fontWeight: 700, color: "#1a0a14", marginBottom: "8px" }}>
                Verify your {method === "phone" ? "number" : "email"}
              </h1>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
                We sent a 6-digit code to <strong style={{ color: "#1a0a14" }}>{method === "phone" ? `+91 ${phone}` : email}</strong>
              </p>

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "14px",
                    background: "linear-gradient(135deg, #dc1e3c, #a0153c)",
                    color: "#fff", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
                  }}
                >
                  {loading ? "Sending…" : `Send OTP via ${method === "phone" ? "SMS" : "Email"}`}
                </button>
              ) : (
                <>
                  {/* OTP boxes */}
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "24px" }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        style={{
                          width: "48px", height: "56px", textAlign: "center",
                          fontSize: "22px", fontWeight: 700, color: "#1a0a14",
                          border: `2px solid ${digit ? "#dc1e3c" : "rgba(220,30,60,0.15)"}`,
                          borderRadius: "10px", background: digit ? "rgba(220,30,60,0.04)" : "#fff",
                          outline: "none",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!isStep1Valid || loading}
                    style={{
                      width: "100%", padding: "14px",
                      background: isStep1Valid ? "linear-gradient(135deg, #dc1e3c, #a0153c)" : "rgba(0,0,0,0.08)",
                      color: isStep1Valid ? "#fff" : "#aaa",
                      borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                      border: "none", cursor: isStep1Valid ? "pointer" : "not-allowed",
                      boxShadow: isStep1Valid ? "0 4px 16px rgba(220,30,60,0.25)" : "none",
                    }}
                  >
                    {loading ? "Verifying…" : "Verify & Continue →"}
                  </button>

                  <p style={{ textAlign: "center", fontSize: "12px", color: "#aaa", marginTop: "16px" }}>
                    Didn't receive it?{" "}
                    <button onClick={handleSendOtp} style={{ background: "none", border: "none", color: "#dc1e3c", fontWeight: 600, cursor: "pointer", fontSize: "12px", padding: 0 }}>
                      Resend OTP
                    </button>
                  </p>
                </>
              )}
            </div>
          )}

          {/* ── STEP 2: Done ── */}
          {step === 2 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
              <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#1a0a14", marginBottom: "12px" }}>
                Welcome, {name.split(" ")[0]}!
              </h1>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "32px", lineHeight: 1.7 }}>
                Your profile has been created. Complete your profile to start connecting with verified matches.
              </p>
              <button
                onClick={() => router.push("/onboarding")}
                style={{
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #dc1e3c, #a0153c)",
                  color: "#fff", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                  border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
                }}
              >
                Complete My Profile →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
