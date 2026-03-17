"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, MapPin, Briefcase, GraduationCap, Heart, MessageCircle,
  CheckCircle, ArrowLeft, Brain, Star, Users, Music, Book,
  Globe, Calendar, Ruler, Sparkles,
} from "lucide-react";

const profileData: Record<string, {
  name: string; age: number; city: string; state: string;
  profession: string; company: string; education: string;
  religion: string; caste: string; height: string; language: string;
  verified: boolean; trustScore: number; compatibility: number;
  photo: string; grad: string;
  about: string; hobbies: string[]; familyType: string; siblings: string;
  diet: string; smoke: string; drink: string;
  income: string; partnerPrefs: string;
  dimensions: Record<string, number>;
  verifications: { label: string; done: boolean }[];
}> = {
  "1": {
    name: "Priya Sharma", age: 27, city: "Mumbai", state: "Maharashtra",
    profession: "Senior Software Engineer", company: "Google",
    education: "IIT Bombay · B.Tech CSE", religion: "Hindu", caste: "Brahmin",
    height: "5'4\"", language: "Hindi, English, Marathi", verified: true,
    trustScore: 96, compatibility: 92,
    photo: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)",
    about: "Love Carnatic music, trekking in Himalayas, and building side projects on weekends. Currently building a EdTech startup on the side. Looking for a partner who values growth, laughter, and deep conversations equally.",
    hobbies: ["Carnatic Music", "Trekking", "Side Projects", "Cooking", "Photography"],
    familyType: "Nuclear", siblings: "1 younger brother",
    diet: "Vegetarian", smoke: "No", drink: "Occasionally",
    income: "₹40–50 LPA", partnerPrefs: "Engineer / Doctor, 27–32, open to all states",
    dimensions: { values: 94, lifestyle: 90, family: 96, ambition: 88, communication: 92 },
    verifications: [
      { label: "Aadhaar Verified", done: true },
      { label: "PAN Verified", done: true },
      { label: "Photo Liveness", done: true },
      { label: "Education Verified", done: true },
      { label: "LinkedIn Verified", done: false },
    ],
  },
  "2": {
    name: "Anjali Patel", age: 26, city: "Ahmedabad", state: "Gujarat",
    profession: "Resident Doctor", company: "AIIMS Delhi",
    education: "AIIMS Delhi · MBBS", religion: "Hindu", caste: "Patel",
    height: "5'3\"", language: "Gujarati, Hindi, English", verified: true,
    trustScore: 92, compatibility: 87,
    photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)",
    about: "Passionate about medicine and mental health advocacy. Enjoy cooking Gujarati food, reading, and travelling off the beaten path. Family-oriented, looking for a life partner who understands the demands of medicine.",
    hobbies: ["Cooking", "Reading", "Travel", "Mental Health", "Yoga"],
    familyType: "Joint", siblings: "1 elder sister",
    diet: "Vegetarian", smoke: "No", drink: "No",
    income: "₹12–15 LPA (residency)",
    partnerPrefs: "Any profession, 27–32, Gujarat or pan-India",
    dimensions: { values: 90, lifestyle: 85, family: 92, ambition: 84, communication: 86 },
    verifications: [
      { label: "Aadhaar Verified", done: true },
      { label: "PAN Verified", done: true },
      { label: "Photo Liveness", done: true },
      { label: "Education Verified", done: true },
      { label: "LinkedIn Verified", done: true },
    ],
  },
};

