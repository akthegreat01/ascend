"use client";

import React, { useState } from 'react';
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Scratchpad from "@/components/Scratchpad";
import CommandMenu from "@/components/CommandMenu";
import AuraBackground from "@/components/AuraBackground";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import PageTransition from "@/components/PageTransition";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { Menu, Zap } from "lucide-react";
import { PremiumProvider } from "@/context/PremiumContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const isMarketingPage = pathname === "/" || pathname.startsWith("/blog") || pathname.startsWith("/about") || pathname.startsWith("/contact") || pathname.startsWith("/privacy") || pathname.startsWith("/terms") || pathname.startsWith("/disclaimer") || pathname.startsWith("/cookie-policy");

  return (
    <PremiumProvider>
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
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <main className="flex-1 lg:ml-64 relative z-10 transition-all duration-500 ease-in-out">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-[40] flex items-center justify-between p-4 bg-black/30 backdrop-blur-[40px] border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-white to-gray-400 flex items-center justify-center">
                  <span className="text-black font-black text-sm">A</span>
                </div>
                <span className="text-xs font-black tracking-widest text-white uppercase">Ascend</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white transition-all active:scale-95"
              >
                <Menu size={20} />
              </button>
            </div>

            <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 xl:p-12 min-h-screen">
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
    </PremiumProvider>
  );
}
