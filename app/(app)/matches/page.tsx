"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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
const ageRanges = ["All", "22-25", "25-28", "28-32", "32+"];
const cities = [
  "All",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Pune",
];

const ITEMS_PER_PAGE = 12;

export default function MatchesPage() {
  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("All");
  const [ageRange, setAgeRange] = useState("All");
  const [city, setCity] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

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
      const list = Array.isArray(data)
        ? data
        : data?.results ?? data?.profiles ?? data?.data ?? [];
      setProfiles(list.map(mapApiProfile));
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to load profiles";
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
        setLiked((prev) => {
          const s = new Set(prev);
          s.delete(id);
          return s;
        });
      }
    }
  };

  const filtered = profiles.filter((p) => {
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.city.toLowerCase().includes(search.toLowerCase()) &&
      !p.profession.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (ageRange !== "All") {
      const [lo, hi] = ageRange.replace("+", "-99").split("-").map(Number);
      if (p.age < lo || p.age > hi) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProfiles = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch("");
    setReligion("All");
    setAgeRange("All");
    setCity("All");
    setVerifiedOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      {/* Header Section */}
      <section className="mb-12">
        <h1 className="font-headline font-bold text-5xl text-on-surface mb-8 tracking-tight">
          Browse Profiles
        </h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-xl font-body text-on-surface focus:ring-2 focus:ring-primary-container transition-all outline-none editorial-shadow"
              placeholder="Search by name, profession, or location..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-body font-semibold transition-colors whitespace-nowrap ${
              showFilters
                ? "bg-gradient-to-r from-primary to-primary-container text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined">tune</span>
            Filters
          </button>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            {/* Religion Filter */}
            <FilterPill
              label="Religion"
              value={religion}
              options={religions}
              onChange={(v) => {
                setReligion(v);
                setCurrentPage(1);
              }}
            />

            {/* Age Filter */}
            <FilterPill
              label="Age"
              value={ageRange}
              options={ageRanges}
              onChange={(v) => {
                setAgeRange(v);
                setCurrentPage(1);
              }}
            />

            {/* City Filter */}
            <FilterPill
              label="City"
              value={city}
              options={cities}
              onChange={(v) => {
                setCity(v);
                setCurrentPage(1);
              }}
            />

            {/* Verified Toggle */}
            <button
              onClick={() => {
                setVerifiedOnly(!verifiedOnly);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-colors ${
                verifiedOnly
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                verified_user
              </span>
              Verified Only
            </button>

            {/* Active filter count */}
            {(religion !== "All" ||
              ageRange !== "All" ||
              city !== "All" ||
              verifiedOnly) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 px-4 py-2.5 rounded-full font-body text-sm text-primary hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  close
                </span>
                Clear All
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <p className="font-body text-on-surface-variant text-sm mt-6">
            {filtered.length} profile{filtered.length !== 1 ? "s" : ""} match
            your preferences
          </p>
        )}
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center text-primary mb-6 animate-pulse">
            <span className="material-symbols-outlined text-3xl">
              favorite
            </span>
          </div>
          <p className="font-body text-on-surface-variant">
            Finding your best matches...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-5xl">
              error_outline
            </span>
          </div>
          <h3 className="font-headline text-2xl font-bold mb-2">
            Something went wrong
          </h3>
          <p className="font-body text-on-surface-variant mb-8 max-w-md mx-auto">
            {error}
          </p>
          <button
            onClick={fetchProfiles}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Profile Grid */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isLiked={liked.has(profile.id)}
                onToggleLike={handleLike}
              />
            ))}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              {getPaginationRange(safePage, totalPages).map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 self-center font-body text-on-surface-variant">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold font-body transition-colors ${
                      safePage === page
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage >= totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined">
                  chevron_right
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <section className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-5xl">
              search_off
            </span>
          </div>
          <h3 className="font-headline text-2xl font-bold mb-2">
            No profiles match your preferences
          </h3>
          <p className="font-body text-on-surface-variant mb-8 max-w-md mx-auto">
            Try adjusting your age range, location, or community filters to
            discover more compatible matches.
          </p>
          <button
            onClick={resetFilters}
            className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all"
          >
            Reset Filters
          </button>
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profile Card                                                       */
/* ------------------------------------------------------------------ */

function ProfileCard({
  profile,
  isLiked,
  onToggleLike,
}: {
  profile: Profile;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform hover:-translate-y-1 duration-300">
      {/* Image Area */}
      <div
        className="relative h-80 flex items-center justify-center"
        style={{ background: profile.grad }}
      >
        {/* Initials fallback (no real photo) */}
        <span className="font-headline text-6xl font-bold text-white/80 select-none">
          {profile.photo}
        </span>

        {/* Match % Badge */}
        {profile.compatibility > 0 && (
          <div className="absolute top-4 left-4 bg-primary/90 text-on-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
            {profile.compatibility}% Match
          </div>
        )}

        {/* Trust Score Badge */}
        {profile.trustScore > 0 && (
          <div className="absolute bottom-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md text-on-surface px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
            Trust Score: {profile.trustScore}
          </div>
        )}

        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md text-primary px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            Verified
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-headline text-2xl font-bold text-on-surface">
            {profile.name}
            {profile.age > 0 ? `, ${profile.age}` : ""}
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleLike(profile.id);
            }}
            className={`p-2 rounded-full transition-colors ${
              isLiked
                ? "text-primary bg-surface-container-highest"
                : "text-primary hover:bg-surface-container-low"
            }`}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <span
              className={`material-symbols-outlined ${isLiked ? "fill-icon" : ""}`}
              style={
                isLiked
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              favorite
            </span>
          </button>
        </div>

        {profile.profession && (
          <p className="font-body text-on-surface-variant text-sm mb-1">
            {profile.profession}
          </p>
        )}

        {profile.city && (
          <p className="font-body text-on-surface-variant text-xs flex items-center gap-1 mb-6">
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            {profile.city}
          </p>
        )}

        {!profile.city && !profile.profession && <div className="mb-6" />}

        <div className="flex gap-3">
          <Link
            href={`/profile/${profile.id}`}
            className="flex-grow py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold text-sm text-center shadow-md hover:shadow-lg transition-all"
          >
            View Profile
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleLike(profile.id);
            }}
            className="p-3 bg-surface-container-highest text-on-surface-variant rounded-xl hover:bg-surface-variant transition-colors"
            title="Express Interest"
            aria-label="Express interest"
          >
            <span className="material-symbols-outlined">
              volunteer_activism
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter Pill (dropdown select styled as pill)                       */
/* ------------------------------------------------------------------ */

function FilterPill({
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
  const isActive = value !== "All";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none pl-4 pr-9 py-2.5 rounded-full font-body text-sm font-semibold cursor-pointer transition-colors outline-none border-none ${
          isActive
            ? "bg-primary text-on-primary"
            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest"
        }`}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o} className="text-on-surface bg-surface">
            {o === "All" ? label : o}
          </option>
        ))}
      </select>
      <span
        className={`material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-base pointer-events-none ${
          isActive ? "text-on-primary" : "text-on-surface-variant"
        }`}
      >
        expand_more
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination helper                                                  */
/* ------------------------------------------------------------------ */

function getPaginationRange(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);
  return pages;
}
