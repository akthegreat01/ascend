"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function VelocityGraph() {
  const [points, setPoints] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState<number[]>(Array(7).fill(0));

  const width = 300;
  const height = 80;

  useEffect(() => {
    const generate = () => {
      const calculateVelocity = () => {
        const datesStr = localStorage.getItem("ascend_focus_dates");
        const focusDates = datesStr ? JSON.parse(datesStr) : [];
        const recordsStr = localStorage.getItem("ascend_habit_records");
        const habitRecords = recordsStr ? JSON.parse(recordsStr) : {};
        
        const last7Days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          
          let score = 0;
          if (focusDates.includes(dateStr)) score += 5;
          Object.values(habitRecords).forEach((record: any) => {
            if (record[dateStr]) score += 2;
          });
          
          last7Days.push(score);
        }
        return last7Days;
      };

      const data = calculateVelocity();
      setChartData(data);

      const max = Math.max(...data, 10);
      const spacing = width / (data.length - 1);
      
      const generatedPoints = data.map((val, index) => {
        const x = index * spacing;
        const y = height - (val / max) * height;
        return `${x},${y}`;
      }).join(" L ");
      
      setPoints(`M ${generatedPoints}`);
      setIsLoaded(true);
    };

    generate();
    const events = ["ascend_stats_updated", "ascend_habit_updated"];
    events.forEach(e => window.addEventListener(e, generate));
    return () => events.forEach(e => window.removeEventListener(e, generate));
  }, []);

  if (!isLoaded) return <div className="glass-panel p-4 h-[140px] animate-pulse" />;

  return (
    <div className="glass-panel p-4 flex flex-col group h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-[var(--color-accent)]" />
          <h3 className="text-[10px] font-bold text-[#a1a1aa] tracking-[0.15em] uppercase">Velocity</h3>
        </div>
        <div className="flex gap-1.5">
          {['7D', '1M', 'YTD'].map(span => (
            <span key={span} className={`text-[8px] font-mono px-1.5 py-0.5 rounded cursor-pointer ${span === '7D' ? 'bg-white text-black' : 'text-[#666] hover:text-white'}`}>
              {span}
            </span>
          ))}
        </div>
      </div>

      {chartData.every(v => v === 0) ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Activity size={16} className="text-white/10 mb-1" />
          <p className="text-[10px] text-[#555] font-mono">No telemetry</p>
        </div>
      ) : (
        <div className="relative z-10 flex-1 w-full min-h-[80px]">
          <svg viewBox={`0 -5 ${width} ${height + 10}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d={`${points} L ${width},${height} L 0,${height} Z`}
              fill="url(#velGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.path
              d={points}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {chartData.map((val, idx) => {
              const max = Math.max(...chartData, 10);
              const x = idx * (width / (chartData.length - 1));
              const y = height - (val / max) * height;
              return (
                <motion.g key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + (idx * 0.1) }}>
                  <circle cx={x} cy={y} r="2.5" fill="#000" stroke="var(--color-accent)" strokeWidth="1.5" />
                </motion.g>
              )
            })}
          </svg>
        </div>
      )}
      
      <div className="flex justify-between mt-2 pt-2 border-t border-white/5 text-[#555] text-[8px] font-mono uppercase">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span className="text-[var(--color-accent)]">Sun</span>
      </div>
    </div>
  );
}
