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
  { href: "/matches",           label: "Browse Profiles",  icon: Heart    },
  { href: "/success-stories",   label: "Success Stories",  icon: StarIcon },
  { href: "/interests",    label: "Interests",     icon: Star, badge: 6  },
  { href: "/messages",     label: "Messages",      icon: MessageCircle, badge: 3 },
  { href: "/nri-hub",      label: "NRI Hub",       icon: Globe           },
  { href: "/family",       label: "Family Mode",   icon: Users           },
  { href: "/subscription", label: "Subscription",  icon: CreditCard      },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ background: "#fdfbf9" }}>
      {/* ── Sidebar ── */}
      <aside
        className="fixed top-0 left-0 h-full w-64 z-40 flex flex-col"
        style={{
          background: "linear-gradient(160deg, #1a0a14 0%, #2d0f20 60%, #3b1428 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Link href="/dashboard" className="flex items-center gap-2.5" style={{ minHeight: "auto" }}>
            <img src="/images/logo.jpeg" alt="Match4Marriage" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
          </Link>
        </div>

        {/* Profile mini */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <Link href="/profile/me" className="flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors" style={{ minHeight: "auto" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#dc1e3c,#a0153c)" }}
            >
              P
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold truncate" style={{ color: "#ffffff" }}>Prabhakar S.</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3" style={{ color: "#8DB870" }} />
                <span className="font-body text-xs font-medium" style={{ color: "#8DB870" }}>Trust Score: 84</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} />
          </Link>
        </div>

        {/* Gold plan badge */}
        <div className="px-4 pt-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(200,144,32,0.12)", border: "1px solid rgba(200,144,32,0.25)" }}
          >
            <StarIcon className="w-3 h-3" style={{ color: "#C89020", fill: "#C89020" }} />
            <span className="font-body text-xs font-bold" style={{ color: "#C89020" }}>Gold Plan</span>
            <span className="ml-auto font-body text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Active</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
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
                  padding: "10px 12px",
                  borderRadius: "12px",
                  fontFamily: "var(--font-poppins, sans-serif)",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.15s ease",
                  background: active ? "rgba(220,30,60,0.20)" : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span
                    className="text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#dc1e3c,#a0153c)" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 space-y-0.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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
                  padding: "10px 12px",
                  borderRadius: "12px",
                  fontFamily: "var(--font-poppins, sans-serif)",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.15s ease",
                  background: active ? "rgba(220,30,60,0.20)" : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span className="text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ background: "#dc1e3c" }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors" style={{ minHeight: "auto", color: "rgba(255,100,100,0.7)", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ff6b6b"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,80,80,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,100,100,0.7)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col" style={{ background: "#fdfbf9" }}>

        {/* ── Top Header ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(253,251,249,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(220,30,60,0.10)",
          padding: "0 32px",
          height: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Brand */}
          <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", minHeight: "auto" }}>
            <img src="/images/logo.jpeg" alt="Match4Marriage" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
          </Link>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/notifications" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", color: "#1a0a14", minHeight: "auto" }}>
              <Bell className="w-5 h-5" style={{ color: "rgba(26,10,20,0.55)" }} />
              <span style={{
                position: "absolute", top: "-4px", right: "-6px",
                background: "#dc1e3c", color: "#fff",
                fontSize: "10px", fontWeight: 700,
                width: "16px", height: "16px",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>2</span>
            </Link>
            <Link href="/messages" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", minHeight: "auto" }}>
              <MessageCircle className="w-5 h-5" style={{ color: "rgba(26,10,20,0.55)" }} />
              <span style={{
                position: "absolute", top: "-4px", right: "-6px",
                background: "#dc1e3c", color: "#fff",
                fontSize: "10px", fontWeight: 700,
                width: "16px", height: "16px",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>3</span>
            </Link>
            <Link href="/profile/me" style={{ textDecoration: "none", minHeight: "auto" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: "13px",
              }}>P</div>
            </Link>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: "1px solid rgba(220,30,60,0.10)",
          background: "#1a0a14",
          padding: "32px",
        }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              {/* Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Heart className="w-4 h-4" style={{ color: "#dc1e3c" }} />
                  <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "18px", fontWeight: 700, color: "#fff" }}>Match4Marriage</span>
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                  Elite Indian Matrimony<br />United Kingdom
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Quick Links</p>
                {[
                  { label: "My Profile", href: "/profile/me" },
                  { label: "Browse Matches", href: "/matches" },
                  { label: "Messages", href: "/messages" },
                  { label: "Subscription", href: "/subscription" },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "6px", minHeight: "auto" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#fff"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >{label}</Link>
                ))}
              </div>

              {/* Support */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Support</p>
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Settings", href: "/settings" },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "6px", minHeight: "auto" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#fff"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >{label}</Link>
                ))}
                <a href="mailto:enquiry@match4marriage.com" style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "6px" }}>
                  ✉️ enquiry@match4marriage.com
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                © {new Date().getFullYear()} Match4Marriage. All rights reserved.
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                Made with ❤️ for love
              </p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
