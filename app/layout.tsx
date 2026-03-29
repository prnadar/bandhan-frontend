import type { Metadata, Viewport } from "next";
import QueryProvider from "@/lib/providers/query-provider";
import Preloader from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Match4Marriage — Find Your Perfect Match",
    template: "%s | Match4Marriage",
  },
  description:
    "UK's most trusted Indian matrimonial service. Connect with verified, compatible profiles from families who share your values.",
  keywords: ["matrimonial", "Indian marriage", "match4marriage", "wedding", "UK Indian matrimony", "find a match"],
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
    description: "UK's most trusted Indian matrimonial service for families.",
  },
};

export const viewport: Viewport = {
  themeColor: "#b4002a",
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
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Preloader />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
