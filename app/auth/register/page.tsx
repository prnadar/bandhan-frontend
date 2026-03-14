"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, ArrowLeft, Check, Phone, User, Shield } from "lucide-react";

const steps = [
  { id: 1, label: "Phone" },
  { id: 2, label: "About You" },
  { id: 3, label: "Verify" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({
    name: "", dob: "", gender: "", religion: "", city: "", profession: "",
  });

  const next = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    if (step < 3) setStep(step + 1);
    else router.push("/onboarding");
  };

  const sendOtp = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setOtpSent(true);
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-10" style={{ minHeight: "auto" }}>
        <Heart className="w-6 h-6 text-marigold fill-marigold" />
        <span className="font-display text-2xl font-semibold text-deep">Bandhan</span>
      </Link>

      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8">
        {steps.map((s, i) => {
          const done = s.id < step;
          const active = s.id === step;
          return (
            <div key={s.id} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-bold transition-all"
                  style={{
                    background: done ? "linear-gradient(135deg,#5C7A52,#8DB870)" : active ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(28,15,6,0.08)",
                    color: done || active ? "#fff" : "rgba(28,15,6,0.3)",
                  }}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <span className={`font-body text-xs ${active ? "text-marigold font-semibold" : "text-deep/35"}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-px" style={{ background: done ? "rgba(92,122,82,0.4)" : "rgba(28,15,6,0.1)" }} />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="w-full max-w-sm rounded-3xl p-8"
        style={{ background: "rgba(250,246,238,0.96)", border: "1px solid rgba(154,107,0,0.16)", boxShadow: "0 8px 40px rgba(196,82,15,0.08)" }}
      >
        {/* Step 1 — Phone */}
        {step === 1 && (
          <>
            <div className="mb-6">
              <p className="font-devanagari text-gold/60 text-sm mb-1">शुरुआत करें</p>
              <h1 className="font-display text-2xl font-light text-deep">Create your profile</h1>
              <p className="font-body text-sm text-deep/45 mt-1">Join 2 million verified Indian families</p>
            </div>

            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                  <div className="flex items-center gap-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.2)", height: "48px" }}>
                    <span className="text-base border-r pr-3 font-body text-sm text-deep/60" style={{ borderColor: "rgba(154,107,0,0.2)" }}>🇮🇳 +91</span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/, "").slice(0, 10))}
                      className="flex-1 bg-transparent font-body text-sm text-deep outline-none tracking-wider"
                    />
                  </div>
                </div>
                <button
                  onClick={sendOtp}
                  disabled={phone.length < 10 || loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3.5"
                  style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", opacity: phone.length < 10 ? 0.55 : 1, minHeight: "auto" }}
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-body text-sm text-deep/55">OTP sent to <strong>+91 {phone}</strong></p>
                <div className="flex gap-2 justify-center">
                  {otp.map((d, i) => (
                    <input
                      key={i} id={`rotp-${i}`} type="text" inputMode="numeric" maxLength={1} value={d}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/, "");
                        const n = [...otp]; n[i] = v; setOtp(n);
                        if (v && i < 5) (document.getElementById(`rotp-${i + 1}`) as HTMLInputElement)?.focus();
                      }}
                      className="w-11 h-12 text-center rounded-xl font-display text-xl font-bold text-deep outline-none"
                      style={{ background: "rgba(255,255,255,0.8)", border: d ? "2px solid #C4520F" : "1px solid rgba(154,107,0,0.2)" }}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  disabled={otp.join("").length < 6 || loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3.5"
                  style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", opacity: otp.join("").length < 6 ? 0.55 : 1, minHeight: "auto" }}
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Verify & Continue <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2 — Basic info */}
        {step === 2 && (
          <>
            <div className="mb-5">
              <h1 className="font-display text-2xl font-light text-deep">Tell us about you</h1>
              <p className="font-body text-sm text-deep/45 mt-1">This powers your AI-matched profile</p>
            </div>
            <div className="space-y-3">
              {[
                { k: "name", label: "Full Name", ph: "Prabhakar Sharma" },
                { k: "dob",  label: "Date of Birth", ph: "", type: "date" },
                { k: "city", label: "City", ph: "Mumbai" },
                { k: "religion", label: "Religion", ph: "Hindu" },
                { k: "profession", label: "Profession", ph: "Software Engineer" },
              ].map(({ k, label, ph, type }) => (
                <div key={k}>
                  <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1">{label}</label>
                  <input
                    type={type || "text"} placeholder={ph}
                    value={(form as Record<string, string>)[k]}
                    onChange={(e) => set(k, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl font-body text-sm text-deep outline-none"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                  />
                </div>
              ))}
              <div>
                <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <button key={g} onClick={() => set("gender", g)}
                      className="py-2.5 rounded-xl font-body text-sm font-medium transition-all"
                      style={{
                        background: form.gender === g ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(255,255,255,0.6)",
                        border: form.gender === g ? "none" : "1px solid rgba(154,107,0,0.18)",
                        color: form.gender === g ? "#fff" : "rgba(28,15,6,0.6)",
                        minHeight: "auto",
                      }}>{g}</button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3 — ID verify teaser */}
        {step === 3 && (
          <>
            <div className="mb-5">
              <h1 className="font-display text-2xl font-light text-deep">Quick ID check</h1>
              <p className="font-body text-sm text-deep/45 mt-1">Makes your profile 3× more trusted</p>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl p-4" style={{ background: "rgba(92,122,82,0.08)", border: "1px solid rgba(92,122,82,0.2)" }}>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-semibold text-sage">Your data is safe</p>
                    <p className="font-body text-xs text-sage/70 mt-0.5">Aadhaar is hashed — never stored in plain text. PDPB compliant.</p>
                  </div>
                </div>
              </div>
              {[
                { label: "Aadhaar Number", ph: "XXXX XXXX XXXX", icon: "🪪" },
                { label: "PAN Card", ph: "ABCDE1234F", icon: "📄" },
              ].map(({ label, ph, icon }) => (
                <div key={label}>
                  <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1">{label}</label>
                  <div className="flex items-center gap-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)", height: "48px" }}>
                    <span>{icon}</span>
                    <input placeholder={ph} className="flex-1 bg-transparent font-body text-sm text-deep outline-none tracking-widest" />
                  </div>
                </div>
              ))}
              <button className="w-full font-body text-sm text-marigold font-medium py-2" style={{ minHeight: "auto" }}>
                Skip for now — verify later
              </button>
            </div>
          </>
        )}

        {/* Nav buttons */}
        <div className="flex items-center gap-3 mt-6">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-4 py-3 rounded-full font-body text-sm font-medium text-deep/50 hover:text-deep transition-colors" style={{ border: "1px solid rgba(28,15,6,0.15)", minHeight: "auto" }}>
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          {(step !== 1 || otpSent) && step !== 1 && (
            <button
              onClick={next}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3 transition-all"
              style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", boxShadow: "0 4px 16px rgba(196,82,15,0.35)", minHeight: "auto" }}
            >
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{step === 3 ? "Go to Dashboard" : "Continue"} <ArrowRight className="w-4 h-4" /></>}
            </button>
          )}
        </div>

        <p className="font-body text-xs text-center text-deep/35 mt-5">
          Already registered?{" "}
          <Link href="/auth/login" className="text-marigold font-medium hover:underline" style={{ minHeight: "auto" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
