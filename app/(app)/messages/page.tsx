"use client";

import Link from "next/link";
import { Shield, Search, CheckCheck, Clock } from "lucide-react";

const threads = [
  {
    id: "1", name: "Priya Sharma", photo: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)",
    lastMsg: "Thank you for your interest! I'd love to know more about your work at…",
    time: "10:42 AM", unread: 2, verified: true, compatibility: 92,
  },
  {
    id: "2", name: "Anjali Patel", photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)",
    lastMsg: "My family is from Ahmedabad, what about yours?",
    time: "Yesterday", unread: 0, verified: true, compatibility: 87,
  },
  {
    id: "3", name: "Kavya Nair", photo: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)",
    lastMsg: "I saw you're also into trekking — have you done Kedarkantha?",
    time: "Mon", unread: 1, verified: true, compatibility: 84,
  },
  {
    id: "4", name: "Shruti Agarwal", photo: "SA", grad: "linear-gradient(135deg,#C4520F99,#9A6B0099)",
    lastMsg: "Haha yes, Delhi winters are something else 😄",
    time: "Sun", unread: 0, verified: true, compatibility: 79,
  },
];

export default function MessagesPage() {
  return (
    <div className="px-8 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-light text-deep mb-1">Messages</h1>
        <p className="font-body text-sm text-deep/45">Signal Protocol E2E encrypted · Private & secure</p>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-4 mb-5 rounded-full"
        style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.18)", height: "44px" }}
      >
        <Search className="w-4 h-4 text-deep/35" />
        <input
          type="text"
          placeholder="Search conversations…"
          className="flex-1 bg-transparent font-body text-sm text-deep placeholder-deep/35 outline-none"
        />
      </div>

      {/* Thread list */}
      <div className="space-y-2">
        {threads.map((t) => (
          <Link
            key={t.id}
            href={`/messages/${t.id}`}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer hover:shadow-sm block"
            style={{
              minHeight: "auto",
              background: t.unread > 0 ? "rgba(250,246,238,0.95)" : "rgba(250,246,238,0.7)",
              border: t.unread > 0 ? "1px solid rgba(196,82,15,0.18)" : "1px solid rgba(154,107,0,0.10)",
            } as React.CSSProperties}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display text-base font-semibold text-white"
                style={{ background: t.grad }}
              >
                {t.photo}
              </div>
              {t.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-ivory rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-sage" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`font-body text-sm ${t.unread > 0 ? "font-semibold text-deep" : "font-medium text-deep/75"}`}>
                  {t.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-xs text-deep/40 flex items-center gap-1">
                    {t.unread === 0 && <CheckCheck className="w-3 h-3 text-sage" />}
                    {t.time}
                  </span>
                </div>
              </div>
              <p className={`font-body text-xs truncate ${t.unread > 0 ? "text-deep/70" : "text-deep/40"}`}>
                {t.lastMsg}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-body text-[10px] text-gold font-medium">{t.compatibility}% match</span>
              </div>
            </div>

            {/* Unread badge */}
            {t.unread > 0 && (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)" }}
              >
                {t.unread}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
