"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, Brain, Heart, X, ChevronRight, MapPin, Briefcase,
  GraduationCap, Star, CheckCircle, Clock, Flame,
} from "lucide-react";

const matches = [
  {
    id: "1", name: "Priya Sharma", age: 27, city: "Mumbai", state: "Maharashtra",
    profession: "Senior Software Engineer", company: "Google",
    education: "IIT Bombay · B.Tech CSE", religion: "Hindu", caste: "Brahmin",
    height: "5'4\"", verified: true, trustScore: 96, compatibility: 92,
    dimensions: { values: 94, lifestyle: 90, family: 96, ambition: 88, communication: 92 },
    about: "Love Carnatic music, trekking in Himalayas, and building side projects on weekends. Looking for a partner who values growth and laughter equally.",
    photo: "PF",
    photoGrad: "linear-gradient(135deg, #C4520F, #E8A060)",
    tag: "Top Match",
    tagColor: "text-marigold bg-marigold/10",
  },
  {
    id: "2", name: "Anjali Patel", age: 26, city: "Ahmedabad", state: "Gujarat",
    profession: "Resident Doctor", company: "AIIMS Delhi",
    education: "AIIMS Delhi · MBBS", religion: "Hindu", caste: "Patel",
    height: "5'3\"", verified: true, trustScore: 92, compatibility: 87,
    dimensions: { values: 90, lifestyle: 85, family: 92, ambition: 84, communication: 86 },
    about: "Passionate about medicine and mental health advocacy. Enjoy cooking Gujarati food, reading, and travelling off the beaten path.",
    photo: "AP",
    photoGrad: "linear-gradient(135deg, #9A6B00, #C89020)",
    tag: "Great Match",
    tagColor: "text-gold bg-gold/10",
  },
  {
    id: "3", name: "Kavya Nair", age: 28, city: "Bangalore", state: "Karnataka",
    profession: "Product Manager", company: "Flipkart",
    education: "IIM Ahmedabad · MBA", religion: "Hindu", caste: "Nair",
    height: "5'5\"", verified: true, trustScore: 89, compatibility: 84,
    dimensions: { values: 86, lifestyle: 82, family: 88, ambition: 90, communication: 80 },
    about: "Product nerd by day, Bharatanatyam dancer by night. Deeply rooted in Kerala culture while thriving in the startup world.",
    photo: "KN",
    photoGrad: "linear-gradient(135deg, #5C7A52, #8DB870)",
    tag: "Good Match",
    tagColor: "text-sage bg-sage/10",
  },
  {
    id: "4", name: "Shruti Agarwal", age: 25, city: "Delhi", state: "Delhi",
    profession: "Chartered Accountant", company: "Deloitte",
    education: "Delhi University · B.Com + CA", religion: "Hindu", caste: "Agarwal",
    height: "5'2\"", verified: true, trustScore: 88, compatibility: 79,
    dimensions: { values: 82, lifestyle: 78, family: 84, ambition: 80, communication: 76 },
    about: "Finance professional with a love for Hindustani classical music and baking. Believe in building a home full of warmth, books, and good food.",
    photo: "SA",
    photoGrad: "linear-gradient(135deg, #C4520F99, #9A6B0099)",
    tag: "Compatible",
    tagColor: "text-deep/60 bg-deep/6",
  },
  {
    id: "5", name: "Deepika Iyer", age: 29, city: "Chennai", state: "Tamil Nadu",
    profession: "Data Scientist", company: "Amazon",
    education: "IIT Madras · M.Tech AI", religion: "Hindu", caste: "Iyer",
    height: "5'4\"", verified: true, trustScore: 91, compatibility: 76,
    dimensions: { values: 78, lifestyle: 74, family: 80, ambition: 82, communication: 72 },
    about: "AI researcher exploring the intersection of tech and social impact. Passionate about Tamil literature, yoga, and cooking Chettinad cuisine.",
    photo: "DI",
    photoGrad: "linear-gradient(135deg, #7A5200, #C89020)",
    tag: "Compatible",
    tagColor: "text-deep/60 bg-deep/6",
  },
];

