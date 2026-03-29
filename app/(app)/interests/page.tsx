"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MessageCircle, X, CheckCircle, Clock, Star, Filter, Loader2 } from "lucide-react";
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
  viewed:   { label: "Viewed",   bg: "#f9dae9",                color: "#5c3f3f" },
  accepted: { label: "Accepted", bg: "rgba(180,0,42,0.1)",     color: "#b4002a" },
  declined: { label: "Declined", bg: "#f9dae9",                color: "#5c3f3f" },
};

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

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "received", label: "Received",  count: receivedList.length },
    { key: "sent",     label: "Sent",      count: sentList.length },
    { key: "mutual",   label: "Mutual",    count: mutualList.length },
  ];

  return (
    <div style={{ background: "#fff8f8", minHeight: "100vh", padding: "32px 24px", maxWidth: "720px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontFamily: "'Noto Serif', serif", fontSize: "32px", fontWeight: 900, color: "#281621", margin: 0, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Your Intentions
          </h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", color: "#5c3f3f", marginTop: "6px", marginBottom: 0, fontWeight: 300, letterSpacing: "0.02em" }}>
            Manage connection requests
          </p>
        </div>
        <button
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 18px", borderRadius: "9999px", cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#5c3f3f",
            background: "#fff0f5", border: "none",
            transition: "all 0.2s ease",
          }}
        >
          <Filter style={{ width: "15px", height: "15px" }} />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "28px", background: "#fff0f5", borderRadius: "9999px", padding: "4px" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", cursor: "pointer",
              background: tab === t.key ? "#b4002a" : "transparent",
              border: "none", borderRadius: "9999px",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 700,
              color: tab === t.key ? "#ffffff" : "#5c3f3f",
              transition: "all 0.25s ease",
              flex: 1, justifyContent: "center",
            }}
          >
            {t.label}
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700,
                padding: "2px 8px", borderRadius: "9999px",
                background: tab === t.key ? "rgba(255,255,255,0.25)" : "#f9dae9",
                color: tab === t.key ? "#ffffff" : "#5c3f3f",
              }}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "64px 0" }}>
          <Loader2 style={{ width: "32px", height: "32px", color: "#b4002a", margin: "0 auto 12px", animation: "spin 1s linear infinite" }} />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", color: "#5c3f3f" }}>Loading interests...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div style={{ textAlign: "center", padding: "64px 0" }}>
          <X style={{ width: "40px", height: "40px", color: "#b4002a", margin: "0 auto 12px" }} />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", color: "#5c3f3f" }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* -- Received Tab -- */}
          {tab === "received" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {receivedList.filter((p) => !dismissed.has(p.id)).map((profile) => {
                const isAccepted = accepted.has(profile.id);
                return (
                  <div
                    key={profile.id}
                    style={{
                      background: "#ffffff", borderRadius: "24px", padding: "20px",
                      display: "flex", alignItems: "center", gap: "16px",
                      boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: profile.grad, flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "17px", fontWeight: 700, color: "#fff" }}>
                        {profile.initials}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "16px", fontWeight: 700, color: "#281621" }}>
                          {profile.name}
                        </span>
                        {profile.verified && (
                          <CheckCircle style={{ width: "14px", height: "14px", color: "#b4002a", fill: "rgba(180,0,42,0.15)", flexShrink: 0 }} />
                        )}
                        {profile.compatibility > 0 && (
                          <span
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700,
                              padding: "3px 10px", borderRadius: "9999px",
                              background: "rgba(200,144,32,0.12)", color: "#9A6B00",
                              letterSpacing: "0.05em", textTransform: "uppercase",
                            }}
                          >
                            {profile.compatibility}% match
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "#5c3f3f", margin: "4px 0 0", fontWeight: 400 }}>
                        {[profile.age > 0 ? String(profile.age) : "", profile.city, profile.profession ? `${profile.profession}${profile.company ? ` at ${profile.company}` : ""}` : ""].filter(Boolean).join(" \u00B7 ") || "\u2014"}
                      </p>
                      {profile.time && (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px" }}>
                          <Clock style={{ width: "11px", height: "11px", color: "rgba(40,22,33,0.35)" }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", color: "rgba(40,22,33,0.35)", fontWeight: 500 }}>
                            {profile.time}
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                      {isAccepted ? (
                        <Link
                          href="/messages/1"
                          style={{
                            display: "flex", alignItems: "center", gap: "6px",
                            padding: "10px 20px", borderRadius: "9999px",
                            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 700,
                            background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                            color: "#fff", textDecoration: "none",
                            boxShadow: "0 4px 16px rgba(180,0,42,0.25)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          <MessageCircle style={{ width: "13px", height: "13px" }} />
                          Message
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => dismiss(profile.id)}
                            style={{
                              width: "36px", height: "36px", borderRadius: "50%",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              background: "#f9dae9", border: "none",
                              cursor: "pointer", transition: "all 0.2s ease",
                              color: "#5c3f3f",
                            }}
                          >
                            <X style={{ width: "14px", height: "14px" }} />
                          </button>
                          <button
                            onClick={() => accept(profile.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: "6px",
                              padding: "10px 20px", borderRadius: "9999px", cursor: "pointer",
                              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 700,
                              background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                              color: "#fff", border: "none",
                              boxShadow: "0 4px 16px rgba(180,0,42,0.25)",
                              transition: "all 0.2s ease",
                              letterSpacing: "0.02em",
                            }}
                          >
                            <Heart style={{ width: "13px", height: "13px" }} />
                            Accept
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {receivedList.filter((p) => !dismissed.has(p.id)).length === 0 && (
                <div style={{ textAlign: "center", padding: "64px 0" }}>
                  <Heart style={{ width: "48px", height: "48px", color: "#e5bdbc", margin: "0 auto 16px" }} />
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", color: "#5c3f3f", fontWeight: 400 }}>
                    No received interests yet. Complete your profile to get noticed!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* -- Sent Tab -- */}
          {tab === "sent" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {sentList.length === 0 && (
                <div style={{ textAlign: "center", padding: "64px 0" }}>
                  <Heart style={{ width: "48px", height: "48px", color: "#e5bdbc", margin: "0 auto 16px" }} />
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", color: "#5c3f3f", fontWeight: 400 }}>
                    No sent interests yet. Browse profiles to find your match!
                  </p>
                </div>
              )}
              {sentList.map((profile) => {
                const badge = statusBadge[profile.status || "pending"] || statusBadge.pending;
                return (
                  <div
                    key={profile.id}
                    style={{
                      background: "#ffffff", borderRadius: "24px", padding: "20px",
                      display: "flex", alignItems: "center", gap: "16px",
                      boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.04)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: profile.grad, flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "17px", fontWeight: 700, color: "#fff" }}>
                        {profile.initials}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "16px", fontWeight: 700, color: "#281621" }}>
                          {profile.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700,
                            padding: "3px 10px", borderRadius: "9999px",
                            background: badge.bg, color: badge.color,
                            letterSpacing: "0.05em", textTransform: "uppercase",
                          }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "#5c3f3f", margin: "4px 0 0", fontWeight: 400 }}>
                        {[profile.age > 0 ? String(profile.age) : "", profile.city, profile.profession ? `${profile.profession}${profile.company ? ` at ${profile.company}` : ""}` : ""].filter(Boolean).join(" \u00B7 ") || "\u2014"}
                      </p>
                      {profile.time && (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px" }}>
                          <Clock style={{ width: "11px", height: "11px", color: "rgba(40,22,33,0.35)" }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", color: "rgba(40,22,33,0.35)", fontWeight: 500 }}>
                            Sent {profile.time}
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                      {profile.compatibility > 0 && (
                        <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "14px", fontWeight: 700, color: "#C89020" }}>
                          {profile.compatibility}%
                        </span>
                      )}
                      <Link
                        href={`/profile/${profile.id}`}
                        style={{
                          padding: "8px 18px", borderRadius: "9999px",
                          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 700,
                          color: "#5c3f3f", background: "#f9dae9",
                          border: "none",
                          textDecoration: "none", transition: "all 0.2s ease",
                          letterSpacing: "0.02em",
                        }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* -- Mutual Tab -- */}
          {tab === "mutual" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {mutualList.length > 0 && (
                <div
                  style={{
                    background: "#ffe8f2", borderRadius: "24px", padding: "16px 20px", marginBottom: "4px",
                  }}
                >
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "#b4002a", fontWeight: 600, margin: 0 }}>
                    You both showed interest -- start a conversation!
                  </p>
                </div>
              )}

              {mutualList.length === 0 && (
                <div style={{ textAlign: "center", padding: "64px 0" }}>
                  <Heart style={{ width: "48px", height: "48px", color: "#e5bdbc", margin: "0 auto 16px" }} />
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", color: "#5c3f3f", fontWeight: 400 }}>
                    No mutual interests yet. Keep browsing!
                  </p>
                </div>
              )}

              {mutualList.map((profile) => (
                <div
                  key={profile.id}
                  style={{
                    background: "#ffffff", borderRadius: "24px", padding: "20px",
                    display: "flex", alignItems: "center", gap: "16px",
                    boxShadow: "0 32px 64px -12px rgba(40, 22, 33, 0.06)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: profile.grad,
                      }}
                    >
                      <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "17px", fontWeight: 700, color: "#fff" }}>
                        {profile.initials}
                      </span>
                    </div>
                    <div
                      style={{
                        position: "absolute", bottom: "-4px", right: "-4px",
                        width: "22px", height: "22px", borderRadius: "50%",
                        background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(40,22,33,0.12)",
                      }}
                    >
                      <Heart style={{ width: "11px", height: "11px", fill: "#b4002a", color: "#b4002a" }} />
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "16px", fontWeight: 700, color: "#281621" }}>
                      {profile.name}
                    </span>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "#5c3f3f", margin: "4px 0 0", fontWeight: 400 }}>
                      {[profile.age > 0 ? String(profile.age) : "", profile.city, profile.profession].filter(Boolean).join(" \u00B7 ") || "\u2014"}
                    </p>
                    {profile.compatibility > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px" }}>
                        <Star style={{ width: "12px", height: "12px", fill: "#C89020", color: "#C89020" }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#C89020" }}>
                          {profile.compatibility}% compatibility
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/messages/1"
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "12px 22px", borderRadius: "9999px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 700,
                      background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                      color: "#fff", textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(180,0,42,0.25)",
                      flexShrink: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    <MessageCircle style={{ width: "14px", height: "14px" }} />
                    Message
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
