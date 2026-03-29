"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { matchApi, profileApi } from "@/lib/api";

/* ── Constants ─────────────────────────────────────────────────────────── */

const GRADIENTS = [
  "linear-gradient(135deg, #E8426A, #E8A060)",
  "linear-gradient(135deg, #9A6B00, #C89020)",
  "linear-gradient(135deg, #5C7A52, #8DB870)",
  "linear-gradient(135deg, #0F766E, #14B8A6)",
  "linear-gradient(135deg, #7A5200, #C89020)",
];

const TAG_STYLES = [
  { tag: "Top Match", tagBg: "bg-primary/10", tagColor: "text-primary" },
  { tag: "Great Match", tagBg: "bg-gold/10", tagColor: "text-gold-dark" },
  { tag: "Good Match", tagBg: "bg-sage/10", tagColor: "text-sage" },
  { tag: "Compatible", tagBg: "bg-on-surface/5", tagColor: "text-on-surface-variant" },
];

const LIFESTYLE_CATEGORIES = [
  {
    title: "Urban Sophisticates",
    icon: "apartment",
    gradient: "from-primary to-primary-container",
    description: "City-dwelling professionals who value culture and cosmopolitan living",
  },
  {
    title: "Intellectual Pursuit",
    icon: "auto_stories",
    gradient: "from-secondary to-secondary-container",
    description: "Knowledge seekers who cherish learning and meaningful conversation",
  },
  {
    title: "Traditional Roots",
    icon: "temple_hindu",
    gradient: "from-tertiary to-tertiary-container",
    description: "Grounded individuals who honour heritage and family values",
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */

function cmToFeetInches(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── Types ─────────────────────────────────────────────────────────────── */

interface DailyMatch {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  profession: string;
  company: string;
  education: string;
  religion: string;
  height: string;
  verified: boolean;
  trustScore: number;
  compatibility: number;
  about: string;
  photo: string;
  photoGrad: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  dimensions: Record<string, number>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapMatch(p: any, idx: number): DailyMatch {
  const firstName = p.first_name || p.firstName || "";
  const lastName = p.last_name || p.lastName || "";
  const name = `${firstName} ${lastName}`.trim() || p.name || "Unknown";
  const tagStyle = TAG_STYLES[Math.min(idx, TAG_STYLES.length - 1)];
  return {
    id: p.id || p.user_id || String(idx),
    name,
    age: p.age ?? 0,
    city: p.city || p.location || "",
    state: p.state || "",
    profession: p.profession || p.occupation || "",
    company: p.company || "",
    education: p.education_level || p.education || "",
    religion: p.religion || "",
    height: p.height_cm ? cmToFeetInches(p.height_cm) : p.height || "",
    verified: p.is_verified ?? p.verified ?? false,
    trustScore: p.trust_score ?? p.trustScore ?? 0,
    compatibility: p.compatibility ?? p.match_score ?? 0,
    about: p.about || p.bio || "",
    photo: getInitials(name),
    photoGrad: GRADIENTS[idx % GRADIENTS.length],
    ...tagStyle,
    dimensions: p.dimensions || {},
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ── Page Component ────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const [interests, setInterests] = useState<Record<string, "sent" | "passed">>({});
  const [matches, setMatches] = useState<DailyMatch[]>([]);
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [matchRes, trustRes] = await Promise.allSettled([
          matchApi.getDailyMatches(),
          profileApi.getTrustScore(),
        ]);

        if (matchRes.status === "fulfilled") {
          const data = matchRes.value.data;
          const list = Array.isArray(data)
            ? data
            : data?.results ?? data?.matches ?? data?.data ?? [];
          setMatches(list.map(mapMatch));
        }

        if (trustRes.status === "fulfilled") {
          const data = trustRes.value.data;
          setTrustScore(data?.trust_score ?? data?.trustScore ?? data?.score ?? null);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load dashboard";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sendInterest = async (id: string) => {
    setInterests((p) => ({ ...p, [id]: "sent" }));
    try {
      await matchApi.sendInterest(id);
    } catch {
      setInterests((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      });
    }
  };
  const pass = (id: string) => setInterests((p) => ({ ...p, [id]: "passed" }));

  const active = matches.filter((m) => !interests[m.id]);
  const sent = matches.filter((m) => interests[m.id] === "sent");
  const displayScore = trustScore ?? 84;

  return (
    <div className="min-h-screen bg-surface px-6 py-10 md:px-12 lg:px-16 font-body max-w-[1400px] mx-auto">
      {/* ── Welcome Header ─────────────────────────────────────────── */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-2 tracking-tight">
          Welcome, Prabhakar
        </h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Your journey toward a lifelong partnership is a sacred path. Explore your
          curated daily matches and editorial insights.
        </p>
      </section>

      {/* ── Loading State ──────────────────────────────────────────── */}
      {loading && (
        <div className="py-20 text-center">
          <span className="material-symbols-outlined text-primary text-5xl animate-spin block mb-4">
            progress_activity
          </span>
          <p className="text-on-surface-variant font-body text-sm">
            Loading your matches...
          </p>
        </div>
      )}

      {/* ── Error State ────────────────────────────────────────────── */}
      {!loading && error && (
        <div className="py-20 text-center">
          <span className="material-symbols-outlined text-primary text-5xl block mb-4">
            error
          </span>
          <p className="text-on-surface-variant font-body text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* ── Sent Interests Banner ────────────────────────────────── */}
          {sent.length > 0 && (
            <div className="mb-8 px-6 py-4 rounded-2xl bg-sage/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sage text-xl">
                  favorite
                </span>
                <span className="text-sage text-sm font-medium font-body">
                  Interest sent to{" "}
                  {sent.map((m) => m.name.split(" ")[0]).join(", ")} — awaiting
                  response
                </span>
              </div>
            </div>
          )}

          {/* ── Bento Grid Dashboard ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* ── Left Column ──────────────────────────────────────── */}
            <div className="md:col-span-1 flex flex-col gap-8">
              {/* Profile Health Card */}
              <div className="bg-surface-container-low rounded-3xl p-8 transition-all hover:bg-surface-container-high relative overflow-hidden group">
                <h2 className="font-headline text-2xl font-bold mb-6 text-on-surface">
                  Profile Health
                </h2>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-4xl font-bold text-primary">85%</span>
                  <span className="text-sm font-medium text-on-surface-variant opacity-60">
                    Almost there
                  </span>
                </div>
                <div className="w-full h-2 bg-outline-variant rounded-full mb-8">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: "85%" }}
                  />
                </div>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Add a &ldquo;Life Philosophy&rdquo; quote to reach 100%.
                </p>
                <Link
                  href="/profile/me"
                  className="block w-full py-4 bg-surface-container-lowest text-primary font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-all text-center"
                >
                  Complete Profile
                </Link>
              </div>

              {/* Trust Identity Card */}
              <div className="bg-surface-container-highest rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[180px]">
                    verified_user
                  </span>
                </div>
                <h2 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                  Trust Identity
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {displayScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                      Status
                    </span>
                    <span className="text-lg font-bold text-on-surface">
                      Highly Trusted
                    </span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant opacity-80 mb-4">
                  Your verified status increases visibility by 3.4x.
                </p>
                <Link
                  href="/profile/me"
                  className="text-primary font-bold text-sm underline decoration-primary/30 hover:decoration-primary transition-all"
                >
                  Boost your score
                </Link>
              </div>
            </div>

            {/* ── Daily Curated Matches (2 cols wide) ─────────────── */}
            <div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-8 md:p-10 min-h-[600px] flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
                  Daily Curated Matches
                </h2>
                <span className="px-4 py-1 rounded-full bg-surface-container-low text-primary text-xs font-bold font-body">
                  UPDATES IN 14H
                </span>
              </div>

              {/* Match Cards Grid */}
              {active.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                  {active.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onInterest={() => sendInterest(match.id)}
                      onPass={() => pass(match.id)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <span className="material-symbols-outlined text-primary/30 text-7xl mb-6">
                    favorite
                  </span>
                  <h3 className="font-headline text-2xl font-bold text-on-surface/60 mb-2">
                    {matches.length === 0
                      ? "The Selection is Refining"
                      : "All done for today"}
                  </h3>
                  <p className="text-on-surface-variant text-sm max-w-sm">
                    {matches.length === 0
                      ? "Our curators are hand-selecting profiles that align with your values and aspirations."
                      : "New curated matches arrive at 6:00 AM IST. Check back tomorrow."}
                  </p>
                </div>
              )}

              {/* Editorial quote */}
              <div className="mt-auto pt-12 border-t border-outline-variant/30 italic font-headline text-on-surface-variant opacity-70 text-center text-sm md:text-base">
                &ldquo;A successful marriage requires falling in love many times,
                always with the same person.&rdquo;
              </div>
            </div>
          </div>

          {/* ── Discover by Lifestyle ──────────────────────────────── */}
          <section className="mt-20">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-10">
              Discover by Lifestyle
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
              {LIFESTYLE_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className={`min-w-[300px] h-80 rounded-2xl bg-gradient-to-br ${cat.gradient} relative overflow-hidden group cursor-pointer flex-shrink-0`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <span className="material-symbols-outlined text-white text-[100px]">
                      {cat.icon}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white font-headline text-xl font-bold mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Hide scrollbar utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

/* ── Match Card Component ──────────────────────────────────────────────── */

function MatchCard({
  match: m,
  onInterest,
  onPass,
}: {
  match: DailyMatch;
  onInterest: () => void;
  onPass: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasDimensions = Object.keys(m.dimensions).length > 0;

  return (
    <div className="bg-surface-container-low rounded-3xl overflow-hidden transition-all hover:bg-surface-container-high group">
      {/* Photo placeholder */}
      <div
        className="relative h-48 flex items-center justify-center"
        style={{ background: m.photoGrad }}
      >
        <span className="font-headline text-5xl font-light text-white/90">
          {m.photo}
        </span>

        {/* Tag badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full ${m.tagBg} ${m.tagColor} text-xs font-bold font-body`}
        >
          {m.tag}
        </div>

        {/* Trust score badge */}
        {m.trustScore > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container-lowest/90">
            <span className="material-symbols-outlined text-sage text-sm">
              verified_user
            </span>
            <span className="text-xs font-bold text-on-surface font-body">
              {m.trustScore}
            </span>
          </div>
        )}

        {/* Compatibility ring */}
        {m.compatibility > 0 && (
          <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-lowest/95 border-2 border-gold/30">
            <div className="text-center">
              <p className="font-headline text-xs font-bold text-gold-dark leading-none">
                {m.compatibility}%
              </p>
              <p className="text-[8px] text-on-surface-variant leading-none mt-0.5">
                match
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-headline text-lg font-semibold text-on-surface">
              {m.name}
              {m.age > 0 ? `, ${m.age}` : ""}
            </h3>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>
              <span className="text-xs font-body">
                {[m.city, m.state].filter(Boolean).join(", ") || "\u2014"}
              </span>
              {m.verified && (
                <span className="material-symbols-outlined text-sage text-sm ml-1">
                  check_circle
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2 mb-3 flex flex-col gap-1">
          {m.profession && (
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">work</span>
              <span className="text-xs font-body truncate">
                {[m.profession, m.company].filter(Boolean).join(" \u00B7 ")}
              </span>
            </div>
          )}
          {m.education && (
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">school</span>
              <span className="text-xs font-body truncate">{m.education}</span>
            </div>
          )}
        </div>

        {/* Compatibility breakdown */}
        {hasDimensions && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left mb-3 bg-transparent border-none p-0 cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">
                psychology
              </span>
              <span className="text-xs font-bold text-on-surface/70 font-body">
                Compatibility Breakdown
              </span>
              <span
                className={`material-symbols-outlined text-on-surface/30 text-sm ml-auto transition-transform duration-200 ${
                  expanded ? "rotate-90" : ""
                }`}
              >
                chevron_right
              </span>
            </div>
            {expanded && (
              <div className="flex flex-col gap-1.5">
                {Object.entries(m.dimensions).map(([dim, score]) => (
                  <div key={dim} className="flex items-center gap-2">
                    <span className="text-xs text-on-surface-variant capitalize w-20 font-body">
                      {dim}
                    </span>
                    <div className="flex-1 h-1.5 bg-outline-variant/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary w-7 text-right font-body">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </button>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={onPass}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-surface-container-lowest text-on-surface-variant rounded-xl hover:bg-surface-container-high transition-all text-sm font-medium font-body cursor-pointer border-none"
          >
            <span className="material-symbols-outlined text-base">close</span>
            Pass
          </button>
          <Link
            href={`/profile/${m.id}`}
            className="flex items-center justify-center px-4 py-2.5 bg-surface-container-lowest text-on-surface-variant rounded-xl hover:bg-surface-container-high transition-all text-sm font-medium font-body no-underline"
          >
            View
          </Link>
          <button
            onClick={onInterest}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl transition-all text-sm font-semibold font-body cursor-pointer border-none"
          >
            <span className="material-symbols-outlined text-base">favorite</span>
            Interest
          </button>
        </div>
      </div>
    </div>
  );
}
