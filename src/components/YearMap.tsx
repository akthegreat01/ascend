"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function YearMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    // Read the focus dates from local storage
    const datesStr = localStorage.getItem("ascend_focus_dates");
    const mapData: Record<string, number> = {};
    
    // Override with actual real user data
    if (datesStr) {
      const dates: string[] = JSON.parse(datesStr);
      dates.forEach(d => {
        mapData[d] = (mapData[d] || 0) + 1;
      });
    }
    
    setData(mapData);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="animate-pulse h-[300px] w-full bg-[#0a0a0a] rounded-2xl" />;

  // Generate last 365 days
  const days = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  // Group by weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-[#111111] border-[#ffffff0a]";
    if (count === 1) return "bg-[var(--color-accent)] opacity-40 border-transparent shadow-[0_0_10px_var(--color-accent)]";
    if (count === 2) return "bg-[var(--color-accent)] opacity-70 border-transparent shadow-[0_0_15px_var(--color-accent)]";
    return "bg-[var(--color-accent)] opacity-100 border-transparent shadow-[0_0_20px_var(--color-accent)]";
  };

  return (
    <div className="glass-panel p-6 bg-[#0a0a0a] overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 blur-[120px] rounded-full pointer-events-none transition-colors" />
      
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h3 className="text-lg font-medium text-white tracking-wide uppercase">The Matrix</h3>
          <p className="text-xs text-[#a1a1aa]">Your 365-day evolution timeline</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#111] border border-[#ffffff0a]"></div>
            <div className="w-3 h-3 rounded-sm bg-[var(--color-accent)] opacity-40"></div>
            <div className="w-3 h-3 rounded-sm bg-[var(--color-accent)] opacity-70"></div>
            <div className="w-3 h-3 rounded-sm bg-[var(--color-accent)] opacity-100"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar pb-4 relative z-10">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.map((day, dIdx) => {
                const count = data[day] || 0;
                return (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (wIdx * 0.01) + (dIdx * 0.005) }}
                    title={`${day}: ${count} sessions`}
                    className={`w-3 h-3 rounded-sm border transition-all duration-300 hover:scale-150 hover:z-20 cursor-crosshair ${getIntensityColor(count)}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
