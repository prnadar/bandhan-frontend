"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, X, CheckCircle, Clock, Star, Filter } from "lucide-react";

type Tab = "received" | "sent" | "mutual";

const received = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)", age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",     compatibility: 92, time: "2h ago",      verified: true  },
  { id: "2", name: "Anjali Patel",    initials: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)", age: 26, city: "Ahmedabad",  profession: "Doctor",           company: "Apollo",     compatibility: 87, time: "5h ago",      verified: true  },
  { id: "3", name: "Kavya Nair",      initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", age: 28, city: "Bangalore",  profession: "Data Scientist",   company: "Flipkart",   compatibility: 84, time: "Yesterday",   verified: true  },
  { id: "4", name: "Shruti Agarwal",  initials: "SA", grad: "linear-gradient(135deg,#C4520F99,#9A6B0099)", age: 25, city: "Delhi",  profession: "CA",               company: "Deloitte",   compatibility: 79, time: "2 days ago",  verified: false },
  { id: "5", name: "Meera Iyer",      initials: "MI", grad: "linear-gradient(135deg,#7C3AED,#A78BFA)", age: 29, city: "Chennai",   profession: "Architect",        company: "Freelance",  compatibility: 76, time: "3 days ago",  verified: true  },
  { id: "6", name: "Ritika Singh",    initials: "RS", grad: "linear-gradient(135deg,#0F766E,#0D9488)", age: 26, city: "Hyderabad", profession: "MBA",              company: "McKinsey",   compatibility: 81, time: "4 days ago",  verified: true  },
];

const sent = [
  { id: "7", name: "Deepika Mehta",   initials: "DM", grad: "linear-gradient(135deg,#BE185D,#F472B6)", age: 27, city: "Pune",      profession: "Dentist",          company: "Private",    compatibility: 88, time: "1 day ago",   status: "pending"  },
  { id: "8", name: "Pooja Krishnan",  initials: "PK", grad: "linear-gradient(135deg,#1D4ED8,#60A5FA)", age: 28, city: "Kochi",     profession: "IAS Officer",      company: "Govt",       compatibility: 83, time: "3 days ago",  status: "viewed"   },
  { id: "9", name: "Sonal Joshi",     initials: "SJ", grad: "linear-gradient(135deg,#92400E,#D97706)", age: 26, city: "Jaipur",    profession: "Fashion Designer", company: "NIFT",       compatibility: 71, time: "5 days ago",  status: "accepted" },
];

const mutual = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)", age: 27, city: "Mumbai",    profession: "Software Engineer", company: "Google",    compatibility: 92 },
  { id: "9", name: "Sonal Joshi",     initials: "SJ", grad: "linear-gradient(135deg,#92400E,#D97706)", age: 26, city: "Jaipur",    profession: "Fashion Designer", company: "NIFT",      compatibility: 71 },
];

const statusBadge: Record<string, { label: string; color: string }> = {
  pending:  { label: "Pending",  color: "rgba(154,107,0,0.12)"  },
  viewed:   { label: "Viewed",   color: "rgba(92,122,82,0.12)"  },
  accepted: { label: "Accepted", color: "rgba(92,122,82,0.18)"  },
};

