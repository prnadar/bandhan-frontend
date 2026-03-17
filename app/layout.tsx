import type { Metadata, Viewport } from "next";
import QueryProvider from "@/lib/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Match4Marriage — The Sacred Bond",
    template: "%s | Match4Marriage",
  },
  description:
    "India's most trusted matrimony platform. AI-powered matching with cultural depth.",
  keywords: ["matrimony", "shaadi", "Indian marriage", "rishta", "match4marriage"],
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
    title: "Match4Marriage — The Sacred Bond",
    description: "Find your life partner with confidence, privacy, and joy.",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B1A1A",
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
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
