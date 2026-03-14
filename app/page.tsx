"use client";

import Link from "next/link";
import {
  Shield,
  Brain,
  Lock,
  Smartphone,
  Users,
  Globe,
  ArrowRight,
  Star,
  CheckCircle,
  Heart,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-mesh min-h-screen text-deep overflow-x-hidden">
      {/* ── Floating Navbar ──────────────────────────────────────────── */}
      <nav className="navbar-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-marigold fill-marigold" aria-hidden="true" />
            <span className="font-display text-xl font-semibold tracking-wide text-deep">
              Bandhan
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Features",    href: "#features"    },
              { label: "How it Works",href: "#how-it-works"},
              { label: "Kundali",     href: "/kundali-match" },
              { label: "Pricing",     href: "/pricing"     },
              { label: "NRI Hub",     href: "#nri-hub"     },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-body text-sm text-deep/50 hover:text-deep transition-colors duration-200"
                style={{ minHeight: "auto" }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-ghost text-sm px-5 py-2.5" style={{ minHeight: "auto" }}>
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm px-5 py-2.5" style={{ minHeight: "auto" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">

        {/* Decorative glow orbs — warm marigold tones */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(196,82,15,0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(154,107,0,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden="true"
        />

        {/* Trust pill */}
        <div className="premium-badge mb-8 text-xs tracking-widest uppercase">
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          India's Most Trusted Matrimony Platform
        </div>

        {/* Hindi tagline */}
        <p className="font-devanagari text-gold text-lg mb-4 tracking-widest">
          बंधन · The Sacred Bond
        </p>

        {/* Main heading */}
        <h1
          className="font-display font-light text-deep leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", maxWidth: "900px" }}
        >
          Find Your{" "}
          <span className="text-gradient-gold font-semibold italic">Life Partner</span>
          <br />
          With Confidence &amp; Joy
        </h1>

        <p
          className="font-body text-deep/55 mb-10 font-light leading-relaxed"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", maxWidth: "600px" }}
        >
          AI-powered compatibility. Government-grade verification.
          Cultural depth — for modern India and the global diaspora.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/auth/register" className="btn-primary text-base px-9 py-4">
            Begin Your Journey
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link href="/dashboard" className="btn-ghost text-base px-9 py-4">
            View Matches
          </Link>
        </div>

        {/* Stats row */}
        <div className="glass-card px-8 py-6 flex flex-col sm:flex-row gap-8 sm:gap-16 text-center">
          {[
            { value: "2M+", label: "Verified Profiles" },
            { value: "50K+", label: "Engagements Facilitated" },
            { value: "28", label: "States Covered" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map(({ value, label }, i) => (
            <div key={label} className="relative">
              {i > 0 && (
                <div
                  className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-px h-8 bg-gold/20"
                  aria-hidden="true"
                />
              )}
              <p className="font-display font-semibold text-3xl text-gradient-gold">{value}</p>
              <p className="font-body text-xs text-deep/40 mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold mx-auto" style={{ maxWidth: "600px" }} />

      {/* ── Trust & Authority ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-deep/45 hover:text-deep/75 transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-gold" aria-hidden="true" />
                <span className="font-body text-xs tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-gold text-xs tracking-widest uppercase mb-4">Why Bandhan</p>
            <h2
              className="font-display font-light text-deep leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Not just another matrimony site.
              <br />
              <span className="text-gradient-gold italic font-semibold">A platform built for trust.</span>
            </h2>
          </div>

          {/* Bento-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ title, description, icon: Icon, accent }, i) => (
              <div
                key={title}
                className={`glass-card-hover p-8 group ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: accent }}
                >
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-deep mb-3">{title}</h3>
                <p className="font-body text-sm text-deep/50 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-gold text-xs tracking-widest uppercase mb-4">The Journey</p>
            <h2
              className="font-display font-light text-deep"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              From first profile to{" "}
              <span className="text-gradient-marigold italic font-semibold">lifelong bond</span>
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="glass-card p-6 flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold text-marigold"
                  style={{
                    background: "linear-gradient(135deg, rgba(196,82,15,0.15), rgba(154,107,0,0.10))",
                    border: "1px solid rgba(154,107,0,0.28)",
                  }}
                >
                  {step}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-deep mb-1">{title}</h3>
                  <p className="font-body text-sm text-deep/50 leading-relaxed">{description}</p>
                </div>
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-gold/50 ml-auto mt-0.5" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kundali Match CTA ────────────────────────────────────────── */}
      <section id="kundali" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(154,107,0,0.08),rgba(196,82,15,0.1))", border: "1px solid rgba(154,107,0,0.22)" }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left text */}
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-body text-xs font-bold text-gold uppercase tracking-widest">Free Kundali Matching</span>
                </div>
                <h2 className="font-display font-light text-deep mb-3" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
                  Check your <span className="text-gradient-gold italic font-semibold">Kundali compatibility</span> in minutes
                </h2>
                <p className="font-body text-deep/50 text-sm leading-relaxed mb-6">
                  Traditional Vedic Ashtakoot Guna Milan — 36-point compatibility check, Dosha analysis, and a full PDF report sent to your phone & email. Completely free.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "36-point Ashtakoot Guna scoring",
                    "Manglik, Nadi & Bhakoot dosha check",
                    "Full PDF report on WhatsApp & email",
                    "No account needed — 100% free",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                      <span className="font-body text-sm text-deep/65">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kundali-match"
                  className="inline-flex items-center gap-2 rounded-full font-body text-base font-semibold text-white px-8 py-4 self-start"
                  style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", boxShadow: "0 6px 24px rgba(196,82,15,0.38)", minHeight: "auto" }}
                >
                  <Star className="w-4 h-4" /> Match Kundali Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right preview card */}
              <div className="p-10 md:p-14 flex items-center justify-center" style={{ background: "rgba(250,246,238,0.6)" }}>
                <div className="w-full max-w-xs">
                  <p className="font-devanagari text-gold/60 text-sm text-center mb-3">गुण मिलान</p>
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(28,15,6,0.07)" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#heroKundGrad)" strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * 0.14}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="heroKundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#9A6B00" />
                          <stop offset="100%" stopColor="#C89020" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-3xl font-bold text-gold">31</span>
                      <span className="font-body text-xs text-deep/40">of 36</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {["Varna", "Vashya", "Tara", "Yoni", "Graha Maitri", "Gana", "Rashi", "Nadi"].map((g, i) => {
                      const widths = [100, 100, 100, 75, 100, 83, 86, 75];
                      return (
                        <div key={g} className="flex items-center gap-2">
                          <span className="font-body text-[10px] text-deep/50 w-20 flex-shrink-0">{g}</span>
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(28,15,6,0.07)" }}>
                            <div className="h-full rounded-full" style={{ width: `${widths[i]}%`, background: widths[i] === 100 ? "linear-gradient(90deg,#5C7A52,#8DB870)" : "linear-gradient(90deg,#9A6B00,#C89020)" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-16"
            style={{
              background: "linear-gradient(135deg, rgba(242,235,216,0.95) 0%, rgba(250,246,238,0.98) 100%)",
              border: "1px solid rgba(154,107,0,0.28)",
              boxShadow: "0 8px 48px rgba(196,82,15,0.10)",
            }}
          >
            <Heart className="w-10 h-10 text-marigold mx-auto mb-6 fill-marigold/25" aria-hidden="true" />
            <h2
              className="font-display font-light text-deep mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Your story begins{" "}
              <span className="text-gradient-gold italic font-semibold">today</span>
            </h2>
            <p className="font-body text-deep/50 text-sm mb-10 max-w-md mx-auto leading-relaxed">
              Join 2 million verified profiles. Free forever — upgrade when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-gold text-base px-10 py-4">
                Create Free Profile
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="#features" className="btn-ghost text-base px-10 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="py-12 px-6">
        <div className="divider-gold mb-12" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-marigold fill-marigold/50" aria-hidden="true" />
            <span className="font-display text-deep/60">Bandhan</span>
            <span className="font-devanagari text-deep/30 text-sm ml-2">बंधन</span>
          </div>
          <p className="font-body text-xs text-deep/30 text-center">
            © 2026 Bandhan. PDPB Compliant · Data residency in India · Signal Protocol E2E encryption
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Safety"].map((link) => (
              <a key={link} href="#" className="font-body text-xs text-deep/30 hover:text-deep/60 transition-colors duration-200 cursor-pointer">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const trustItems = [
  { label: "Aadhaar Verified", icon: Shield },
  { label: "Signal Protocol E2E Encryption", icon: Lock },
  { label: "PDPB Compliant", icon: CheckCircle },
  { label: "99.9% Uptime SLA", icon: Star },
  { label: "24hr Fraud Resolution", icon: Shield },
  { label: "10 Regional Languages", icon: Globe },
];

const features = [
  {
    icon: Shield,
    title: "Government-Grade Trust",
    description:
      "Aadhaar + PAN verification, photo liveness checks, and a 100-point trust score on every profile. Fake profiles resolved within 24 hours.",
    accent: "linear-gradient(135deg, #5C7A52, #3D5C35)",
  },
  {
    icon: Brain,
    title: "AI Compatibility Engine",
    description:
      "60-question psychometric assessment across 5 dimensions. 5 curated daily matches — not 500 irrelevant ones.",
    accent: "linear-gradient(135deg, #C4520F, #9A3E0A)",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Signal Protocol E2E encryption. Blurred contacts until mutual interest. Watermarked photos. Your data stays in India.",
    accent: "linear-gradient(135deg, #9A6B00, #7A5200)",
  },
  {
    icon: Smartphone,
    title: "Bharat Mode",
    description:
      "Works on 2G. 10 regional languages. APK under 8MB. Bandhan is for every Indian, not just metro elites.",
    accent: "linear-gradient(135deg, #E06A1A, #C4520F)",
  },
  {
    icon: Users,
    title: "Family-First Design",
    description:
      "Family browsing mode, Kundali matching, and joint session management — respecting how Indian families actually search.",
    accent: "linear-gradient(135deg, #C4520F, #5C7A52)",
  },
  {
    icon: Globe,
    title: "NRI & Diaspora Hub",
    description:
      "Dedicated section for UK, US, UAE, Canada, Australia. Timezone-aware scheduling. Currency-appropriate pricing.",
    accent: "linear-gradient(135deg, #9A6B00, #C89020)",
  },
];

const steps = [
  {
    step: "1",
    title: "Create your profile",
    description:
      "Sign up with your phone number. Complete your personality quiz and upload verified photos in under 12 minutes.",
  },
  {
    step: "2",
    title: "Get verified",
    description:
      "Aadhaar + PAN verification, photo liveness check. Your trust score is calculated and displayed to potential matches.",
  },
  {
    step: "3",
    title: "Receive 5 daily matches",
    description:
      "Every morning at 6 AM IST, our AI surfaces your 5 most compatible matches — curated, not overwhelmed.",
  },
  {
    step: "4",
    title: "Connect with confidence",
    description:
      "Express interest, chat with Signal Protocol encryption, video call — all without sharing personal contact details.",
  },
];