const fallback = profileData["1"];

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = profileData[params.id] || { ...fallback, name: "Profile", id: params.id };
  const [interestSent, setInterestSent] = useState(false);

  return (
    <div className="px-8 py-8 max-w-4xl">
      {/* Back */}
      <Link href="/matches" className="inline-flex items-center gap-2 font-body text-sm text-deep/50 hover:text-deep mb-6 transition-colors" style={{ minHeight: "auto" }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Browse
      </Link>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Left — Photo + quick stats */}
        <div className="space-y-4">
          {/* Photo card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(154,107,0,0.14)" }}
          >
            <div className="h-72 flex items-center justify-center relative" style={{ background: profile.grad }}>
              <span className="font-display text-7xl font-light text-white/90">{profile.photo}</span>
              {/* Compatibility ring */}
              <div
                className="absolute bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(250,246,238,0.96)", border: "2px solid rgba(154,107,0,0.3)", boxShadow: "0 4px 16px rgba(196,82,15,0.15)" }}
              >
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-gradient-gold leading-none">{profile.compatibility}%</p>
                  <p className="font-body text-[9px] text-deep/40 leading-none mt-0.5">match</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-display text-xl font-semibold text-deep">{profile.name}, {profile.age}</h2>
              <div className="flex items-center gap-1 text-deep/50 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-body text-sm">{profile.city}, {profile.state}</span>
              </div>

              {/* Trust score */}
              <div
                className="mt-4 rounded-xl p-3 flex items-center justify-between"
                style={{ background: "rgba(92,122,82,0.08)", border: "1px solid rgba(92,122,82,0.2)" }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sage" />
                  <span className="font-body text-sm font-semibold text-sage">Trust Score</span>
                </div>
                <span className="font-display text-2xl font-bold text-sage">{profile.trustScore}</span>
              </div>

              {/* Verifications */}
              <div className="mt-3 space-y-2">
                {profile.verifications.map((v) => (
                  <div key={v.label} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${v.done ? "text-sage" : "text-deep/20"}`} />
                    <span className={`font-body text-xs ${v.done ? "text-deep/70" : "text-deep/30"}`}>{v.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => setInterestSent(true)}
                  disabled={interestSent}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3 transition-all"
                  style={{
                    background: interestSent ? "rgba(92,122,82,0.7)" : "linear-gradient(135deg,#E8426A,#FF8FA3)",
                    boxShadow: interestSent ? "none" : "0 4px 16px rgba(196,82,15,0.35)",
                    minHeight: "auto",
                  }}
                >
                  <Heart className={`w-4 h-4 ${interestSent ? "" : "fill-white"}`} />
                  {interestSent ? "Interest Sent ✓" : "Send Interest"}
                </button>
                <Link
                  href="/messages"
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-medium py-3 transition-colors"
                  style={{ border: "1px solid rgba(28,15,6,0.18)", color: "rgba(28,15,6,0.6)", minHeight: "auto" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Full details */}
        <div className="space-y-4">
          {/* About */}
          <Section title="About" icon={<Sparkles className="w-4 h-4 text-rose" />}>
            <p className="font-body text-sm text-deep/65 leading-relaxed">{profile.about}</p>
          </Section>

          {/* Basic info */}
          <Section title="Basic Info" icon={<Star className="w-4 h-4 text-gold" />}>
            <div className="grid grid-cols-2 gap-3">
              <InfoRow icon={<GraduationCap className="w-3.5 h-3.5" />} label="Education" value={profile.education} />
              <InfoRow icon={<Briefcase className="w-3.5 h-3.5" />} label="Works at" value={`${profile.profession} · ${profile.company}`} />
              <InfoRow icon={<Ruler className="w-3.5 h-3.5" />} label="Height" value={profile.height} />
              <InfoRow icon={<Globe className="w-3.5 h-3.5" />} label="Languages" value={profile.language} />
              <InfoRow icon={<Book className="w-3.5 h-3.5" />} label="Religion / Caste" value={`${profile.religion} · ${profile.caste}`} />
              <InfoRow icon={<Users className="w-3.5 h-3.5" />} label="Family" value={`${profile.familyType} · ${profile.siblings}`} />
              <InfoRow icon={<Calendar className="w-3.5 h-3.5" />} label="Diet" value={profile.diet} />
              <InfoRow icon={<Star className="w-3.5 h-3.5" />} label="Income" value={profile.income} />
            </div>
          </Section>

          {/* Compatibility */}
          <Section title="AI Compatibility Breakdown" icon={<Brain className="w-4 h-4 text-rose" />}>
            <div className="space-y-3">
              {Object.entries(profile.dimensions).map(([dim, score]) => (
                <div key={dim}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-xs font-medium text-deep/65 capitalize">{dim}</span>
                    <span className="font-display text-sm font-bold text-gradient-gold">{score}%</span>
                  </div>
                  <div className="h-2 bg-deep/6 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${score}%`, background: "linear-gradient(90deg,#E8426A,#C89020)", transition: "width 0.8s ease" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-deep/40 mt-3 italic">Based on 60-question psychometric assessment</p>
          </Section>

          {/* Hobbies */}
          <Section title="Hobbies & Interests" icon={<Music className="w-4 h-4 text-gold" />}>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((h) => (
                <span
                  key={h}
                  className="font-body text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(196,82,15,0.08)", border: "1px solid rgba(196,82,15,0.18)", color: "#E8426A" }}
                >
                  {h}
                </span>
              ))}
            </div>
          </Section>

          {/* Partner prefs */}
          <Section title="Partner Preferences" icon={<Heart className="w-4 h-4 text-rose" />}>
            <p className="font-body text-sm text-deep/65">{profile.partnerPrefs}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-display text-base font-semibold text-deep">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-deep/35 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="font-body text-[10px] text-deep/40 uppercase tracking-wider">{label}</p>
        <p className="font-body text-sm text-deep/80 font-medium">{value}</p>
      </div>
    </div>
  );
}
