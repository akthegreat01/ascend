import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Scratchpad from "@/components/Scratchpad";
import CommandMenu from "@/components/CommandMenu";
import AuraBackground from "@/components/AuraBackground";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import PageTransition from "@/components/PageTransition";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Ascend | Ultimate Life Operating System & Productivity Dashboard",
  description: "Ascend is a premium, all-in-one productivity app and life operating system. Track habits, manage goals, utilize Pomodoro focus timers, and analyze your execution velocity in a cinematic dashboard designed for deep work, flow state, and high performance.",
  keywords: "productivity app, life operating system, habit tracker, pomodoro timer, goal management, deep work, ADHD planner, daily routine, time management, personal dashboard, focus app, task manager",
  openGraph: {
    title: "Ascend | Ultimate Life Operating System",
    description: "Transform your productivity with Ascend. Track habits, goals, and deep work in a premium dashboard.",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ascend OS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased min-h-screen selection:bg-white selection:text-black bg-[#050505]`}>
        <AuraBackground />
        <div className="fixed inset-0 z-50 pointer-events-none noise-overlay mix-blend-overlay"></div>
        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 relative z-10">
            <div className="max-w-[1400px] mx-auto">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </main>
          <Scratchpad />
          <CommandMenu />
          <OnboardingWalkthrough />
        </div>
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
