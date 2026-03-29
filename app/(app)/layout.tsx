"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Heart, MessageCircle, User, Star, Globe,
  Shield, Bell, Settings, LogOut, ChevronRight, Users, Star as StarIcon,
  CreditCard,
} from "lucide-react";

const navItems = [
  { href: "/profile/me",   label: "My Profile",   icon: User            },
  { href: "/dashboard",    label: "My Matches",   icon: LayoutDashboard },
  { href: "/matches",      label: "Browse",        icon: Heart           },
  { href: "/interests",    label: "Interests",     icon: Star, badge: 6  },
  { href: "/messages",     label: "Messages",      icon: MessageCircle, badge: 3 },
  { href: "/nri-hub",      label: "NRI Hub",       icon: Globe           },
  { href: "/family",       label: "Family Mode",   icon: Users           },
  { href: "/subscription", label: "Subscription",  icon: CreditCard      },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ background: "#fff8f8" }}>
      {/* ── Sidebar ── */}
      <aside
        className="fixed top-0 left-0 h-full w-64 z-40 flex flex-col"
        style={{
          background: "#fff0f5",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px 24px", background: "#ffe8f2" }}>
          <Link href="/dashboard" className="flex items-center gap-2.5" style={{ minHeight: "auto" }}>
            <img src="/images/logo.jpeg" alt="Match4Marriage" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
          </Link>
        </div>

        {/* Profile mini */}
        <div style={{ padding: "16px", background: "rgba(249,218,233,0.3)" }}>
          <Link href="/profile/me" className="flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-colors" style={{ minHeight: "auto" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(180,0,42,0.06)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#b4002a,#dc1e3c)", color: "#ffffff", fontFamily: "'Noto Serif', serif" }}
            >
              P
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "#281621", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Prabhakar S.</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3" style={{ color: "#5C7A52" }} />
                <span className="text-xs font-medium" style={{ color: "#5C7A52", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Trust Score: 84</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(40,22,33,0.25)" }} />
          </Link>
        </div>

        {/* Gold plan badge */}
        <div style={{ padding: "12px 16px 0" }}>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(200,144,32,0.08)" }}
          >
            <StarIcon className="w-3 h-3" style={{ color: "#C89020", fill: "#C89020" }} />
            <span className="text-xs font-bold" style={{ color: "#C89020", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Gold Plan</span>
            <span className="ml-auto text-[10px]" style={{ color: "rgba(40,22,33,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Active</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto" style={{ paddingLeft: "12px" }}>
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  minHeight: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 16px",
                  borderRadius: active ? "9999px 0 0 9999px" : "12px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: active ? "600" : "500",
                  transition: "all 0.15s ease",
                  background: active ? "#ffffff" : "transparent",
                  color: active ? "#b4002a" : "#5c3f3f",
                  textDecoration: "none",
                  marginRight: active ? "0" : "12px",
                }}
                onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(180,0,42,0.06)"; } }}
                onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; } }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span
                    className="text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#b4002a,#dc1e3c)" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="space-y-0.5" style={{ padding: "16px 12px", background: "rgba(249,218,233,0.25)" }}>
          {[
            { href: "/notifications", label: "Notifications", icon: Bell,     badge: 2 },
            { href: "/settings",      label: "Settings",      icon: Settings          },
          ].map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  minHeight: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 16px",
                  borderRadius: active ? "9999px 0 0 9999px" : "12px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: active ? "600" : "500",
                  transition: "all 0.15s ease",
                  background: active ? "#ffffff" : "transparent",
                  color: active ? "#b4002a" : "#5c3f3f",
                  textDecoration: "none",
                  marginRight: active ? "0" : "12px",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(180,0,42,0.06)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span className="text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ background: "#b4002a" }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors" style={{ minHeight: "auto", color: "#b4002a", textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.7 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(180,0,42,0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col" style={{ background: "#fff8f8" }}>

        {/* ── Top Header (Glassmorphism) ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(255,248,248,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "0 32px",
          height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Brand */}
          <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", minHeight: "auto" }}>
            <img src="/images/logo.jpeg" alt="Match4Marriage" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
          </Link>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/notifications" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", color: "#281621", minHeight: "auto" }}>
              <Bell className="w-5 h-5" style={{ color: "#5c3f3f" }} />
              <span style={{
                position: "absolute", top: "-4px", right: "-6px",
                background: "#b4002a", color: "#fff",
                fontSize: "10px", fontWeight: 700,
                width: "16px", height: "16px",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>2</span>
            </Link>
            <Link href="/messages" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", minHeight: "auto" }}>
              <MessageCircle className="w-5 h-5" style={{ color: "#5c3f3f" }} />
              <span style={{
                position: "absolute", top: "-4px", right: "-6px",
                background: "#b4002a", color: "#fff",
                fontSize: "10px", fontWeight: 700,
                width: "16px", height: "16px",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>3</span>
            </Link>
            <Link href="/profile/me" style={{ textDecoration: "none", minHeight: "auto" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "linear-gradient(135deg,#b4002a,#dc1e3c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: "13px",
                fontFamily: "'Noto Serif', serif",
              }}>P</div>
            </Link>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* ── Footer (Light Editorial) ── */}
        <footer style={{
          background: "#f0d2e1",
          padding: "32px",
        }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              {/* Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Heart className="w-4 h-4" style={{ color: "#b4002a" }} />
                  <span style={{ fontFamily: "'Noto Serif', serif", fontSize: "18px", fontWeight: 700, color: "#281621" }}>Match4Marriage</span>
                </div>
                <p style={{ fontSize: "12px", color: "#5c3f3f", lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Elite Indian Matrimony<br />United Kingdom
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#5c3f3f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Links</p>
                {[
                  { label: "My Profile", href: "/profile/me" },
                  { label: "Browse Matches", href: "/matches" },
                  { label: "Messages", href: "/messages" },
                  { label: "Subscription", href: "/subscription" },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} style={{ display: "block", fontSize: "13px", color: "rgba(40,22,33,0.6)", textDecoration: "none", marginBottom: "6px", minHeight: "auto", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#281621"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(40,22,33,0.6)"}
                  >{label}</Link>
                ))}
              </div>

              {/* Support */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#5c3f3f", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Support</p>
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Settings", href: "/settings" },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} style={{ display: "block", fontSize: "13px", color: "rgba(40,22,33,0.6)", textDecoration: "none", marginBottom: "6px", minHeight: "auto", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#281621"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(40,22,33,0.6)"}
                  >{label}</Link>
                ))}
                <a href="mailto:enquiry@match4marriage.com" style={{ display: "block", fontSize: "13px", color: "rgba(40,22,33,0.6)", textDecoration: "none", marginBottom: "6px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  enquiry@match4marriage.com
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ background: "rgba(40,22,33,0.06)", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "12px", color: "rgba(40,22,33,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                © {new Date().getFullYear()} Match4Marriage. All rights reserved.
              </p>
              <p style={{ fontSize: "12px", color: "rgba(40,22,33,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Made with love
              </p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
