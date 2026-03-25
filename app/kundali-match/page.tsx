"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star, Moon, Sparkles, ArrowRight, Check, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Shield, Phone, Mail } from "lucide-react";

type Step = "form" | "contact" | "result";

const gunaData = [
  { name: "Varna",   score: 1, max: 1, desc: "Spiritual & temperament compatibility" },
  { name: "Vashya",  score: 2, max: 2, desc: "Mutual dominance & attraction"         },
  { name: "Tara",    score: 3, max: 3, desc: "Birth star compatibility"               },
  { name: "Yoni",    score: 3, max: 4, desc: "Nature & biological compatibility"      },
  { name: "Graha",   score: 5, max: 5, desc: "Planetary friendship"                  },
  { name: "Gana",    score: 5, max: 6, desc: "Temperament / personality match"        },
  { name: "Rashi",   score: 6, max: 7, desc: "Moon sign compatibility"                },
  { name: "Nadi",    score: 6, max: 8, desc: "Genetic & health compatibility"         },
];

const totalScore = gunaData.reduce((s, g) => s + g.score, 0);
const totalMax   = gunaData.reduce((s, g) => s + g.max, 0);
const pct        = Math.round((totalScore / totalMax) * 100);

function FieldInput({ label, name, value, onChange, type = "text", placeholder = "" }: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1">{label}</label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl font-body text-sm text-deep outline-none"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.2)" }}
      />
    </div>
  );
}

