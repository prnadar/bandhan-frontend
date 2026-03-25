"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield, Brain, Heart, X, ChevronRight, MapPin, Briefcase,
  GraduationCap, CheckCircle, Clock,
} from "lucide-react";

const matches = [
  {
    id: "1", name: "Priya Sharma", age: 27, city: "Mumbai", state: "Maharashtra",
    profession: "Senior Software Engineer", company: "Google",
    education: "IIT Bombay · B.Tech CSE", religion: "Hindu", caste: "Brahmin",
    height: "5'4\"", verified: true, trustScore: 96, compatibility: 92,
    dimensions: { values: 94, lifestyle: 90, family: 96, ambition: 88, communication: 92 },
    about: "Love Carnatic music, trekking in Himalayas, and building side projects on weekends. Looking for a partner who values growth and laughter equally.",
    photo: "PF",
    photoGrad: "linear-gradient(135deg, #E8426A, #E8A060)",
    tag: "Top Match",
    tagBg: "rgba(220,30,60,0.1)",
    tagColor: "#dc1e3c",
  },
  {
    id: "2", name: "Anjali Patel", age: 26, city: "Ahmedabad", state: "Gujarat",
    profession: "Resident Doctor", company: "AIIMS Delhi",
    education: "AIIMS Delhi · MBBS", religion: "Hindu", caste: "Patel",
    height: "5'3\"", verified: true, trustScore: 92, compatibility: 87,
    dimensions: { values: 90, lifestyle: 85, family: 92, ambition: 84, communication: 86 },
    about: "Passionate about medicine and mental health advocacy. Enjoy cooking Gujarati food, reading, and travelling off the beaten path.",
    photo: "AP",
    photoGrad: "linear-gradient(135deg, #9A6B00, #C89020)",
    tag: "Great Match",
    tagBg: "rgba(200,144,32,0.1)",
    tagColor: "#C89020",
  },
  {
    id: "3", name: "Kavya Nair", age: 28, city: "Bangalore", state: "Karnataka",
    profession: "Product Manager", company: "Flipkart",
    education: "IIM Ahmedabad · MBA", religion: "Hindu", caste: "Nair",
    height: "5'5\"", verified: true, trustScore: 89, compatibility: 84,
    dimensions: { values: 86, lifestyle: 82, family: 88, ambition: 90, communication: 80 },
    about: "Product nerd by day, Bharatanatyam dancer by night. Deeply rooted in Kerala culture while thriving in the startup world.",
    photo: "KN",
    photoGrad: "linear-gradient(135deg, #5C7A52, #8DB870)",
    tag: "Good Match",
    tagBg: "rgba(92,122,82,0.1)",
    tagColor: "#5C7A52",
  },
  {
    id: "4", name: "Shruti Agarwal", age: 25, city: "Delhi", state: "Delhi",
    profession: "Chartered Accountant", company: "Deloitte",
    education: "Delhi University · B.Com + CA", religion: "Hindu", caste: "Agarwal",
    height: "5'2\"", verified: true, trustScore: 88, compatibility: 79,
    dimensions: { values: 82, lifestyle: 78, family: 84, ambition: 80, communication: 76 },
    about: "Finance professional with a love for Hindustani classical music and baking. Believe in building a home full of warmth, books, and good food.",
    photo: "SA",
    photoGrad: "linear-gradient(135deg, #E8426A99, #9A6B0099)",
    tag: "Compatible",
    tagBg: "rgba(26,10,20,0.06)",
    tagColor: "rgba(26,10,20,0.55)",
  },
  {
    id: "5", name: "Deepika Iyer", age: 29, city: "Chennai", state: "Tamil Nadu",
    profession: "Data Scientist", company: "Amazon",
    education: "IIT Madras · M.Tech AI", religion: "Hindu", caste: "Iyer",
    height: "5'4\"", verified: true, trustScore: 91, compatibility: 76,
    dimensions: { values: 78, lifestyle: 74, family: 80, ambition: 82, communication: 72 },
    about: "AI researcher exploring the intersection of tech and social impact. Passionate about Tamil literature, yoga, and cooking Chettinad cuisine.",
    photo: "DI",
    photoGrad: "linear-gradient(135deg, #7A5200, #C89020)",
    tag: "Compatible",
    tagBg: "rgba(26,10,20,0.06)",
    tagColor: "rgba(26,10,20,0.55)",
  },
];

const brand = {
  bg: "#fdfbf9",
  card: "#fff",
  cardBorder: "1px solid rgba(220,30,60,0.08)",
  cardRadius: "16px",
  primary: "#dc1e3c",
  gradient: "linear-gradient(135deg, #dc1e3c, #a0153c)",
  gold: "#C89020",
  textPrimary: "#1a0a14",
  textMuted: "#888",
  playfair: "var(--font-playfair, serif)",
  poppins: "var(--font-poppins, sans-serif)",
};

