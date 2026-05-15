import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Ascend Focus | Premium Life Operating System & Productivity Platform",
  description: "Ascend Focus is a premium, content-rich productivity platform helping you master focus, discipline, and personal growth. Track habits, manage goals, and learn deep work techniques with our scientifically-backed OS.",
  keywords: "productivity platform, focus app, discipline building, deep work techniques, habit tracker, goal setting, personal growth blog, dopamine detox, time management, life operating system",
  other: {
    "google-adsense-account": "ca-pub-9046932302377091",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Ascend Focus | Master Your Productivity",
    description: "Level up your focus, discipline, and life with Ascend Focus. The ultimate productivity platform for high performers.",
    type: "website",
    siteName: "Ascend Focus",
    images: [{ url: "/logo.png" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ascend Focus",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased min-h-screen selection:bg-white selection:text-black overflow-x-hidden`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        
        {/* Ad Optimization & Analytics */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9046932302377091" 
          crossOrigin="anonymous" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
