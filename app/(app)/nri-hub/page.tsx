"use client";

import { useState } from "react";
import { Globe, MapPin, Heart, Shield, CheckCircle, Star, ArrowRight, Plane, Clock } from "lucide-react";

const countries = [
  { code: "🇺🇸", name: "USA",         count: "48,200", flag: "us" },
  { code: "🇬🇧", name: "UK",          count: "22,100", flag: "gb" },
  { code: "🇨🇦", name: "Canada",      count: "18,900", flag: "ca" },
  { code: "🇦🇺", name: "Australia",   count: "14,300", flag: "au" },
  { code: "🇸🇬", name: "Singapore",   count: "11,500", flag: "sg" },
  { code: "🇦🇪", name: "UAE",         count: "9,800",  flag: "ae" },
  { code: "🇩🇪", name: "Germany",     count: "6,200",  flag: "de" },
  { code: "🇳🇿", name: "New Zealand", count: "4,100",  flag: "nz" },
];

const profiles = [
  { id: "n1", name: "Divya Menon",     initials: "DM", grad: "linear-gradient(135deg,#b4002a,#dc1e3c)", age: 29, location: "San Francisco, USA", profession: "Product Manager", company: "Meta",    compatibility: 91, visitIndia: "Dec 2025", religion: "Hindu", verified: true  },
  { id: "n2", name: "Swati Kapoor",    initials: "SK", grad: "linear-gradient(135deg,#9A6B00,#C89020)", age: 27, location: "London, UK",          profession: "Doctor",          company: "NHS",     compatibility: 88, visitIndia: "Jan 2026", religion: "Hindu", verified: true  },
  { id: "n3", name: "Ananya Rao",      initials: "AR", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", age: 30, location: "Toronto, Canada",      profession: "Data Scientist",  company: "Shopify", compatibility: 85, visitIndia: "Mar 2026", religion: "Hindu", verified: true  },
  { id: "n4", name: "Pooja Nambiar",   initials: "PN", grad: "linear-gradient(135deg,#7C3AED,#A78BFA)", age: 28, location: "Sydney, Australia",    profession: "Engineer",        company: "Atlassian", compatibility: 82, visitIndia: "Feb 2026", religion: "Christian", verified: false },
  { id: "n5", name: "Kritika Arora",   initials: "KA", grad: "linear-gradient(135deg,#0F766E,#0D9488)", age: 26, location: "Singapore",            profession: "Finance",         company: "DBS",     compatibility: 79, visitIndia: "Nov 2025", religion: "Sikh", verified: true  },
  { id: "n6", name: "Nisha Pillai",    initials: "NP", grad: "linear-gradient(135deg,#BE185D,#F472B6)", age: 31, location: "Dubai, UAE",           profession: "Architect",       company: "AECOM",   compatibility: 76, visitIndia: "Dec 2025", religion: "Hindu", verified: true  },
];

const features = [
  { icon: "🌐", title: "Timezone-aware chat",      desc: "See local time of your match. Schedule calls across time zones." },
  { icon: "✈️",  title: "India visit planner",      desc: "Share when you're in India. Meet matches during your trip." },
  { icon: "🛂",  title: "Visa & background check",  desc: "Optional foreign credential and background verification." },
  { icon: "📹",  title: "Video introductions",      desc: "Skip the text — let a 90-second video speak for you." },
];

export default function NriHubPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = selectedCountry
    ? profiles.filter((p) => p.location.includes(selectedCountry))
    : profiles;

  return (
    <div className="px-8 py-8 max-w-5xl" style={{ background: "#fff8f8", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero */}
      <div
        className="rounded-3xl p-8 mb-8 relative overflow-hidden"
        style={{ background: "#fff0f5" }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5" style={{ color: "#b4002a" }} />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#b4002a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              NRI Hub
            </span>
          </div>
          <h1
            className="text-3xl font-light mb-2"
            style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
          >
            Connecting the{" "}
            <span className="italic font-semibold" style={{ color: "#9A6B00" }}>global Indian community</span>
          </h1>
          <p
            className="text-sm max-w-xl mb-6"
            style={{ color: "rgba(40,22,33,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Find your perfect match across 40+ countries. NRI-verified profiles, timezone-aware messaging, and India visit coordination.
          </p>

        </div>
        {/* Decorative globe */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 text-9xl select-none">🌏</div>
      </div>

      {/* Country filter */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-3"
          style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
        >
          Browse by Country
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCountry(null)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: !selectedCountry ? "linear-gradient(135deg,#b4002a,#dc1e3c)" : "#fff0f5",
              color: !selectedCountry ? "#fff" : "rgba(40,22,33,0.6)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              minHeight: "auto",
            }}
          >
            🌍 All Countries
          </button>
          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCountry(selectedCountry === c.name ? null : c.name)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: selectedCountry === c.name ? "linear-gradient(135deg,#b4002a,#dc1e3c)" : "#fff0f5",
                color: selectedCountry === c.name ? "#fff" : "rgba(40,22,33,0.6)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                minHeight: "auto",
              }}
            >
              {c.code} {c.name}
              <span className="text-[10px] opacity-70">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profiles grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filtered.map((profile) => {
          const isLiked = liked.has(profile.id);
          return (
            <div
              key={profile.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                borderRadius: 16,
                boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)",
              }}
            >
              {/* Photo */}
              <div className="h-36 flex items-center justify-center relative" style={{ background: profile.grad }}>
                <span
                  className="text-4xl font-light text-white/90"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {profile.initials}
                </span>
                <button
                  onClick={() => setLiked((prev) => {
                    const next = new Set(prev);
                    next.has(profile.id) ? next.delete(profile.id) : next.add(profile.id);
                    return next;
                  })}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.25)", minHeight: "auto", minWidth: "auto" }}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : "text-white/70"}`} />
                </button>
                {profile.verified && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(92,122,82,0.85)" }}>
                    <Shield className="w-3 h-3 text-white" />
                    <span className="text-[10px] font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Verified</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3
                      className="text-base font-semibold"
                      style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
                    >
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" style={{ color: "rgba(40,22,33,0.35)" }} />
                      <span className="text-xs" style={{ color: "rgba(40,22,33,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profile.location}</span>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "rgba(180,0,42,0.08)", color: "#b4002a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {profile.compatibility}%
                  </span>
                </div>

                <p className="text-xs" style={{ color: "rgba(40,22,33,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profile.profession} · {profile.company}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(40,22,33,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profile.religion}</p>

                <div
                  className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                  style={{ background: "rgba(180,0,42,0.05)" }}
                >
                  <Plane className="w-3 h-3" style={{ color: "#b4002a" }} />
                  <span className="text-xs" style={{ color: "rgba(40,22,33,0.55)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Visiting India: <strong style={{ color: "rgba(40,22,33,0.75)" }}>{profile.visitIndia}</strong>
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#b4002a,#dc1e3c)", borderRadius: "9999px", minHeight: "auto", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <Heart className="w-3 h-3" /> Interest
                  </button>
                  <button
                    className="px-3 py-2 text-xs font-medium transition-colors"
                    style={{ background: "#fff0f5", color: "rgba(40,22,33,0.6)", borderRadius: "9999px", minHeight: "auto", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* NRI features */}
      <div className="mb-8">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
        >
          Built for NRIs
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{
                background: "#ffffff",
                borderRadius: 16,
                boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)",
              }}
            >
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#281621", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(40,22,33,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success stories */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)",
        }}
      >
        <h2
          className="text-lg font-semibold mb-4"
          style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
        >
          NRI Success Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { couple: "Rahul & Pooja",   loc: "California → Mumbai",  msg: "\"Met on Match4Marriage, he flew down from SF for our roka. Now settled in Bangalore!\"" },
            { couple: "Vikram & Naina",  loc: "London → Delhi",       msg: "\"Match4Marriage's NRI Hub helped us sync our India visit dates. We got engaged in 3 months.\"" },
          ].map(({ couple, loc, msg }) => (
            <div
              key={couple}
              className="rounded-xl p-4"
              style={{ background: "#fff0f5" }}
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3" style={{ color: "#C89020", fill: "#C89020" }} />)}
              </div>
              <p className="text-sm italic leading-relaxed mb-2" style={{ color: "rgba(40,22,33,0.7)", fontFamily: "'Noto Serif', serif" }}>{msg}</p>
              <div>
                <p className="text-xs font-bold" style={{ color: "#281621", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{couple}</p>
                <p className="text-[10px] flex items-center gap-1" style={{ color: "rgba(40,22,33,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <MapPin className="w-2.5 h-2.5" />{loc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
