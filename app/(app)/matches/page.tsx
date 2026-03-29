"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, SlidersHorizontal, Shield, MapPin, Briefcase,
  GraduationCap, CheckCircle, Heart, X, ChevronDown, Loader2,
} from "lucide-react";
import { matchApi } from "@/lib/api";

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  profession: string;
  education: string;
  religion: string;
  height: string;
  verified: boolean;
  trustScore: number;
  compatibility: number;
  photo: string;
  grad: string;
}

function cmToFeetInches(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

const GRADIENTS = [
  "linear-gradient(135deg,#E8426A,#E8A060)",
  "linear-gradient(135deg,#9A6B00,#C89020)",
  "linear-gradient(135deg,#5C7A52,#8DB870)",
  "linear-gradient(135deg,#0F766E,#14B8A6)",
  "linear-gradient(135deg,#7A5200,#C89020)",
  "linear-gradient(135deg,#E8426A99,#9A6B0099)",
  "linear-gradient(135deg,#9B1C1C,#C9952A)",
  "linear-gradient(135deg,#7C3AED,#A78BFA)",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapApiProfile(p: any, idx: number): Profile {
  const firstName = p.first_name || p.firstName || "";
  const lastName = p.last_name || p.lastName || "";
  const name = `${firstName} ${lastName}`.trim() || "Unknown";
  return {
    id: p.id || p.user_id || String(idx),
    name,
    age: p.age ?? 0,
    city: p.city || p.location || "",
    profession: p.profession || p.occupation || "",
    education: p.education_level || p.education || "",
    religion: p.religion || "",
    height: p.height_cm ? cmToFeetInches(p.height_cm) : p.height || "",
    verified: p.is_verified ?? p.verified ?? false,
    trustScore: p.trust_score ?? p.trustScore ?? 0,
    compatibility: p.compatibility ?? p.match_score ?? 0,
    photo: getInitials(name),
    grad: GRADIENTS[idx % GRADIENTS.length],
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const religions = ["All", "Hindu", "Sikh", "Christian", "Jain", "Muslim"];
const ageRanges = ["All", "22–25", "25–28", "28–32", "32+"];
const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Ahmedabad", "Pune"];

export default function MatchesPage() {
  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("All");
  const [ageRange, setAgeRange] = useState("All");
  const [city, setCity] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (religion !== "All") params.religion = religion;
      if (city !== "All") params.city = city;
      if (verifiedOnly) params.verified = "true";

      const res = await matchApi.browseProfiles(params);
      const data = res.data;
      const list = Array.isArray(data) ? data : data?.results ?? data?.profiles ?? data?.data ?? [];
      setProfiles(list.map(mapApiProfile));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load profiles";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [religion, city, verifiedOnly]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleLike = async (id: string) => {
    const wasLiked = liked.has(id);
    setLiked((prev) => {
      const s = new Set(prev);
      wasLiked ? s.delete(id) : s.add(id);
      return s;
    });
    if (!wasLiked) {
      try {
        await matchApi.sendInterest(id);
      } catch {
        // revert on failure
        setLiked((prev) => {
          const s = new Set(prev);
          s.delete(id);
          return s;
        });
      }
    }
  };

  const filtered = profiles.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (ageRange !== "All") {
      const [lo, hi] = ageRange.replace("+", "–99").split("–").map(Number);
      if (p.age < lo || p.age > hi) return false;
    }
    return true;
  });

  return (
    <div style={{ background: "#fff8f8", minHeight: "100vh", padding: "40px 48px" }}>
      {/* Header */}
      <section style={{ marginBottom: "48px" }}>
        <h1
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "48px",
            fontWeight: 700,
            color: "#281621",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Browse Profiles
        </h1>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "14px",
            color: "#5c3f3f",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          {loading ? "Loading..." : `${filtered.length} profiles match your preferences`}
        </p>
      </section>

      {/* Search + Filter bar */}
      <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 20px",
            background: "#ffffff",
            borderRadius: "12px",
            height: "52px",
            border: "none",
          }}
        >
          <Search style={{ width: "18px", height: "18px", color: "#916f6e", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search by name, profession, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              color: "#281621",
              border: "none",
              outline: "none",
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 24px",
            height: "52px",
            borderRadius: "12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: showFilters ? "linear-gradient(135deg, #b4002a, #dc1e3c)" : "#ffe0ef",
            color: showFilters ? "#ffffff" : "#5c3f3f",
            border: "none",
          }}
        >
          <SlidersHorizontal style={{ width: "16px", height: "16px" }} />
          Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            border: "none",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
            <FilterSelect label="Religion" value={religion} options={religions} onChange={setReligion} />
            <FilterSelect label="Age Range" value={ageRange} options={ageRanges} onChange={setAgeRange} />
            <FilterSelect label="City" value={city} options={cities} onChange={setCity} />
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  color: "#5c3f3f",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: 600,
                }}
              >
                Options
              </label>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: verifiedOnly ? "rgba(180,0,42,0.08)" : "#fff0f5",
                  color: verifiedOnly ? "#b4002a" : "#5c3f3f",
                  border: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Shield style={{ width: "14px", height: "14px" }} />
                Verified Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{ padding: "80px 0", textAlign: "center" }}>
          <Loader2
            style={{
              width: "36px",
              height: "36px",
              color: "#b4002a",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              color: "#5c3f3f",
            }}
          >
            Finding your best matches...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <X style={{ width: "40px", height: "40px", color: "#b4002a", margin: "0 auto 16px" }} />
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              color: "#5c3f3f",
              marginBottom: "16px",
            }}
          >
            {error}
          </p>
          <button
            onClick={fetchProfiles}
            style={{
              padding: "12px 28px",
              borderRadius: "9999px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
              color: "#ffffff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
              transition: "all 0.2s ease",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "40px",
            }}
          >
            {filtered.map((p) => (
              <ProfileCard key={p.id} profile={p} liked={liked} onToggleLike={handleLike} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", textAlign: "center" }}>
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  background: "#fff0f5",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <Heart style={{ width: "40px", height: "40px", color: "#b4002a" }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#281621",
                  marginBottom: "8px",
                }}
              >
                No profiles match your preferences
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  color: "#5c3f3f",
                  maxWidth: "400px",
                }}
              >
                Try adjusting your age range, location, or community filters to discover more compatible matches.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProfileCard({
  profile,
  liked,
  onToggleLike,
}: {
  profile: Profile;
  liked: Set<string>;
  onToggleLike: (id: string) => void;
}) {
  const isLiked = liked.has(profile.id);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        border: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Photo area */}
      <div
        style={{
          position: "relative",
          height: "240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: profile.grad,
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "48px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {profile.photo}
        </span>

        {/* Match badge */}
        {profile.compatibility > 0 && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 12px",
              borderRadius: "9999px",
              background: "rgba(180,0,42,0.9)",
              color: "#ffffff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {profile.compatibility}% Match
          </div>
        )}

        {/* Like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(profile.id);
          }}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isLiked ? "#b4002a" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <Heart
            style={{
              width: "16px",
              height: "16px",
              color: isLiked ? "#ffffff" : "#b4002a",
              fill: isLiked ? "#ffffff" : "none",
            }}
          />
        </button>

        {/* Trust score */}
        {profile.trustScore > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#281621",
            }}
          >
            <Shield style={{ width: "12px", height: "12px", color: "#C89020" }} />
            Trust: {profile.trustScore}
          </div>
        )}

        {/* Verified badge */}
        {profile.verified && (
          <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
            <CheckCircle style={{ width: "20px", height: "20px", color: "#b4002a", fill: "rgba(180,0,42,0.15)" }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h2
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#281621",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {profile.name}
            {profile.age > 0 ? `, ${profile.age}` : ""}
          </h2>
        </div>

        {profile.profession && (
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              color: "#5c3f3f",
              margin: "0 0 4px 0",
            }}
          >
            {profile.profession}
          </p>
        )}

        {profile.city && (
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "12px",
              color: "#5c3f3f",
              margin: "0 0 24px 0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <MapPin style={{ width: "12px", height: "12px", flexShrink: 0 }} />
            {profile.city}
          </p>
        )}

        {!profile.city && !profile.profession && <div style={{ marginBottom: "24px" }} />}

        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            href={`/profile/${profile.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "12px 0",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s ease",
              border: "none",
            }}
          >
            View Profile
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(profile.id);
            }}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f9dae9",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            <Heart
              style={{
                width: "18px",
                height: "18px",
                color: "#b4002a",
                fill: isLiked ? "#b4002a" : "none",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "11px",
          color: "#5c3f3f",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            appearance: "none",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "13px",
            color: "#281621",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "10px 36px 10px 14px",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "14px",
            height: "14px",
            color: "#5c3f3f",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
