"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, X, CheckCircle, Clock, Star, Filter } from "lucide-react";

type Tab = "received" | "sent" | "mutual";

const received = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)", age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",     compatibility: 92, time: "2h ago",      verified: true  },
  { id: "2", name: "Anjali Patel",    initials: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)", age: 26, city: "Ahmedabad",  profession: "Doctor",           company: "Apollo",     compatibility: 87, time: "5h ago",      verified: true  },
  { id: "3", name: "Kavya Nair",      initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", age: 28, city: "Bangalore",  profession: "Data Scientist",   company: "Flipkart",   compatibility: 84, time: "Yesterday",   verified: true  },
  { id: "4", name: "Shruti Agarwal",  initials: "SA", grad: "linear-gradient(135deg,#E8426A99,#9A6B0099)", age: 25, city: "Delhi",  profession: "CA",               company: "Deloitte",   compatibility: 79, time: "2 days ago",  verified: false },
  { id: "5", name: "Meera Iyer",      initials: "MI", grad: "linear-gradient(135deg,#7C3AED,#A78BFA)", age: 29, city: "Chennai",   profession: "Architect",        company: "Freelance",  compatibility: 76, time: "3 days ago",  verified: true  },
  { id: "6", name: "Ritika Singh",    initials: "RS", grad: "linear-gradient(135deg,#0F766E,#0D9488)", age: 26, city: "Hyderabad", profession: "MBA",              company: "McKinsey",   compatibility: 81, time: "4 days ago",  verified: true  },
];

const sent = [
  { id: "7", name: "Deepika Mehta",   initials: "DM", grad: "linear-gradient(135deg,#BE185D,#F472B6)", age: 27, city: "Pune",      profession: "Dentist",          company: "Private",    compatibility: 88, time: "1 day ago",   status: "pending"  },
  { id: "8", name: "Pooja Krishnan",  initials: "PK", grad: "linear-gradient(135deg,#1D4ED8,#60A5FA)", age: 28, city: "Kochi",     profession: "IAS Officer",      company: "Govt",       compatibility: 83, time: "3 days ago",  status: "viewed"   },
  { id: "9", name: "Sonal Joshi",     initials: "SJ", grad: "linear-gradient(135deg,#92400E,#D97706)", age: 26, city: "Jaipur",    profession: "Fashion Designer", company: "NIFT",       compatibility: 71, time: "5 days ago",  status: "accepted" },
];

const mutual = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)", age: 27, city: "Mumbai",    profession: "Software Engineer", company: "Google",    compatibility: 92 },
  { id: "9", name: "Sonal Joshi",     initials: "SJ", grad: "linear-gradient(135deg,#92400E,#D97706)", age: 26, city: "Jaipur",    profession: "Fashion Designer", company: "NIFT",      compatibility: 71 },
];

const statusBadge: Record<string, { label: string; bg: string; color: string }> = {
  pending:  { label: "Pending",  bg: "rgba(200,144,32,0.12)",  color: "#9A6B00"  },
  viewed:   { label: "Viewed",   bg: "rgba(26,10,20,0.08)",    color: "rgba(26,10,20,0.55)"  },
  accepted: { label: "Accepted", bg: "rgba(220,30,60,0.1)",    color: "#dc1e3c"  },
};

