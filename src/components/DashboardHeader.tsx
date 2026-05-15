"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, Flame, Terminal, Zap } from "lucide-react";

export default function DashboardHeader() {
  const [greeting, setGreeting] = useState("Welcome back");
  const [userName, setUserName] = useState("User");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [streak, setStreak] = useState(0);
  const [focusToday, setFocusToday] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 17) setGreeting("Good afternoon");
      else if (hour < 21) setGreeting("Good evening");
      else setGreeting("Good night");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const savedName = localStorage.getItem("ascend_name");
    if (savedName) setUserName(savedName);

    // Streak
    const focusDates: string[] = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      if (focusDates.includes(ds)) s++;
      else if (i !== 0) break;
    }
    setStreak(s);

    // Focus time
    const stats = JSON.parse(localStorage.getItem("ascend_stats") || "{}");
    setFocusToday(Math.round((stats.workTime || 0) / 60));

    // XP
    const xp = JSON.parse(localStorage.getItem("ascend_xp_total") || "0");
    setTotalXP(xp);

    const handleProfileUpdate = () => {
      const updatedName = localStorage.getItem("ascend_name");
      if (updatedName) setUserName(updatedName);
    };
    window.addEventListener("ascend_profile_updated", handleProfileUpdate);
    return () => {
      clearInterval(interval);
      window.removeEventListener("ascend_profile_updated", handleProfileUpdate);
    };
  }, []);

  const openSettings = () => window.dispatchEvent(new Event("ascend_open_settings"));
  const openCommandMenu = () => window.dispatchEvent(new Event("ascend_open_command_menu"));

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between gap-4 py-2"
    >
      {/* Left: Greeting + Stats */}
      <div className="flex items-center gap-4 min-w-0">
        <h1 className="text-lg md:text-xl font-semibold text-white tracking-tight shrink-0 flex items-center gap-2">
          {greeting}, <span 
            onClick={openSettings}
            className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-rose-400 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-all font-['Outfit']"
            title="Click to change name"
          >{userName}</span>
        </h1>

        {/* Inline stats */}
        <div className="hidden md:flex items-center gap-2">
          {currentTime && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-[#a1a1aa] tabular-nums">
              <Clock size={10} className="text-[var(--color-accent)]" />
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
          )}
          {streak > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/15 text-[10px] font-mono font-bold text-orange-400 tabular-nums">
              <Flame size={10} />
              {streak}d
            </div>
          )}
          {focusToday > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-[10px] font-mono font-bold text-emerald-400 tabular-nums">
              <Terminal size={10} />
              {focusToday}m
            </div>
          )}
          {totalXP > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/15 text-[10px] font-mono font-bold text-violet-400 tabular-nums">
              <Zap size={10} />
              {totalXP.toLocaleString()} XP
            </div>
          )}
        </div>
      </div>

      {/* Right: Action */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openCommandMenu}
        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-bold text-xs tracking-wide uppercase shrink-0 shadow-[0_8px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all"
      >
        <Plus size={14} strokeWidth={3} />
        <span className="hidden sm:inline">New Objective</span>
      </motion.button>
    </motion.header>
  );
}
