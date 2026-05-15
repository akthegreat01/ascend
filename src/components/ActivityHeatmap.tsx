"use client";

import { motion } from "framer-motion";
import { Activity, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export default function ActivityHeatmap() {
  const [dates, setDates] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const generate = () => {
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
          if (parsed.includes(dateStr)) currentStreak++;
          else if (i !== 0) break;
        }
        setStreak(currentStreak);
      }
    };

    generate();
    window.addEventListener("ascend_stats_updated", generate);
    return () => window.removeEventListener("ascend_stats_updated", generate);
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
          className={`w-3 h-3 rounded-[2px] transition-all duration-300 ${
            isActive ? 'bg-orange-500' : 'bg-white/5'
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
      className="glass-panel p-4 flex flex-col group h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-orange-500" />
          <h3 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Heatmap</h3>
        </div>
        
        {streak > 0 && (
          <div className="flex items-center gap-1">
            <Flame size={10} className="text-orange-500 animate-pulse" />
            <span className="text-[8px] font-mono text-orange-400">{streak}d</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        <div className="grid grid-cols-7 gap-1">
          {generateGrid()}
        </div>
      </div>
    </motion.div>
  );
}
