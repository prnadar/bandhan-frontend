"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

const plans = [
  {
    name: "Basic",
    price: "£100",
    period: "/ 6 months",
    badge: null,
    highlighted: false,
    features: ["5 daily matches", "3 interests / month", "View profiles", "AI compatibility score", "Basic search filters"],
    cta: "Get Started",
    ctaHref: "/auth/register",
  },
  {
    name: "Premium",
    price: "£300",
    period: "/ 6 months",
    badge: "Most Popular",
    highlighted: true,
    features: ["Unlimited daily matches", "Unlimited interests", "Direct messaging", "Photo access", "Advanced search filters", "AI compatibility score", "Priority listing"],
    cta: "Choose Premium",
    ctaHref: "/auth/register",
  },
  {
    name: "Elite",
    price: "£1,000",
    period: "/ 6 months",
    badge: null,
    highlighted: false,
    features: ["Everything in Premium", "Dedicated relationship advisor", "Background verification", "Privacy shield", "Featured profile placement", "WhatsApp support", "Profile boosting (4× / month)", "Horoscope matching", "Family background check"],
    cta: "Choose Elite",
    ctaHref: "/auth/register",
  },
  {
    name: "VIP Concierge",
    price: "Bespoke",
    period: "tailored to you",
    badge: "✦ VIP",
    highlighted: false,
    vip: true,
    features: ["Everything in Elite", "Personal matchmaker assigned", "Curated hand-picked profiles", "1-on-1 strategy call", "Profile photography consultation", "Family liaison service", "Unlimited profile boosts", "24/7 WhatsApp concierge support"],
    cta: "📅 Schedule a Call",
    ctaHref: "mailto:enquiry@match4marriage.com?subject=VIP Concierge Package Enquiry",
  },
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "var(--font-poppins, sans-serif)" }}>
      <PublicHeader />

      {/* Hero image banner */}
      <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
        <img
          src="/images/about-hero.jpg"
          alt="Match4Marriage couple"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,10,20,0.45), rgba(26,10,20,0.75))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#dc1e3c", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px", display: "block" }}>Membership Plans</span>
          <h1 style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#fff", margin: 0 }}>
            Invest in Your Forever
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", marginTop: "12px" }}>
            Transparent pricing · No hidden fees · Cancel anytime
          </p>
        </div>
      </div>

      {/* Plans section */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "72px 24px" }}>

        {/* Subtitle */}
        <p style={{ textAlign: "center", fontSize: "16px", color: "#888", marginBottom: "56px", lineHeight: 1.7 }}>
          Choose the plan that fits your journey. Upgrade or cancel any time.
        </p>

        {/* Plan cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px", alignItems: "start" }}>
          {plans.map((plan) => {
            const isVip = (plan as any).vip === true;
            return (
            <div
              key={plan.name}
              style={{
                position: "relative",
                borderRadius: "20px",
                padding: "36px 32px",
                border: isVip ? "2px solid rgba(200,144,32,0.6)" : plan.highlighted ? "2px solid #dc1e3c" : "1px solid rgba(220,30,60,0.12)",
                background: isVip ? "linear-gradient(160deg,#1a0a14,#2d0f20)" : plan.highlighted ? "linear-gradient(160deg,#fff5f7,#fff)" : "#fdfbf9",
                boxShadow: isVip ? "0 8px 32px rgba(200,144,32,0.2)" : plan.highlighted ? "0 8px 40px rgba(220,30,60,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)",
                  background: isVip ? "linear-gradient(135deg,#C89020,#9A6B00)" : "linear-gradient(135deg,#dc1e3c,#a0153c)",
                  color: "#fff", fontSize: "12px", fontWeight: 700,
                  padding: "5px 20px", borderRadius: "9999px", whiteSpace: "nowrap",
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <p style={{ fontSize: "12px", fontWeight: 700, color: isVip ? "#C89020" : "#dc1e3c", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "28px" }}>
                <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: isVip ? "36px" : "52px", fontWeight: 700, color: isVip ? "#C89020" : "#1a0a14", lineHeight: 1 }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: "14px", color: isVip ? "rgba(200,144,32,0.7)" : "#aaa", fontWeight: 400 }}>{plan.period}</span>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: isVip ? "rgba(200,144,32,0.2)" : "rgba(220,30,60,0.1)", marginBottom: "24px" }} />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: isVip ? "rgba(255,255,255,0.75)" : "#444" }}>
                    <span style={{
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: isVip ? "rgba(200,144,32,0.15)" : "rgba(220,30,60,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke={isVip ? "#C89020" : "#dc1e3c"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                style={{
                  display: "block", textAlign: "center",
                  padding: "14px 24px", borderRadius: "12px",
                  fontSize: "15px", fontWeight: 700,
                  textDecoration: "none",
                  background: isVip ? "linear-gradient(135deg,#C89020,#9A6B00)" : plan.highlighted ? "linear-gradient(135deg,#dc1e3c,#a0153c)" : "transparent",
                  color: isVip ? "#1a0a14" : plan.highlighted ? "#fff" : "#dc1e3c",
                  border: isVip || plan.highlighted ? "none" : "2px solid #dc1e3c",
                  boxShadow: isVip ? "0 4px 20px rgba(200,144,32,0.35)" : plan.highlighted ? "0 4px 20px rgba(220,30,60,0.3)" : "none",
                }}
              >
                {plan.cta}
              </Link>
            </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", marginTop: "36px", fontSize: "13px", color: "#bbb" }}>
          🔒 Secure payment · Cancel anytime · GDPR compliant
        </p>
      </div>

      <PublicFooter />
    </div>
  );
}
