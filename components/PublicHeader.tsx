"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/nri-hub", label: "NRI Hub" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-white" style={{ borderBottom: "1px solid rgba(220,30,60,0.12)" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", minHeight: "auto" }}>
          <Heart className="w-5 h-5" style={{ color: "#dc1e3c" }} />
          <span style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "20px", fontWeight: 700, color: "#1a0a14" }}>
            Match<span style={{ color: "#dc1e3c" }}>4</span>Marriage
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: pathname === href ? "#dc1e3c" : "rgba(26,10,20,0.65)",
                textDecoration: "none",
                minHeight: "auto",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link href="/auth/login" style={{ fontSize: "14px", fontWeight: 600, color: "#dc1e3c", textDecoration: "none", minHeight: "auto" }}>
            Sign In
          </Link>
          <Link
            href="/auth/register"
            style={{
              fontSize: "13px", fontWeight: 600,
              padding: "9px 20px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg,#dc1e3c,#a0153c)",
              color: "#fff",
              textDecoration: "none",
              minHeight: "auto",
            }}
          >
            Register Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
