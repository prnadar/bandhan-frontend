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
    <div className="min-h-screen bg-mesh flex">
      {/* ── Sidebar ── */}
      <aside
        className="fixed top-0 left-0 h-full w-64 z-40 flex flex-col"
        style={{
          background: "rgba(250,246,238,0.96)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(154,107,0,0.14)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(154,107,0,0.12)" }}>
          <Link href="/dashboard" className="flex items-center gap-2.5" style={{ minHeight: "auto" }}>
            <Heart className="w-5 h-5 text-rose fill-rose" />
            <span className="font-display text-xl font-semibold text-deep">Match4Marriage</span>
          </Link>
        </div>

        {/* Profile mini */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(154,107,0,0.10)" }}>
          <Link href="/profile/me" className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-rose/5 transition-colors" style={{ minHeight: "auto" }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}
            >
              P
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-deep truncate">Prabhakar S.</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3 text-sage" />
                <span className="font-body text-xs text-sage font-medium">Trust Score: 84</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-deep/30 flex-shrink-0" />
          </Link>
        </div>

        {/* Gold plan badge */}
        <div className="px-4 pt-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(196,82,15,0.07)", border: "1px solid rgba(154,107,0,0.15)" }}
          >
            <StarIcon className="w-3 h-3 text-gold fill-gold" />
            <span className="font-body text-xs font-bold text-gold">Gold Plan</span>
            <span className="ml-auto font-body text-[10px] text-deep/35">Active</span>
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
                style={{ minHeight: "auto" }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-150 ${
                  active
                    ? "text-rose bg-rose/10"
                    : "text-deep/55 hover:text-deep hover:bg-rose/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span
                    className="text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#E8426A,#FF8FA3)" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t space-y-0.5" style={{ borderColor: "rgba(154,107,0,0.10)" }}>
          {[
            { href: "/notifications", label: "Notifications", icon: Bell,     badge: 2 },
            { href: "/settings",      label: "Settings",      icon: Settings          },
          ].map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{ minHeight: "auto" }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium transition-colors ${
                  active ? "text-rose bg-rose/10" : "text-deep/50 hover:text-deep hover:bg-rose/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{label}</span>
                {badge !== undefined && (
                  <span className="text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ background: "#E8426A" }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-deep/40 hover:text-red-500 hover:bg-red-50 transition-colors" style={{ minHeight: "auto" }}>
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
