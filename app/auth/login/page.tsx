"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Phone, ArrowRight, Shield, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    // TODO: POST /api/v1/auth/send-otp
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep("otp");
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    // TODO: POST /api/v1/auth/verify-otp
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  const handleOtpChange = (i: number, val: string) => {
    const v = val.replace(/\D/, "");
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
  };

  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10" style={{ minHeight: "auto" }}>
        <Heart className="w-6 h-6 text-marigold fill-marigold" />
        <span className="font-display text-2xl font-semibold text-deep">Bandhan</span>
      </Link>

      <div
        className="w-full max-w-sm rounded-3xl p-8"
        style={{ background: "rgba(250,246,238,0.96)", border: "1px solid rgba(154,107,0,0.16)", boxShadow: "0 8px 40px rgba(196,82,15,0.08)" }}
      >
        {step === "phone" ? (
          <>
            <div className="mb-6">
              <p className="font-devanagari text-gold/60 text-sm mb-1">स्वागत है</p>
              <h1 className="font-display text-2xl font-light text-deep">Welcome back</h1>
              <p className="font-body text-sm text-deep/45 mt-1">Sign in with your mobile number</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                <div
                  className="flex items-center gap-2 px-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.2)", height: "48px" }}
                >
                  <div className="flex items-center gap-2 border-r pr-3" style={{ borderColor: "rgba(154,107,0,0.2)" }}>
                    <span className="text-base">🇮🇳</span>
                    <span className="font-body text-sm text-deep/60">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/, "").slice(0, 10))}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    className="flex-1 bg-transparent font-body text-sm text-deep outline-none tracking-wider"
                  />
                  <Phone className="w-4 h-4 text-deep/25" />
                </div>
              </div>

              <button
                onClick={sendOtp}
                disabled={phone.length < 10 || loading}
                className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3.5 transition-all"
                style={{
                  background: "linear-gradient(135deg,#C4520F,#E06A1A)",
                  boxShadow: "0 4px 16px rgba(196,82,15,0.35)",
                  opacity: phone.length < 10 ? 0.55 : 1,
                  minHeight: "auto",
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP…
                  </span>
                ) : (
                  <>Send OTP <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "rgba(154,107,0,0.15)" }} />
                <span className="font-body text-xs text-deep/35">or</span>
                <div className="flex-1 h-px" style={{ background: "rgba(154,107,0,0.15)" }} />
              </div>

              {/* Auth0 social */}
              <button
                onClick={() => window.location.href = "/api/auth/login?connection=google-oauth2"}
                className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-medium text-deep/65 py-3 transition-all hover:bg-deep/5"
                style={{ border: "1px solid rgba(28,15,6,0.15)", minHeight: "auto" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
            </div>

            <p className="font-body text-xs text-center text-deep/35 mt-6">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-marigold font-medium hover:underline" style={{ minHeight: "auto" }}>
                Create profile
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="mb-6">
              <button onClick={() => setStep("phone")} className="font-body text-xs text-marigold mb-3 block hover:underline" style={{ minHeight: "auto" }}>
                ← Change number
              </button>
              <h1 className="font-display text-2xl font-light text-deep">Enter OTP</h1>
              <p className="font-body text-sm text-deep/45 mt-1">
                Sent to <strong>+91 {phone}</strong>
              </p>
            </div>

            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digit && i > 0)
                      (document.getElementById(`otp-${i - 1}`) as HTMLInputElement)?.focus();
                  }}
                  className="w-11 h-12 text-center rounded-xl font-display text-xl font-bold text-deep outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: digit ? "2px solid #C4520F" : "1px solid rgba(154,107,0,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={otp.join("").length < 6 || loading}
              className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3.5 transition-all"
              style={{
                background: "linear-gradient(135deg,#C4520F,#E06A1A)",
                boxShadow: "0 4px 16px rgba(196,82,15,0.35)",
                opacity: otp.join("").length < 6 ? 0.55 : 1,
                minHeight: "auto",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying…
                </span>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="font-body text-xs text-center text-deep/40 mt-4">
              Didn't receive it?{" "}
              <button className="text-marigold font-medium hover:underline" style={{ minHeight: "auto" }}>
                Resend in 30s
              </button>
            </p>
          </>
        )}

        {/* Trust note */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-5" style={{ borderTop: "1px solid rgba(154,107,0,0.12)" }}>
          <Lock className="w-3 h-3 text-deep/25" />
          <span className="font-body text-[10px] text-deep/30">256-bit encrypted · PDPB compliant · Data in India</span>
        </div>
      </div>

      <p className="font-body text-xs text-deep/30 mt-6 text-center max-w-sm">
        By continuing, you agree to Bandhan's{" "}
        <a href="#" className="text-marigold/70 hover:underline">Terms</a> and{" "}
        <a href="#" className="text-marigold/70 hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
}
