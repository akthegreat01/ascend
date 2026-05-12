"use client";

import { motion } from "framer-motion";
import { Briefcase, Monitor, Coffee, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function KPICards() {
  const [stats, setStats] = useState({ workTime: 0, breakTime: 0, activeTime: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const loadStats = () => {
    const statsStr = localStorage.getItem("ascend_stats");
    if (statsStr) {
      setStats(JSON.parse(statsStr));
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadStats();
    window.addEventListener("ascend_stats_updated", loadStats);
    return () => window.removeEventListener("ascend_stats_updated", loadStats);
  }, []);

  const formatHours = (seconds: number) => {
    if (seconds === 0) return "00:00 h";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} h`;
  };

  const calculateConsistency = () => {
    if (typeof window === "undefined") return "0 Days";
    
    const datesStr = localStorage.getItem("ascend_focus_dates");
    if (!datesStr) return "0 Days";
    const dates: string[] = JSON.parse(datesStr);
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      if (dates.includes(dateStr)) {
        streak++;
      } else if (i !== 0) { // If it's not today, and it's missing, streak breaks
        break;
      }
    }
    
    return `${streak} Days`;
  };

  const kpiData = [
    { title: "Work Time", value: formatHours(stats.workTime), trend: "+0.0%", trendUp: true, icon: Briefcase, color: "text-[#66fcf1]", bg: "bg-[#66fcf1]/10" },
    { title: "Active Time", value: formatHours(stats.workTime + stats.breakTime), trend: "+0.0%", trendUp: true, icon: Monitor, color: "text-[#45a29e]", bg: "bg-[#45a29e]/10" },
    { title: "Break Time", value: formatHours(stats.breakTime), trend: "0.0%", trendUp: true, icon: Coffee, color: "text-[#f43f5e]", bg: "bg-[#f43f5e]/10" },
    { title: "Consistency", value: calculateConsistency(), trend: "Streak", trendUp: true, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  if (!isLoaded) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse h-[120px]" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-panel p-6 relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all duration-500 bg-[#0c0c0c]/50 glow-border"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black text-[#a1a1aa]/60 tracking-[0.2em] uppercase">{kpi.title}</span>
            <div className={`p-2.5 rounded-xl ${kpi.bg} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
              <kpi.icon size={18} className={kpi.color} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter font-['Outfit'] tabular-nums group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-500">
              {kpi.value}
            </h3>
            
            {/* Sparkline decoration */}
            <div className="flex items-end gap-[4px] h-10 opacity-20 group-hover:opacity-60 transition-opacity duration-700">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: "20%" }}
                  animate={{ height: ["20%", `${30 + Math.random() * 70}%`, "20%"] }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                  className={`w-1.5 rounded-full ${kpi.color.replace('text-', 'bg-')} shadow-[0_0_15px_currentColor]`}
                />
              ))}
            </div>
          </div>
          {/* Subtle background glow effect on hover */}
          <div className={`absolute -inset-2 opacity-0 group-hover:opacity-5 bg-gradient-to-tr from-${kpi.color.split('-')[1]}-500 to-transparent blur-3xl transition-opacity duration-700 pointer-events-none`} />
        </motion.div>
      ))}
    </div>
  );
}
