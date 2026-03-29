"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  Heart, Phone, User, Brain, Shield, Sliders,
  Check, ArrowRight, ArrowLeft, Upload, Star,
} from "lucide-react";

const steps = [
  { id: 1, label: "Basic Profile",  icon: User,    title: "Tell us about yourself",              subtitle: "Your profile helps us find better matches" },
  { id: 2, label: "Verify Phone",   icon: Phone,   title: "Verify your phone number",            subtitle: "We'll send a one-time verification code" },
  { id: 3, label: "ID Verify",      icon: Shield,  title: "Verify your identity",                subtitle: "Government-grade trust — only you can see this data" },
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

function IdVerifyStep({ onComplete }: { onComplete?: (done: boolean) => void }) {
  const [country, setCountry] = useState("");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const availableDocs = country ? (DOCUMENTS_BY_COUNTRY[country] || DOCUMENTS_BY_COUNTRY["Other"]) : [];
  const needsBack = docType && !["Passport"].includes(docType);

  // Notify parent whenever completion state changes
  const checkComplete = (front: File | null, back: File | null, selfie: File | null, doc: string, ct: string) => {
    const done = !!(ct && doc && front && selfie);
    onComplete?.(done);
  };

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
            onChange={(f) => { setFrontFile(f); checkComplete(f, backFile, selfieFile, docType, country); }}
          />
          {needsBack && (
            <UploadBox
              label={`${docType} — Back`}
              hint="Upload back of document"
              file={backFile}
              onChange={(f) => { setBackFile(f); checkComplete(frontFile, f, selfieFile, docType, country); }}
            />
          )}
          <UploadBox
            label="Selfie / Liveness Photo"
            hint="Take or upload a clear selfie"
            file={selfieFile}
            onChange={(f) => { setSelfieFile(f); checkComplete(frontFile, backFile, f, docType, country); }}
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
  const [otpVerified, setOtpVerified] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [form, setForm] = useState({ name: "", dob: "", gender: "", religion: "", caste: "", country: "", motherTongue: "", education: "", profession: "" });
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
      fontFamily: "var(--font-poppins, sans-serif)",
    }}>
      <PublicHeader />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}>

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

        {/* ── Step 2: Phone + OTP ── */}
        {step === 2 && (
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
                        const filled = [...next].every(d => d !== "");
                        if (filled) setOtpVerified(true);
                        else setOtpVerified(false);
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

        {/* ── Step 1: Basic Profile ── */}
        {step === 1 && (
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

              {/* Religion — Dropdown */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Religion</label>
                <select
                  value={form.religion}
                  onChange={(e) => setForm({ ...form, religion: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: form.religion ? "#1a0a14" : "#aaa", background: "#fff", outline: "none", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
                >
                  <option value="" disabled>Select Religion</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Jain</option>
                  <option>Buddhist</option>
                  <option>Parsi / Zoroastrian</option>
                  <option>Jewish</option>
                  <option>No Religion</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Caste / Community */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Caste / Community</label>
                <input
                  placeholder="Brahmin"
                  value={form.caste}
                  onChange={(e) => setForm({ ...form, caste: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Country — Dropdown */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Country</label>
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: form.country ? "#1a0a14" : "#aaa", background: "#fff", outline: "none", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
                >
                  <option value="" disabled>Select Country</option>
                  <option>United Kingdom</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>UAE</option>
                  <option>Singapore</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Netherlands</option>
                  <option>New Zealand</option>
                  <option>Malaysia</option>
                  <option>Sri Lanka</option>
                  <option>South Africa</option>
                  <option>Other</option>
                </select>
              </div>



              {/* Mother Tongue — Dropdown */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Mother Tongue</label>
                <select
                  value={form.motherTongue}
                  onChange={(e) => setForm({ ...form, motherTongue: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: form.motherTongue ? "#1a0a14" : "#aaa", background: "#fff", outline: "none", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
                >
                  <option value="" disabled>Select Language</option>
                  <option>Tamil</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                  <option>Marathi</option>
                  <option>Bengali</option>
                  <option>Gujarati</option>
                  <option>Punjabi</option>
                  <option>Urdu</option>
                  <option>Sindhi</option>
                  <option>Odia</option>
                  <option>Konkani</option>
                  <option>Tulu</option>
                  <option>Sinhala</option>
                  <option>English</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Education */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Education</label>
                <input
                  placeholder="B.Tech, IIT"
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Profession */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Profession</label>
                <input
                  placeholder="Software Engineer"
                  value={form.profession}
                  onChange={(e) => setForm({ ...form, profession: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", fontSize: "13px", color: "#1a0a14", background: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

            </div>
          </div>
        )}

        {/* ── Step 3: ID Verification ── */}
        {step === 3 && (
          <IdVerifyStep onComplete={setIdUploaded} />
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
          {(() => {
            const blocked =
              (step === 2 && !otpVerified) ||
              (step === 3 && !idUploaded);
            return (
              <button
                onClick={blocked ? undefined : next}
                disabled={blocked}
                style={{
                  flex: 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "14px", fontWeight: 600,
                  color: blocked ? "#aaa" : "#fff",
                  background: blocked ? "rgba(26,10,20,0.08)" : "linear-gradient(135deg, #dc1e3c, #a0153c)",
                  border: "none",
                  cursor: blocked ? "not-allowed" : "pointer",
                  boxShadow: blocked ? "none" : "0 4px 16px rgba(220,30,60,0.25)",
                }}
              >
                {step === steps.length ? "Go to Dashboard" : "Continue"}
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </button>
            );
          })()}
        </div>

        {step === 2 && (
          <p style={{ fontSize: "12px", textAlign: "center", color: "#aaa", marginTop: "16px" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#dc1e3c", fontWeight: 600, textDecoration: "none" }}>Log in</Link>
          </p>
        )}
      </div>

      {/* Footer */}
      <p style={{ fontSize: "11px", color: "#ccc", marginTop: "24px" }}>Step {step} of {steps.length}</p>
      </div>
      <PublicFooter />
    </div>
  );
}
