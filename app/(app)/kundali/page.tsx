"use client";

import { useState } from "react";
import { Star, Moon, ChevronDown, ChevronUp, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

const NAKSHATRA_LIST = [
  "Ashwini","Bharani","Kritika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha",
  "Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha",
  "Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha",
  "Purva Bhadrapada","Uttara Bhadrapada","Revati",
];

const gunas = [
  { name: "Varna",  score: 1, max: 1, desc: "Spiritual compatibility"  },
  { name: "Vashya", score: 2, max: 2, desc: "Mutual attraction"        },
  { name: "Tara",   score: 3, max: 3, desc: "Birth star compatibility" },
  { name: "Yoni",   score: 3, max: 4, desc: "Nature & temperament"     },
  { name: "Graha",  score: 5, max: 5, desc: "Planetary friendship"     },
  { name: "Gana",   score: 5, max: 6, desc: "Temperament matching"     },
  { name: "Rashi",  score: 6, max: 7, desc: "Moon sign compatibility"  },
  { name: "Nadi",   score: 6, max: 8, desc: "Genetic compatibility"    },
];

const PLANETS = [
  { name: "Sun ☉",     rashi: "Sinh",   house: "1"  },
  { name: "Moon ☽",    rashi: "Kark",   house: "12" },
  { name: "Mars ♂",    rashi: "Mesh",   house: "9"  },
  { name: "Mercury ☿", rashi: "Kanya",  house: "2"  },
  { name: "Jupiter ♃", rashi: "Meen",   house: "8"  },
  { name: "Venus ♀",   rashi: "Tula",   house: "3"  },
  { name: "Saturn ♄",  rashi: "Makar",  house: "6"  },
  { name: "Rahu ☊",    rashi: "Mithun", house: "11" },
  { name: "Ketu ☋",    rashi: "Dhanu",  house: "5"  },
];

const totalScore = gunas.reduce((s, g) => s + g.score, 0);
const totalMax   = gunas.reduce((s, g) => s + g.max, 0);

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(220,30,60,0.08)",
  borderRadius: 16,
  padding: 20,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid rgba(220,30,60,0.15)",
  background: "#fdfbf9",
  fontFamily: "var(--font-poppins, sans-serif)",
  fontSize: 14,
  color: "#1a0a14",
  outline: "none",
  boxSizing: "border-box",
};

