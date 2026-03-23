"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";



const steps = ["Your Details", "Verify", "Done"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = details, 1 = verify, 2 = done
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Form fields

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSendOtp = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setOtpSent(true);
  };

  const handleNext = async () => {
    if (step === 0) {
      const errs: string[] = [];
      if (!name.trim()) errs.push("Please enter your full name.");
      if (!gender) errs.push("Please select Bride or Groom.");
      if (!email.includes("@")) errs.push("Please enter a valid email address.");
      if (password.length < 6) errs.push("Password must be at least 6 characters.");
      if (password !== confirmPassword) errs.push("Passwords do not match.");
      if (!agreed) errs.push("Please accept the Terms & Conditions to continue.");
      if (errs.length > 0) { setErrors(errs); return; }
      setErrors([]);
    }
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

  const isStep0Valid = !!(name.trim() && gender && email.includes("@") && password.length >= 6 && password === confirmPassword && agreed);
  const isStep1Valid = otp.every((d) => d !== "");

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#fdfbf9", fontFamily: "var(--font-poppins, sans-serif)" }}>

      {/* Left panel — hero image */}
      <div className="hidden lg:flex" style={{
        width: "45%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center",
        backgroundImage: "url('/couples/couple-hero.png')",
        backgroundSize: "cover", backgroundPosition: "center top",
        position: "relative", overflow: "hidden",
      }}>
        {/* Dark gradient overlay — bottom-up */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,10,20,0.82) 0%, rgba(26,10,20,0.1) 45%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />

        {/* Bottom text */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "40px 40px", width: "100%" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "26px", fontWeight: 700, color: "#fff", display: "block", marginBottom: "12px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
            </span>
          </Link>
          <h2 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "28px", fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: "10px", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
            Find Your Perfect Match
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
            UK's most trusted elite Indian matrimonial service
          </p>
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

              {/* Email + Password */}
              <div style={{ marginBottom: "20px" }}>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "12px 48px 12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                      />
                      <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#aaa" }}>
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ width: "100%", padding: "12px 16px", border: `1px solid ${confirmPassword && confirmPassword !== password ? "#dc1e3c" : "rgba(220,30,60,0.15)"}`, borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                    />
                    {confirmPassword && confirmPassword !== password && (
                      <p style={{ fontSize: "11px", color: "#dc1e3c", marginTop: "4px" }}>Passwords do not match</p>
                    )}
                  </div>
                </div>

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

              {errors.length > 0 && (
                <div style={{ marginBottom: "16px", padding: "12px 16px", background: "rgba(220,30,60,0.05)", border: "1px solid rgba(220,30,60,0.2)", borderRadius: "10px" }}>
                  {errors.map((e, i) => (
                    <p key={i} style={{ fontSize: "12px", color: "#dc1e3c", margin: i > 0 ? "4px 0 0" : "0" }}>• {e}</p>
                  ))}
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={loading}
                style={{
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #dc1e3c, #a0153c)",
                  color: "#fff",
                  borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                  border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
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
                Verify your email
              </h1>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
                We sent a 6-digit code to <strong style={{ color: "#1a0a14" }}>{email}</strong>
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
                  {loading ? "Sending…" : "Send Verification Code"}
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