export default function DashboardPage() {
  const [interests, setInterests] = useState<Record<string, "sent" | "passed">>({});

  const sendInterest = (id: string) => setInterests((p) => ({ ...p, [id]: "sent" }));
  const pass = (id: string) => setInterests((p) => ({ ...p, [id]: "passed" }));

  const active = matches.filter((m) => !interests[m.id]);
  const sent = matches.filter((m) => interests[m.id] === "sent");

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", background: brand.bg, minHeight: "100vh", fontFamily: brand.poppins }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <p style={{ fontFamily: brand.poppins, fontSize: "15px", marginBottom: "4px", color: brand.gold }}>
            Welcome, Prabhakar 👋
          </p>
          <h1 style={{ fontFamily: brand.playfair, fontSize: "30px", fontWeight: 300, color: brand.textPrimary, margin: "0 0 8px 0" }}>
            Your Daily Matches
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: brand.poppins, fontSize: "13px", color: "rgba(26,10,20,0.45)" }}>5 curated matches ·</span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: brand.primary }}>
              <Clock style={{ width: "14px", height: "14px" }} />
              <span style={{ fontFamily: brand.poppins, fontSize: "13px", fontWeight: 500 }}>Refreshes at 6:00 AM IST</span>
            </div>
          </div>
        </div>

        {/* Trust score card */}
        <div style={{
          background: brand.card,
          border: "1px solid rgba(220,30,60,0.12)",
          borderRadius: brand.cardRadius,
          boxShadow: "0 2px 12px rgba(220,30,60,0.06)",
          padding: "16px 20px",
          minWidth: "180px",
          textAlign: "right",
        }}>
          <p style={{ fontFamily: brand.poppins, fontSize: "11px", color: "rgba(26,10,20,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Your Trust Score</p>
          <p style={{ fontFamily: brand.playfair, fontSize: "40px", fontWeight: 700, background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>84</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", marginTop: "4px" }}>
            <Shield style={{ width: "12px", height: "12px", color: "#5C7A52" }} />
            <span style={{ fontFamily: brand.poppins, fontSize: "11px", color: "#5C7A52", fontWeight: 500 }}>Aadhaar Verified</span>
          </div>
          <Link href="/profile/me" style={{ fontFamily: brand.poppins, fontSize: "11px", color: brand.primary, fontWeight: 600, display: "block", marginTop: "8px", textDecoration: "none" }}>
            Boost to 96 →
          </Link>
        </div>
      </div>

      {/* Profile completeness banner */}
      <div style={{
        background: brand.card,
        border: brand.cardBorder,
        borderRadius: brand.cardRadius,
        boxShadow: "0 2px 12px rgba(220,30,60,0.06)",
        padding: "16px 20px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: brand.poppins, fontSize: "13px", fontWeight: 600, color: brand.textPrimary }}>Profile completeness — 68%</span>
            <span style={{ fontFamily: brand.poppins, fontSize: "11px", color: brand.gold, fontWeight: 500 }}>+28pts trust score if complete</span>
          </div>
          <div style={{ height: "8px", background: "rgba(26,10,20,0.08)", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "68%", background: "linear-gradient(90deg, #dc1e3c, #a0153c)", borderRadius: "99px" }} />
          </div>
        </div>
        <Link href="/profile/me" style={{
          fontFamily: brand.poppins,
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
          background: brand.gradient,
          borderRadius: "10px",
          padding: "10px 18px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
        }}>
          Complete Profile
        </Link>
      </div>

      {/* Sent interests strip */}
      {sent.length > 0 && (
        <div style={{
          marginBottom: "24px",
          padding: "14px 18px",
          borderRadius: brand.cardRadius,
          background: "rgba(92,122,82,0.08)",
          border: "1px solid rgba(92,122,82,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Heart style={{ width: "16px", height: "16px", color: "#5C7A52" }} />
            <span style={{ fontFamily: brand.poppins, fontSize: "13px", fontWeight: 500, color: "#5C7A52" }}>
              Interest sent to {sent.map((m) => m.name.split(" ")[0]).join(", ")} · awaiting response
            </span>
          </div>
        </div>
      )}

      {/* Match cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {active.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onInterest={() => sendInterest(match.id)}
            onPass={() => pass(match.id)}
          />
        ))}

        {active.length === 0 && (
          <div style={{ gridColumn: "1 / -1", padding: "80px 0", textAlign: "center" }}>
            <Heart style={{ width: "48px", height: "48px", color: "rgba(220,30,60,0.3)", margin: "0 auto 16px" }} />
            <h3 style={{ fontFamily: brand.playfair, fontSize: "20px", color: "rgba(26,10,20,0.6)", marginBottom: "8px" }}>All done for today</h3>
            <p style={{ fontFamily: brand.poppins, fontSize: "13px", color: "rgba(26,10,20,0.4)" }}>New matches arrive at 6:00 AM IST</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MatchCard({ match: m, onInterest, onPass }: {
  match: typeof matches[0];
  onInterest: () => void;
  onPass: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(220,30,60,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: hovered ? "0 8px 32px rgba(220,30,60,0.14)" : "0 2px 12px rgba(220,30,60,0.06)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo placeholder */}
      <div style={{ position: "relative", height: "208px", display: "flex", alignItems: "center", justifyContent: "center", background: m.photoGrad }}>
        <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "48px", fontWeight: 300, color: "rgba(255,255,255,0.9)" }}>{m.photo}</span>

        {/* Tag */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          padding: "4px 10px",
          borderRadius: "99px",
          background: m.tagBg,
          color: m.tagColor,
          fontFamily: "var(--font-poppins, sans-serif)",
          fontSize: "11px",
          fontWeight: 600,
        }}>
          {m.tag}
        </div>

        {/* Trust score */}
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 8px",
          borderRadius: "99px",
          background: "rgba(253,251,249,0.92)",
        }}>
          <Shield style={{ width: "12px", height: "12px", color: "#5C7A52" }} />
          <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", fontWeight: 700, color: "#1a0a14" }}>{m.trustScore}</span>
        </div>

        {/* Compatibility ring */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(253,251,249,0.95)",
          border: "2px solid rgba(200,144,32,0.3)",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "12px", fontWeight: 700, color: "#C89020", lineHeight: 1, margin: 0 }}>{m.compatibility}%</p>
            <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "8px", color: "rgba(26,10,20,0.4)", lineHeight: 1, marginTop: "2px" }}>match</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "18px", fontWeight: 600, color: "#1a0a14", margin: "0 0 2px 0" }}>
              {m.name}, {m.age}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(26,10,20,0.5)" }}>
              <MapPin style={{ width: "12px", height: "12px" }} />
              <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px" }}>{m.city}, {m.state}</span>
              {m.verified && <CheckCircle style={{ width: "12px", height: "12px", color: "#5C7A52", marginLeft: "4px" }} />}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "8px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(26,10,20,0.6)" }}>
            <Briefcase style={{ width: "12px", height: "12px", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {m.profession} · {m.company}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(26,10,20,0.6)" }}>
            <GraduationCap style={{ width: "12px", height: "12px", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {m.education}
            </span>
          </div>
        </div>

        {/* Compatibility breakdown */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: "100%",
            textAlign: "left",
            marginBottom: "12px",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: expanded ? "8px" : 0 }}>
            <Brain style={{ width: "14px", height: "14px", color: "#dc1e3c" }} />
            <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", fontWeight: 600, color: "rgba(26,10,20,0.7)" }}>Compatibility Breakdown</span>
            <ChevronRight style={{
              width: "14px",
              height: "14px",
              color: "rgba(26,10,20,0.3)",
              marginLeft: "auto",
              transition: "transform 0.2s",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }} />
          </div>
          {expanded && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {Object.entries(m.dimensions).map(([dim, score]) => (
                <div key={dim} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", color: "rgba(26,10,20,0.5)", textTransform: "capitalize", width: "88px" }}>{dim}</span>
                  <div style={{ flex: 1, height: "6px", background: "rgba(26,10,20,0.08)", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${score}%`, background: "linear-gradient(90deg, #dc1e3c, #a0153c)", borderRadius: "99px" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: "11px", fontWeight: 700, color: "#C89020", width: "28px", textAlign: "right" }}>{score}</span>
                </div>
              ))}
            </div>
          )}
        </button>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onPass}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "9px 0",
              border: "1px solid rgba(26,10,20,0.15)",
              borderRadius: "10px",
              background: "none",
              fontFamily: "var(--font-poppins, sans-serif)",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(26,10,20,0.5)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#1a0a14";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(26,10,20,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(26,10,20,0.5)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(26,10,20,0.15)";
            }}
          >
            <X style={{ width: "14px", height: "14px" }} />
            Pass
          </button>
          <Link
            href={`/profile/${m.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "9px 16px",
              border: "1px solid rgba(26,10,20,0.15)",
              borderRadius: "10px",
              fontFamily: "var(--font-poppins, sans-serif)",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(26,10,20,0.5)",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            View
          </Link>
          <button
            onClick={onInterest}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "9px 0",
              background: "linear-gradient(135deg, #dc1e3c, #a0153c)",
              border: "none",
              borderRadius: "10px",
              fontFamily: "var(--font-poppins, sans-serif)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
              transition: "all 0.2s",
            }}
          >
            <Heart style={{ width: "14px", height: "14px", fill: "#fff" }} />
            Interest
          </button>
        </div>
      </div>
    </div>
  );
}
