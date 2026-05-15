"use client";

import { motion } from "framer-motion";
import { Briefcase, Monitor, Coffee, Flame } from "lucide-react";
import { useState, useEffect } from "react";

export default function KPICards() {
  const [stats, setStats] = useState({ workTime: 0, breakTime: 0, activeTime: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const loadStats = () => {
    const statsStr = localStorage.getItem("ascend_stats");
    if (statsStr) setStats(JSON.parse(statsStr));
    setIsLoaded(true);
  };

  useEffect(() => {
    loadStats();
    window.addEventListener("ascend_stats_updated", loadStats);
    return () => window.removeEventListener("ascend_stats_updated", loadStats);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "0h 0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const getStreak = () => {
    if (typeof window === "undefined") return 0;
    const datesStr = localStorage.getItem("ascend_focus_dates");
    if (!datesStr) return 0;
    const dates: string[] = JSON.parse(datesStr);
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (dates.includes(dateStr)) streak++;
      else if (i !== 0) break;
    }
    return streak;
  };

  const kpiData = [
    { title: "Focus", value: formatTime(stats.workTime), icon: Briefcase, color: "#5E5CE6" }, // Apple Indigo
    { title: "Active", value: formatTime(stats.workTime + stats.breakTime), icon: Monitor, color: "#0A84FF" }, // Apple Blue
    { title: "Break", value: formatTime(stats.breakTime), icon: Coffee, color: "#FF375F" }, // Apple Pink
    { title: "Streak", value: `${getStreak()}d`, icon: Flame, color: "#FF9F0A" }, // Apple Orange
  ];

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel skeleton h-[72px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpiData.map((kpi, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.4 }}
          className="glass-panel px-4 py-3 flex items-center gap-3 group hover:border-white/[0.12] transition-all duration-300"
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${kpi.color}12`, border: `1px solid ${kpi.color}20` }}
          >
            <kpi.icon size={14} style={{ color: kpi.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-bold text-[#a1a1aa]/60 uppercase tracking-[0.15em] leading-none mb-0.5">{kpi.title}</p>
            <p className="text-lg font-black text-white font-['Outfit'] tabular-nums tracking-tight leading-none">{kpi.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