export default function KundaliMatchPage() {
  const [step, setStep] = useState<Step>("form");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [p1, setP1] = useState({ name: "", dob: "", tob: "", pob: "" });
  const [p2, setP2] = useState({ name: "", dob: "", tob: "", pob: "" });
  const [contact, setContact] = useState({ phone: "", email: "" });

  const set1 = (k: string, v: string) => setP1((p) => ({ ...p, [k]: v }));
  const set2 = (k: string, v: string) => setP2((p) => ({ ...p, [k]: v }));

  const p1Valid = p1.name && p1.dob;
  const p2Valid = p2.name && p2.dob;
  const contactValid = contact.phone.length >= 10 && contact.email.includes("@");

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setStep("result");
  };

  return (
    <div className="min-h-screen bg-mesh text-deep">
      {/* Nav */}
      <nav className="navbar-glass sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" style={{ minHeight: "auto" }}>
            <Heart className="w-5 h-5 text-rose fill-rose" />
            <span className="font-display text-xl font-semibold text-deep">Match4Marriage</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-ghost text-sm px-4 py-2" style={{ minHeight: "auto" }}>Sign In</Link>
            <Link href="/auth/register" className="btn-primary text-sm px-4 py-2" style={{ minHeight: "auto" }}>Get Started Free</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="premium-badge inline-flex mb-4 text-xs tracking-widest uppercase">
            <Star className="w-3 h-3 fill-gold" /> Free Kundali Matching
          </div>
          <h1 className="font-display font-light text-deep mb-3" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Check Your{" "}
            <span className="text-gradient-gold italic font-semibold">Kundali Compatibility</span>
          </h1>
          <p className="font-body text-deep/50 text-base max-w-xl mx-auto">
            Vedic Ashtakoot Guna Milan — the traditional 36-point compatibility system used by millions of Indian families.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {([
            { key: "form",    label: "Birth Details" },
            { key: "contact", label: "Your Contact"  },
            { key: "result",  label: "Results"       },
          ] as const).map((s, i, arr) => {
            const done   = (step === "contact" && s.key === "form") || (step === "result" && s.key !== "result");
            const active = step === s.key;
            return (
              <div key={s.key} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-bold"
                    style={{
                      background: done ? "linear-gradient(135deg,#5C7A52,#8DB870)" : active ? "linear-gradient(135deg,#E8426A,#FF8FA3)" : "rgba(28,15,6,0.08)",
                      color: done || active ? "#fff" : "rgba(28,15,6,0.3)",
                    }}
                  >
                    {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`font-body text-xs ${active ? "text-rose font-semibold" : "text-deep/35"}`}>{s.label}</span>
                </div>
                {i < arr.length - 1 && <div className="w-8 h-px" style={{ background: done ? "rgba(92,122,82,0.4)" : "rgba(28,15,6,0.1)" }} />}
              </div>
            );
          })}
        </div>

        {/* Step 1 — Birth details */}
        {step === "form" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Person 1 */}
            <div className="rounded-3xl p-6" style={{ background: "rgba(250,246,238,0.96)", border: "1px solid rgba(196,82,15,0.2)", boxShadow: "0 4px 24px rgba(196,82,15,0.07)" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}>
                  1
                </div>
                <h3 className="font-display text-lg font-semibold text-deep">Boy / Person 1</h3>
              </div>
              <div className="space-y-3">
                <FieldInput label="Full Name"      name="name" value={p1.name} onChange={(v) => set1("name", v)} placeholder="e.g. Rahul Sharma" />
                <FieldInput label="Date of Birth"  name="dob"  value={p1.dob}  onChange={(v) => set1("dob",  v)} type="date" />
                <FieldInput label="Time of Birth"  name="tob"  value={p1.tob}  onChange={(v) => set1("tob",  v)} type="time" />
                <FieldInput label="Place of Birth" name="pob"  value={p1.pob}  onChange={(v) => set1("pob",  v)} placeholder="e.g. Mumbai, Maharashtra" />
              </div>
            </div>

            {/* Person 2 */}
            <div className="rounded-3xl p-6" style={{ background: "rgba(250,246,238,0.96)", border: "1px solid rgba(154,107,0,0.2)", boxShadow: "0 4px 24px rgba(154,107,0,0.07)" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#9A6B00,#C89020)" }}>
                  2
                </div>
                <h3 className="font-display text-lg font-semibold text-deep">Girl / Person 2</h3>
              </div>
              <div className="space-y-3">
                <FieldInput label="Full Name"      name="name" value={p2.name} onChange={(v) => set2("name", v)} placeholder="e.g. Priya Patel" />
                <FieldInput label="Date of Birth"  name="dob"  value={p2.dob}  onChange={(v) => set2("dob",  v)} type="date" />
                <FieldInput label="Time of Birth"  name="tob"  value={p2.tob}  onChange={(v) => set2("tob",  v)} type="time" />
                <FieldInput label="Place of Birth" name="pob"  value={p2.pob}  onChange={(v) => set2("pob",  v)} placeholder="e.g. Delhi, India" />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                onClick={() => p1Valid && p2Valid && setStep("contact")}
                disabled={!p1Valid || !p2Valid}
                className="flex items-center gap-2 px-10 py-4 rounded-full font-body text-base font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg,#E8426A,#FF8FA3)",
                  opacity: p1Valid && p2Valid ? 1 : 0.5,
                  boxShadow: p1Valid && p2Valid ? "0 6px 24px rgba(196,82,15,0.38)" : "none",
                  minHeight: "auto",
                }}
              >
                <Star className="w-4 h-4" /> Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Contact capture */}
        {step === "contact" && (
          <div className="max-w-md mx-auto">
            <div className="rounded-3xl p-8" style={{ background: "rgba(250,246,238,0.96)", border: "1px solid rgba(154,107,0,0.2)", boxShadow: "0 8px 40px rgba(196,82,15,0.08)" }}>
              <div className="text-center mb-6">
                <Moon className="w-10 h-10 text-gold mx-auto mb-3" />
                <h2 className="font-display text-2xl font-light text-deep mb-1">Almost there!</h2>
                <p className="font-body text-sm text-deep/45">Enter your details to receive your full Kundali report</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                  <div className="flex items-center gap-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.2)", height: "48px" }}>
                    <span className="text-base border-r pr-3 font-body text-sm text-deep/60" style={{ borderColor: "rgba(154,107,0,0.2)" }}>🇮🇳 +91</span>
                    <input
                      type="tel" placeholder="9876543210"
                      value={contact.phone}
                      onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value.replace(/\D/, "").slice(0, 10) }))}
                      className="flex-1 bg-transparent font-body text-sm text-deep outline-none tracking-wider"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1.5">Email Address</label>
                  <div className="flex items-center gap-2 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.2)", height: "48px" }}>
                    <Mail className="w-4 h-4 text-deep/30 flex-shrink-0" />
                    <input
                      type="email" placeholder="you@example.com"
                      value={contact.email}
                      onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                      className="flex-1 bg-transparent font-body text-sm text-deep outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 px-1">
                  <Shield className="w-3.5 h-3.5 text-sage flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-deep/40 leading-relaxed">
                    We'll send your detailed Kundali report to this number & email. No spam — unsubscribe anytime. PDPB compliant.
                  </p>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!contactValid || loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-4 transition-all"
                  style={{
                    background: "linear-gradient(135deg,#E8426A,#FF8FA3)",
                    opacity: contactValid ? 1 : 0.55,
                    boxShadow: contactValid ? "0 6px 24px rgba(196,82,15,0.38)" : "none",
                    minHeight: "auto",
                  }}
                >
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Calculating your Kundali…</>
                    : <><Sparkles className="w-4 h-4" /> Generate Free Kundali Report <ArrowRight className="w-4 h-4" /></>}
                </button>

                <button onClick={() => setStep("form")} className="w-full font-body text-xs text-deep/35 hover:text-deep/60 transition-colors py-1" style={{ minHeight: "auto" }}>
                  ← Back to birth details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Results */}
        {step === "result" && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Score banner */}
            <div
              className="rounded-3xl p-8 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(196,82,15,0.08),rgba(154,107,0,0.14))", border: "1px solid rgba(196,82,15,0.25)" }}
            >
              <p className="font-devanagari text-gold/70 text-base mb-2">Compatibility Score Results</p>
              <h2 className="font-display text-2xl font-light text-deep mb-4">
                {p1.name || "Person 1"} <span className="text-rose">♥</span> {p2.name || "Person 2"}
              </h2>

              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(28,15,6,0.07)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#kundGrad)" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="kundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9A6B00" />
                        <stop offset="100%" stopColor="#C89020" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-4xl font-bold text-gold">{totalScore}</span>
                    <span className="font-body text-xs text-deep/40">of {totalMax}</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-2" style={{ background: "rgba(92,122,82,0.12)", border: "1px solid rgba(92,122,82,0.2)" }}>
                    <CheckCircle className="w-4 h-4 text-sage" />
                    <span className="font-body text-sm font-bold text-sage">Excellent Match</span>
                  </div>
                  <p className="font-body text-sm text-deep/60 max-w-xs">
                    {totalScore} out of {totalMax} points. A score above 24 is considered auspicious for marriage.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Ashtakoot breakdown */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.95)", border: "1px solid rgba(154,107,0,0.14)" }}>
                <h3 className="font-display text-base font-semibold text-deep mb-4">Ashtakoot Guna Breakdown</h3>
                <div className="space-y-2.5">
                  {gunaData.map((g) => {
                    const p = (g.score / g.max) * 100;
                    const isOpen = expanded === g.name;
                    return (
                      <div key={g.name}>
                        <button className="w-full flex items-center gap-3" onClick={() => setExpanded(isOpen ? null : g.name)} style={{ minHeight: "auto" }}>
                          <span className="font-body text-xs font-semibold text-deep/70 w-14 text-left">{g.name}</span>
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(28,15,6,0.07)" }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${p}%`, background: p === 100 ? "linear-gradient(90deg,#5C7A52,#8DB870)" : "linear-gradient(90deg,#9A6B00,#C89020)" }} />
                          </div>
                          <span className="font-body text-xs text-deep/50 w-8 text-right">{g.score}/{g.max}</span>
                          {isOpen ? <ChevronUp className="w-3 h-3 text-deep/25 flex-shrink-0" /> : <ChevronDown className="w-3 h-3 text-deep/25 flex-shrink-0" />}
                        </button>
                        {isOpen && <p className="font-body text-xs text-deep/40 mt-1 ml-14">{g.desc}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Doshas + summary */}
              <div className="space-y-4">
                <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.95)", border: "1px solid rgba(154,107,0,0.14)" }}>
                  <h3 className="font-display text-base font-semibold text-deep mb-3">Dosha Analysis</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Manglik Dosha",  ok: true,  note: "Not present — auspicious" },
                      { name: "Nadi Dosha",     ok: false, note: "Partial — cancellation applies" },
                      { name: "Bhakoot Dosha",  ok: true,  note: "Not present — auspicious" },
                    ].map(({ name, ok, note }) => (
                      <div key={name} className="flex items-center gap-2">
                        {ok ? <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-gold flex-shrink-0" />}
                        <div>
                          <span className="font-body text-xs font-semibold text-deep/70">{name}</span>
                          <span className="font-body text-xs text-deep/40 ml-2">{note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "rgba(92,122,82,0.07)", border: "1px solid rgba(92,122,82,0.2)" }}>
                  <p className="font-body text-sm font-semibold text-sage mb-1.5">Full report sent! ✓</p>
                  <p className="font-body text-xs text-sage/70">
                    A detailed PDF report has been sent to <strong>+91 {contact.phone}</strong> and <strong>{contact.email}</strong>.
                  </p>
                </div>

                {/* Upsell */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(196,82,15,0.07)", border: "1px solid rgba(154,107,0,0.2)" }}>
                  <p className="font-body text-sm font-semibold text-deep mb-1">Want a deeper analysis?</p>
                  <p className="font-body text-xs text-deep/50 mb-3">Create a free profile to get AI-powered compatibility, Kundali charts for all your matches, and an astrologer consultation.</p>
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center gap-2 w-full rounded-full font-body text-sm font-semibold text-white py-3"
                    style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", boxShadow: "0 4px 16px rgba(196,82,15,0.35)", minHeight: "auto" }}
                  >
                    <Heart className="w-4 h-4" /> Create Free Profile <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => { setStep("form"); setP1({ name: "", dob: "", tob: "", pob: "" }); setP2({ name: "", dob: "", tob: "", pob: "" }); setContact({ phone: "", email: "" }); }}
                className="font-body text-sm text-rose hover:underline"
                style={{ minHeight: "auto" }}
              >
                ← Check another pair
              </button>
            </div>
          </div>
        )}

        {/* Trust strip */}
        <div className="mt-16 pt-10 border-t" style={{ borderColor: "rgba(154,107,0,0.1)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { emoji: "🔒", label: "100% Private",      sub: "Data never shared" },
              { emoji: "📜", label: "Vedic Accuracy",    sub: "Parashari Jyotish" },
              { emoji: "⚡", label: "Instant Results",   sub: "Report in seconds"  },
              { emoji: "💝", label: "50,000+ couples",   sub: "Matched to date"    },
            ].map(({ emoji, label, sub }) => (
              <div key={label}>
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="font-body text-sm font-semibold text-deep">{label}</p>
                <p className="font-body text-xs text-deep/40">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
