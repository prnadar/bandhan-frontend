"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Data ────────────────────────────────────────────────────────────── */

const CURRENT_PLAN = "gold";

const plans = [
  {
    id: "free",
    name: "Basic",
    price: 0,
    priceLabel: "Free forever",
    highlights: [
      "5 daily matches",
      "3 interests / month",
      "View profiles",
      "AI compatibility score",
    ],
  },
  {
    id: "silver",
    name: "Premium",
    price: 100,
    priceLabel: "/ 3 months",
    popular: true,
    highlights: [
      "Unlimited daily matches",
      "Unlimited interests",
      "Direct messaging",
      "Photo access",
      "Advanced search filters",
      "AI compatibility score",
      "Priority listing",
    ],
  },
  {
    id: "gold",
    name: "Elite",
    price: 300,
    priceLabel: "/ 3 months",
    highlights: [
      "Everything in Premium",
      "Dedicated relationship advisor",
      "Background verification",
      "Privacy shield — hide profile from non-members",
      "Featured profile placement",
      "WhatsApp support",
      "Profile boosting (2x / month)",
    ],
  },
];

const currentBillingHistory = [
  { date: "Feb 1, 2026", plan: "Gold", amount: "£300", status: "Paid", id: "INV-2026-002" },
  { date: "Jan 1, 2026", plan: "Gold", amount: "£300", status: "Paid", id: "INV-2026-001" },
  { date: "Dec 1, 2025", plan: "Silver", amount: "£100", status: "Paid", id: "INV-2025-012" },
  { date: "Nov 1, 2025", plan: "Silver", amount: "£100", status: "Paid", id: "INV-2025-011" },
];

