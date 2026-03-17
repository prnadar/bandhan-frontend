"use client";

import { useState } from "react";
import { Star, Moon, Sun, Info, ChevronDown, ChevronUp, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

const RASHIS = ["Mesh", "Vrishabh", "Mithun", "Kark", "Sinh", "Kanya", "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"];

const NAKSHATRA_LIST = [
  "Ashwini","Bharani","Kritika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha",
  "Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha",
  "Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha",
  "Purva Bhadrapada","Uttara Bhadrapada","Revati",
];

const gunas = [
  { name: "Varna",    score: 1, max: 1, desc: "Spiritual compatibility" },
  { name: "Vashya",   score: 2, max: 2, desc: "Mutual attraction" },
  { name: "Tara",     score: 3, max: 3, desc: "Birth star compatibility" },
  { name: "Yoni",     score: 3, max: 4, desc: "Nature & temperament" },
  { name: "Graha",    score: 5, max: 5, desc: "Planetary friendship" },
  { name: "Gana",     score: 5, max: 6, desc: "Temperament matching" },
  { name: "Rashi",    score: 6, max: 7, desc: "Moon sign compatibility" },
  { name: "Nadi",     score: 6, max: 8, desc: "Genetic compatibility" },
];

const PLANETS = [
  { name: "Sun ☉",    rashi: "Sinh",   house: "1" },
  { name: "Moon ☽",   rashi: "Kark",   house: "12" },
  { name: "Mars ♂",   rashi: "Mesh",   house: "9" },
  { name: "Mercury ☿", rashi: "Kanya", house: "2" },
  { name: "Jupiter ♃", rashi: "Meen",  house: "8" },
  { name: "Venus ♀",  rashi: "Tula",   house: "3" },
  { name: "Saturn ♄", rashi: "Makar",  house: "6" },
  { name: "Rahu ☊",   rashi: "Mithun", house: "11" },
  { name: "Ketu ☋",   rashi: "Dhanu",  house: "5" },
];

const totalScore = gunas.reduce((s, g) => s + g.score, 0);
const totalMax   = gunas.reduce((s, g) => s + g.max, 0);

export default function KundaliPage() {
  const [showChart, setShowChart] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState({ dob: "", tob: "", pob: "" });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const percentage = Math.round((totalScore / totalMax) * 100);

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-5 h-5 text-gold fill-gold" />
          <h1 className="font-display text-3xl font-light text-deep">Kundali Matching</h1>
        </div>
        <p className="font-body text-sm text-deep/45">Vedic astrology compatibility — powered by Parashari Jyotish</p>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        {/* Left */}
        <div className="space-y-5">

          {/* Birth details card */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <h3 className="font-display text-base font-semibold text-deep mb-4">Your Birth Details</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { k: "dob", label: "Date of Birth", type: "date", ph: "" },
                { k: "tob", label: "Time of Birth", type: "time", ph: "" },
                { k: "pob", label: "Place of Birth", type: "text", ph: "e.g. Mumbai, Maharashtra" },
              ].map(({ k, label, type, ph }) => (
                <div key={k}>
                  <label className="font-body text-xs text-deep/45 uppercase tracking-wider block mb-1">{label}</label>
                  <input
                    type={type}
                    placeholder={ph}
                    value={(form as Record<string, string>)[k]}
                    onChange={(e) => set(k, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl font-body text-sm text-deep outline-none"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowChart(true)}
              className="w-full mt-4 flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold text-white py-3"
              style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", minHeight: "auto" }}
            >
              <Sparkles className="w-4 h-4" /> Generate Kundali
            </button>
          </div>

          {/* Kundali chart (North Indian style placeholder) */}
          {showChart && (
            <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
              <h3 className="font-display text-base font-semibold text-deep mb-4">Birth Chart (Lagna)</h3>
              <div className="relative w-full aspect-square max-w-xs mx-auto">
                {/* North Indian chart grid */}
                <svg viewBox="0 0 300 300" className="w-full h-full" style={{ stroke: "rgba(154,107,0,0.35)", fill: "none", strokeWidth: 1.5 }}>
                  {/* Outer square */}
                  <rect x="10" y="10" width="280" height="280" />
                  {/* Inner square */}
                  <rect x="90" y="90" width="120" height="120" />
                  {/* Diagonals */}
                  <line x1="10"  y1="10"  x2="90"  y2="90"  />
                  <line x1="290" y1="10"  x2="210" y2="90"  />
                  <line x1="10"  y1="290" x2="90"  y2="210" />
                  <line x1="290" y1="290" x2="210" y2="210" />
                  {/* Middle cross lines */}
                  <line x1="150" y1="10"  x2="150" y2="90"  />
                  <line x1="150" y1="210" x2="150" y2="290" />
                  <line x1="10"  y1="150" x2="90"  y2="150" />
                  <line x1="210" y1="150" x2="290" y2="150" />
                  {/* House labels */}
                  {[
                    { x: 150, y: 58,  h: "1" }, { x: 245, y: 58,  h: "12" },
                    { x: 265, y: 150, h: "11" },{ x: 245, y: 245, h: "10" },
                    { x: 150, y: 260, h: "9"  },{ x: 55,  y: 245, h: "8"  },
                    { x: 35,  y: 150, h: "7"  },{ x: 55,  y: 58,  h: "6"  },
                    { x: 110, y: 110, h: "5"  },{ x: 190, y: 110, h: "2"  },
                    { x: 190, y: 195, h: "3"  },{ x: 110, y: 195, h: "4"  },
                  ].map(({ x, y, h }) => (
                    <text key={h} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                      style={{ fill: "rgba(28,15,6,0.35)", fontSize: 10, fontFamily: "Montserrat", strokeWidth: 0 }}>
                      {h}
                    </text>
                  ))}
                  {/* Planet dots in lagna house */}
                  <circle cx="150" cy="42" r="3" style={{ fill: "#E8426A", strokeWidth: 0 }} />
                </svg>
              </div>

              {/* Planet positions table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full font-body text-xs">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(154,107,0,0.12)" }}>
                      {["Planet", "Rashi", "House"].map((h) => (
                        <th key={h} className="text-left py-2 pr-4 text-deep/40 font-semibold uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLANETS.map((p) => (
                      <tr key={p.name} style={{ borderBottom: "1px solid rgba(154,107,0,0.06)" }}>
                        <td className="py-2 pr-4 text-deep/80 font-medium">{p.name}</td>
                        <td className="py-2 pr-4 text-deep/55">{p.rashi}</td>
                        <td className="py-2 text-deep/55">{p.house}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right — Compatibility */}
        <div className="space-y-5">

          {/* Score ring */}
          <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <p className="font-devanagari text-gold/60 text-sm mb-3">गुण मिलान</p>
            <div className="relative w-32 h-32 mx-auto mb-3">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(28,15,6,0.07)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="url(#goldGrad)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9A6B00" />
                    <stop offset="100%" stopColor="#C89020" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold text-gold">{totalScore}</span>
                <span className="font-body text-xs text-deep/40">of {totalMax}</span>
              </div>
            </div>
            <h3 className="font-display text-lg font-semibold text-deep">Excellent Match</h3>
            <p className="font-body text-xs text-deep/45 mt-1">Above 26 points — auspicious for marriage</p>
          </div>

          {/* Guna breakdown */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <h3 className="font-display text-base font-semibold text-deep mb-4">Ashtakoot Gunas</h3>
            <div className="space-y-2.5">
              {gunas.map((g) => {
                const pct = (g.score / g.max) * 100;
                const isOpen = expanded === g.name;
                return (
                  <div key={g.name}>
                    <button
                      className="w-full flex items-center gap-3"
                      onClick={() => setExpanded(isOpen ? null : g.name)}
                      style={{ minHeight: "auto" }}
                    >
                      <span className="font-body text-xs font-semibold text-deep/70 w-16 text-left">{g.name}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(28,15,6,0.07)" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct === 100 ? "linear-gradient(90deg,#5C7A52,#8DB870)" : "linear-gradient(90deg,#9A6B00,#C89020)" }} />
                      </div>
                      <span className="font-body text-xs text-deep/50 w-10 text-right">{g.score}/{g.max}</span>
                      {isOpen ? <ChevronUp className="w-3 h-3 text-deep/30 flex-shrink-0" /> : <ChevronDown className="w-3 h-3 text-deep/30 flex-shrink-0" />}
                    </button>
                    {isOpen && (
                      <p className="font-body text-xs text-deep/45 mt-1 ml-16">{g.desc}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Doshas */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <h3 className="font-display text-base font-semibold text-deep mb-3">Dosha Check</h3>
            <div className="space-y-2">
              {[
                { name: "Manglik Dosha", status: "none",    label: "Not Present" },
                { name: "Nadi Dosha",    status: "partial", label: "Partial — cancellation applies" },
                { name: "Bhakoot Dosha", status: "none",    label: "Not Present" },
              ].map(({ name, status, label }) => (
                <div key={name} className="flex items-center gap-2">
                  {status === "none"
                    ? <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                    : <AlertCircle className="w-4 h-4 text-gold flex-shrink-0" />}
                  <div>
                    <span className="font-body text-xs font-semibold text-deep/70">{name}</span>
                    <span className="font-body text-xs text-deep/40 ml-2">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Astrologer CTA */}
          <div
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: "rgba(196,82,15,0.06)", border: "1px solid rgba(154,107,0,0.18)" }}
          >
            <Moon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-body text-sm font-semibold text-deep mb-1">Book Astrologer Consultation</p>
              <p className="font-body text-xs text-deep/50 mb-2">Platinum plan includes 2 consultations/month with certified Jyotish pandits.</p>
              <button
                className="px-4 py-2 rounded-full font-body text-xs font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#9A6B00,#C89020)", minHeight: "auto" }}
              >
                Upgrade to Platinum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
