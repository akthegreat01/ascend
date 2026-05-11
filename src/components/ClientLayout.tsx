"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Scratchpad from "@/components/Scratchpad";
import CommandMenu from "@/components/CommandMenu";
import AuraBackground from "@/components/AuraBackground";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import PageTransition from "@/components/PageTransition";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";

export default function ClientLayout({
  children,
  interVar,
  outfitVar,
}: {
  children: React.ReactNode;
  interVar: string;
  outfitVar: string;
}) {
  const pathname = usePathname();
  const isMarketingPage = pathname === "/" || pathname.startsWith("/blog") || pathname.startsWith("/about") || pathname.startsWith("/contact") || pathname.startsWith("/privacy") || pathname.startsWith("/terms") || pathname.startsWith("/disclaimer") || pathname.startsWith("/cookie-policy");

  return (
    <body className={`${interVar} ${outfitVar} antialiased min-h-screen selection:bg-white selection:text-black bg-[#050505]`}>
      <AuraBackground />
      <div className="fixed inset-0 z-50 pointer-events-none noise-overlay mix-blend-overlay"></div>
      
      {isMarketingPage ? (
        <div className="relative z-10 flex flex-col min-h-screen">
          <MarketingNavbar />
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <MarketingFooter />
        </div>
      ) : (
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
      )}
    </body>
  );
}