export default function InterestsPage() {
  const [tab, setTab] = useState<Tab>("received");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const dismiss = (id: string) => setDismissed((prev) => new Set(Array.from(prev).concat(id)));
  const accept  = (id: string) => setAccepted((prev)  => new Set(Array.from(prev).concat(id)));

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "received", label: "Received", count: received.length },
    { key: "sent",     label: "Sent",     count: sent.length     },
    { key: "mutual",   label: "Mutual ❤️", count: mutual.length  },
  ];

  return (
    <div className="px-8 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-light text-deep">Interests</h1>
          <p className="font-body text-sm text-deep/45 mt-1">Manage connection requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm text-deep/55 hover:text-deep transition-colors" style={{ border: "1px solid rgba(28,15,6,0.14)", minHeight: "auto" }}>
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-2xl" style={{ background: "rgba(28,15,6,0.05)" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm font-medium transition-all"
            style={{
              background: tab === t.key ? "rgba(250,246,238,1)" : "transparent",
              color: tab === t.key ? "#1C0F06" : "rgba(28,15,6,0.45)",
              boxShadow: tab === t.key ? "0 1px 8px rgba(28,15,6,0.08)" : "none",
              minHeight: "auto",
            }}
          >
            {t.label}
            <span
              className="font-body text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: tab === t.key ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(28,15,6,0.1)",
                color: tab === t.key ? "#fff" : "rgba(28,15,6,0.4)",
              }}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Received */}
      {tab === "received" && (
        <div className="space-y-3">
          {received.filter((p) => !dismissed.has(p.id)).map((profile) => {
            const isAccepted = accepted.has(profile.id);
            return (
              <div
                key={profile.id}
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-semibold text-white flex-shrink-0"
                  style={{ background: profile.grad }}
                >
                  {profile.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-base font-semibold text-deep">{profile.name}</span>
                    {profile.verified && <CheckCircle className="w-3.5 h-3.5 text-sage flex-shrink-0" />}
                    <span className="font-body text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(92,122,82,0.12)", color: "#5C7A52" }}>
                      {profile.compatibility}% match
                    </span>
                  </div>
                  <p className="font-body text-xs text-deep/50 mt-0.5">{profile.age} · {profile.city} · {profile.profession} at {profile.company}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-deep/30" />
                    <span className="font-body text-[10px] text-deep/30">{profile.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isAccepted ? (
                    <Link
                      href={`/messages/1`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg,#5C7A52,#8DB870)", minHeight: "auto" }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Message
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => dismiss(profile.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-deep/30 hover:text-red-400 hover:bg-red-50 transition-all"
                        style={{ border: "1px solid rgba(28,15,6,0.1)", minHeight: "auto", minWidth: "auto" }}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => accept(profile.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs font-semibold text-white"
                        style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", minHeight: "auto" }}
                      >
                        <Heart className="w-3.5 h-3.5" /> Accept
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {received.filter((p) => !dismissed.has(p.id)).length === 0 && (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-deep/15 mx-auto mb-3" />
              <p className="font-body text-sm text-deep/40">No pending interests</p>
            </div>
          )}
        </div>
      )}

      {/* Sent */}
      {tab === "sent" && (
        <div className="space-y-3">
          {sent.map((profile) => {
            const badge = statusBadge[profile.status];
            return (
              <div
                key={profile.id}
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-semibold text-white flex-shrink-0"
                  style={{ background: profile.grad }}
                >
                  {profile.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-semibold text-deep">{profile.name}</span>
                    <span
                      className="font-body text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.color, color: profile.status === "accepted" ? "#5C7A52" : "rgba(28,15,6,0.55)" }}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="font-body text-xs text-deep/50 mt-0.5">{profile.age} · {profile.city} · {profile.profession} at {profile.company}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-deep/30" />
                    <span className="font-body text-[10px] text-deep/30">Sent {profile.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-body text-xs font-bold text-sage">{profile.compatibility}%</span>
                  <Link
                    href={`/profile/${profile.id}`}
                    className="px-3 py-1.5 rounded-full font-body text-xs font-medium text-deep/60 hover:text-deep transition-colors"
                    style={{ border: "1px solid rgba(28,15,6,0.12)", minHeight: "auto" }}
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mutual */}
      {tab === "mutual" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 mb-2" style={{ background: "rgba(92,122,82,0.07)", border: "1px solid rgba(92,122,82,0.18)" }}>
            <p className="font-body text-sm text-sage font-medium">You both showed interest — start a conversation!</p>
          </div>
          {mutual.map((profile) => (
            <div
              key={profile.id}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(92,122,82,0.2)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-semibold text-white flex-shrink-0 relative"
                style={{ background: profile.grad }}
              >
                {profile.initials}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <Heart className="w-3 h-3 fill-marigold text-marigold" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-display text-base font-semibold text-deep">{profile.name}</span>
                <p className="font-body text-xs text-deep/50 mt-0.5">{profile.age} · {profile.city} · {profile.profession}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span className="font-body text-xs text-gold font-semibold">{profile.compatibility}% compatibility</span>
                </div>
              </div>

              <Link
                href={`/messages/1`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-body text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", boxShadow: "0 3px 12px rgba(196,82,15,0.35)", minHeight: "auto" }}
              >
                <MessageCircle className="w-3.5 h-3.5" /> Message
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
