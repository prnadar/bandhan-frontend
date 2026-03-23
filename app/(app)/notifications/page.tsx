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
  { id: "1",  type: "interest", title: "New Interest",         body: "Priya Sharma sent you an interest. 92% compatibility match!",                                        time: "2 min ago",   read: false, link: "/interests",    initials: "PS", grad: "linear-gradient(135deg,#dc1e3c,#a0153c)" },
  { id: "2",  type: "message",  title: "New Message",          body: "Anjali Patel: \"Hello! I saw your profile and thought we have a lot in common...\"",                  time: "15 min ago",  read: false, link: "/messages/2",   initials: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)" },
  { id: "3",  type: "match",    title: "New Match",            body: "Kavya Nair from Bangalore is a 84% match! She's online now.",                                        time: "1h ago",      read: false, link: "/profile/3",    initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)" },
  { id: "4",  type: "trust",    title: "Trust Score Updated",  body: "Your Aadhaar verification is complete. Trust Score: 84 (+40 pts)",                                   time: "3h ago",      read: true,  link: "/profile/me"    },
  { id: "5",  type: "interest", title: "Interest Accepted",    body: "Sonal Joshi accepted your interest! Start a conversation now.",                                      time: "5h ago",      read: true,  link: "/messages/1",   initials: "SJ", grad: "linear-gradient(135deg,#92400E,#D97706)" },
  { id: "6",  type: "system",   title: "Profile Boost Active", body: "Your profile is being boosted for the next 24 hours. You're in the top 3% of matches!",              time: "Yesterday",   read: true   },
  { id: "7",  type: "message",  title: "New Message",          body: "Kavya Nair: \"I saw you're also into trekking — have you done Kedarkantha?\"",                      time: "Yesterday",   read: true,  link: "/messages/3",   initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)" },
  { id: "8",  type: "match",    title: "5 New Matches",        body: "We found 5 new matches based on your updated preferences. Check them out!",                         time: "2 days ago",  read: true,  link: "/matches"       },
  { id: "9",  type: "trust",    title: "Complete your profile",body: "You're at 68% profile completion. Add your hobbies to unlock 8 more trust points.",                  time: "3 days ago",  read: true,  link: "/profile/me"    },
  { id: "10", type: "system",   title: "Gold Plan Expiring",   body: "Your Gold plan expires in 7 days. Renew now to keep unlimited messaging.",                           time: "4 days ago",  read: true,  link: "/subscription"  },
];

const TYPE_META: Record<NotifType, { icon: React.ReactNode; color: string }> = {
  interest: { icon: <Heart className="w-4 h-4" />,         color: "#dc1e3c"          },
  message:  { icon: <MessageCircle className="w-4 h-4" />, color: "#9A6B00"          },
  match:    { icon: <Star className="w-4 h-4" />,           color: "#5C7A52"          },
  trust:    { icon: <Shield className="w-4 h-4" />,         color: "#0F766E"          },
  system:   { icon: <Bell className="w-4 h-4" />,           color: "rgba(26,10,20,0.4)" },
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
    { key: "all",      label: "All"       },
    { key: "interest", label: "Interests" },
    { key: "message",  label: "Messages"  },
    { key: "match",    label: "Matches"   },
    { key: "trust",    label: "Trust"     },
    { key: "system",   label: "System"    },
  ];

  return (
    <div style={{ background: "#fdfbf9", minHeight: "100vh" }}>
      {/* Header strip — brand crimson gradient */}
      <div
        style={{
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #dc1e3c 0%, #a0153c 100%)",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: 30,
              fontWeight: 300,
              color: "#fff",
              margin: 0,
            }}
          >
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p
              style={{
                fontFamily: "var(--font-poppins, sans-serif)",
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                marginTop: 4,
                margin: "4px 0 0",
              }}
            >
              {unreadCount} unread
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-poppins, sans-serif)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <CheckCheck style={{ width: 14, height: 14 }} /> Mark all read
            </button>
          )}
          <Link
            href="/settings"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <Settings style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>

      <div style={{ padding: "24px 32px", maxWidth: 672 }}>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {filters.map((f) => {
            const count =
              f.key === "all"
                ? notifs.filter((n) => !n.read).length
                : notifs.filter((n) => n.type === f.key && !n.read).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: active ? "none" : "1px solid rgba(220,30,60,0.15)",
                  background: active ? "linear-gradient(135deg,#dc1e3c,#a0153c)" : "#fff",
                  color: active ? "#fff" : "rgba(26,10,20,0.55)",
                  fontFamily: "var(--font-poppins, sans-serif)",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                {f.label}
                {count > 0 && (
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      fontWeight: 700,
                      background: active ? "rgba(255,255,255,0.25)" : "rgba(220,30,60,0.1)",
                      color: active ? "#fff" : "#dc1e3c",
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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <Bell style={{ width: 48, height: 48, color: "rgba(26,10,20,0.15)", margin: "0 auto 12px" }} />
              <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: 14, color: "rgba(26,10,20,0.4)" }}>
                No notifications
              </p>
            </div>
          )}

          {filtered.map((notif) => {
            const meta = TYPE_META[notif.type];
            return (
              <div
                key={notif.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 16,
                  background: "#fff",
                  border: notif.read ? "1px solid rgba(220,30,60,0.08)" : "1px solid rgba(220,30,60,0.12)",
                  borderLeft: notif.read ? "1px solid rgba(220,30,60,0.08)" : "4px solid #dc1e3c",
                  borderRadius: 12,
                  position: "relative",
                }}
              >
                {/* Avatar or icon */}
                {notif.initials ? (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: notif.grad,
                      fontFamily: "var(--font-playfair, serif)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {notif.initials}
                  </div>
                ) : (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${meta.color}18`,
                      color: meta.color,
                      flexShrink: 0,
                    }}
                  >
                    {meta.icon}
                  </div>
                )}

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-poppins, sans-serif)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1a0a14",
                        margin: 0,
                      }}
                    >
                      {notif.title}
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-poppins, sans-serif)",
                        fontSize: 10,
                        color: "rgba(26,10,20,0.3)",
                        flexShrink: 0,
                      }}
                    >
                      {notif.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-poppins, sans-serif)",
                      fontSize: 12,
                      color: "rgba(26,10,20,0.55)",
                      marginTop: 2,
                      lineHeight: 1.5,
                      margin: "2px 0 0",
                    }}
                  >
                    {notif.body}
                  </p>

                  {notif.link && (
                    <Link
                      href={notif.link}
                      onClick={() => markRead(notif.id)}
                      style={{
                        display: "inline-block",
                        marginTop: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#dc1e3c",
                        textDecoration: "none",
                        fontFamily: "var(--font-poppins, sans-serif)",
                      }}
                    >
                      {notif.type === "interest" ? "View Interest →" :
                       notif.type === "message"  ? "Open Chat →"     :
                       notif.type === "match"    ? "View Profile →"  :
                       "View →"}
                    </Link>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      title="Mark read"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "none",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "rgba(26,10,20,0.25)",
                      }}
                    >
                      <Check style={{ width: 14, height: 14 }} />
                    </button>
                  )}
                  <button
                    onClick={() => remove(notif.id)}
                    title="Dismiss"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "none",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(26,10,20,0.2)",
                    }}
                  >
                    <Trash2 style={{ width: 14, height: 14 }} />
                  </button>
                </div>

                {/* Unread dot */}
                {!notif.read && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#dc1e3c",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
