"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart, Phone, User, Brain, Shield, Sliders,
  Check, ArrowRight, ArrowLeft, Upload, Star,
} from "lucide-react";

const steps = [
  { id: 1, label: "Verify Phone",    icon: Phone,   title: "Let's start with your phone number", subtitle: "We'll send a one-time verification code" },
  { id: 2, label: "Basic Profile",   icon: User,    title: "Tell us about yourself",              subtitle: "Your profile helps us find better matches" },
  { id: 3, label: "Personality",     icon: Brain,   title: "Quick personality snapshot",          subtitle: "5 questions · takes 2 minutes · powers AI matching" },
  { id: 4, label: "ID Verify",       icon: Shield,  title: "Verify your identity",                subtitle: "Government-grade trust — only you can see this data" },
  { id: 5, label: "Preferences",     icon: Sliders, title: "Your partner preferences",            subtitle: "We'll use this to filter and rank your daily matches" },
];

const personalities = [
  { q: "I prefer spending weekends…", a: ["At home with family", "Exploring new places", "Both equally", "With close friends"] },
  { q: "My career ambitions are…",    a: ["Very important to me", "Important but balanced", "Secondary to family", "Still figuring out"] },
  { q: "My ideal family life looks like…", a: ["Joint family", "Nuclear with close ties", "Nuclear independent", "Open to either"] },
  { q: "I handle disagreements by…",  a: ["Discussing calmly", "Giving space first", "Seeking compromise", "Avoiding confrontation"] },
  { q: "My communication style is…",  a: ["Direct and honest", "Thoughtful and measured", "Expressive and warm", "Reserved but deep"] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({ name: "", dob: "", gender: "", religion: "", caste: "", height: "", city: "", education: "", profession: "" });
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [prefs, setPrefs] = useState({ ageMin: "25", ageMax: "32", religion: "Any", city: "Any India" });

  const progress = ((step - 1) / (steps.length - 1)) * 100;
  const currentStep = steps[step - 1];

  const next = () => step < steps.length ? setStep(step + 1) : router.push("/dashboard");
  const back = () => step > 1 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Heart className="w-6 h-6 text-rose fill-rose" />
        <span className="font-display text-2xl font-semibold text-deep">Match4Marriage</span>
      </div>

      {/* Progress */}
      <div className="w-full max-w-lg mb-8">
        {/* Step pills */}
        <div className="flex items-center justify-between mb-3">
          {steps.map((s) => {
            const Icon = s.icon;
            const done = s.id < step;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: done ? "linear-gradient(135deg,#5C7A52,#8DB870)" : active ? "linear-gradient(135deg,#E8426A,#FF8FA3)" : "rgba(28,15,6,0.06)",
                    border: done || active ? "none" : "1px solid rgba(28,15,6,0.12)",
                  }}
                >
                  {done
                    ? <Check className="w-4 h-4 text-white" />
                    : <Icon className={`w-4 h-4 ${active ? "text-white" : "text-deep/30"}`} />
                  }
                </div>
                <span className={`font-body text-[10px] text-center ${active ? "text-rose font-semibold" : "text-deep/35"}`} style={{ maxWidth: "52px", lineHeight: "1.2" }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-deep/8 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#E8426A,#C89020)" }} />
        </div>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-lg rounded-3xl p-8"
        style={{ background: "rgba(250,246,238,0.96)", border: "1px solid rgba(154,107,0,0.14)", boxShadow: "0 8px 40px rgba(196,82,15,0.08)" }}
      >
        <div className="mb-6">
          <p className="font-devanagari text-gold/60 text-sm mb-1">चरण {step} / {steps.length}</p>
          <h2 className="font-display text-2xl font-light text-deep mb-1">{currentStep.title}</h2>
          <p className="font-body text-sm text-deep/45">{currentStep.subtitle}</p>
        </div>

        {/* Step 1 — Phone + OTP */}
        {step === 1 && (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                  <div className="flex items-center gap-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.2)", height: "48px" }}>
                    <span className="font-body text-sm text-deep/60 border-r pr-3" style={{ borderColor: "rgba(154,107,0,0.2)" }}>+91</span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent font-body text-sm text-deep outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setOtpSent(true)}
                  disabled={phone.length < 10}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3 transition-all"
                  style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", opacity: phone.length < 10 ? 0.5 : 1, minHeight: "auto" }}
                >
                  Send OTP <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <p className="font-body text-sm text-deep/60">Enter the 6-digit OTP sent to <strong>+91 {phone}</strong></p>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/, "");
                        const next = [...otp]; next[i] = val; setOtp(next);
                        if (val && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
                      }}
                      id={`otp-${i}`}
                      className="w-11 h-12 text-center rounded-xl font-display text-xl font-bold text-deep outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.8)", border: digit ? "2px solid #E8426A" : "1px solid rgba(154,107,0,0.2)" }}
                    />
                  ))}
                </div>
                <p className="font-body text-xs text-center text-deep/40">Didn't receive? <button className="text-rose font-medium" style={{ minHeight: "auto" }}>Resend in 30s</button></p>
              </>
            )}
          </div>
        )}

        {/* Step 2 — Basic Profile */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "name", label: "Full Name", placeholder: "Prabhakar Sharma" },
                { key: "dob",  label: "Date of Birth", placeholder: "DD/MM/YYYY", type: "date" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">{label}</label>
                  <input
                    type={type || "text"}
                    placeholder={placeholder}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl font-body text-sm text-deep outline-none"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setForm({ ...form, gender: g })}
                  className="py-2.5 rounded-xl font-body text-sm font-medium transition-all"
                  style={{
                    background: form.gender === g ? "linear-gradient(135deg,#E8426A,#FF8FA3)" : "rgba(255,255,255,0.6)",
                    border: form.gender === g ? "none" : "1px solid rgba(154,107,0,0.18)",
                    color: form.gender === g ? "#fff" : "rgba(28,15,6,0.6)",
                    minHeight: "auto",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "religion", label: "Religion", placeholder: "Hindu" },
                { key: "caste",    label: "Caste / Community", placeholder: "Brahmin" },
                { key: "city",     label: "City", placeholder: "Mumbai" },
                { key: "height",   label: "Height", placeholder: "5'8\"" },
                { key: "education",label: "Education", placeholder: "B.Tech, IIT" },
                { key: "profession",label: "Profession", placeholder: "Software Engineer" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">{label}</label>
                  <input
                    placeholder={placeholder}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl font-body text-sm text-deep outline-none"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Personality Quiz */}
        {step === 3 && (
          <div className="space-y-5">
            {personalities.map((p, qi) => (
              <div key={qi}>
                <p className="font-body text-sm font-semibold text-deep mb-2">{qi + 1}. {p.q}</p>
                <div className="grid grid-cols-2 gap-2">
                  {p.a.map((ans, ai) => (
                    <button
                      key={ai}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [qi]: ai })}
                      className="text-left px-3 py-2.5 rounded-xl font-body text-xs leading-snug transition-all"
                      style={{
                        background: quizAnswers[qi] === ai ? "rgba(196,82,15,0.1)" : "rgba(255,255,255,0.6)",
                        border: quizAnswers[qi] === ai ? "1.5px solid #E8426A" : "1px solid rgba(154,107,0,0.15)",
                        color: quizAnswers[qi] === ai ? "#E8426A" : "rgba(28,15,6,0.6)",
                        minHeight: "auto",
                      }}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4 — ID Verification */}
        {step === 4 && (
          <div className="space-y-4">
            <div
              className="rounded-2xl p-4"
              style={{ background: "rgba(92,122,82,0.08)", border: "1px solid rgba(92,122,82,0.2)" }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-semibold text-sage">Your data is protected</p>
                  <p className="font-body text-xs text-sage/70 mt-0.5">Aadhaar numbers are hashed and never stored in plain text. PDPB compliant. Only the verification status is shared with matches.</p>
                </div>
              </div>
            </div>

            {[
              { label: "Aadhaar Card", sub: "12-digit Aadhaar number", placeholder: "XXXX XXXX XXXX", icon: "🪪" },
              { label: "PAN Card",     sub: "10-character PAN number",  placeholder: "ABCDE1234F",     icon: "📄" },
            ].map(({ label, sub, placeholder, icon }) => (
              <div key={label}>
                <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">{label}</label>
                <p className="font-body text-xs text-deep/40 mb-2">{sub}</p>
                <div className="flex items-center gap-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)", height: "48px" }}>
                  <span className="text-lg">{icon}</span>
                  <input
                    placeholder={placeholder}
                    className="flex-1 bg-transparent font-body text-sm text-deep outline-none tracking-widest"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-1.5">Profile Photo</label>
              <div
                className="rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-rose/5 transition-colors"
                style={{ border: "2px dashed rgba(154,107,0,0.25)" }}
              >
                <Upload className="w-6 h-6 text-rose/50" />
                <p className="font-body text-sm text-deep/50">Upload selfie for liveness check</p>
                <p className="font-body text-xs text-deep/30">JPG or PNG · Max 5MB</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Preferences */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-2">Partner Age Range</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={prefs.ageMin}
                  onChange={(e) => setPrefs({ ...prefs, ageMin: e.target.value })}
                  className="w-20 text-center px-2 py-2.5 rounded-xl font-display text-lg font-semibold text-deep outline-none"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                />
                <span className="font-body text-sm text-deep/40">to</span>
                <input
                  type="number"
                  value={prefs.ageMax}
                  onChange={(e) => setPrefs({ ...prefs, ageMax: e.target.value })}
                  className="w-20 text-center px-2 py-2.5 rounded-xl font-display text-lg font-semibold text-deep outline-none"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                />
                <span className="font-body text-sm text-deep/40">years</span>
              </div>
            </div>

            {[
              { key: "religion", label: "Religion Preference", options: ["Any", "Hindu", "Muslim", "Sikh", "Christian", "Jain"] },
              { key: "city",     label: "Location Preference", options: ["Any India", "Same city", "Same state", "Metro cities", "NRI / Abroad"] },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <label className="font-body text-xs text-deep/50 uppercase tracking-wider block mb-2">{label}</label>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPrefs({ ...prefs, [key]: opt })}
                      className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                      style={{
                        background: (prefs as Record<string, string>)[key] === opt ? "linear-gradient(135deg,#E8426A,#FF8FA3)" : "rgba(255,255,255,0.6)",
                        border: (prefs as Record<string, string>)[key] === opt ? "none" : "1px solid rgba(154,107,0,0.15)",
                        color: (prefs as Record<string, string>)[key] === opt ? "#fff" : "rgba(28,15,6,0.55)",
                        minHeight: "auto",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background: "rgba(196,82,15,0.06)", border: "1px solid rgba(196,82,15,0.15)" }}
            >
              <Star className="w-4 h-4 text-rose flex-shrink-0 mt-0.5" />
              <p className="font-body text-xs text-deep/60">
                Your preferences guide our AI — they're not hard filters. We may show highly compatible profiles outside these criteria.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm font-medium text-deep/55 transition-colors hover:text-deep"
              style={{ border: "1px solid rgba(28,15,6,0.15)", minHeight: "auto" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3 transition-all"
            style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", boxShadow: "0 4px 16px rgba(196,82,15,0.35)", minHeight: "auto" }}
          >
            {step === steps.length ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {step === 1 && (
          <p className="font-body text-xs text-center text-deep/30 mt-4">
            Already have an account?{" "}
            <Link href="/dashboard" className="text-rose font-medium hover:underline" style={{ minHeight: "auto" }}>Sign in</Link>
          </p>
        )}
      </div>

      {/* Step indicator */}
      <p className="font-body text-xs text-deep/30 mt-6">Step {step} of {steps.length}</p>
    </div>
  );
}
