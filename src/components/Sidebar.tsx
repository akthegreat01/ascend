"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Timer, CheckSquare, BarChart3, Search, Command, Activity, Swords, Target, BookHeart, Palette, Sparkles, Trophy, DollarSign, FileText, Music, Globe, Smile, Bookmark, Dumbbell, Sunrise, Grid3X3, Network, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SettingsModal from "./SettingsModal";

const navGroups = [
  {
    label: "Core",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Daily Briefing", href: "/briefing", icon: Sunrise },
      { name: "Focus Timer", href: "/timer", icon: Timer },
      { name: "Focus Sounds", href: "/focus-sounds", icon: Music },
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
      { name: "Priority Matrix", href: "/priority", icon: Grid3X3 },
      { name: "Neural Map", href: "/map", icon: Network },
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
      { name: "Mood Tracker", href: "/mood", icon: Smile },
      { name: "Workout Log", href: "/workout", icon: Dumbbell },
    ]
  },
  {
    label: "Reflect",
    items: [
      { name: "Journal", href: "/journal", icon: BookHeart },
      { name: "Evolution", href: "/evolution", icon: Swords },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ]
  },
  {
    label: "Assets",
    items: [
      { name: "Wealth Matrix", href: "/wealth", icon: DollarSign },
      { name: "Neural Notes", href: "/notes", icon: FileText },
      { name: "Reading List", href: "/reading", icon: Bookmark },
    ]
  },
  {
    label: "Integrations",
    items: [
      { name: "Organise Stuff", href: "/ecosystem", icon: Globe },
    ]
  },
  {
    label: "Social",
    items: [
      { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    ]
  },
  {
    label: "Learn",
    items: [
      { name: "Guides", href: "/learn", icon: BookHeart },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [name, setName] = useState("Akshath");

  useEffect(() => {
    const loadProfile = () => {
      const savedName = localStorage.getItem("nexus_name");
      if (savedName) setName(savedName);
      
      const savedTheme = localStorage.getItem("nexus_theme");
      if (savedTheme) {
        document.documentElement.style.setProperty('--color-accent', savedTheme);
      }
    };
    
    loadProfile();
    window.addEventListener("nexus_profile_updated", loadProfile);
    return () => window.removeEventListener("nexus_profile_updated", loadProfile);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#ffffff0a] bg-[#050505]/80 backdrop-blur-xl flex flex-col pt-6 pb-6 px-4 z-50">
      
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8 relative group cursor-pointer">
        <div className="absolute -inset-2 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 blur-xl pointer-events-none" />
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-white to-gray-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] group-hover:scale-105 transition-all duration-300 relative z-10">
          <span className="text-black font-black text-xl leading-none tracking-tighter">A</span>
        </div>
        <span className="text-lg font-bold tracking-[0.2em] text-white font-['Outfit'] relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-300">ASCEND</span>
      </div>

      {/* Global Search Mockup */}
      <div className="mb-6 px-1">
        <button className="w-full flex items-center justify-between px-3 py-2 bg-[#111] border border-[#ffffff10] rounded-lg text-sm text-[#a1a1aa] hover:border-[#ffffff20] hover:text-white transition-all group">
          <div className="flex items-center gap-2">
            <Search size={14} className="group-hover:text-white transition-colors" />
            <span>Search...</span>
          </div>
          <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
            <Command size={12} />
            <span className="text-[10px] font-medium">K</span>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-6 px-1 overflow-y-auto custom-scrollbar pr-1">
        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            <h4 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#a1a1aa]/40 mb-2">
              {group.label}
            </h4>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative px-3 py-2 rounded-lg flex items-center gap-3 group transition-all duration-200 hover:bg-[#ffffff06]">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-[#ffffff0a] rounded-lg border border-[#ffffff05]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon size={14} className={`relative z-10 transition-colors ${isActive ? "text-white" : "text-[#a1a1aa] group-hover:text-white"}`} />
                  <span className={`relative z-10 text-xs font-medium transition-colors ${isActive ? "text-white" : "text-[#a1a1aa] group-hover:text-white"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>



      {/* Bottom Profile & Settings */}
      <div className="mt-auto pt-4 border-t border-[#ffffff0a] px-1 space-y-1">
        
        <SettingsModal />
        
        <button 
          onClick={() => window.dispatchEvent(new Event("nexus_open_settings"))}
          className="w-full px-3 py-3 rounded-xl flex items-center gap-3 group transition-all hover:bg-white/[0.03] mt-2 border border-transparent hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
          
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-rose-600 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_var(--color-accent)]/40 group-hover:scale-105 relative z-10">
            <span className="text-xs font-black text-white uppercase">{name.substring(0, 1)}</span>
          </div>
          <div className="flex flex-col items-start overflow-hidden relative z-10">
            <span className="text-sm font-bold text-white truncate w-full group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{name}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="text-[9px] text-[var(--color-accent)] font-black uppercase tracking-[0.1em]">Pro Elite</span>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