export default function DashboardPage() {
  const [interests, setInterests] = useState<Record<string, "sent" | "passed">>({});

  const sendInterest = (id: string) => setInterests((p) => ({ ...p, [id]: "sent" }));
  const pass = (id: string) => setInterests((p) => ({ ...p, [id]: "passed" }));

  const active = matches.filter((m) => !interests[m.id]);
  const sent = matches.filter((m) => interests[m.id] === "sent");

  return (
    <div className="px-8 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-devanagari text-gold text-base mb-1">नमस्ते, Prabhakar 🙏</p>
          <h1 className="font-display text-3xl font-light text-deep">
            Your Daily Matches
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-body text-sm text-deep/45">5 curated matches ·</span>
            <div className="flex items-center gap-1 text-marigold">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-body text-sm font-medium">Refreshes at 6:00 AM IST</span>
            </div>
          </div>
        </div>

        {/* Trust score card */}
        <div
          className="rounded-2xl px-5 py-4 min-w-[180px] text-right"
          style={{ background: "rgba(196,82,15,0.06)", border: "1px solid rgba(154,107,0,0.18)" }}
        >
          <p className="font-body text-xs text-deep/45 uppercase tracking-wider mb-1">Your Trust Score</p>
          <p className="font-display text-4xl font-bold text-gradient-gold">84</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <Shield className="w-3 h-3 text-sage" />
            <span className="font-body text-xs text-sage font-medium">Aadhaar Verified</span>
          </div>
          <Link href="/profile/me" className="font-body text-xs text-marigold font-medium mt-2 block hover:underline" style={{ minHeight: "auto" }}>
            Boost to 96 →
          </Link>
        </div>
      </div>

      {/* Profile completeness banner */}
      <div
        className="rounded-2xl p-4 mb-8 flex items-center gap-4"
        style={{ background: "rgba(154,107,0,0.07)", border: "1px solid rgba(154,107,0,0.18)" }}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm font-semibold text-deep">Profile completeness — 68%</span>
            <span className="font-body text-xs text-gold font-medium">+28pts trust score if complete</span>
          </div>
          <div className="h-2 bg-deep/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "68%", background: "linear-gradient(90deg,#C4520F,#C89020)" }} />
          </div>
        </div>
        <Link href="/profile/me" className="btn-primary text-xs px-4 py-2" style={{ minHeight: "auto", whiteSpace: "nowrap" }}>
          Complete Profile
        </Link>
      </div>

      {/* Sent interests strip */}
      {sent.length > 0 && (
        <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(92,122,82,0.08)", border: "1px solid rgba(92,122,82,0.2)" }}>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-sage fill-sage/50" />
            <span className="font-body text-sm font-medium text-sage">
              Interest sent to {sent.map((m) => m.name.split(" ")[0]).join(", ")} · awaiting response
            </span>
          </div>
        </div>
      )}

      {/* Match cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {active.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onInterest={() => sendInterest(match.id)}
            onPass={() => pass(match.id)}
          />
        ))}

        {active.length === 0 && (
          <div className="col-span-3 py-20 text-center">
            <Heart className="w-12 h-12 text-marigold/30 mx-auto mb-4 fill-marigold/10" />
            <h3 className="font-display text-xl text-deep/60 mb-2">All done for today</h3>
            <p className="font-body text-sm text-deep/40">New matches arrive at 6:00 AM IST</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MatchCard({ match: m, onInterest, onPass }: {
  match: typeof matches[0];
  onInterest: () => void;
  onPass: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "rgba(250,246,238,0.85)",
        border: "1px solid rgba(154,107,0,0.14)",
        boxShadow: "0 4px 24px rgba(196,82,15,0.06)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(196,82,15,0.14)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(196,82,15,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Photo placeholder */}
      <div
        className="relative h-52 flex items-center justify-center"
        style={{ background: m.photoGrad }}
      >
        <span className="font-display text-5xl font-light text-white/90">{m.photo}</span>
        {/* Tag */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full font-body text-xs font-semibold ${m.tagColor}`}>
          {m.tag}
        </div>
        {/* Trust score */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(250,246,238,0.92)" }}>
          <Shield className="w-3 h-3 text-sage" />
          <span className="font-body text-xs font-bold text-deep">{m.trustScore}</span>
        </div>
        {/* Compatibility ring */}
        <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(250,246,238,0.95)", border: "2px solid rgba(154,107,0,0.3)" }}>
          <div className="text-center">
            <p className="font-display text-sm font-bold text-gradient-gold leading-none">{m.compatibility}%</p>
            <p className="font-body text-[8px] text-deep/40 leading-none mt-0.5">match</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-display text-lg font-semibold text-deep">{m.name}, {m.age}</h3>
            <div className="flex items-center gap-1 text-deep/50">
              <MapPin className="w-3 h-3" />
              <span className="font-body text-xs">{m.city}, {m.state}</span>
              {m.verified && <CheckCircle className="w-3 h-3 text-sage ml-1" />}
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-2 mb-3">
          <div className="flex items-center gap-1.5 text-deep/60">
            <Briefcase className="w-3 h-3 flex-shrink-0" />
            <span className="font-body text-xs truncate">{m.profession} · {m.company}</span>
          </div>
          <div className="flex items-center gap-1.5 text-deep/60">
            <GraduationCap className="w-3 h-3 flex-shrink-0" />
            <span className="font-body text-xs truncate">{m.education}</span>
          </div>
        </div>

        {/* Compatibility breakdown */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left mb-3"
          style={{ minHeight: "auto" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-3.5 h-3.5 text-marigold" />
            <span className="font-body text-xs font-semibold text-deep/70">Compatibility Breakdown</span>
            <ChevronRight className={`w-3.5 h-3.5 text-deep/30 ml-auto transition-transform ${expanded ? "rotate-90" : ""}`} />
          </div>
          {expanded && (
            <div className="space-y-1.5">
              {Object.entries(m.dimensions).map(([dim, score]) => (
                <div key={dim} className="flex items-center gap-2">
                  <span className="font-body text-xs text-deep/50 capitalize w-24">{dim}</span>
                  <div className="flex-1 h-1.5 bg-deep/8 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${score}%`, background: "linear-gradient(90deg,#C4520F,#C89020)" }} />
                  </div>
                  <span className="font-body text-xs font-bold text-gold w-8 text-right">{score}</span>
                </div>
              ))}
            </div>
          )}
        </button>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={onPass}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full border font-body text-sm font-medium text-deep/50 hover:text-deep hover:border-deep/30 transition-colors"
            style={{ padding: "8px 0", border: "1px solid rgba(28,15,6,0.15)", minHeight: "auto" }}
          >
            <X className="w-3.5 h-3.5" />
            Pass
          </button>
          <Link
            href={`/profile/${m.id}`}
            className="flex items-center justify-center rounded-full font-body text-sm font-medium text-deep/50 border hover:bg-marigold/5 transition-colors"
            style={{ padding: "8px 16px", border: "1px solid rgba(28,15,6,0.15)", minHeight: "auto" }}
          >
            View
          </Link>
          <button
            onClick={onInterest}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full font-body text-sm font-semibold text-white transition-all"
            style={{ padding: "8px 0", background: "linear-gradient(135deg,#C4520F,#E06A1A)", boxShadow: "0 3px 12px rgba(196,82,15,0.35)", minHeight: "auto" }}
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            Interest
          </button>
        </div>
      </div>
    </div>
  );
}
