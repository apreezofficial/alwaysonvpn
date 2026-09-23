import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlwaysOnVPN (常時接続) — Built Simple, Fast, and Always On for Android",
  description:
    "You must have used other VPNs, but this is different. It's always on. Your real location never slips. Featherweight APK launching in 2 days.",
  keywords: [
    "AlwaysOnVPN",
    "Android VPN",
    "Always On VPN APK",
    "Zero Leak VPN",
    "WireGuard Android",
    "常時接続VPN",
  ],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08090c] text-[#e6edf3] antialiased selection:bg-cyan-400 selection:text-black min-h-screen relative font-sans">
        {children}
      </body>
    </html>
  );
}
