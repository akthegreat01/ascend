"use client";

import { motion } from "framer-motion";
import { Activity, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export default function ActivityHeatmap() {
  const [dates, setDates] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedDates = localStorage.getItem("ascend_focus_dates");
    if (savedDates) {
      const parsed = JSON.parse(savedDates);
      setDates(parsed);
      
      let currentStreak = 0;
      const today = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        if (parsed.includes(dateStr)) {
          currentStreak++;
        } else if (i !== 0) {
          break;
        }
      }
      setStreak(currentStreak);
    }
  }, []);

  const generateGrid = () => {
    const grid = [];
    const today = new Date();
    
    // Generate last 28 days (4 weeks)
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isActive = dates.includes(dateStr);
      
      grid.push(
        <div 
          key={dateStr}
          title={dateStr}
          className={`w-4 h-4 rounded-sm transition-all duration-300 ${
            isActive 
              ? 'bg-[var(--color-accent)] shadow-[0_0_5px_var(--color-accent)]' 
              : 'bg-[#1a1a1a] border border-[#ffffff0a] hover:border-[#ffffff30]'
          }`}
        />
      );
    }
    return grid;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col group hover:border-[var(--color-accent)]/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="font-medium text-white">Execution Heatmap</h3>
            <p className="text-xs text-[#a1a1aa]">Last 28 Days</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500">
          <Flame size={12} className={streak > 0 ? "animate-pulse" : ""} />
          <span className="text-xs font-bold">{streak} Day Streak</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center overflow-x-auto custom-scrollbar pb-2">
        <div className="flex gap-2 mx-auto min-w-max">
          {generateGrid()}
        </div>
      </div>
    </motion.div>
  );
}
