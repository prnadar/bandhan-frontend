"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart, Phone, User, Brain, Shield, Sliders,
  Check, ArrowRight, ArrowLeft, Upload, Star,
} from "lucide-react";

const steps = [
  { id: 1, label: "Verify Phone",   icon: Phone,   title: "Let's start with your phone number", subtitle: "We'll send a one-time verification code" },
  { id: 2, label: "Basic Profile",  icon: User,    title: "Tell us about yourself",              subtitle: "Your profile helps us find better matches" },
  { id: 3, label: "Personality",    icon: Brain,   title: "Quick personality snapshot",          subtitle: "5 questions · takes 2 minutes · powers AI matching" },
  { id: 4, label: "ID Verify",      icon: Shield,  title: "Verify your identity",                subtitle: "Government-grade trust — only you can see this data" },
  { id: 5, label: "Preferences",    icon: Sliders, title: "Your partner preferences",            subtitle: "We'll use this to filter and rank your daily matches" },
];

const personalities = [
  { q: "I prefer spending weekends…",       a: ["At home with family", "Exploring new places",   "Both equally",           "With close friends"] },
  { q: "My career ambitions are…",          a: ["Very important to me", "Important but balanced", "Secondary to family",    "Still figuring out"] },
  { q: "My ideal family life looks like…",  a: ["Joint family",         "Nuclear with close ties", "Nuclear independent",   "Open to either"] },
  { q: "I handle disagreements by…",        a: ["Discussing calmly",    "Giving space first",      "Seeking compromise",    "Avoiding confrontation"] },
  { q: "My communication style is…",        a: ["Direct and honest",    "Thoughtful and measured", "Expressive and warm",  "Reserved but deep"] },
];

// ── ID Verify Step Component ──────────────────────────────────────────────────

const COUNTRIES = [
  "United Kingdom", "India", "United States", "Canada", "Australia",
  "UAE", "Singapore", "New Zealand", "South Africa", "Germany",
  "Netherlands", "France", "Ireland", "Malaysia", "Kenya", "Other",
];

const DOCUMENTS_BY_COUNTRY: Record<string, string[]> = {
  "United Kingdom":  ["Passport", "UK Driving Licence", "BRP (Biometric Residence Permit)", "National ID Card"],
  "India":           ["Passport", "Driving Licence", "Voter ID Card", "National ID Card"],
  "United States":   ["Passport", "US Driver's License", "US State ID", "Permanent Resident Card"],
  "Canada":          ["Passport", "Canadian Driver's Licence", "Permanent Resident Card"],
  "Australia":       ["Passport", "Australian Driver's Licence", "Medicare Card"],
  "UAE":             ["Passport", "UAE Emirates ID", "UAE Driving Licence"],
  "Singapore":       ["Passport", "Singapore NRIC", "Singapore Driving Licence"],
  "New Zealand":     ["Passport", "NZ Driver's Licence"],
  "South Africa":    ["Passport", "SA Smart ID Card", "SA Driver's Licence"],
  "Germany":         ["Passport", "German National ID (Personalausweis)", "German Driving Licence"],
  "Netherlands":     ["Passport", "Dutch National ID", "Dutch Driving Licence"],
  "France":          ["Passport", "French National ID", "French Driving Licence"],
  "Ireland":         ["Passport", "Irish Driving Licence", "Public Services Card"],
  "Malaysia":        ["Passport", "Malaysian MyKad (National ID)"],
  "Kenya":           ["Passport", "Kenyan National ID"],
  "Other":           ["Passport", "National ID Card", "Driving Licence"],
};

