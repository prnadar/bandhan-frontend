"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { matchApi } from "@/lib/api";

type Tab = "received" | "sent" | "mutual";

interface InterestProfile {
  id: string;
  name: string;
  initials: string;
  grad: string;
  age: number;
  city: string;
  profession: string;
  company: string;
  compatibility: number;
  time: string;
  verified: boolean;
  status?: string;
}

const GRADIENTS = [
  "linear-gradient(135deg,#E8426A,#E8A060)",
  "linear-gradient(135deg,#9A6B00,#C89020)",
  "linear-gradient(135deg,#5C7A52,#8DB870)",
  "linear-gradient(135deg,#E8426A99,#9A6B0099)",
  "linear-gradient(135deg,#7C3AED,#A78BFA)",
  "linear-gradient(135deg,#0F766E,#0D9488)",
  "linear-gradient(135deg,#BE185D,#F472B6)",
  "linear-gradient(135deg,#1D4ED8,#60A5FA)",
];

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  } catch {
    return dateStr;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapInterest(p: any, idx: number): InterestProfile {
  const firstName = p.first_name || p.firstName || "";
  const lastName = p.last_name || p.lastName || "";
  const name = `${firstName} ${lastName}`.trim() || p.name || "Unknown";
  return {
    id: p.id || p.user_id || p.sender_id || p.receiver_id || String(idx),
    name,
    initials: getInitials(name),
    grad: GRADIENTS[idx % GRADIENTS.length],
    age: p.age ?? 0,
    city: p.city || p.location || "",
    profession: p.profession || p.occupation || "",
    company: p.company || "",
    compatibility: p.compatibility ?? p.match_score ?? 0,
    time: p.created_at ? timeAgo(p.created_at) : p.time || "",
    verified: p.is_verified ?? p.verified ?? false,
    status: p.status || "pending",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const statusBadge: Record<string, { label: string; bg: string; color: string }> = {
  pending:  { label: "Pending",  bg: "rgba(200,144,32,0.12)",  color: "#9A6B00" },
  viewed:   { label: "Viewed",   bg: "rgba(26,10,20,0.08)",    color: "rgba(26,10,20,0.55)" },
  accepted: { label: "Accepted", bg: "rgba(220,30,60,0.1)",    color: "#dc1e3c" },
  declined: { label: "Declined", bg: "rgba(26,10,20,0.08)",    color: "rgba(26,10,20,0.4)" },
};

function ProfileCard({
  profile,
  variant,
  isAccepted,
  onAccept,
  onDismiss,
}: {
  profile: InterestProfile;
  variant: "received" | "sent" | "mutual";
  isAccepted?: boolean;
  onAccept?: () => void;
  onDismiss?: () => void;
}) {
  const badge = statusBadge[profile.status || "pending"] || statusBadge.pending;
  const subtitle = [
    profile.profession
      ? `${profile.profession}${profile.company ? ` at ${profile.company}` : ""}`
      : "",
    profile.city,
  ]
    .filter(Boolean)
    .join(" \u2022 ");

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden group transition-all hover:-translate-y-1"
      style={{ boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)" }}
    >
      {/* Image area with gradient avatar fallback */}
      <div className="relative h-[420px]">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: profile.grad }}
        >
          <span className="font-headline text-7xl font-bold text-white/80 select-none">
            {profile.initials}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {variant === "received" && !isAccepted && (
              <span className="bg-secondary-container/90 text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Pending
              </span>
            )}
            {variant === "received" && isAccepted && (
              <span className="bg-primary/90 text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Accepted
              </span>
            )}
            {variant === "sent" && (
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ background: badge.bg, color: badge.color }}
              >
                {badge.label}
              </span>
            )}
            {variant === "mutual" && (
              <span className="bg-primary/90 text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Mutual Match
              </span>
            )}
            {profile.verified && (
              <span className="bg-white/20 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>{" "}
                Verified
              </span>
            )}
          </div>
          <h3 className="font-headline text-2xl font-bold">
            {profile.name}
            {profile.age > 0 ? `, ${profile.age}` : ""}
          </h3>
          <p className="text-white/80 font-medium text-sm">
            {subtitle || "\u2014"}
          </p>
        </div>
      </div>

      {/* Card bottom actions */}
      <div className="p-6">
        {/* Tags row */}
        <div className="flex flex-wrap gap-2 mb-6">
          {profile.compatibility > 0 && (
            <span className="bg-surface-container-low text-on-surface/70 text-xs px-4 py-1.5 rounded-full font-medium italic">
              {profile.compatibility}% Compatibility
            </span>
          )}
          {profile.time && (
            <span className="bg-surface-container-low text-on-surface/70 text-xs px-4 py-1.5 rounded-full font-medium">
              {variant === "sent" ? `Sent ${profile.time}` : profile.time}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {variant === "received" && !isAccepted && (
            <>
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="flex-1 py-3 bg-surface-container-highest text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  Dismiss
                </button>
              )}
              {onAccept && (
                <button
                  onClick={onAccept}
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                  Accept Interest
                </button>
              )}
            </>
          )}

          {variant === "received" && isAccepted && (
            <>
              <Link
                href={`/profile/${profile.id}`}
                className="flex-1 py-3 bg-surface-container-highest text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 text-center no-underline"
              >
                View Profile
              </Link>
              <Link
                href="/messages/1"
                className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 no-underline"
              >
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                Message
              </Link>
            </>
          )}

          {variant === "sent" && (
            <>
              <Link
                href={`/profile/${profile.id}`}
                className="flex-1 py-3 bg-surface-container-highest text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 text-center no-underline"
              >
                View Profile
              </Link>
              {profile.status === "accepted" && (
                <Link
                  href="/messages/1"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 no-underline"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                  Message
                </Link>
              )}
            </>
          )}

          {variant === "mutual" && (
            <>
              <Link
                href={`/profile/${profile.id}`}
                className="flex-1 py-3 bg-surface-container-highest text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 text-center no-underline"
              >
                View Profile
              </Link>
              <Link
                href="/messages/1"
                className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 no-underline"
              >
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                Message
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AsymmetricCard({
  profile,
  variant,
  isAccepted,
  onAccept,
  onDismiss,
}: {
  profile: InterestProfile;
  variant: "received" | "sent" | "mutual";
  isAccepted?: boolean;
  onAccept?: () => void;
  onDismiss?: () => void;
}) {
  const badge = statusBadge[profile.status || "pending"] || statusBadge.pending;
  const subtitle = [
    profile.profession
      ? `${profile.profession}${profile.company ? ` at ${profile.company}` : ""}`
      : "",
    profile.city,
  ]
    .filter(Boolean)
    .join(" \u2022 ");

  return (
    <div
      className="bg-surface-container-lowest rounded-[2rem] overflow-hidden group transition-all hover:-translate-y-1 xl:col-span-2 flex flex-col md:flex-row"
      style={{ boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)" }}
    >
      {/* Left image/avatar half */}
      <div className="relative w-full md:w-1/2 h-[420px] md:h-auto min-h-[320px]">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: profile.grad }}
        >
          <span className="font-headline text-8xl font-bold text-white/80 select-none">
            {profile.initials}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Right detail half */}
      <div className="p-10 flex-1 flex flex-col justify-center">
        <div className="mb-4 flex flex-wrap gap-2">
          {variant === "received" && !isAccepted && (
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Pending Interest
            </span>
          )}
          {variant === "received" && isAccepted && (
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Accepted
            </span>
          )}
          {variant === "sent" && (
            <span
              className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest"
              style={{ background: badge.bg, color: badge.color }}
            >
              {badge.label}
            </span>
          )}
          {variant === "mutual" && (
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Mutual Match
            </span>
          )}
          {profile.verified && (
            <span className="bg-surface-container-highest text-on-surface/70 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[12px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Verified
            </span>
          )}
        </div>

        <h3 className="font-headline text-3xl font-black text-on-surface mb-2">
          {profile.name}
          {profile.age > 0 ? `, ${profile.age}` : ""}
        </h3>
        <p className="text-on-surface/60 font-semibold mb-6">
          {subtitle || "\u2014"}
        </p>

        <div className="space-y-4 mb-8">
          {profile.compatibility > 0 && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <span className="text-sm text-on-surface/80">
                {profile.compatibility}% Compatibility in Lifestyle &amp; Interests
              </span>
            </div>
          )}
          {profile.city && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="text-sm text-on-surface/80">{profile.city}</span>
            </div>
          )}
          {profile.time && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="text-sm text-on-surface/80">
                {variant === "sent" ? `Sent ${profile.time}` : profile.time}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {variant === "received" && !isAccepted && (
            <>
              {onAccept && (
                <button
                  onClick={onAccept}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95"
                >
                  Accept Interest
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="px-8 py-3 text-primary font-bold text-sm hover:underline decoration-2 underline-offset-8 transition-all"
                >
                  Dismiss
                </button>
              )}
            </>
          )}

          {variant === "received" && isAccepted && (
            <>
              <Link
                href="/messages/1"
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 no-underline"
              >
                Message
              </Link>
              <Link
                href={`/profile/${profile.id}`}
                className="px-8 py-3 text-primary font-bold text-sm hover:underline decoration-2 underline-offset-8 transition-all no-underline"
              >
                View Details
              </Link>
            </>
          )}

          {variant === "sent" && (
            <>
              <Link
                href={`/profile/${profile.id}`}
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 no-underline"
              >
                View Details
              </Link>
            </>
          )}

          {variant === "mutual" && (
            <>
              <Link
                href="/messages/1"
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 no-underline"
              >
                Message
              </Link>
              <Link
                href={`/profile/${profile.id}`}
                className="px-8 py-3 text-primary font-bold text-sm hover:underline decoration-2 underline-offset-8 transition-all no-underline"
              >
                View Details
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InterestsPage() {
  const [tab, setTab] = useState<Tab>("received");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const [receivedList, setReceivedList] = useState<InterestProfile[]>([]);
  const [sentList, setSentList] = useState<InterestProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [recRes, sentRes] = await Promise.allSettled([
          matchApi.getReceivedInterests(),
          matchApi.getSentInterests(),
        ]);

        if (recRes.status === "fulfilled") {
          const data = recRes.value.data;
          const list = Array.isArray(data) ? data : data?.results ?? data?.interests ?? data?.data ?? [];
          setReceivedList(list.map(mapInterest));
        }

        if (sentRes.status === "fulfilled") {
          const data = sentRes.value.data;
          const list = Array.isArray(data) ? data : data?.results ?? data?.interests ?? data?.data ?? [];
          setSentList(list.map(mapInterest));
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load interests";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const dismiss = (id: string) => setDismissed((prev) => new Set(Array.from(prev).concat(id)));
  const accept = (id: string) => {
    setAccepted((prev) => new Set(Array.from(prev).concat(id)));
    matchApi.sendInterest(id).catch(() => {
      setAccepted((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    });
  };

  const mutualList = receivedList.filter((r) => sentList.some((s) => s.id === r.id));

  const tabs: { key: Tab; label: string; icon: string; count: number }[] = [
    { key: "received", label: "Interests Received", icon: "favorite", count: receivedList.length },
    { key: "sent",     label: "Interests Sent",     icon: "send",     count: sentList.length },
    { key: "mutual",   label: "Accepted Matches",   icon: "handshake", count: mutualList.length },
  ];

  const currentList =
    tab === "received"
      ? receivedList.filter((p) => !dismissed.has(p.id))
      : tab === "sent"
        ? sentList
        : mutualList;

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Header */}
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-black text-on-surface mb-4 leading-tight">
          Your Intentions
        </h1>
        <p className="text-on-surface/70 max-w-xl text-lg font-light leading-relaxed">
          Curating the journey toward a lifetime of shared values and heritage.
          Manage your pending connections and active interests here.
        </p>
      </header>

      {/* Tabbed Interface - Sticky */}
      <section className="mb-10 sticky top-20 z-30 bg-surface/80 backdrop-blur-sm py-4">
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex flex-col items-center gap-1 group whitespace-nowrap"
            >
              <span
                className={`text-sm font-bold transition-colors ${
                  tab === t.key
                    ? "text-primary"
                    : "text-on-surface/40 group-hover:text-on-surface"
                }`}
              >
                {t.label}
                {t.count > 0 && (
                  <span className="ml-2 text-xs opacity-70">({t.count})</span>
                )}
              </span>
              <span
                className={`h-1 w-8 rounded-full transition-all ${
                  tab === t.key ? "bg-primary" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32">
          <span
            className="material-symbols-outlined text-5xl text-primary animate-spin"
          >
            progress_activity
          </span>
          <p className="text-on-surface/60 font-body text-sm mt-4">
            Loading interests...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-32">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">
            error
          </span>
          <p className="text-on-surface/60 font-body text-sm">{error}</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Empty State */}
          {currentList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32">
              <span className="material-symbols-outlined text-6xl text-on-surface/15 mb-4">
                {tab === "received" ? "favorite" : tab === "sent" ? "send" : "handshake"}
              </span>
              <p className="text-on-surface/60 font-body text-sm text-center max-w-md">
                {tab === "received" &&
                  "No received interests yet. Complete your profile to get noticed!"}
                {tab === "sent" &&
                  "No sent interests yet. Browse profiles to find your match!"}
                {tab === "mutual" &&
                  "No mutual interests yet. Keep browsing!"}
              </p>
              {tab !== "received" && (
                <Link
                  href="/profiles"
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm rounded-full hover:opacity-90 transition-all active:scale-95 no-underline"
                >
                  Browse Profiles
                </Link>
              )}
            </div>
          )}

          {/* Mutual banner */}
          {tab === "mutual" && mutualList.length > 0 && (
            <div className="bg-primary/5 rounded-2xl p-5 mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  celebration
                </span>
                <p className="text-primary font-body text-sm font-semibold">
                  You both showed interest &mdash; start a conversation!
                </p>
              </div>
            </div>
          )}

          {/* Profile Gallery Grid */}
          {currentList.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentList.map((profile, idx) => {
                const isAccepted = accepted.has(profile.id);

                // Every 4th card (index 3, 7, 11, ...) gets asymmetric layout
                if ((idx + 1) % 4 === 0) {
                  return (
                    <AsymmetricCard
                      key={profile.id}
                      profile={profile}
                      variant={tab}
                      isAccepted={isAccepted}
                      onAccept={tab === "received" && !isAccepted ? () => accept(profile.id) : undefined}
                      onDismiss={tab === "received" && !isAccepted ? () => dismiss(profile.id) : undefined}
                    />
                  );
                }

                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    variant={tab}
                    isAccepted={isAccepted}
                    onAccept={tab === "received" && !isAccepted ? () => accept(profile.id) : undefined}
                    onDismiss={tab === "received" && !isAccepted ? () => dismiss(profile.id) : undefined}
                  />
                );
              })}
            </section>
          )}

          {/* Pagination hint */}
          {currentList.length > 0 && (
            <div className="mt-20 flex flex-col items-center">
              <p className="text-on-surface/40 text-sm font-medium mb-6">
                Showing {currentList.length} {tab === "received" ? "received" : tab === "sent" ? "sent" : "mutual"} interest{currentList.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
