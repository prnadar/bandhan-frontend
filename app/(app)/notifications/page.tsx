"use client";

import { useState } from "react";
import { Bell, Heart, MessageCircle, Shield, Star, CheckCheck, Settings, Trash2, Check } from "lucide-react";
import Link from "next/link";

type NotifType = "interest" | "message" | "match" | "trust" | "system";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
  initials?: string;
  grad?: string;
}

const INITIAL: Notif[] = [
  { id: "1",  type: "interest", title: "New Interest",       body: "Priya Sharma sent you an interest. 92% compatibility match!", time: "2 min ago",  read: false, link: "/interests",    initials: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)" },
  { id: "2",  type: "message",  title: "New Message",        body: "Anjali Patel: \"Hello! I saw your profile and thought we have a lot in common...\"", time: "15 min ago", read: false, link: "/messages/2", initials: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)" },
  { id: "3",  type: "match",    title: "New Match",          body: "Kavya Nair from Bangalore is a 84% match! She's online now.", time: "1h ago",     read: false, link: "/profile/3",    initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)" },
  { id: "4",  type: "trust",    title: "Trust Score Updated",body: "Your Aadhaar verification is complete. Trust Score: 84 (+40 pts)", time: "3h ago",     read: true,  link: "/profile/me"   },
  { id: "5",  type: "interest", title: "Interest Accepted",  body: "Sonal Joshi accepted your interest! Start a conversation now.", time: "5h ago",     read: true,  link: "/messages/1",   initials: "SJ", grad: "linear-gradient(135deg,#92400E,#D97706)" },
  { id: "6",  type: "system",   title: "Profile Boost Active", body: "Your profile is being boosted for the next 24 hours. You're in the top 3% of matches!", time: "Yesterday", read: true },
  { id: "7",  type: "message",  title: "New Message",        body: "Kavya Nair: \"I saw you're also into trekking — have you done Kedarkantha?\"", time: "Yesterday", read: true, link: "/messages/3", initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)" },
  { id: "8",  type: "match",    title: "5 New Matches",      body: "We found 5 new matches based on your updated preferences. Check them out!", time: "2 days ago", read: true, link: "/matches" },
  { id: "9",  type: "trust",    title: "Complete your profile", body: "You're at 68% profile completion. Add your hobbies to unlock 8 more trust points.", time: "3 days ago", read: true, link: "/profile/me" },
  { id: "10", type: "system",   title: "Gold Plan Expiring", body: "Your Gold plan expires in 7 days. Renew now to keep unlimited messaging.", time: "4 days ago", read: true, link: "/subscription" },
];

const TYPE_META: Record<NotifType, { icon: React.ReactNode; color: string }> = {
  interest: { icon: <Heart className="w-4 h-4" />,          color: "#C4520F" },
  message:  { icon: <MessageCircle className="w-4 h-4" />,  color: "#9A6B00" },
  match:    { icon: <Star className="w-4 h-4" />,            color: "#5C7A52" },
  trust:    { icon: <Shield className="w-4 h-4" />,          color: "#0F766E" },
  system:   { icon: <Bell className="w-4 h-4" />,            color: "rgba(28,15,6,0.4)" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL);
  const [filter, setFilter] = useState<NotifType | "all">("all");

  const markRead = (id: string) =>
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const remove = (id: string) =>
    setNotifs((prev) => prev.filter((n) => n.id !== id));

  const filtered = filter === "all" ? notifs : notifs.filter((n) => n.type === filter);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const filters: { key: NotifType | "all"; label: string }[] = [
    { key: "all",      label: "All" },
    { key: "interest", label: "Interests" },
    { key: "message",  label: "Messages" },
    { key: "match",    label: "Matches" },
    { key: "trust",    label: "Trust" },
    { key: "system",   label: "System" },
  ];

  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-light text-deep">Notifications</h1>
          {unreadCount > 0 && (
            <p className="font-body text-sm text-deep/45 mt-1">{unreadCount} unread</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-medium text-deep/55 hover:text-deep transition-colors"
              style={{ border: "1px solid rgba(28,15,6,0.12)", minHeight: "auto" }}
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
          <Link
            href="/settings"
            className="w-8 h-8 rounded-full flex items-center justify-center text-deep/35 hover:text-deep hover:bg-marigold/8 transition-colors"
            style={{ minHeight: "auto", minWidth: "auto" }}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {filters.map((f) => {
          const count = f.key === "all" ? notifs.filter((n) => !n.read).length : notifs.filter((n) => n.type === f.key && !n.read).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
              style={{
                background: filter === f.key ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(255,255,255,0.7)",
                color: filter === f.key ? "#fff" : "rgba(28,15,6,0.55)",
                border: filter === f.key ? "none" : "1px solid rgba(28,15,6,0.1)",
                minHeight: "auto",
              }}
            >
              {f.label}
              {count > 0 && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px]"
                  style={{
                    background: filter === f.key ? "rgba(255,255,255,0.25)" : "rgba(196,82,15,0.12)",
                    color: filter === f.key ? "#fff" : "#C4520F",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-deep/15 mx-auto mb-3" />
            <p className="font-body text-sm text-deep/40">No notifications</p>
          </div>
        )}

        {filtered.map((notif) => {
          const meta = TYPE_META[notif.type];
          return (
            <div
              key={notif.id}
              className="rounded-2xl p-4 flex items-start gap-3 transition-all relative"
              style={{
                background: notif.read ? "rgba(250,246,238,0.7)" : "rgba(250,246,238,0.98)",
                border: notif.read ? "1px solid rgba(154,107,0,0.08)" : "1px solid rgba(196,82,15,0.2)",
              }}
            >
              {/* Avatar or icon */}
              {notif.initials ? (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-semibold text-white flex-shrink-0"
                  style={{ background: notif.grad }}
                >
                  {notif.initials}
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${meta.color}18`, color: meta.color }}
                >
                  {meta.icon}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-body text-sm font-semibold text-deep">{notif.title}</p>
                  <span className="font-body text-[10px] text-deep/30 flex-shrink-0">{notif.time}</span>
                </div>
                <p className="font-body text-xs text-deep/55 mt-0.5 leading-relaxed">{notif.body}</p>

                {notif.link && (
                  <Link
                    href={notif.link}
                    onClick={() => markRead(notif.id)}
                    className="inline-block mt-2 font-body text-xs font-semibold text-marigold hover:underline"
                    style={{ minHeight: "auto" }}
                  >
                    {notif.type === "interest" ? "View Interest →" :
                     notif.type === "message"  ? "Open Chat →" :
                     notif.type === "match"    ? "View Profile →" :
                     "View →"}
                  </Link>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => markRead(notif.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-deep/25 hover:text-sage hover:bg-sage/10 transition-all"
                    title="Mark read"
                    style={{ minHeight: "auto", minWidth: "auto" }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => remove(notif.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-deep/20 hover:text-red-400 hover:bg-red-50 transition-all"
                  title="Dismiss"
                  style={{ minHeight: "auto", minWidth: "auto" }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Unread dot */}
              {!notif.read && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: "#C4520F" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