const CREDITS = [
  { label: "Profile Boosts", used: 4, total: 8, unit: "this month", icon: "bolt" },
  { label: "Contact Views", used: 12, total: 999, unit: "unlimited", icon: "visibility" },
  { label: "Interests Sent", used: 23, total: 999, unit: "unlimited", icon: "favorite" },
  { label: "Message Threads", used: 8, total: 999, unit: "unlimited", icon: "chat" },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [confirmCancel, setConfirmCancel] = useState(false);

  const currentPlan = plans.find((p) => p.id === CURRENT_PLAN)!;
  const annualDiscount = 0.8;

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-24">

        {/* ── Hero Section: Current Plan ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left column — plan details */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-on-surface">
              Your Subscription
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
              Manage your current standing within the Match4Marriage community
              and track your engagement legacy.
            </p>

            <div className="bg-surface-container-low p-8 rounded-[2rem] space-y-8 editorial-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-1">
                    Active Status
                  </span>
                  <h2 className="font-headline text-3xl text-on-surface">
                    {currentPlan.name} Plan
                  </h2>
                </div>
                <div className="bg-primary-container/10 text-primary px-4 py-2 rounded-xl text-sm font-bold">
                  £{currentPlan.price} {currentPlan.priceLabel}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Next Renewal</span>
                  <span className="font-semibold">July 1, 2026</span>
                </div>
                <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-primary rounded-full" />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmCancel(true)}
                  className="flex-1 py-4 rounded-xl font-bold tracking-wide text-on-surface-variant bg-surface-container-highest/40 hover:bg-surface-container-highest transition-colors"
                >
                  Cancel Plan
                </button>
                <Link
                  href="/pricing"
                  className="flex-1 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold tracking-wide text-center active:scale-95 transition-transform"
                >
                  Manage Renewal
                </Link>
              </div>
            </div>
          </div>

          {/* Right column — usage meters */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CREDITS.map((c) => {
              const isUnlimited = c.total === 999;
              const pct = isUnlimited ? 100 : Math.round((c.used / c.total) * 100);

              return (
                <div
                  key={c.label}
                  className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      {c.icon}
                    </span>
                    <h3 className="font-bold text-sm">{c.label}</h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-headline font-bold">
                      {isUnlimited ? (
                        "Unlimited"
                      ) : (
                        <>
                          {String(c.used).padStart(2, "0")}
                          <span className="text-sm font-body text-on-surface-variant font-normal">
                            /{String(c.total).padStart(2, "0")}
                          </span>
                        </>
                      )}
                    </span>
                    <span className="text-xs text-on-surface-variant mb-1">
                      {isUnlimited ? "Premium feature" : "Monthly allocation"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary-container rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Cancel Confirmation ── */}
        {confirmCancel && (
          <section className="bg-error-container/30 rounded-3xl p-8 space-y-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-error text-3xl">
                warning
              </span>
              <div className="flex-1 space-y-2">
                <h3 className="font-headline text-xl font-bold text-error">
                  Cancel your {currentPlan.name} Plan?
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  You will lose access to all premium features at the end of
                  your current billing cycle. This action can be reversed before
                  the cycle ends.
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setConfirmCancel(false)}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-on-surface bg-surface-container-highest/40 hover:bg-surface-container-highest transition-colors"
                  >
                    Keep Plan
                  </button>
                  <button className="px-6 py-3 rounded-xl font-bold text-sm text-on-error bg-error hover:opacity-90 transition-opacity">
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Plans Comparison ── */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-headline text-4xl font-bold">
              Explore Our Tiers
            </h2>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span
                className={`text-sm font-medium ${
                  billing === "monthly"
                    ? "text-on-surface font-bold"
                    : "opacity-60"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBilling((b) => (b === "monthly" ? "annual" : "monthly"))
                }
                className="w-14 h-8 bg-surface-container-highest rounded-full p-1 flex items-center transition-colors"
                role="switch"
                aria-checked={billing === "annual"}
                aria-label="Toggle annual billing"
              >
                <div
                  className={`w-6 h-6 bg-primary rounded-full transition-transform duration-200 ${
                    billing === "annual" ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-sm ${
                  billing === "annual"
                    ? "font-bold text-primary"
                    : "font-medium opacity-60"
                }`}
              >
                Annual{" "}
                <span className="text-[10px] bg-secondary-container/20 px-2 py-0.5 rounded-full ml-1">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const isCurrent = plan.id === CURRENT_PLAN;
              const isFeatured = plan.popular === true;
              const price =
                billing === "annual" && plan.price > 0
                  ? Math.round(plan.price * annualDiscount)
                  : plan.price;

              return (
                <div
                  key={plan.id}
                  className={`p-10 rounded-[2.5rem] flex flex-col h-full ${
                    isFeatured
                      ? "bg-surface-container-lowest border-2 border-primary relative lg:-translate-y-4 editorial-shadow"
                      : "bg-surface border border-outline-variant/20"
                  }`}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                      Most Preferred
                    </div>
                  )}

                  {/* Current plan badge */}
                  {isCurrent && !isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                      Current Plan
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="font-headline text-2xl mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {plan.price === 0 ? "£0" : `£${price.toLocaleString("en-GB")}`}
                      </span>
                      <span className="text-on-surface-variant text-sm">
                        {plan.price === 0
                          ? "/ forever"
                          : billing === "annual"
                          ? "/ year"
                          : "/ 3 months"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-12 flex-grow">
                    {plan.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-primary text-lg">
                          check
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <button className="w-full py-4 bg-surface-container-highest/40 text-on-surface rounded-xl font-bold cursor-default">
                      Your Current Plan
                    </button>
                  ) : plan.price > currentPlan.price ? (
                    <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold active:scale-95 transition-transform">
                      Upgrade Now
                    </button>
                  ) : (
                    <button className="w-full py-4 border border-outline text-on-surface rounded-xl font-bold hover:bg-surface-container-low transition-colors">
                      {plan.price === 0 ? "Downgrade" : "Switch Plan"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Payment & Billing ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Payment Methods */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-headline text-2xl font-bold">
              Payment Methods
            </h2>
            <div className="space-y-4">
              {/* Existing card */}
              <div className="bg-surface-container-highest/40 p-5 rounded-2xl flex items-center justify-between border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-on-surface rounded flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold italic">
                      VISA
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">---- 4242</p>
                    <p className="text-xs opacity-60">Expires 12/2027</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                  Default
                </span>
              </div>

              {/* Add card */}
              <button className="w-full p-5 rounded-2xl border border-dashed border-outline-variant flex items-center justify-center gap-2 text-sm font-semibold hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
                Add Credit/Debit Card
              </button>

              {/* Add UPI */}
              <button className="w-full p-5 rounded-2xl border border-dashed border-outline-variant flex items-center justify-center gap-2 text-sm font-semibold hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">
                  account_balance
                </span>
                Connect UPI / Bank Account
              </button>
            </div>
          </div>

          {/* Billing History */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="font-headline text-2xl font-bold">
                Billing History
              </h2>
              <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                Download All{" "}
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-outline-variant/10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Description
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-surface-container-lowest divide-y divide-outline-variant/10">
                  {currentBillingHistory.map((inv) => (
                    <tr key={inv.id}>
                      <td className="px-6 py-5 text-sm">{inv.date}</td>
                      <td className="px-6 py-5 text-sm font-medium">
                        {inv.plan} Plan - Quarterly Renewal
                      </td>
                      <td className="px-6 py-5 text-sm">{inv.amount}</td>
                      <td className="px-6 py-5 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                          aria-label={`Download invoice ${inv.id}`}
                        >
                          description
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Heritage Promise ── */}
        <section className="bg-surface-dim/30 rounded-[3rem] p-12 lg:p-20 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <span
              className="material-symbols-outlined text-primary text-6xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <h2 className="font-headline text-4xl font-bold">
              The Heritage Promise
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              We are committed to helping you find your lifelong partner. If you
              don&apos;t find a significant match within your first 90 days of
              Premium or Elite membership, we offer a full money-back guarantee.
              No questions asked, just our commitment to your future.
            </p>
            <div className="pt-6">
              <a
                className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-colors pb-1"
                href="#"
              >
                Read Terms &amp; Conditions
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
