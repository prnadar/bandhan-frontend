"use client";

import { useState } from "react";
import { Crown, Check, Zap, Shield, ArrowRight, CreditCard, RefreshCw, AlertCircle, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

const CURRENT_PLAN = "gold";

const plans = [
  {
    id: "free",      name: "Freemium", price: 0,    priceLabel: "Forever free",
    color: "rgba(28,15,6,0.05)", border: "rgba(28,15,6,0.12)",
    highlights: ["5 daily matches", "3 interests/month", "AI compatibility score"],
  },
  {
    id: "silver",    name: "Silver",   price: 999,  priceLabel: "/month",
    color: "rgba(154,107,0,0.05)", border: "rgba(154,107,0,0.2)",
    highlights: ["20 interests/month", "Direct messaging (20 threads)", "1 contact/day"],
  },
  {
    id: "gold",      name: "Gold",     price: 2499, priceLabel: "/month",
    color: "rgba(196,82,15,0.07)", border: "rgba(196,82,15,0.3)",
    popular: true,
    highlights: ["Unlimited interests", "Unlimited messaging", "Kundali matching", "Video calling"],
  },
  {
    id: "platinum",  name: "Platinum", price: 7999, priceLabel: "/month",
    color: "rgba(15,118,110,0.05)", border: "rgba(15,118,110,0.22)",
    highlights: ["Dedicated relationship manager", "Background verification", "Astrologer (2/mo)", "Privacy shield"],
  },
];

const currentBillingHistory = [
  { date: "Feb 1, 2026",  plan: "Gold",   amount: "₹2,499", status: "Paid",   id: "INV-2026-002" },
  { date: "Jan 1, 2026",  plan: "Gold",   amount: "₹2,499", status: "Paid",   id: "INV-2026-001" },
  { date: "Dec 1, 2025",  plan: "Silver", amount: "₹999",   status: "Paid",   id: "INV-2025-012" },
  { date: "Nov 1, 2025",  plan: "Silver", amount: "₹999",   status: "Paid",   id: "INV-2025-011" },
];

const CREDITS = [
  { label: "Profile Boosts",   used: 4,  total: 8,  unit: "this month" },
  { label: "Contact Views",    used: 12, total: 999, unit: "unlimited"  },
  { label: "Interests Sent",   used: 23, total: 999, unit: "unlimited"  },
  { label: "Message Threads",  used: 8,  total: 999, unit: "unlimited"  },
];

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [confirmCancel, setConfirmCancel] = useState(false);

  const currentPlan = plans.find((p) => p.id === CURRENT_PLAN)!;
  const annualDiscount = 0.8;

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="w-5 h-5 text-gold" />
        <h1 className="font-display text-3xl font-light text-deep">Subscription</h1>
      </div>

      {/* Current plan banner */}
      <div className="rounded-3xl p-6 mb-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(196,82,15,0.1),rgba(154,107,0,0.15))", border: "1px solid rgba(196,82,15,0.3)" }}>
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-xs font-bold text-rose uppercase tracking-widest">Current Plan</span>
                <span className="font-body text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}>Active</span>
              </div>
              <h2 className="font-display text-3xl font-semibold text-deep">Gold Plan</h2>
              <p className="font-body text-sm text-deep/50 mt-1">Renews on April 1, 2026 · ₹2,499/month</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                className="px-4 py-2 rounded-full font-body text-sm font-medium text-deep/60 hover:text-deep transition-colors"
                style={{ border: "1px solid rgba(28,15,6,0.15)", minHeight: "auto" }}
                onClick={() => setConfirmCancel(true)}
              >
                Cancel Plan
              </button>
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)", minHeight: "auto" }}
              >
                Upgrade to Platinum <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Usage */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {CREDITS.map((c) => {
              const pct = c.total === 999 ? 0 : (c.used / c.total) * 100;
              return (
                <div key={c.label} className="rounded-xl p-3" style={{ background: "rgba(250,246,238,0.7)", border: "1px solid rgba(154,107,0,0.12)" }}>
                  <p className="font-body text-[10px] text-deep/40 uppercase tracking-wider mb-1">{c.label}</p>
                  <p className="font-display text-xl font-bold text-deep">
                    {c.total === 999 ? "∞" : `${c.used}/${c.total}`}
                  </p>
                  {c.total !== 999 && (
                    <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "rgba(28,15,6,0.07)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#E8426A,#FF8FA3)" }} />
                    </div>
                  )}
                  <p className="font-body text-[9px] text-deep/30 mt-1">{c.unit}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cancel confirmation */}
      {confirmCancel && (
        <div className="rounded-2xl p-5 mb-6 flex items-start gap-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-red-500 mb-1">Cancel your Gold Plan?</p>
            <p className="font-body text-xs text-red-400/70 mb-3">You'll lose unlimited messaging, Kundali matching, and video calling on April 1, 2026.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmCancel(false)}
                className="px-4 py-2 rounded-full font-body text-xs font-semibold text-deep/60"
                style={{ border: "1px solid rgba(28,15,6,0.14)", minHeight: "auto" }}
              >
                Keep Plan
              </button>
              <button
                className="px-4 py-2 rounded-full font-body text-xs font-semibold text-white"
                style={{ background: "#EF4444", minHeight: "auto" }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan comparison */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-deep">All Plans</h2>
          <div className="flex items-center gap-1 p-1 rounded-full" style={{ background: "rgba(196,82,15,0.07)", border: "1px solid rgba(154,107,0,0.12)" }}>
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-4 py-1.5 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: billing === b ? "linear-gradient(135deg,#E8426A,#FF8FA3)" : "transparent",
                  color: billing === b ? "#fff" : "rgba(28,15,6,0.5)",
                  minHeight: "auto",
                }}
              >
                {b === "monthly" ? "Monthly" : "Annual"}{b === "annual" && <span className="ml-1 text-[10px] opacity-80">–20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {plans.map((plan) => {
            const isCurrent = plan.id === CURRENT_PLAN;
            const price = billing === "annual" && plan.price > 0 ? Math.round(plan.price * annualDiscount) : plan.price;
            return (
              <div
                key={plan.id}
                className="rounded-2xl p-4 flex flex-col relative"
                style={{
                  background: plan.color,
                  border: `1.5px solid ${isCurrent ? "#E8426A" : plan.border}`,
                  boxShadow: isCurrent ? "0 4px 20px rgba(196,82,15,0.15)" : "none",
                }}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full font-body text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}>
                    <CheckCircle className="w-2.5 h-2.5" /> Current
                  </div>
                )}
                <h3 className="font-display text-base font-semibold text-deep mb-1">{plan.name}</h3>
                <div className="mb-3">
                  {plan.price === 0
                    ? <p className="font-display text-xl font-bold text-deep">Free</p>
                    : <p className="font-display text-xl font-bold text-deep">₹{price.toLocaleString("en-IN")}<span className="font-body text-xs text-deep/40">/mo</span></p>}
                </div>
                <ul className="space-y-1.5 flex-1 mb-3">
                  {plan.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-sage flex-shrink-0 mt-0.5" />
                      <span className="font-body text-[11px] text-deep/60">{h}</span>
                    </li>
                  ))}
                </ul>
                {!isCurrent && (
                  <button
                    className="w-full py-2 rounded-xl font-body text-xs font-semibold transition-all"
                    style={{
                      background: plan.id === "platinum" ? "linear-gradient(135deg,#0F766E,#0D9488)" :
                                  plan.id === "gold"     ? "linear-gradient(135deg,#E8426A,#FF8FA3)" :
                                  plan.id === "silver"   ? "linear-gradient(135deg,#9A6B00,#C89020)" :
                                  "rgba(28,15,6,0.08)",
                      color: plan.id === "free" ? "#1A0A12" : "#fff",
                      minHeight: "auto",
                    }}
                  >
                    {plan.id === "free" ? "Downgrade" : plan.price > currentPlan.price ? "Upgrade" : "Switch"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-gold" />
            <h3 className="font-display text-base font-semibold text-deep">Payment Method</h3>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <div className="w-10 h-7 rounded flex items-center justify-center font-bold text-xs text-white" style={{ background: "#1A1F71" }}>VISA</div>
            <div className="flex-1">
              <p className="font-body text-sm text-deep font-medium">•••• •••• •••• 4242</p>
              <p className="font-body text-xs text-deep/40">Expires 12/2027</p>
            </div>
            <CheckCircle className="w-4 h-4 text-sage" />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-xl font-body text-xs font-medium text-deep/55 hover:text-deep transition-colors" style={{ border: "1px solid rgba(28,15,6,0.12)", minHeight: "auto" }}>
              Add UPI
            </button>
            <button className="flex-1 py-2 rounded-xl font-body text-xs font-medium text-deep/55 hover:text-deep transition-colors" style={{ border: "1px solid rgba(28,15,6,0.12)", minHeight: "auto" }}>
              Change Card
            </button>
          </div>
        </div>

        {/* Billing history */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}>
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-gold" />
            <h3 className="font-display text-base font-semibold text-deep">Billing History</h3>
          </div>
          <div className="space-y-2">
            {currentBillingHistory.map((inv) => (
              <div key={inv.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-body text-xs font-medium text-deep/70">{inv.date}</p>
                  <p className="font-body text-[10px] text-deep/35">{inv.plan} · {inv.id}</p>
                </div>
                <span className="font-body text-sm font-semibold text-deep">{inv.amount}</span>
                <span className="font-body text-xs font-semibold px-2 py-0.5 rounded-full text-sage" style={{ background: "rgba(92,122,82,0.1)" }}>{inv.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Money back guarantee */}
      <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "rgba(92,122,82,0.07)", border: "1px solid rgba(92,122,82,0.18)" }}>
        <Shield className="w-8 h-8 text-sage flex-shrink-0" />
        <div>
          <p className="font-body text-sm font-semibold text-sage">30-day money-back guarantee</p>
          <p className="font-body text-xs text-sage/70 mt-0.5">Not happy? Contact us within 30 days for a full refund — no questions asked.</p>
        </div>
      </div>
    </div>
  );
}
