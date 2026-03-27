"use client";

import Link from "next/link";
import { Heart, Check, X, Star, Zap, Shield, ArrowRight, Crown } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

const plans = [
  {
    id: "free",
    name: "Freemium",
    price: 0,
    priceLabel: "Forever free",
    description: "Explore and get verified",
    color: "rgba(28,15,6,0.06)",
    border: "rgba(28,15,6,0.14)",
    cta: "Get Started",
    ctaStyle: { background: "rgba(28,15,6,0.08)", color: "#1A0A12", border: "1px solid rgba(28,15,6,0.18)" },
    features: [
      { text: "Create your profile", included: true },
      { text: "Aadhaar + PAN verification", included: true },
      { text: "View 5 daily matches", included: true },
      { text: "Send 3 interests per month", included: true },
      { text: "AI compatibility score", included: true },
      { text: "Direct messaging", included: false },
      { text: "View contact details", included: false },
      { text: "Unlimited interests", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "silver",
    name: "Premium",
    price: 999,
    priceLabel: "/ month",
    description: "Start meaningful conversations",
    color: "rgba(154,107,0,0.06)",
    border: "rgba(154,107,0,0.22)",
    cta: "Start Silver",
    ctaStyle: { background: "linear-gradient(135deg,#9A6B00,#C89020)", color: "#fff" },
    features: [
      { text: "Everything in Free", included: true },
      { text: "Send 20 interests per month", included: true },
      { text: "Direct messaging (20 threads)", included: true },
      { text: "AI compatibility score", included: true },
      { text: "View 1 contact detail / day", included: true },
      { text: "Advanced filters", included: true },
      { text: "Unlimited interests", included: false },
      { text: "Profile boost", included: false },
      { text: "Dedicated relationship manager", included: false },
    ],
  },
  {
    id: "gold",
    name: "Elite",
    price: 2499,
    priceLabel: "/ month",
    description: "The full Match4Marriage experience",
    popular: true,
    color: "rgba(196,82,15,0.07)",
    border: "rgba(196,82,15,0.35)",
    cta: "Start Gold",
    ctaStyle: { background: "linear-gradient(135deg,#E8426A,#FF8FA3)", color: "#fff", boxShadow: "0 4px 20px rgba(196,82,15,0.38)" },
    features: [
      { text: "Everything in Silver", included: true },
      { text: "Unlimited interests", included: true },
      { text: "Unlimited messaging", included: true },
      { text: "View all contact details", included: true },
      { text: "Profile boost (2x weekly)", included: true },
      { text: "Video calling", included: true },
      { text: "Family mode access", included: true },
      { text: "Dedicated relationship manager", included: false },
      { text: "Concierge introductions", included: false },
    ],
  },
  {
    id: "platinum",
    name: "Elite Plus",
    price: 7999,
    priceLabel: "/ month",
    description: "White-glove matrimony service",
    color: "rgba(15,118,110,0.06)",
    border: "rgba(15,118,110,0.25)",
    cta: "Start Platinum",
    ctaStyle: { background: "linear-gradient(135deg,#0F766E,#0D9488)", color: "#fff" },
    features: [
      { text: "Everything in Gold", included: true },
      { text: "Dedicated relationship manager", included: true },
      { text: "Concierge profile introductions", included: true },
      { text: "Background verification", included: true },
      { text: "In-person meeting coordination", included: true },
      { text: "Astrologer consultation (2/mo)", included: true },
      { text: "Privacy shield (blurred on browse)", included: true },
      { text: "Custom match criteria", included: true },
      { text: "Success guarantee (or extension)", included: true },
      { text: "Priority on all new features", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-mesh text-deep">
      {/* Navbar */}
      <PublicHeader />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="premium-badge inline-flex mb-6 text-xs tracking-widest uppercase">
            <Crown className="w-3 h-3" />
            Transparent Pricing · No Hidden Fees
          </div>
          <h1 className="font-display font-light text-deep mb-4" style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)" }}>
            Invest in your{" "}
            <span className="text-gradient-gold italic font-semibold">life's most important decision</span>
          </h1>
          <p className="font-body text-deep/50 text-base max-w-xl mx-auto">
            Start free forever. Upgrade only when you're ready to connect deeper.
          </p>

          {/* Toggle annual/monthly */}
          <div className="inline-flex items-center gap-3 mt-6 px-2 py-2 rounded-full" style={{ background: "rgba(196,82,15,0.07)", border: "1px solid rgba(154,107,0,0.15)" }}>
            <button className="font-body text-sm font-semibold text-white px-4 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", minHeight: "auto" }}>
              Monthly
            </button>
            <button className="font-body text-sm font-medium text-deep/55 px-4 py-1.5 rounded-full" style={{ minHeight: "auto" }}>
              Annual <span className="text-sage font-semibold">–20%</span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl flex flex-col relative overflow-hidden"
              style={{
                background: plan.color,
                border: `1px solid ${plan.border}`,
                boxShadow: plan.popular ? "0 8px 40px rgba(196,82,15,0.14)" : "none",
                transform: plan.popular ? "scale(1.02)" : "none",
              }}
            >
              {plan.popular && (
                <div
                  className="flex items-center justify-center gap-1 py-2 font-body text-xs font-bold text-white tracking-wider"
                  style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}
                >
                  <Star className="w-3 h-3 fill-white" />
                  MOST POPULAR
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                {/* Plan header */}
                <div className="mb-5">
                  <h3 className="font-display text-2xl font-semibold text-deep mb-1">{plan.name}</h3>
                  <p className="font-body text-xs text-deep/45">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <p className="font-display text-3xl font-bold text-deep">Free</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-body text-sm text-deep/50">₹</span>
                      <span className="font-display text-3xl font-bold text-deep">{plan.price.toLocaleString("en-IN")}</span>
                      <span className="font-body text-xs text-deep/40">{plan.priceLabel}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included
                        ? <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                        : <X className="w-4 h-4 text-deep/20 flex-shrink-0 mt-0.5" />}
                      <span className={`font-body text-xs leading-relaxed ${f.included ? "text-deep/70" : "text-deep/30"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body text-sm font-semibold py-3 transition-all"
                  style={{ ...plan.ctaStyle, minHeight: "auto" }}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="divider-gold mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
          {[
            { icon: Shield, label: "Money-back guarantee", sub: "30 days, no questions" },
            { icon: Zap,    label: "Cancel anytime",        sub: "No lock-in contracts" },
            { icon: Star,   label: "2M+ profiles",          sub: "Active & verified" },
            { icon: Crown,  label: "50,000+ engagements",   sub: "Facilitated to date" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: "rgba(196,82,15,0.08)" }}>
                <Icon className="w-4 h-4 text-rose" />
              </div>
              <p className="font-body text-sm font-semibold text-deep">{label}</p>
              <p className="font-body text-xs text-deep/40 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="text-center">
          <p className="font-body text-sm text-deep/45">
            Have questions?{" "}
            <a href="#" className="text-rose font-medium hover:underline">Read our FAQ</a>{" "}
            or{" "}
            <a href="#" className="text-rose font-medium hover:underline">chat with us</a>
          </p>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
