"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, SlidersHorizontal, Shield, MapPin, Briefcase,
  GraduationCap, CheckCircle, Heart, X, ChevronDown,
} from "lucide-react";

const allProfiles = [
  { id: "1",  name: "Priya Sharma",    age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",    education: "IIT Bombay",    religion: "Hindu", caste: "Brahmin", height: "5'4\"", verified: true, trustScore: 96, compatibility: 92, photo: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)" },
  { id: "2",  name: "Anjali Patel",    age: 26, city: "Ahmedabad",  profession: "Doctor",            company: "AIIMS",     education: "AIIMS Delhi",   religion: "Hindu", caste: "Patel",   height: "5'3\"", verified: true, trustScore: 92, compatibility: 87, photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)" },
  { id: "3",  name: "Kavya Nair",      age: 28, city: "Bangalore",  profession: "Product Manager",   company: "Flipkart",  education: "IIM Ahmedabad", religion: "Hindu", caste: "Nair",    height: "5'5\"", verified: true, trustScore: 89, compatibility: 84, photo: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)" },
  { id: "4",  name: "Shruti Agarwal",  age: 25, city: "Delhi",      profession: "CA",                company: "Deloitte",  education: "DU + CA",       religion: "Hindu", caste: "Agarwal", height: "5'2\"", verified: true, trustScore: 88, compatibility: 79, photo: "SA", grad: "linear-gradient(135deg,#E8426A99,#9A6B0099)" },
  { id: "5",  name: "Deepika Iyer",    age: 29, city: "Chennai",    profession: "Data Scientist",    company: "Amazon",    education: "IIT Madras",    religion: "Hindu", caste: "Iyer",    height: "5'4\"", verified: true, trustScore: 91, compatibility: 76, photo: "DI", grad: "linear-gradient(135deg,#7A5200,#C89020)" },
  { id: "6",  name: "Meera Krishnan",  age: 27, city: "Hyderabad",  profession: "UX Designer",       company: "Microsoft", education: "NID Ahmedabad", religion: "Hindu", caste: "Nair",    height: "5'3\"", verified: true, trustScore: 85, compatibility: 73, photo: "MK", grad: "linear-gradient(135deg,#0F766E,#14B8A6)" },
  { id: "7",  name: "Ritu Gupta",      age: 26, city: "Pune",       profession: "MBA Finance",       company: "HDFC",      education: "ISB Hyderabad", religion: "Hindu", caste: "Gupta",   height: "5'2\"", verified: false, trustScore: 71, compatibility: 68, photo: "RG", grad: "linear-gradient(135deg,#9B1C1C,#C9952A)" },
  { id: "8",  name: "Pooja Reddy",     age: 30, city: "Hyderabad",  profession: "Architect",         company: "Self",      education: "SPA Delhi",     religion: "Hindu", caste: "Reddy",   height: "5'5\"", verified: true, trustScore: 87, compatibility: 71, photo: "PR", grad: "linear-gradient(135deg,#E8426A,#9A6B00)" },
  { id: "9",  name: "Nisha Mehta",     age: 25, city: "Surat",      profession: "Dentist",           company: "Private",   education: "SDC Ahmedabad", religion: "Hindu", caste: "Mehta",   height: "5'1\"", verified: true, trustScore: 83, compatibility: 65, photo: "NM", grad: "linear-gradient(135deg,#5C7A52,#C89020)" },
  { id: "10", name: "Aisha Khan",      age: 28, city: "Lucknow",    profession: "Civil Services",    company: "IAS",       education: "JNU Delhi",     religion: "Muslim", caste: "—",      height: "5'4\"", verified: true, trustScore: 94, compatibility: 62, photo: "AK", grad: "linear-gradient(135deg,#0F766E,#9A6B00)" },
  { id: "11", name: "Simran Kaur",     age: 27, city: "Chandigarh", profession: "Lawyer",            company: "HC Punjab", education: "NLU Jodhpur",   religion: "Sikh",   caste: "Jat",    height: "5'6\"", verified: true, trustScore: 90, compatibility: 58, photo: "SK", grad: "linear-gradient(135deg,#7A5200,#E8426A)" },
  { id: "12", name: "Sneha Joshi",     age: 24, city: "Nashik",     profession: "Teacher",           company: "IB School", education: "Pune Univ",     religion: "Hindu", caste: "Joshi",   height: "5'2\"", verified: false, trustScore: 68, compatibility: 55, photo: "SJ", grad: "linear-gradient(135deg,#C89020,#FF8FA3)" },
];

const religions = ["All", "Hindu", "Muslim", "Sikh", "Christian", "Jain"];
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

  const toggle = (id: string) =>
    setLiked((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const filtered = allProfiles.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (religion !== "All" && p.religion !== religion) return false;
    if (city !== "All" && p.city !== city) return false;
    if (verifiedOnly && !p.verified) return false;
    if (ageRange !== "All") {
      const [lo, hi] = ageRange.replace("+", "-99").split("–").map(Number);
      if (p.age < lo || p.age > hi) return false;
    }
    return true;
  });

  return (
    <div style={{ background: "#fdfbf9", minHeight: "100vh", padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "30px", fontWeight: 300, color: "#1a0a14", margin: 0, lineHeight: 1.2 }}>
          Browse Profiles
        </h1>
        <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "13px", color: "#888", marginTop: "4px", marginBottom: 0 }}>
          {filtered.length} profiles match your preferences
        </p>
      </div>

      {/* Search + Filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div
          style={{
            flex: 1, display: "flex", alignItems: "center", gap: "8px",
            padding: "0 16px", background: "#fff",
            border: "1px solid rgba(220,30,60,0.15)", borderRadius: "10px", height: "44px",
          }}
        >
          <Search style={{ width: "16px", height: "16px", color: "rgba(26,10,20,0.35)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, background: "transparent",
              fontFamily: "var(--font-poppins, sans-serif)", fontSize: "14px",
              color: "#1a0a14", border: "none", outline: "none",
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "0 16px", height: "44px", borderRadius: "10px",
            fontFamily: "var(--font-poppins, sans-serif)", fontSize: "14px", fontWeight: 500,
            cursor: "pointer", transition: "all 0.2s ease",
            background: showFilters ? "linear-gradient(135deg,#dc1e3c,#a0153c)" : "#fff",
            color: showFilters ? "#fff" : "rgba(26,10,20,0.60)",
            border: showFilters ? "none" : "1px solid rgba(220,30,60,0.15)",
            boxShadow: showFilters ? "0 4px 16px rgba(220,30,60,0.25)" : "none",
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
            background: "#fff", border: "1px solid rgba(220,30,60,0.08)",
            borderRadius: "16px", padding: "20px", marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(220,30,60,0.06)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
            <FilterSelect label="Religion" value={religion} options={religions} onChange={setReligion} />
            <FilterSelect label="Age Range" value={ageRange} options={ageRanges} onChange={setAgeRange} />
            <FilterSelect label="City" value={city} options={cities} onChange={setCity} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", color: "rgba(26,10,20,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Options
              </label>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 12px", borderRadius: "10px", cursor: "pointer",
                  fontFamily: "var(--font-poppins, sans-serif)", fontSize: "13px", fontWeight: 500,
                  background: verifiedOnly ? "rgba(220,30,60,0.08)" : "rgba(26,10,20,0.04)",
                  color: verifiedOnly ? "#dc1e3c" : "rgba(26,10,20,0.55)",
                  border: verifiedOnly ? "1px solid rgba(220,30,60,0.2)" : "1px solid rgba(26,10,20,0.08)",
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

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {filtered.map((p) => (
          <ProfileCard key={p.id} profile={p} liked={liked} onToggleLike={toggle} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: "80px 0", textAlign: "center" }}>
          <X style={{ width: "40px", height: "40px", color: "rgba(26,10,20,0.2)", margin: "0 auto 12px" }} />
          <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "14px", color: "#888" }}>
            No profiles match your filters
          </p>
        </div>
      )}
    </div>
  );
}

function ProfileCard({
  profile,
  liked,
  onToggleLike,
}: {
  profile: typeof allProfiles[0];
  liked: Set<string>;
  onToggleLike: (id: string) => void;
}) {
  const isLiked = liked.has(profile.id);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(220,30,60,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 12px rgba(220,30,60,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(220,30,60,0.14)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(220,30,60,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Photo area */}
      <div style={{ position: "relative", height: "144px", display: "flex", alignItems: "center", justifyContent: "center", background: profile.grad }}>
        <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "30px", fontWeight: 300, color: "rgba(255,255,255,0.9)" }}>
          {profile.photo}
        </span>

        {/* Like button */}
        <button
          onClick={() => onToggleLike(profile.id)}
          style={{
            position: "absolute", top: "8px", right: "8px",
            width: "28px", height: "28px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: isLiked ? "#dc1e3c" : "rgba(255,255,255,0.92)",
            border: "none", cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "all 0.2s ease",
          }}
        >
          <Heart
            style={{
              width: "14px", height: "14px",
              color: isLiked ? "#fff" : "rgba(26,10,20,0.5)",
              fill: isLiked ? "#fff" : "none",
            }}
          />
        </button>

        {/* Trust score */}
        <div
          style={{
            position: "absolute", bottom: "8px", left: "8px",
            display: "flex", alignItems: "center", gap: "4px",
            padding: "2px 6px", borderRadius: "20px",
            background: "rgba(253,251,249,0.92)",
          }}
        >
          <Shield style={{ width: "10px", height: "10px", color: "#C89020" }} />
          <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "10px", fontWeight: 700, color: "#1a0a14" }}>
            {profile.trustScore}
          </span>
        </div>

        {/* Verified badge */}
        {profile.verified && (
          <div style={{ position: "absolute", top: "8px", left: "8px" }}>
            <CheckCircle style={{ width: "16px", height: "16px", color: "#dc1e3c", fill: "rgba(220,30,60,0.15)" }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "12px" }}>
        <h3 style={{
          fontFamily: "var(--font-playfair, serif)", fontSize: "14px", fontWeight: 600,
          color: "#1a0a14", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {profile.name}, {profile.age}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", marginBottom: "6px" }}>
          <MapPin style={{ width: "10px", height: "10px", color: "#888", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {profile.city}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
          <Briefcase style={{ width: "10px", height: "10px", color: "#888", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {profile.profession}
          </span>
        </div>

        {/* Compatibility */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", color: "rgba(26,10,20,0.4)" }}>Match</span>
          <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "14px", fontWeight: 700, color: "#C89020" }}>
            {profile.compatibility}%
          </span>
        </div>

        <Link
          href={`/profile/${profile.id}`}
          style={{
            display: "block", width: "100%", textAlign: "center",
            background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
            color: "#fff", borderRadius: "10px",
            padding: "8px 0",
            fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", fontWeight: 600,
            boxShadow: "0 2px 8px rgba(220,30,60,0.25)",
            textDecoration: "none", transition: "all 0.2s ease",
          }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{
        fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px",
        color: "rgba(26,10,20,0.5)", textTransform: "uppercase", letterSpacing: "0.05em",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%", appearance: "none",
            fontFamily: "var(--font-poppins, sans-serif)", fontSize: "13px", color: "#1a0a14",
            background: "rgba(255,255,255,0.8)", borderRadius: "10px",
            padding: "8px 32px 8px 12px",
            border: "1px solid rgba(220,30,60,0.15)", outline: "none", cursor: "pointer",
          }}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "rgba(26,10,20,0.4)", pointerEvents: "none" }} />
      </div>
    </div>
  );
}
