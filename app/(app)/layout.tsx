"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/profile/me",   label: "Profile Overview", icon: "person_pin"    },
  { href: "/dashboard",    label: "Dashboard",        icon: "dashboard"     },
  { href: "/matches",      label: "Matches",          icon: "favorite"      },
  { href: "/interests",    label: "Interests",        icon: "volunteer_activism" },
  { href: "/messages",     label: "Messages",         icon: "chat_bubble"   },
  { href: "/nri-hub",      label: "NRI Hub",          icon: "public"        },
  { href: "/family",       label: "Family Mode",      icon: "family_restroom" },
  { href: "/subscription", label: "Subscription",     icon: "credit_card"   },
];

const bottomItems = [
  { href: "/notifications", label: "Notifications", icon: "notifications" },
  { href: "/settings",      label: "Settings",      icon: "settings"      },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <div className="flex min-h-screen" style={{ background: "#fff8f8" }}>
      {/* ── Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col gap-2 w-72 h-screen fixed left-0 top-0 pt-24 z-40"
        style={{ background: "#fff0f5" }}
      >
        {/* Profile mini */}
        <div className="px-8 mb-8">
          <Link href="/profile/me" className="flex items-center gap-4 mb-4" style={{ minHeight: "auto" }}>
            <div
              className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #b4002a, #dc1e3c)" }}
            >
              P
            </div>
            <div>
              <p className="font-headline font-bold text-sm" style={{ color: "#920020" }}>
                Editorial Profile
              </p>
              <p className="text-xs" style={{ color: "#281621", opacity: 0.6 }}>
                85% Completed
              </p>
            </div>
          </Link>
          <Link
            href="/subscription"
            className="w-full block py-3 px-4 text-center text-xs font-bold text-white rounded-xl shadow-md"
            style={{
              background: "linear-gradient(to right, #b4002a, #dc1e3c)",
              minHeight: "auto",
            }}
          >
            Upgrade to Premium
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col font-body font-medium text-sm flex-1">
          {navItems.map(({ href, label, icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 py-4 transition-all ${
                  active
                    ? "bg-white text-red-800 rounded-l-full ml-4 pl-6 font-bold"
                    : "text-on-surface opacity-60 hover:opacity-100 hover:bg-white/50 pl-10"
                }`}
                style={{ minHeight: "auto", textDecoration: "none" }}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="flex flex-col pb-4" style={{ borderTop: "1px solid rgba(229,189,188,0.3)" }}>
          {bottomItems.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 py-4 transition-all ${
                  active
                    ? "bg-white text-red-800 rounded-l-full ml-4 pl-6 font-bold"
                    : "text-on-surface opacity-60 hover:opacity-100 hover:bg-white/50 pl-10"
                }`}
                style={{ minHeight: "auto", textDecoration: "none" }}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                <span className="font-body font-medium text-sm">{label}</span>
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex items-center gap-3 pl-10 py-4 text-sm transition-all opacity-60 hover:opacity-100"
            style={{ minHeight: "auto", textDecoration: "none", color: "#ba1a1a" }}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="font-body font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* ── Glassmorphism Header ── */}
        <header
          className="fixed top-0 w-full lg:w-[calc(100%-18rem)] lg:ml-72 z-50 flex justify-between items-center px-8 h-20"
          style={{
            background: "rgba(255,248,248,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center" style={{ minHeight: "auto" }}>
            <img
              src="/images/logo.jpeg"
              alt="Match4Marriage"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Top nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/matches", label: "Matches" },
              { href: "/messages", label: "Messages" },
            ].map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-headline font-bold text-lg transition-opacity duration-300 ${
                    active
                      ? "text-red-800 border-b-2 border-red-800"
                      : "text-on-surface opacity-70 hover:opacity-100"
                  }`}
                  style={{ minHeight: "auto", textDecoration: "none" }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="relative" style={{ minHeight: "auto" }}>
              <span className="material-symbols-outlined text-red-700">notifications</span>
              <span
                className="absolute -top-1 -right-1.5 text-[10px] font-bold text-white rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: "#dc1e3c" }}
              >
                2
              </span>
            </Link>
            <Link href="/settings" style={{ minHeight: "auto" }}>
              <span className="material-symbols-outlined text-red-700">settings</span>
            </Link>
            <Link href="/profile/me" style={{ minHeight: "auto" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                  border: "2px solid rgba(220,30,60,0.3)",
                }}
              >
                P
              </div>
            </Link>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 pt-24">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer style={{ background: "#281621", padding: "32px" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-red-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  <span className="font-headline text-lg font-bold text-white">Match4Marriage</span>
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                  Elite Indian Matrimony<br />United Kingdom
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Quick Links
                </p>
                {[
                  { label: "My Profile", href: "/profile/me" },
                  { label: "Browse Matches", href: "/matches" },
                  { label: "Messages", href: "/messages" },
                  { label: "Subscription", href: "/subscription" },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-[13px] mb-1.5 transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", minHeight: "auto" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Support */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Support
                </p>
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Settings", href: "/settings" },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-[13px] mb-1.5 transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", minHeight: "auto" }}
                  >
                    {label}
                  </Link>
                ))}
                <a
                  href="mailto:enquiry@match4marriage.com"
                  className="block text-[13px]"
                  style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                >
                  enquiry@match4marriage.com
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                &copy; {new Date().getFullYear()} Match4Marriage. All rights reserved.
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                Made with love
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 flex justify-around items-center z-50"
        style={{ background: "#fff0f5", backdropFilter: "blur(12px)" }}
      >
        {[
          { href: "/dashboard", icon: "dashboard" },
          { href: "/matches", icon: "favorite" },
          { href: "/messages", icon: "chat_bubble" },
          { href: "/profile/me", icon: "person" },
        ].map(({ href, icon }) => (
          <Link key={href} href={href} style={{ minHeight: "auto" }}>
            <span
              className={`material-symbols-outlined ${isActive(href) ? "text-primary" : "opacity-60"}`}
            >
              {icon}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
