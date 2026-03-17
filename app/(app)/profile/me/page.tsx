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
    income: "₹30–40 LPA", about: "Building fintech products that matter. Love hiking, cooking, and playing chess. Looking for a partner who's ambitious, warm, and values both tradition and modernity.",
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
    <div className="px-8 py-8 max-w-4xl">
      <h1 className="font-display text-3xl font-light text-deep mb-6">My Profile</h1>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        {/* Left col */}
        <div className="space-y-4">
          {/* Photo */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(154,107,0,0.14)" }}
          >
            <div
              className="h-64 flex flex-col items-center justify-center relative group cursor-pointer"
              style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}
            >
              <span className="font-display text-6xl font-light text-white/90">PS</span>
              <div className="absolute inset-0 bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-2 text-white">
                  <Camera className="w-6 h-6" />
                  <span className="font-body text-sm font-medium">Change Photo</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="font-display text-lg font-semibold text-deep">{form.name}</p>
              <p className="font-body text-sm text-deep/50">{form.age} · {form.city}</p>
            </div>
          </div>

          {/* Trust score */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(92,122,82,0.07)", border: "1px solid rgba(92,122,82,0.2)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm font-semibold text-sage">Trust Score</span>
              <span className="font-display text-3xl font-bold text-sage">{trustScore}</span>
            </div>
            <div className="h-2 bg-deep/8 rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full" style={{ width: `${trustScore}%`, background: "linear-gradient(90deg,#5C7A52,#8DB870)" }} />
            </div>
            <div className="space-y-2">
              {verifications.map((v) => (
                <div key={v.label} className="flex items-center gap-2">
                  {v.done
                    ? <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                    : <AlertCircle className="w-4 h-4 text-deep/25 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <span className={`font-body text-xs ${v.done ? "text-deep/70" : "text-deep/40"}`}>{v.label}</span>
                  </div>
                  <span className={`font-body text-xs font-bold ${v.done ? "text-sage" : "text-deep/25"}`}>+{v.pts}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completeness */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(196,82,15,0.06)", border: "1px solid rgba(154,107,0,0.16)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm font-semibold text-deep">Profile Complete</span>
              <span className="font-display text-xl font-bold text-gradient-gold">{completeness}%</span>
            </div>
            <div className="h-2 bg-deep/8 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${completeness}%`, background: "linear-gradient(90deg,#E8426A,#C89020)" }} />
            </div>
            <p className="font-body text-xs text-deep/40 mt-2">Complete to unlock +28 trust points</p>
          </div>
        </div>

        {/* Right col — editable sections */}
        <div className="space-y-4">

          {/* About */}
          <ProfileSection title="About Me" icon={<Heart className="w-4 h-4 text-rose" />}>
            <EditableText field="about" value={form.about} editing={editing} setEditing={setEditing} onSave={save} multiline />
          </ProfileSection>

          {/* Basic Info */}
          <ProfileSection title="Basic Information" icon={<Star className="w-4 h-4 text-gold" />}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "profession", label: "Profession",    icon: <Briefcase className="w-3.5 h-3.5" /> },
                { key: "company",    label: "Company",       icon: <Briefcase className="w-3.5 h-3.5" /> },
                { key: "education",  label: "Education",     icon: <GraduationCap className="w-3.5 h-3.5" /> },
                { key: "city",       label: "City",          icon: <MapPin className="w-3.5 h-3.5" /> },
                { key: "height",     label: "Height",        icon: <Star className="w-3.5 h-3.5" /> },
                { key: "language",   label: "Languages",     icon: <Globe className="w-3.5 h-3.5" /> },
                { key: "religion",   label: "Religion",      icon: <Star className="w-3.5 h-3.5" /> },
                { key: "income",     label: "Annual Income", icon: <Star className="w-3.5 h-3.5" /> },
              ].map(({ key, label, icon }) => (
                <div key={key}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-deep/30">{icon}</span>
                    <span className="font-body text-[10px] text-deep/40 uppercase tracking-wider">{label}</span>
                  </div>
                  <EditableText field={key} value={(form as Record<string, string>)[key]} editing={editing} setEditing={setEditing} onSave={save} />
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* Lifestyle */}
          <ProfileSection title="Lifestyle" icon={<Users className="w-4 h-4 text-gold" />}>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "diet",  label: "Diet" },
                { key: "smoke", label: "Smoking" },
                { key: "drink", label: "Drinking" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <span className="font-body text-[10px] text-deep/40 uppercase tracking-wider block mb-0.5">{label}</span>
                  <EditableText field={key} value={(form as Record<string, string>)[key]} editing={editing} setEditing={setEditing} onSave={save} />
                </div>
              ))}
            </div>
          </ProfileSection>

          {/* Hobbies */}
          <ProfileSection title="Hobbies & Interests" icon={<Star className="w-4 h-4 text-rose" />}>
            <EditableText field="hobbies" value={form.hobbies} editing={editing} setEditing={setEditing} onSave={save} />
            <div className="flex flex-wrap gap-2 mt-2">
              {form.hobbies.split(",").map((h) => h.trim()).filter(Boolean).map((h) => (
                <span
                  key={h}
                  className="font-body text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(196,82,15,0.08)", border: "1px solid rgba(196,82,15,0.18)", color: "#E8426A" }}
                >
                  {h}
                </span>
              ))}
            </div>
          </ProfileSection>

          {/* Partner Preferences */}
          <ProfileSection title="Partner Preferences" icon={<Heart className="w-4 h-4 text-rose" />}>
            <EditableText field="partnerPrefs" value={form.partnerPrefs} editing={editing} setEditing={setEditing} onSave={save} />
          </ProfileSection>

          {/* Verification CTA */}
          <div
            className="rounded-2xl p-5 flex items-start gap-4"
            style={{ background: "rgba(196,82,15,0.06)", border: "1px solid rgba(154,107,0,0.18)" }}
          >
            <Shield className="w-6 h-6 text-rose flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-deep mb-1">Complete your ID verification</p>
              <p className="font-body text-xs text-deep/50 mb-3">Add PAN, LinkedIn, and education docs to reach Trust Score 96 and get 3× more profile views.</p>
              <button
                className="flex items-center gap-2 rounded-full font-body text-sm font-semibold text-white px-5 py-2.5"
                style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", boxShadow: "0 3px 12px rgba(196,82,15,0.35)", minHeight: "auto" }}
              >
                <Upload className="w-4 h-4" />
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-display text-base font-semibold text-deep">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function EditableText({ field, value, editing, setEditing, onSave, multiline }: {
  field: string; value: string; editing: string | null;
  setEditing: (f: string | null) => void; onSave: (f: string, v: string) => void; multiline?: boolean;
}) {
  const [draft, setDraft] = useState(value);

  if (editing === field) {
    return (
      <div className="flex items-end gap-2">
        {multiline
          ? <textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              className="flex-1 px-3 py-2 rounded-xl font-body text-sm text-deep outline-none resize-none"
              style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid #E8426A" }}
            />
          : <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl font-body text-sm text-deep outline-none"
              style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid #E8426A" }}
              onKeyDown={(e) => e.key === "Enter" && onSave(field, draft)}
            />
        }
        <div className="flex gap-1">
          <button onClick={() => onSave(field, draft)} className="px-3 py-1.5 rounded-lg font-body text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", minHeight: "auto" }}>Save</button>
          <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg font-body text-xs text-deep/50 hover:text-deep transition-colors" style={{ border: "1px solid rgba(28,15,6,0.12)", minHeight: "auto" }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group flex items-start justify-between gap-2 cursor-pointer rounded-lg px-2 py-1 -mx-2 hover:bg-rose/5 transition-colors"
      onClick={() => { setDraft(value); setEditing(field); }}
    >
      <span className="font-body text-sm text-deep/75 leading-relaxed flex-1">{value}</span>
      <Edit3 className="w-3.5 h-3.5 text-deep/25 group-hover:text-rose flex-shrink-0 mt-0.5 transition-colors" />
    </div>
  );
}