function IdVerifyStep() {
  const [country, setCountry] = useState("");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const availableDocs = country ? (DOCUMENTS_BY_COUNTRY[country] || DOCUMENTS_BY_COUNTRY["Other"]) : [];
  const needsBack = docType && !["Passport"].includes(docType);

  const UploadBox = ({
    label, hint, file, onChange,
  }: { label: string; hint: string; file: File | null; onChange: (f: File) => void }) => (
    <div>
      <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>{label}</label>
      <label style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px",
        padding: "20px 16px",
        border: file ? "2px solid rgba(220,30,60,0.4)" : "2px dashed rgba(220,30,60,0.2)",
        borderRadius: "10px",
        background: file ? "rgba(220,30,60,0.03)" : "#fff",
        cursor: "pointer",
      }}>
        <input type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])} />
        <Upload style={{ width: "20px", height: "20px", color: file ? "#dc1e3c" : "rgba(220,30,60,0.35)" }} />
        {file
          ? <p style={{ fontSize: "12px", color: "#dc1e3c", fontWeight: 600 }}>{file.name}</p>
          : <p style={{ fontSize: "12px", color: "#888" }}>{hint}</p>
        }
        <p style={{ fontSize: "11px", color: "#bbb" }}>JPG, PNG or PDF · Max 5MB</p>
      </label>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Trust banner */}
      <div style={{ background: "rgba(92,122,82,0.07)", border: "1px solid rgba(92,122,82,0.2)", borderRadius: "10px", padding: "14px 16px", display: "flex", gap: "12px" }}>
        <Shield style={{ width: "18px", height: "18px", color: "#5C7A52", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#5C7A52", marginBottom: "2px" }}>Your data is protected</p>
          <p style={{ fontSize: "11px", color: "rgba(92,122,82,0.75)", lineHeight: 1.5 }}>Documents are encrypted at rest and never shared. Only your verified ✓ status is visible to matches. UK GDPR & PDPA compliant.</p>
        </div>
      </div>

      {/* Country selector */}
      <div>
        <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Your Country</label>
        <select
          value={country}
          onChange={(e) => { setCountry(e.target.value); setDocType(""); }}
          style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: country ? "#1a0a14" : "#aaa", background: "#fff", outline: "none", cursor: "pointer" }}
        >
          <option value="" disabled>Select your country…</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Document type selector */}
      {country && (
        <div>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>Document Type</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {availableDocs.map((doc) => (
              <button
                key={doc}
                onClick={() => setDocType(doc)}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: docType === doc ? 600 : 400,
                  border: `${docType === doc ? "2px" : "1px"} solid ${docType === doc ? "#dc1e3c" : "rgba(220,30,60,0.15)"}`,
                  background: docType === doc ? "rgba(220,30,60,0.05)" : "#fff",
                  color: docType === doc ? "#dc1e3c" : "#555",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "10px",
                }}
              >
                <span style={{ fontSize: "16px" }}>🪪</span>
                {doc}
                {docType === doc && <span style={{ marginLeft: "auto", fontSize: "12px", color: "#dc1e3c" }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Document number */}
      {docType && (
        <div>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Document Number</label>
          <input
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
            placeholder={`Enter your ${docType} number`}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "14px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box", letterSpacing: "0.05em" }}
          />
        </div>
      )}

      {/* Upload boxes */}
      {docType && (
        <>
          <UploadBox
            label={`${docType} — Front`}
            hint="Upload front of document"
            file={frontFile}
            onChange={setFrontFile}
          />
          {needsBack && (
            <UploadBox
              label={`${docType} — Back`}
              hint="Upload back of document"
              file={backFile}
              onChange={setBackFile}
            />
          )}
          <UploadBox
            label="Selfie / Liveness Photo"
            hint="Take or upload a clear selfie"
            file={selfieFile}
            onChange={setSelfieFile}
          />
        </>
      )}
    </div>
  );
}

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
    <div style={{
      minHeight: "100vh",
      background: "#fdfbf9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 16px",
      fontFamily: "var(--font-poppins, sans-serif)",
    }}>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", marginBottom: "40px" }}>
        <span style={{
          fontFamily: "var(--font-playfair, serif)",
          fontSize: "26px",
          fontWeight: 700,
          color: "#1a0a14",
        }}>
          Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
        </span>
      </Link>

      {/* Progress stepper */}
      <div style={{ width: "100%", maxWidth: "520px", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          {steps.map((s) => {
            const Icon = s.icon;
            const done = s.id < step;
            const active = s.id === step;
            return (
              <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: done
                    ? "linear-gradient(135deg, #5C7A52, #8DB870)"
                    : active
                    ? "linear-gradient(135deg, #dc1e3c, #a0153c)"
                    : "rgba(26,10,20,0.06)",
                  border: done || active ? "none" : "1px solid rgba(26,10,20,0.12)",
                  transition: "all 0.3s",
                }}>
                  {done
                    ? <Check style={{ width: "16px", height: "16px", color: "#fff" }} />
                    : <Icon style={{ width: "16px", height: "16px", color: active ? "#fff" : "rgba(26,10,20,0.3)" }} />
                  }
                </div>
                <span style={{
                  fontSize: "10px",
                  textAlign: "center",
                  maxWidth: "52px",
                  lineHeight: 1.2,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#dc1e3c" : "rgba(26,10,20,0.35)",
                }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ height: "4px", background: "rgba(26,10,20,0.08)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #dc1e3c, #C89020)",
            borderRadius: "2px",
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "520px",
        background: "#fff",
        border: "1px solid rgba(220,30,60,0.08)",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 8px 40px rgba(220,30,60,0.06)",
      }}>

        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", color: "#C89020", marginBottom: "4px", opacity: 0.7 }}>
            Step {step} of {steps.length}
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: "24px",
            fontWeight: 600,
            color: "#1a0a14",
            marginBottom: "4px",
          }}>
            {currentStep.title}
          </h2>
          <p style={{ fontSize: "13px", color: "#888" }}>{currentStep.subtitle}</p>
        </div>

        {/* ── Step 1: Phone + OTP ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!otpSent ? (
              <>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                    Mobile Number
                  </label>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "0 16px",
                    border: "1px solid rgba(220,30,60,0.15)",
                    borderRadius: "10px",
                    height: "48px",
                    background: "#fff",
                  }}>
                    <span style={{ fontSize: "14px", color: "rgba(26,10,20,0.55)", borderRight: "1px solid rgba(220,30,60,0.15)", paddingRight: "12px" }}>+91</span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ flex: 1, background: "transparent", fontSize: "14px", color: "#1a0a14", outline: "none", border: "none" }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setOtpSent(true)}
                  disabled={phone.length < 10}
                  style={{
                    width: "100%", padding: "12px 24px",
                    background: phone.length < 10 ? "rgba(26,10,20,0.08)" : "linear-gradient(135deg, #dc1e3c, #a0153c)",
                    color: phone.length < 10 ? "#aaa" : "#fff",
                    borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                    border: "none", cursor: phone.length < 10 ? "not-allowed" : "pointer",
                    boxShadow: phone.length >= 10 ? "0 4px 16px rgba(220,30,60,0.25)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  Send OTP <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: "13px", color: "#888" }}>
                  Enter the 6-digit OTP sent to <strong style={{ color: "#1a0a14" }}>+91 {phone}</strong>
                </p>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
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
                      style={{
                        width: "44px", height: "52px", textAlign: "center",
                        fontFamily: "var(--font-playfair, serif)",
                        fontSize: "20px", fontWeight: 700, color: "#1a0a14",
                        border: digit ? "2px solid #dc1e3c" : "1px solid rgba(220,30,60,0.15)",
                        borderRadius: "10px",
                        background: digit ? "rgba(220,30,60,0.04)" : "#fff",
                        outline: "none",
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "12px", textAlign: "center", color: "#aaa" }}>
                  Didn't receive?{" "}
                  <button style={{ background: "none", border: "none", color: "#dc1e3c", fontWeight: 600, cursor: "pointer", fontSize: "12px", padding: 0 }}>
                    Resend in 30s
                  </button>
                </p>
              </>
            )}
          </div>
        )}

        {/* ── Step 2: Basic Profile ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { key: "name", label: "Full Name",    placeholder: "Prabhakar Sharma" },
                { key: "dob",  label: "Date of Birth", placeholder: "DD/MM/YYYY", type: "date" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>{label}</label>
                  <input
                    type={type || "text"}
                    placeholder={placeholder}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>Gender</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setForm({ ...form, gender: g })}
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      border: `2px solid ${form.gender === g ? "#dc1e3c" : "rgba(220,30,60,0.15)"}`,
                      background: form.gender === g ? "rgba(220,30,60,0.06)" : "#fff",
                      color: form.gender === g ? "#dc1e3c" : "#888",
                      cursor: "pointer",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { key: "religion",   label: "Religion",          placeholder: "Hindu" },
                { key: "caste",      label: "Caste / Community",  placeholder: "Brahmin" },
                { key: "city",       label: "City",               placeholder: "Mumbai" },
                { key: "height",     label: "Height",             placeholder: "5'8\"" },
                { key: "education",  label: "Education",          placeholder: "B.Tech, IIT" },
                { key: "profession", label: "Profession",         placeholder: "Software Engineer" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>{label}</label>
                  <input
                    placeholder={placeholder}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Personality Quiz ── */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {personalities.map((p, qi) => (
              <div key={qi}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a0a14", marginBottom: "10px" }}>
                  {qi + 1}. {p.q}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {p.a.map((ans, ai) => (
                    <button
                      key={ai}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [qi]: ai })}
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        lineHeight: 1.4,
                        border: quizAnswers[qi] === ai ? "1.5px solid #dc1e3c" : "1px solid rgba(220,30,60,0.15)",
                        background: quizAnswers[qi] === ai ? "rgba(220,30,60,0.06)" : "#fff",
                        color: quizAnswers[qi] === ai ? "#dc1e3c" : "rgba(26,10,20,0.6)",
                        cursor: "pointer",
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

        {/* ── Step 4: ID Verification ── */}
        {step === 4 && (
          <IdVerifyStep />
        )}

        {/* ── Step 5: Preferences ── */}
        {step === 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "10px" }}>Partner Age Range</label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input
                  type="number"
                  value={prefs.ageMin}
                  onChange={(e) => setPrefs({ ...prefs, ageMin: e.target.value })}
                  style={{ width: "72px", textAlign: "center", padding: "10px 8px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontFamily: "var(--font-playfair, serif)", fontSize: "18px", fontWeight: 600, color: "#1a0a14", background: "#fff", outline: "none" }}
                />
                <span style={{ fontSize: "13px", color: "#888" }}>to</span>
                <input
                  type="number"
                  value={prefs.ageMax}
                  onChange={(e) => setPrefs({ ...prefs, ageMax: e.target.value })}
                  style={{ width: "72px", textAlign: "center", padding: "10px 8px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontFamily: "var(--font-playfair, serif)", fontSize: "18px", fontWeight: 600, color: "#1a0a14", background: "#fff", outline: "none" }}
                />
                <span style={{ fontSize: "13px", color: "#888" }}>years</span>
              </div>
            </div>

            {[
              { key: "religion", label: "Religion Preference", options: ["Any", "Hindu", "Sikh", "Christian", "Jain", "Muslim"] },
              { key: "city",     label: "Location Preference", options: ["Any India", "Same city", "Same state", "Metro cities", "NRI / Abroad"] },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "10px" }}>{label}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPrefs({ ...prefs, [key]: opt })}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 500,
                        border: (prefs as Record<string, string>)[key] === opt ? "none" : "1px solid rgba(220,30,60,0.15)",
                        background: (prefs as Record<string, string>)[key] === opt ? "linear-gradient(135deg, #dc1e3c, #a0153c)" : "#fff",
                        color: (prefs as Record<string, string>)[key] === opt ? "#fff" : "rgba(26,10,20,0.55)",
                        cursor: "pointer",
                        boxShadow: (prefs as Record<string, string>)[key] === opt ? "0 2px 8px rgba(220,30,60,0.2)" : "none",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: "rgba(220,30,60,0.04)", border: "1px solid rgba(220,30,60,0.12)", borderRadius: "10px", padding: "14px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <Star style={{ width: "16px", height: "16px", color: "#dc1e3c", flexShrink: 0, marginTop: "2px" }} />
              <p style={{ fontSize: "12px", color: "rgba(26,10,20,0.6)", lineHeight: 1.6 }}>
                Your preferences guide our AI — they're not hard filters. We may show highly compatible profiles outside these criteria.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "32px" }}>
          {step > 1 && (
            <button
              onClick={back}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "13px", fontWeight: 500,
                color: "rgba(26,10,20,0.5)",
                border: "1px solid rgba(26,10,20,0.12)",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <ArrowLeft style={{ width: "16px", height: "16px" }} />
              Back
            </button>
          )}
          <button
            onClick={next}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "12px 24px",
              borderRadius: "10px",
              fontSize: "14px", fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, #dc1e3c, #a0153c)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
            }}
          >
            {step === steps.length ? "Go to Dashboard" : "Continue"}
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </button>
        </div>

        {step === 1 && (
          <p style={{ fontSize: "12px", textAlign: "center", color: "#aaa", marginTop: "16px" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        )}
      </div>

      {/* Footer */}
      <p style={{ fontSize: "11px", color: "#ccc", marginTop: "24px" }}>Step {step} of {steps.length}</p>
    </div>
  );
}
