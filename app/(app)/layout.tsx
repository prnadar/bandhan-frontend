"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Heart, MessageCircle, User, Star, Globe,
  Shield, Bell, Settings, LogOut, ChevronRight, Users, Star as StarIcon,
  BookOpen, CreditCard,
} from "lucide-react";

const navItems = [
  { href: "/dashboard",    label: "My Matches",  icon: LayoutDashboard },
  { href: "/matches",      label: "Browse",       icon: Heart           },
  { href: "/interests",    label: "Interests",    icon: Star, badge: 6  },
  { href: "/messages",     label: "Messages",     icon: MessageCircle, badge: 3 },
  { href: "/kundali",      label: "Kundali",      icon: BookOpen        },
  { href: "/nri-hub",      label: "NRI Hub",      icon: Globe           },
  { href: "/family",       label: "Family Mode",  icon: Users           },
  { href: "/profile/me",   label: "My Profile",   icon: User            },
  { href: "/subscription", label: "Subscription", icon: CreditCard      },
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
            <Heart className="w-5 h-5" style={{ color: "#ffffff" }} />
            <span className="font-display text-xl font-semibold" style={{ color: "#ffffff" }}>Match4Marriage</span>
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
      <main className="flex-1 ml-64 min-h-screen" style={{ background: "#fdfbf9" }}>
        {children}
      </main>
    </div>
  );
}
