"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Timer, CheckSquare, BarChart3, Search, Command, Activity, Swords, Target, BookHeart, Palette, Sparkles, Trophy, DollarSign, FileText, Music, Globe, Smile, Bookmark, Dumbbell, Sunrise, Grid3X3, Zap, Scale, Play } from "lucide-react";
import { motion } from "framer-motion";
import SettingsModal from "./SettingsModal";

const navGroups = [
  {
    label: "Core",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Daily Briefing", href: "/briefing", icon: Sunrise },
      { name: "Focus Timer", href: "/timer", icon: Timer },
      { name: "Focus Schedule", href: "/schedule", icon: Grid3X3 },
      { name: "Focus Sounds", href: "/focus-sounds", icon: Music },
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
    ]
  },
  {
    label: "Growth",
    items: [
      { name: "Habits", href: "/habits", icon: Activity },
      { name: "Hobbies", href: "/hobbies", icon: Palette },
      { name: "Goals", href: "/goals", icon: Target },
      { name: "Vision Board", href: "/vision", icon: Sparkles },
    ]
  },
  {
    label: "Wellness",
    items: [
      { name: "Health Tracker", href: "/health", icon: Scale },
      { name: "Mood Tracker", href: "/mood", icon: Smile },
      { name: "Workout Log", href: "/workout", icon: Dumbbell },
    ]
  },
  {
    label: "Reflect",
    items: [
      { name: "Journal", href: "/journal", icon: BookHeart },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ]
  },
  {
    label: "Assets",
    items: [
      { name: "Wealth Tracker", href: "/wealth", icon: DollarSign },
      { name: "Media Vault", href: "/vault", icon: Play },
      { name: "Notes", href: "/notes", icon: FileText },
      { name: "Reading List", href: "/reading", icon: Bookmark },
    ]
  },
  {
    label: "Integrations",
    items: [
      { name: "Digital Ecosystem", href: "/ecosystem", icon: Globe },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [name, setName] = useState("Akshath");

  useEffect(() => {
    const loadProfile = () => {
      const savedName = localStorage.getItem("ascend_name");
      if (savedName) setName(savedName);
      
      const savedTheme = localStorage.getItem("ascend_theme");
      if (savedTheme) {
        document.documentElement.style.setProperty('--color-accent', savedTheme);
      }
    };
    
    loadProfile();
    window.addEventListener("ascend_profile_updated", loadProfile);
    return () => window.removeEventListener("ascend_profile_updated", loadProfile);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/[0.03] bg-[#050505]/90 backdrop-blur-3xl flex flex-col pt-8 pb-6 px-5 z-50 transition-all duration-500">
      
      {/* Brand */}
      <div className="flex items-center gap-3.5 px-2 mb-10 relative group cursor-pointer">
        <div className="absolute -inset-3 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-700 blur-2xl pointer-events-none" />
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-white to-gray-400 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-all duration-500 relative z-10">
          <span className="text-black font-black text-xl leading-none tracking-tighter">A</span>
        </div>
        <span className="text-[15px] font-black tracking-[0.25em] text-white font-['Outfit'] relative z-10 group-hover:tracking-[0.3em] transition-all duration-500">ASCEND</span>
      </div>

      {/* Global Search Mockup */}
      <div className="mb-8 px-1">
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border border-white/[0.05] rounded-xl text-sm text-[#a1a1aa] hover:border-white/[0.1] hover:bg-white/[0.05] hover:text-white transition-all group shadow-sm">
          <div className="flex items-center gap-3">
            <Search size={14} className="group-hover:text-[var(--color-accent)] transition-colors" />
            <span className="text-xs font-medium">Quick search...</span>
          </div>
          <div className="flex items-center gap-1 opacity-30 group-hover:opacity-100 transition-opacity">
            <Command size={10} />
            <span className="text-[10px] font-bold">K</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-8 px-1 overflow-y-auto custom-scrollbar pr-2">
        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1.5">
            <h4 className="px-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#a1a1aa]/30 mb-3">
              {group.label}
            </h4>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative px-3 py-2.5 rounded-xl flex items-center gap-3.5 group transition-all duration-300 hover:bg-white/[0.04]">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white/[0.05] rounded-xl border border-white/[0.05] shadow-lg shadow-black/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-r-full shadow-[0_0_10px_white]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon size={16} className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-[#a1a1aa] group-hover:text-white"}`} />
                  <span className={`relative z-10 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-white" : "text-[#a1a1aa] group-hover:text-white"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Profile & Settings */}
      <div className="mt-auto pt-6 border-t border-white/[0.05] px-1 space-y-2">
        
        <SettingsModal />
        
        <button 
          onClick={() => window.dispatchEvent(new Event("ascend_open_settings"))}
          className="w-full px-3 py-3.5 rounded-2xl flex items-center gap-3.5 group transition-all duration-500 hover:bg-white/[0.04] mt-2 border border-transparent hover:border-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-rose-600 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_25px_var(--color-accent)]/50 group-hover:scale-105 relative z-10">
            <span className="text-sm font-black text-white uppercase">{name.substring(0, 1)}</span>
          </div>
          <div className="flex flex-col items-start overflow-hidden relative z-10">
            <span className="text-sm font-bold text-white truncate w-full group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">{name}</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] animate-pulse" />
              <span className="text-[9px] text-[var(--color-accent)] font-black uppercase tracking-[0.15em]">Elite Tier</span>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
