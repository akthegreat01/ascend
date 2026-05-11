"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Cpu } from "lucide-react";

export default function AscendQuotient() {
  const [aq, setAq] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const calculateAQ = () => {
    const today = new Date().toISOString().split("T")[0];
    let score = 0;

    // 1. Habits (Max 30 points)
    const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
    const habits = JSON.parse(localStorage.getItem("ascend_habits") || "[]");
    if (habits.length > 0) {
      let done = 0;
      habits.forEach((h: any) => {
        if (habitRecords[h.id]?.[today]) done++;
      });
      score += (done / habits.length) * 30;
    }

    // 2. Tasks (Max 30 points)
    const tasks = JSON.parse(localStorage.getItem("ascend_premium_tasks") || "[]");
    const tasksToday = tasks.filter((t: any) => t.date === today || t.completedAt?.startsWith(today));
    if (tasksToday.length > 0) {
      const completed = tasksToday.filter((t: any) => t.completed || t.status === "done").length;
      score += (completed / tasksToday.length) * 30;
    }

    // 3. Focus (Max 20 points)
    const focusDates = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
    if (focusDates.includes(today)) score += 20;

    // 4. Journaling & Wellness (Max 20 points)
    const journal = JSON.parse(localStorage.getItem("ascend_journal") || "[]");
    if (journal.some((j: any) => j.date === today)) score += 10;
    
    const wellness = JSON.parse(localStorage.getItem("ascend_wellness") || "{}");
    if (wellness.date === today && wellness.water >= 6) score += 10;

    setAq(Math.round(score));
  };

  useEffect(() => {
    calculateAQ();
    setIsLoaded(true);
    
    const events = ["ascend_habit_updated", "ascend_task_updated", "ascend_focus_updated", "ascend_journal_updated", "ascend_wellness_updated"];
    events.forEach(e => window.addEventListener(e, calculateAQ));
    return () => events.forEach(e => window.removeEventListener(e, calculateAQ));
  }, []);

  if (!isLoaded) return null;

  let status = "System Offline";
  let color = "text-[#a1a1aa]";
  let glow = "rgba(161, 161, 170, 0.2)";

  if (aq >= 90) { status = "Transcendence"; color = "text-rose-500"; glow = "rgba(244, 63, 94, 0.4)"; }
  else if (aq >= 70) { status = "High Performance"; color = "text-emerald-400"; glow = "rgba(52, 211, 153, 0.4)"; }
  else if (aq >= 40) { status = "Standard Operation"; color = "text-blue-400"; glow = "rgba(96, 165, 250, 0.4)"; }
  else if (aq > 0) { status = "Low Output"; color = "text-amber-400"; glow = "rgba(251, 191, 36, 0.4)"; }

  return (
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-white/5 to-transparent blur-3xl -z-10" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
            <Cpu size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">Ascend Quotient</h3>
            <p className="text-[10px] text-[#a1a1aa] uppercase tracking-[0.2em] font-black">{status}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest block mb-1">Efficiency</span>
          <div className="flex items-center gap-1.5 justify-end">
            <TrendingUp size={12} className={color} />
            <span className={`text-xs font-bold ${color}`}>{aq}%</span>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center py-4">
        {/* Large Circular Gauge Placeholder / Design */}
        <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
                <circle 
                    cx="80" cy="80" r="70" 
                    fill="none" stroke="currentColor" strokeWidth="4" 
                    className="text-white/5"
                />
                <motion.circle 
                    cx="80" cy="80" r="70" 
                    fill="none" stroke="currentColor" strokeWidth="4" 
                    strokeDasharray="440"
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * aq) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={color}
                    style={{ filter: `drop-shadow(0 0 8px ${glow})` }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-thin font-['Outfit'] text-white tabular-nums">{aq}</span>
                <span className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-[0.3em]">AQ Index</span>
            </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest font-bold">Neural Load</span>
            <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-white" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${Math.min(100, aq * 1.2)}%` }} 
                />
            </div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
            <Shield size={14} className={color} />
            <p className="text-[11px] text-[#a1a1aa] leading-snug">
                {aq > 80 ? "Your system is operating at peak capacity. Maintain flow state." : "Identify and eliminate bottlenecks to increase execution velocity."}
            </p>
        </div>
      </div>
    </div>
  );
}