export default function InterestsPage() {
  const [tab, setTab] = useState<Tab>("received");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const dismiss = (id: string) => setDismissed((prev) => new Set(Array.from(prev).concat(id)));
  const accept  = (id: string) => setAccepted((prev)  => new Set(Array.from(prev).concat(id)));

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "received", label: "Received",  count: received.length },
    { key: "sent",     label: "Sent",      count: sent.length     },
    { key: "mutual",   label: "Mutual ❤️", count: mutual.length   },
  ];

  return (
    <div style={{ background: "#fdfbf9", minHeight: "100vh", padding: "32px", maxWidth: "720px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "30px", fontWeight: 300, color: "#1a0a14", margin: 0, lineHeight: 1.2 }}>
            Interests
          </h1>
          <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "13px", color: "#888", marginTop: "4px", marginBottom: 0 }}>
            Manage connection requests
          </p>
        </div>
        <button
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
            fontFamily: "var(--font-poppins, sans-serif)", fontSize: "14px", color: "rgba(26,10,20,0.55)",
            background: "#fff", border: "1px solid rgba(220,30,60,0.12)",
            transition: "all 0.2s ease",
          }}
        >
          <Filter style={{ width: "16px", height: "16px" }} />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px", borderBottom: "1px solid rgba(220,30,60,0.12)" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 16px", cursor: "pointer",
              background: "transparent", border: "none",
              fontFamily: "var(--font-poppins, sans-serif)", fontSize: "14px", fontWeight: 500,
              color: tab === t.key ? "#dc1e3c" : "rgba(26,10,20,0.45)",
              borderBottom: tab === t.key ? "2px solid #dc1e3c" : "2px solid transparent",
              marginBottom: "-1px",
              transition: "all 0.2s ease",
            }}
          >
            {t.label}
            <span
              style={{
                fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", fontWeight: 700,
                padding: "2px 6px", borderRadius: "20px",
                background: tab === t.key ? "linear-gradient(135deg,#dc1e3c,#a0153c)" : "rgba(26,10,20,0.08)",
                color: tab === t.key ? "#fff" : "rgba(26,10,20,0.4)",
              }}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Received Tab ── */}
      {tab === "received" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {received.filter((p) => !dismissed.has(p.id)).map((profile) => {
            const isAccepted = accepted.has(profile.id);
            return (
              <div
                key={profile.id}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(220,30,60,0.08)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  boxShadow: "0 2px 12px rgba(220,30,60,0.05)",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: profile.grad, flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "17px", fontWeight: 600, color: "#fff" }}>
                    {profile.initials}
                  </span>
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "15px", fontWeight: 600, color: "#1a0a14" }}>
                      {profile.name}
                    </span>
                    {profile.verified && (
                      <CheckCircle style={{ width: "14px", height: "14px", color: "#dc1e3c", fill: "rgba(220,30,60,0.15)", flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", fontWeight: 700,
                        padding: "2px 8px", borderRadius: "20px",
                        background: "rgba(200,144,32,0.12)", color: "#9A6B00",
                      }}
                    >
                      {profile.compatibility}% match
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", color: "#888", margin: "3px 0 0" }}>
                    {profile.age} · {profile.city} · {profile.profession} at {profile.company}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    <Clock style={{ width: "11px", height: "11px", color: "rgba(26,10,20,0.3)" }} />
                    <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "10px", color: "rgba(26,10,20,0.3)" }}>
                      {profile.time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  {isAccepted ? (
                    <Link
                      href="/messages/1"
                      style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "8px 16px", borderRadius: "10px",
                        fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", fontWeight: 600,
                        background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
                        color: "#fff", textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(220,30,60,0.25)",
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
                          width: "32px", height: "32px", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: "#fff", border: "1px solid rgba(26,10,20,0.1)",
                          cursor: "pointer", transition: "all 0.2s ease",
                          color: "rgba(26,10,20,0.3)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "#fff0f0";
                          (e.currentTarget as HTMLButtonElement).style.color = "#dc1e3c";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(220,30,60,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(26,10,20,0.3)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(26,10,20,0.1)";
                        }}
                      >
                        <X style={{ width: "13px", height: "13px" }} />
                      </button>
                      <button
                        onClick={() => accept(profile.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
                          fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", fontWeight: 600,
                          background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
                          color: "#fff", border: "none",
                          boxShadow: "0 4px 12px rgba(220,30,60,0.25)",
                          transition: "all 0.2s ease",
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

          {received.filter((p) => !dismissed.has(p.id)).length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <Heart style={{ width: "48px", height: "48px", color: "rgba(26,10,20,0.15)", margin: "0 auto 12px" }} />
              <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "14px", color: "#888" }}>
                No pending interests
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Sent Tab ── */}
      {tab === "sent" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sent.map((profile) => {
            const badge = statusBadge[profile.status];
            return (
              <div
                key={profile.id}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(220,30,60,0.08)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  boxShadow: "0 2px 12px rgba(220,30,60,0.05)",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: profile.grad, flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "17px", fontWeight: 600, color: "#fff" }}>
                    {profile.initials}
                  </span>
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "15px", fontWeight: 600, color: "#1a0a14" }}>
                      {profile.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", fontWeight: 600,
                        padding: "2px 8px", borderRadius: "20px",
                        background: badge.bg, color: badge.color,
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", color: "#888", margin: "3px 0 0" }}>
                    {profile.age} · {profile.city} · {profile.profession} at {profile.company}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    <Clock style={{ width: "11px", height: "11px", color: "rgba(26,10,20,0.3)" }} />
                    <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "10px", color: "rgba(26,10,20,0.3)" }}>
                      Sent {profile.time}
                    </span>
                  </div>
                </div>

                {/* Compatibility + View */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "13px", fontWeight: 700, color: "#C89020" }}>
                    {profile.compatibility}%
                  </span>
                  <Link
                    href={`/profile/${profile.id}`}
                    style={{
                      padding: "6px 14px", borderRadius: "10px",
                      fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", fontWeight: 500,
                      color: "rgba(26,10,20,0.6)", background: "#fff",
                      border: "1px solid rgba(220,30,60,0.12)",
                      textDecoration: "none", transition: "all 0.2s ease",
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

      {/* ── Mutual Tab ── */}
      {tab === "mutual" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Banner */}
          <div
            style={{
              background: "rgba(220,30,60,0.04)",
              border: "1px solid rgba(220,30,60,0.12)",
              borderRadius: "16px",
              padding: "14px 16px",
              marginBottom: "4px",
            }}
          >
            <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "13px", color: "#dc1e3c", fontWeight: 500, margin: 0 }}>
              ✨ You both showed interest — start a conversation!
            </p>
          </div>

          {mutual.map((profile) => (
            <div
              key={profile.id}
              style={{
                background: "#fff",
                border: "1px solid rgba(220,30,60,0.12)",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 4px 16px rgba(220,30,60,0.08)",
              }}
            >
              {/* Avatar with heart badge */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: profile.grad,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "17px", fontWeight: 600, color: "#fff" }}>
                    {profile.initials}
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute", bottom: "-4px", right: "-4px",
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  }}
                >
                  <Heart style={{ width: "11px", height: "11px", fill: "#dc1e3c", color: "#dc1e3c" }} />
                </div>
              </div>

              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "15px", fontWeight: 600, color: "#1a0a14" }}>
                  {profile.name}
                </span>
                <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", color: "#888", margin: "3px 0 0" }}>
                  {profile.age} · {profile.city} · {profile.profession}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "5px" }}>
                  <Star style={{ width: "12px", height: "12px", fill: "#C89020", color: "#C89020" }} />
                  <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "12px", fontWeight: 600, color: "#C89020" }}>
                    {profile.compatibility}% compatibility
                  </span>
                </div>
              </div>

              {/* Message CTA */}
              <Link
                href="/messages/1"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 18px", borderRadius: "10px",
                  fontFamily: "var(--font-poppins, sans-serif)", fontSize: "13px", fontWeight: 600,
                  background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
                  color: "#fff", textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
                  flexShrink: 0,
                }}
              >
                <MessageCircle style={{ width: "14px", height: "14px" }} />
                Message
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
