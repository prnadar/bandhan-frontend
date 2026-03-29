"use client";

import Link from "next/link";
import { Shield, Search, CheckCheck, Clock } from "lucide-react";
import { useState } from "react";

const threads = [
  {
    id: "1", name: "Priya Sharma", photo: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)",
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
    id: "4", name: "Shruti Agarwal", photo: "SA", grad: "linear-gradient(135deg,#E8426A99,#9A6B0099)",
    lastMsg: "Haha yes, Delhi winters are something else",
    time: "Sun", unread: 0, verified: true, compatibility: 79,
  },
];

export default function MessagesPage() {
  const [searchValue, setSearchValue] = useState("");

  const filtered = threads.filter((t) =>
    t.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    t.lastMsg.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "672px",
        background: "#fff8f8",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "1.875rem",
            fontWeight: 300,
            color: "#281621",
            margin: 0,
            marginBottom: "4px",
            letterSpacing: "-0.01em",
          }}
        >
          Messages
        </h1>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.8125rem",
            color: "rgba(40,22,33,0.45)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Shield
            style={{ width: "13px", height: "13px", color: "#b4002a" }}
          />
          Signal Protocol E2E encrypted · Private &amp; secure
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 16px",
          marginBottom: "20px",
          background: "#ffffff",
          borderRadius: "12px",
          height: "48px",
          boxShadow: "0 2px 12px rgba(180,0,42,0.06)",
        }}
      >
        <Search
          style={{ width: "16px", height: "16px", color: "rgba(40,22,33,0.35)", flexShrink: 0 }}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search conversations..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.875rem",
            color: "#281621",
          }}
        />
      </div>

      {/* Section label */}
      {filtered.length > 0 && (
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "rgba(40,22,33,0.35)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "12px",
          }}
        >
          {filtered.length} conversation{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Thread list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {filtered.map((t) => (
          <Link
            key={t.id}
            href={`/messages/${t.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              borderRadius: "16px",
              background: t.unread > 0 ? "#f9dae9" : "#ffffff",
              boxShadow: t.unread > 0
                ? "0 2px 16px rgba(180,0,42,0.08)"
                : "0 1px 4px rgba(40,22,33,0.04)",
              textDecoration: "none",
              transition: "background 0.18s ease, box-shadow 0.18s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                t.unread > 0 ? "#f9dae9" : "#fff0f5";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 20px rgba(180,0,42,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                t.unread > 0 ? "#f9dae9" : "#ffffff";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                t.unread > 0
                  ? "0 2px 16px rgba(180,0,42,0.08)"
                  : "0 1px 4px rgba(40,22,33,0.04)";
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: t.grad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Noto Serif', serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                {t.photo}
              </div>
              {t.verified && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    right: "-2px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#fff8f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Shield
                    style={{ width: "11px", height: "11px", color: "#b4002a" }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: "0.9375rem",
                    fontWeight: t.unread > 0 ? 700 : 500,
                    color: t.unread > 0 ? "#281621" : "rgba(40,22,33,0.75)",
                  }}
                >
                  {t.name}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexShrink: 0,
                  }}
                >
                  {t.unread === 0 && (
                    <CheckCheck
                      style={{ width: "13px", height: "13px", color: "#b4002a" }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.6875rem",
                      color: "rgba(40,22,33,0.4)",
                    }}
                  >
                    {t.time}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.8125rem",
                  color: t.unread > 0 ? "rgba(40,22,33,0.7)" : "rgba(40,22,33,0.4)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.5,
                }}
              >
                {t.lastMsg}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    color: "#C89020",
                  }}
                >
                  {t.compatibility}% match
                </span>
              </div>
            </div>

            {/* Unread badge */}
            {t.unread > 0 && (
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(180,0,42,0.35)",
                }}
              >
                {t.unread}
              </div>
            )}
          </Link>
        ))}

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              color: "rgba(40,22,33,0.4)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.875rem",
            }}
          >
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
}
