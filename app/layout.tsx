import type { Metadata, Viewport } from "next";
import QueryProvider from "@/lib/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Match4Marriage — Find Your Perfect Match",
    template: "%s | Match4Marriage",
  },
  description:
    "India's most trusted matrimony platform. Connect with verified, compatible profiles from families who share your values.",
  keywords: ["matrimony", "shaadi", "Indian marriage", "rishta", "match4marriage", "wedding"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Match4Marriage",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Match4Marriage",
    title: "Match4Marriage — Find Your Perfect Match",
    description: "India's most trusted matrimony platform for families.",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc1e3c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
