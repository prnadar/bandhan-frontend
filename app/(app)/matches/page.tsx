"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, SlidersHorizontal, Shield, MapPin, Briefcase,
  GraduationCap, CheckCircle, Heart, X, ChevronDown,
} from "lucide-react";

const allProfiles = [
  { id: "1",  name: "Priya Sharma",    age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",    education: "IIT Bombay",    religion: "Hindu", caste: "Brahmin", height: "5'4\"", verified: true, trustScore: 96, compatibility: 92, photo: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)" },
  { id: "2",  name: "Anjali Patel",    age: 26, city: "Ahmedabad",  profession: "Doctor",            company: "AIIMS",     education: "AIIMS Delhi",   religion: "Hindu", caste: "Patel",   height: "5'3\"", verified: true, trustScore: 92, compatibility: 87, photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)" },
  { id: "3",  name: "Kavya Nair",      age: 28, city: "Bangalore",  profession: "Product Manager",   company: "Flipkart",  education: "IIM Ahmedabad", religion: "Hindu", caste: "Nair",    height: "5'5\"", verified: true, trustScore: 89, compatibility: 84, photo: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)" },
  { id: "4",  name: "Shruti Agarwal",  age: 25, city: "Delhi",      profession: "CA",                company: "Deloitte",  education: "DU + CA",       religion: "Hindu", caste: "Agarwal", height: "5'2\"", verified: true, trustScore: 88, compatibility: 79, photo: "SA", grad: "linear-gradient(135deg,#C4520F99,#9A6B0099)" },
  { id: "5",  name: "Deepika Iyer",    age: 29, city: "Chennai",    profession: "Data Scientist",    company: "Amazon",    education: "IIT Madras",    religion: "Hindu", caste: "Iyer",    height: "5'4\"", verified: true, trustScore: 91, compatibility: 76, photo: "DI", grad: "linear-gradient(135deg,#7A5200,#C89020)" },
  { id: "6",  name: "Meera Krishnan",  age: 27, city: "Hyderabad",  profession: "UX Designer",       company: "Microsoft", education: "NID Ahmedabad", religion: "Hindu", caste: "Nair",    height: "5'3\"", verified: true, trustScore: 85, compatibility: 73, photo: "MK", grad: "linear-gradient(135deg,#0F766E,#14B8A6)" },
  { id: "7",  name: "Ritu Gupta",      age: 26, city: "Pune",       profession: "MBA Finance",       company: "HDFC",      education: "ISB Hyderabad", religion: "Hindu", caste: "Gupta",   height: "5'2\"", verified: false, trustScore: 71, compatibility: 68, photo: "RG", grad: "linear-gradient(135deg,#9B1C1C,#C9952A)" },
  { id: "8",  name: "Pooja Reddy",     age: 30, city: "Hyderabad",  profession: "Architect",         company: "Self",      education: "SPA Delhi",     religion: "Hindu", caste: "Reddy",   height: "5'5\"", verified: true, trustScore: 87, compatibility: 71, photo: "PR", grad: "linear-gradient(135deg,#C4520F,#9A6B00)" },
  { id: "9",  name: "Nisha Mehta",     age: 25, city: "Surat",      profession: "Dentist",           company: "Private",   education: "SDC Ahmedabad", religion: "Hindu", caste: "Mehta",   height: "5'1\"", verified: true, trustScore: 83, compatibility: 65, photo: "NM", grad: "linear-gradient(135deg,#5C7A52,#C89020)" },
  { id: "10", name: "Aisha Khan",      age: 28, city: "Lucknow",    profession: "Civil Services",    company: "IAS",       education: "JNU Delhi",     religion: "Muslim", caste: "—",      height: "5'4\"", verified: true, trustScore: 94, compatibility: 62, photo: "AK", grad: "linear-gradient(135deg,#0F766E,#9A6B00)" },
  { id: "11", name: "Simran Kaur",     age: 27, city: "Chandigarh", profession: "Lawyer",            company: "HC Punjab", education: "NLU Jodhpur",   religion: "Sikh",   caste: "Jat",    height: "5'6\"", verified: true, trustScore: 90, compatibility: 58, photo: "SK", grad: "linear-gradient(135deg,#7A5200,#C4520F)" },
  { id: "12", name: "Sneha Joshi",     age: 24, city: "Nashik",     profession: "Teacher",           company: "IB School", education: "Pune Univ",     religion: "Hindu", caste: "Joshi",   height: "5'2\"", verified: false, trustScore: 68, compatibility: 55, photo: "SJ", grad: "linear-gradient(135deg,#C89020,#E06A1A)" },
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
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-light text-deep mb-1">Browse Profiles</h1>
        <p className="font-body text-sm text-deep/45">{filtered.length} profiles match your preferences</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex-1 flex items-center gap-2 px-4 rounded-full"
          style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.18)", height: "44px" }}
        >
          <Search className="w-4 h-4 text-deep/35 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent font-body text-sm text-deep placeholder-deep/35 outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 rounded-full font-body text-sm font-medium transition-all ${showFilters ? "bg-marigold text-white" : "text-deep/60 hover:text-deep"}`}
          style={{ height: "44px", border: showFilters ? "none" : "1px solid rgba(28,15,6,0.18)", minHeight: "auto" }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FilterSelect label="Religion" value={religion} options={religions} onChange={setReligion} />
            <FilterSelect label="Age Range" value={ageRange} options={ageRanges} onChange={setAgeRange} />
            <FilterSelect label="City" value={city} options={cities} onChange={setCity} />
            <div className="flex flex-col gap-1">
              <label className="font-body text-xs text-deep/50 uppercase tracking-wider">Options</label>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors ${verifiedOnly ? "bg-sage/15 text-sage border border-sage/25" : "bg-deep/5 text-deep/55 border border-deep/10"}`}
                style={{ minHeight: "auto" }}
              >
                <Shield className="w-3.5 h-3.5" />
                Verified Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              background: "rgba(250,246,238,0.9)",
              border: "1px solid rgba(154,107,0,0.12)",
              boxShadow: "0 2px 16px rgba(196,82,15,0.05)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(196,82,15,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(196,82,15,0.05)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            {/* Photo */}
            <div className="relative h-36 flex items-center justify-center" style={{ background: p.grad }}>
              <span className="font-display text-3xl font-light text-white/90">{p.photo}</span>
              {/* Like button */}
              <button
                onClick={() => toggle(p.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{ background: liked.has(p.id) ? "rgba(196,82,15,0.9)" : "rgba(250,246,238,0.85)", minHeight: "auto", minWidth: "auto" }}
              >
                <Heart className={`w-3.5 h-3.5 ${liked.has(p.id) ? "fill-white text-white" : "text-deep/50"}`} />
              </button>
              {/* Trust */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(250,246,238,0.92)" }}>
                <Shield className="w-2.5 h-2.5 text-sage" />
                <span className="font-body text-[10px] font-bold text-deep">{p.trustScore}</span>
              </div>
              {p.verified && (
                <div className="absolute top-2 left-2">
                  <CheckCircle className="w-4 h-4 text-sage fill-sage/20" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-display text-sm font-semibold text-deep truncate">{p.name}, {p.age}</h3>
              <div className="flex items-center gap-1 text-deep/45 mt-0.5 mb-1.5">
                <MapPin className="w-2.5 h-2.5" />
                <span className="font-body text-xs truncate">{p.city}</span>
              </div>
              <div className="flex items-center gap-1 text-deep/45 mb-2">
                <Briefcase className="w-2.5 h-2.5" />
                <span className="font-body text-xs truncate">{p.profession}</span>
              </div>

              {/* Compatibility */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-xs text-deep/40">Match</span>
                <span className="font-display text-sm font-bold text-gradient-gold">{p.compatibility}%</span>
              </div>

              <Link
                href={`/profile/${p.id}`}
                className="block w-full text-center rounded-full font-body text-xs font-semibold py-2 transition-all"
                style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", color: "#fff", boxShadow: "0 2px 8px rgba(196,82,15,0.3)", minHeight: "auto" }}
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <X className="w-10 h-10 text-deep/20 mx-auto mb-3" />
          <p className="font-body text-sm text-deep/40">No profiles match your filters</p>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-xs text-deep/50 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none font-body text-sm text-deep bg-white/60 rounded-lg px-3 py-2 border outline-none cursor-pointer"
          style={{ border: "1px solid rgba(154,107,0,0.2)" }}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-deep/40 pointer-events-none" />
      </div>
    </div>
  );
}