export default function KundaliPage() {
  const [showChart, setShowChart] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState({ dob: "", tob: "", pob: "" });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const percentage = Math.round((totalScore / totalMax) * 100);

  return (
    <div style={{ background: "#fdfbf9", minHeight: "100vh", padding: "32px" }}>
      <div style={{ maxWidth: 896 }}>

        {/* Page header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Star style={{ width: 20, height: 20, color: "#C89020", fill: "#C89020" }} />
            <h1
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: 30,
                fontWeight: 300,
                color: "#1a0a14",
                margin: 0,
              }}
            >
              Kundali Matching
            </h1>
          </div>
          <p
            style={{
              fontFamily: "var(--font-poppins, sans-serif)",
              fontSize: 14,
              color: "rgba(26,10,20,0.45)",
              margin: 0,
            }}
          >
            Vedic astrology compatibility — powered by Parashari Jyotish
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Birth details */}
            <div style={cardStyle}>
              <h3
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a0a14",
                  margin: "0 0 16px",
                }}
              >
                Your Birth Details
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { k: "dob", label: "Date of Birth", type: "date",  ph: "" },
                  { k: "tob", label: "Time of Birth", type: "time",  ph: "" },
                  { k: "pob", label: "Place of Birth", type: "text", ph: "e.g. Mumbai, Maharashtra" },
                ].map(({ k, label, type, ph }) => (
                  <div key={k}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-poppins, sans-serif)",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: "rgba(26,10,20,0.45)",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={ph}
                      value={(form as Record<string, string>)[k]}
                      onChange={(e) => set(k, e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowChart(true)}
                style={{
                  width: "100%",
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
                  color: "#fff",
                  fontFamily: "var(--font-poppins, sans-serif)",
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: "0 4px 16px rgba(220,30,60,0.25)",
                }}
              >
                <Sparkles style={{ width: 16, height: 16 }} /> Generate Kundali
              </button>
            </div>

            {/* Birth chart */}
            {showChart && (
              <div style={cardStyle}>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1a0a14",
                    margin: "0 0 16px",
                  }}
                >
                  Birth Chart (Lagna)
                </h3>
                <div style={{ position: "relative", width: "100%", maxWidth: 288, margin: "0 auto", aspectRatio: "1" }}>
                  <svg
                    viewBox="0 0 300 300"
                    style={{ width: "100%", height: "100%", stroke: "rgba(200,144,32,0.35)", fill: "none", strokeWidth: 1.5 }}
                  >
                    <rect x="10"  y="10"  width="280" height="280" />
                    <rect x="90"  y="90"  width="120" height="120" />
                    <line x1="10"  y1="10"  x2="90"  y2="90"  />
                    <line x1="290" y1="10"  x2="210" y2="90"  />
                    <line x1="10"  y1="290" x2="90"  y2="210" />
                    <line x1="290" y1="290" x2="210" y2="210" />
                    <line x1="150" y1="10"  x2="150" y2="90"  />
                    <line x1="150" y1="210" x2="150" y2="290" />
                    <line x1="10"  y1="150" x2="90"  y2="150" />
                    <line x1="210" y1="150" x2="290" y2="150" />
                    {[
                      { x: 150, y: 58,  h: "1"  }, { x: 245, y: 58,  h: "12" },
                      { x: 265, y: 150, h: "11" }, { x: 245, y: 245, h: "10" },
                      { x: 150, y: 260, h: "9"  }, { x: 55,  y: 245, h: "8"  },
                      { x: 35,  y: 150, h: "7"  }, { x: 55,  y: 58,  h: "6"  },
                      { x: 110, y: 110, h: "5"  }, { x: 190, y: 110, h: "2"  },
                      { x: 190, y: 195, h: "3"  }, { x: 110, y: 195, h: "4"  },
                    ].map(({ x, y, h }) => (
                      <text
                        key={h}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fill: "rgba(26,10,20,0.35)", fontSize: 10, fontFamily: "var(--font-poppins, sans-serif)", strokeWidth: 0 }}
                      >
                        {h}
                      </text>
                    ))}
                    <circle cx="150" cy="42" r="3" style={{ fill: "#dc1e3c", strokeWidth: 0 }} />
                  </svg>
                </div>

                {/* Planet table */}
                <div style={{ marginTop: 16, overflowX: "auto" }}>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(220,30,60,0.12)" }}>
                        {["Planet", "Rashi", "House"].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              padding: "8px 16px 8px 0",
                              fontFamily: "var(--font-poppins, sans-serif)",
                              fontSize: 11,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.07em",
                              color: "rgba(26,10,20,0.4)",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PLANETS.map((p) => (
                        <tr key={p.name} style={{ borderBottom: "1px solid rgba(220,30,60,0.06)" }}>
                          <td style={{ padding: "8px 16px 8px 0", fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 500, color: "rgba(26,10,20,0.8)" }}>{p.name}</td>
                          <td style={{ padding: "8px 16px 8px 0", fontFamily: "var(--font-poppins, sans-serif)", color: "rgba(26,10,20,0.55)" }}>{p.rashi}</td>
                          <td style={{ padding: "8px 0",           fontFamily: "var(--font-poppins, sans-serif)", color: "rgba(26,10,20,0.55)" }}>{p.house}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Score ring — gold dark card */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a0a14, #2d1500)",
                border: "1px solid rgba(200,144,32,0.3)",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "serif",
                  fontSize: 14,
                  color: "rgba(200,144,32,0.7)",
                  margin: "0 0 12px",
                }}
              >
                गुण मिलान
              </p>
              <div style={{ position: "relative", width: 128, height: 128, margin: "0 auto 12px" }}>
                <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9A6B00" />
                      <stop offset="100%" stopColor="#C89020" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="url(#goldGrad)" strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-playfair, serif)",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#C89020",
                    }}
                  >
                    {totalScore}
                  </span>
                  <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    of {totalMax}
                  </span>
                </div>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fff",
                  margin: "0 0 4px",
                }}
              >
                Excellent Match
              </h3>
              <p style={{ fontFamily: "var(--font-poppins, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                Above 26 points — auspicious for marriage
              </p>
            </div>

            {/* Guna breakdown */}
            <div style={cardStyle}>
              <h3
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a0a14",
                  margin: "0 0 16px",
                }}
              >
                Ashtakoot Gunas
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {gunas.map((g) => {
                  const pct = (g.score / g.max) * 100;
                  const isOpen = expanded === g.name;
                  return (
                    <div key={g.name}>
                      <button
                        onClick={() => setExpanded(isOpen ? null : g.name)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-poppins, sans-serif)",
                            fontSize: 12,
                            fontWeight: 600,
                            width: 64,
                            textAlign: "left",
                            color: "rgba(26,10,20,0.7)",
                          }}
                        >
                          {g.name}
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: 6,
                            borderRadius: 999,
                            background: "rgba(26,10,20,0.07)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 999,
                              width: `${pct}%`,
                              background:
                                pct === 100
                                  ? "linear-gradient(90deg,#5C7A52,#8DB870)"
                                  : "linear-gradient(90deg,#dc1e3c,#a0153c)",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-poppins, sans-serif)",
                            fontSize: 12,
                            width: 40,
                            textAlign: "right",
                            color: "rgba(26,10,20,0.5)",
                          }}
                        >
                          {g.score}/{g.max}
                        </span>
                        {isOpen
                          ? <ChevronUp   style={{ width: 12, height: 12, flexShrink: 0, color: "rgba(26,10,20,0.3)" }} />
                          : <ChevronDown style={{ width: 12, height: 12, flexShrink: 0, color: "rgba(26,10,20,0.3)" }} />}
                      </button>
                      {isOpen && (
                        <p
                          style={{
                            fontFamily: "var(--font-poppins, sans-serif)",
                            fontSize: 12,
                            color: "rgba(26,10,20,0.45)",
                            marginLeft: 76,
                            marginTop: 4,
                          }}
                        >
                          {g.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dosha check */}
            <div style={cardStyle}>
              <h3
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a0a14",
                  margin: "0 0 12px",
                }}
              >
                Dosha Check
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "Manglik Dosha", status: "none",    label: "Not Present"                        },
                  { name: "Nadi Dosha",    status: "partial", label: "Partial — cancellation applies"     },
                  { name: "Bhakoot Dosha", status: "none",    label: "Not Present"                        },
                ].map(({ name, status, label }) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {status === "none" ? (
                      <CheckCircle style={{ width: 16, height: 16, flexShrink: 0, color: "#5C7A52" }} />
                    ) : (
                      <AlertCircle style={{ width: 16, height: 16, flexShrink: 0, color: "#C89020" }} />
                    )}
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-poppins, sans-serif)",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(26,10,20,0.7)",
                        }}
                      >
                        {name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-poppins, sans-serif)",
                          fontSize: 12,
                          color: "rgba(26,10,20,0.4)",
                          marginLeft: 8,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Astrologer CTA */}
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(200,144,32,0.2)",
                borderRadius: 16,
                padding: 16,
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <Moon style={{ width: 20, height: 20, color: "#C89020", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1a0a14",
                    margin: "0 0 4px",
                  }}
                >
                  Book Astrologer Consultation
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: 12,
                    color: "rgba(26,10,20,0.5)",
                    margin: "0 0 8px",
                  }}
                >
                  Platinum plan includes 2 consultations/month with certified Jyotish pandits.
                </p>
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    background: "linear-gradient(135deg,#C89020,#9A6B00)",
                    color: "#fff",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: 12,
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(200,144,32,0.25)",
                  }}
                >
                  Upgrade to Platinum
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
