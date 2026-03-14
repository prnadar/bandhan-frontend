import type { Metadata, Viewport } from "next";
import QueryProvider from "@/lib/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bandhan — The Sacred Bond",
    template: "%s | Bandhan",
  },
  description:
    "India's most trusted matrimony platform. AI-powered matching with cultural depth.",
  keywords: ["matrimony", "shaadi", "Indian marriage", "rishta", "bandhan"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bandhan",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Bandhan",
    title: "Bandhan — The Sacred Bond",
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
