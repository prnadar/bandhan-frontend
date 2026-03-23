"use client";

import { useState } from "react";
import {
  Shield, CheckCircle, Upload, Edit3, Camera,
  Briefcase, GraduationCap, MapPin, Globe, Users,
  Heart, Star, AlertCircle,
} from "lucide-react";

const verifications = [
  { label: "Aadhaar Card",     done: true,  pts: 40, desc: "Identity verified" },
  { label: "Photo Liveness",   done: true,  pts: 20, desc: "Face match confirmed" },
  { label: "Profile Complete", done: false, pts: 20, desc: "Fill all sections below" },
  { label: "Response Rate",    done: false, pts: 10, desc: "Reply to interests within 48h" },
  { label: "LinkedIn",         done: false, pts: 10, desc: "Connect your LinkedIn" },
];

export default function MyProfilePage() {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "Prabhakar Sharma", age: "29", city: "Mumbai", state: "Maharashtra",
    profession: "Product Manager", company: "Razorpay",
    education: "IIT Bombay · B.Tech", religion: "Hindu", caste: "Brahmin",
    height: "5'10\"", language: "Hindi, English, Marathi",
    diet: "Vegetarian", smoke: "No", drink: "Occasionally",
    income: "₹30–40 LPA",
    about: "Building fintech products that matter. Love hiking, cooking, and playing chess. Looking for a partner who's ambitious, warm, and values both tradition and modernity.",
    hobbies: "Hiking, Chess, Cooking, Photography",
    familyType: "Nuclear", siblings: "1 elder sister",
    partnerPrefs: "Doctor / Engineer / MBA, 25–30, open to all cities",
  });

  const trustScore = 84;
  const completeness = 68;

  const save = (key: string, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setEditing(null);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "56rem", background: "#fdfbf9", minHeight: "100%" }}>
      <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.875rem", fontWeight: 300, color: "#1a0a14", marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
        My Profile
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.5rem", alignItems: "start" }}>

        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Photo card */}
          <PhotoCard name={form.name} age={form.age} city={form.city} />

          {/* Trust score */}
          <div style={{ borderRadius: 16, padding: "1rem", background: "#fff", border: "1px solid rgba(220,30,60,0.08)", boxShadow: "0 2px 16px rgba(220,30,60,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", fontWeight: 600, color: "#1a0a14" }}>Trust Score</span>
              <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.875rem", fontWeight: 700, color: "#dc1e3c" }}>{trustScore}</span>
            </div>
            <div style={{ height: 6, background: "rgba(26,10,20,0.06)", borderRadius: 99, overflow: "hidden", marginBottom: "0.75rem" }}>
              <div style={{ height: "100%", borderRadius: 99, width: `${trustScore}%`, background: "linear-gradient(90deg,#dc1e3c,#a0153c)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {verifications.map((v) => (
                <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {v.done
                    ? <CheckCircle style={{ width: 16, height: 16, color: "#dc1e3c", flexShrink: 0 }} />
                    : <AlertCircle style={{ width: 16, height: 16, color: "rgba(26,10,20,0.2)", flexShrink: 0 }} />
                  }
                  <span style={{ flex: 1, fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem", color: v.done ? "rgba(26,10,20,0.7)" : "rgba(26,10,20,0.35)" }}>
                    {v.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem", fontWeight: 700, color: v.done ? "#dc1e3c" : "rgba(26,10,20,0.2)" }}>
                    +{v.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Completeness */}
          <div style={{ borderRadius: 16, padding: "1rem", background: "#fff", border: "1px solid rgba(220,30,60,0.08)", boxShadow: "0 2px 16px rgba(220,30,60,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", fontWeight: 600, color: "#1a0a14" }}>Profile Complete</span>
              <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.25rem", fontWeight: 700, color: "#C89020" }}>{completeness}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(26,10,20,0.06)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, width: `${completeness}%`, background: "linear-gradient(90deg,#dc1e3c,#C89020)" }} />
            </div>
            <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem", color: "#888", marginTop: "0.5rem" }}>
              Complete to unlock +28 trust points
            </p>
          </div>
        </div>

        {/* ── Right column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* About */}
          <ProfileSection title="About Me" icon={<Heart style={{ width: 16, height: 16, color: "#dc1e3c" }} />}>
            <EditableText field="about" value={form.about} editing={editing} setEditing={setEditing} onSave={save} multiline />
          </ProfileSection>

          {/* Basic Info */}
          <ProfileSection title="Basic Information" icon={<Star style={{ width: 16, height: 16, color: "#C89020" }} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { key: "profession", label: "Profession",    icon: <Briefcase style={{ width: 14, height: 14 }} /> },
                { key: "company",    label: "Company",       icon: <Briefcase style={{ width: 14, height: 14 }} /> },
                { key: "education",  label: "Education",     icon: <GraduationCap style={{ width: 14, height: 14 }} /> },
                { key: "city",       label: "City",          icon: <MapPin style={{ width: 14, height: 14 }} /> },
                { key: "height",     label: "Height",        icon: <Star style={{ width: 14, height: 14 }} /> },
                { key: "language",   label: "Languages",     icon: <Globe style={{ width: 14, height: 14 }} /> },
                { key: "religion",   label: "Religion",      icon: <Star style={{ width: 14, height: 14 }} /> },
                { key: "income",     label: "Annual Income", icon: <Star style={{ width: 14, height: 14 }} /> },
              ].map(({ key, label, icon }) => (
                <div key={key}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                    <span style={{ color: "rgba(26,10,20,0.3)" }}>{icon}</span>
                    <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.625rem", color: "rgba(26,10,20,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {label}
                    </span>
                  </div>
                  <EditableText
                    field={key}
                    value={(form as Record<string, string>)[key]}
                    editing={editing}
                    setEditing={setEditing}
                    onSave={save}
                  />
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* Lifestyle */}
          <ProfileSection title="Lifestyle" icon={<Users style={{ width: 16, height: 16, color: "#C89020" }} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              {[
                { key: "diet",  label: "Diet" },
                { key: "smoke", label: "Smoking" },
                { key: "drink", label: "Drinking" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.625rem", color: "rgba(26,10,20,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 2 }}>
                    {label}
                  </span>
                  <EditableText
                    field={key}
                    value={(form as Record<string, string>)[key]}
                    editing={editing}
                    setEditing={setEditing}
                    onSave={save}
                  />
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* Hobbies */}
          <ProfileSection title="Hobbies & Interests" icon={<Star style={{ width: 16, height: 16, color: "#dc1e3c" }} />}>
            <EditableText field="hobbies" value={form.hobbies} editing={editing} setEditing={setEditing} onSave={save} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {form.hobbies.split(",").map((h) => h.trim()).filter(Boolean).map((h) => (
                <span
                  key={h}
                  style={{
                    fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem", fontWeight: 500,
                    padding: "0.375rem 0.75rem", borderRadius: 9999,
                    background: "rgba(220,30,60,0.06)", border: "1px solid rgba(220,30,60,0.18)", color: "#dc1e3c",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </ProfileSection>

          {/* Partner Preferences */}
          <ProfileSection title="Partner Preferences" icon={<Heart style={{ width: 16, height: 16, color: "#dc1e3c" }} />}>
            <EditableText field="partnerPrefs" value={form.partnerPrefs} editing={editing} setEditing={setEditing} onSave={save} />
          </ProfileSection>

          {/* Verification CTA */}
          <div style={{ borderRadius: 16, padding: "1.25rem", display: "flex", alignItems: "flex-start", gap: "1rem", background: "#fff", border: "1px solid rgba(220,30,60,0.08)", boxShadow: "0 2px 16px rgba(220,30,60,0.06)" }}>
            <Shield style={{ width: 24, height: 24, color: "#dc1e3c", flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", fontWeight: 600, color: "#1a0a14", marginBottom: "0.25rem" }}>
                Complete your ID verification
              </p>
              <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem", color: "#888", marginBottom: "0.75rem", lineHeight: 1.5 }}>
                Add PAN, LinkedIn, and education docs to reach Trust Score 96 and get 3× more profile views.
              </p>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", fontWeight: 600,
                  color: "#fff", padding: "12px 24px",
                  background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
                  borderRadius: 10, boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
                  border: "none", cursor: "pointer",
                }}
              >
                <Upload style={{ width: 16, height: 16 }} />
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Photo Card ─── */
function PhotoCard({ name, age, city }: { name: string; age: string; city: string }) {
  const [hovered, setHovered] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(220,30,60,0.08)", boxShadow: "0 2px 16px rgba(220,30,60,0.06)", background: "#fff" }}>
      {/* Crimson gradient hero */}
      <div
        style={{ height: 256, background: "linear-gradient(135deg,#dc1e3c,#a0153c)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Profile circle */}
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>
          <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "2.25rem", fontWeight: 400, color: "#fff" }}>
            {initials}
          </span>
        </div>
        {/* Hover overlay */}
        {hovered && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <Camera style={{ width: 24, height: 24, color: "#fff" }} />
            <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", fontWeight: 500, color: "#fff" }}>Change Photo</span>
          </div>
        )}
      </div>
      <div style={{ padding: "1rem" }}>
        <p style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.125rem", fontWeight: 600, color: "#1a0a14" }}>{name}</p>
        <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", color: "#888", marginTop: 2 }}>{age} · {city}</p>
      </div>
    </div>
  );
}

/* ─── Profile Section ─── */
function ProfileSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 16, padding: "1.25rem", background: "#fff", border: "1px solid rgba(220,30,60,0.08)", boxShadow: "0 2px 16px rgba(220,30,60,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
        {icon}
        <h3 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "1.125rem", fontWeight: 600, color: "#1a0a14" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ─── Editable Text ─── */
function EditableText({
  field, value, editing, setEditing, onSave, multiline,
}: {
  field: string; value: string; editing: string | null;
  setEditing: (f: string | null) => void; onSave: (f: string, v: string) => void; multiline?: boolean;
}) {
  const [draft, setDraft] = useState(value);
  const [hovered, setHovered] = useState(false);

  if (editing === field) {
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            style={{
              flex: 1, fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", color: "#1a0a14",
              border: "1px solid rgba(220,30,60,0.15)", borderRadius: 10, padding: "12px 16px",
              outline: "none", resize: "none", background: "#fff",
            }}
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{
              flex: 1, fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", color: "#1a0a14",
              border: "1px solid rgba(220,30,60,0.15)", borderRadius: 10, padding: "12px 16px",
              outline: "none", background: "#fff",
            }}
            onKeyDown={(e) => e.key === "Enter" && onSave(field, draft)}
          />
        )}
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => onSave(field, draft)}
            style={{
              padding: "6px 12px", borderRadius: 8,
              fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem", fontWeight: 600,
              color: "#fff", background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
              border: "none", cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={() => setEditing(null)}
            style={{
              padding: "6px 12px", borderRadius: 8,
              fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.75rem",
              color: "#888", background: "#fff", border: "1px solid rgba(26,10,20,0.12)", cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
        cursor: "pointer", borderRadius: 8, padding: "4px 8px", margin: "0 -8px",
        background: hovered ? "rgba(220,30,60,0.04)" : "transparent",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { setDraft(value); setEditing(field); }}
    >
      <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "0.875rem", color: "rgba(26,10,20,0.75)", lineHeight: 1.6, flex: 1 }}>
        {value}
      </span>
      <Edit3 style={{ width: 14, height: 14, color: hovered ? "#dc1e3c" : "rgba(26,10,20,0.25)", flexShrink: 0, marginTop: 2, transition: "color 0.15s ease" }} />
    </div>
  );
}
