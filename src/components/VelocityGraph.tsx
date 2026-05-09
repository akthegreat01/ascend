"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function VelocityGraph() {
  const [points, setPoints] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [chartData, setChartData] = useState<number[]>(Array(7).fill(0));

  const width = 400;
  const height = 150;

  useEffect(() => {
    // Calculate velocity based on actual user data
    const calculateVelocity = () => {
      const datesStr = localStorage.getItem("nexus_focus_dates");
      const focusDates = datesStr ? JSON.parse(datesStr) : [];
      
      const recordsStr = localStorage.getItem("nexus_habit_records");
      const habitRecords = recordsStr ? JSON.parse(recordsStr) : {};
      
      const last7Days = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        
        let score = 0;
        if (focusDates.includes(dateStr)) score += 5; // Focus session is worth 5 points
        
        Object.values(habitRecords).forEach((record: any) => {
          if (record[dateStr]) score += 2; // Habit completion is worth 2 points
        });
        
        last7Days.push(score);
      }
      return last7Days;
    };

    const data = calculateVelocity();
    setChartData(data);

    // Generate smooth SVG path string
    const max = Math.max(...data, 10);
    const spacing = width / (data.length - 1);
    
    const generatedPoints = data.map((val, index) => {
      const x = index * spacing;
      const y = height - (val / max) * height;
      return `${x},${y}`;
    }).join(" L ");
    
    setPoints(`M ${generatedPoints}`);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="glass-panel p-6 h-[250px] animate-pulse" />;

  return (
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-colors duration-500">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-accent)] opacity-[0.02] blur-[50px] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[var(--color-accent)]" />
          <h3 className="text-sm font-medium text-white tracking-wide uppercase">Execution Velocity</h3>
        </div>
        <div className="flex gap-2">
          {['7D', '1M', 'YTD'].map(span => (
            <span key={span} className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors cursor-pointer ${span === '7D' ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-[#ffffff20] text-[#a1a1aa] hover:text-white'} uppercase`}>
              {span}
            </span>
          ))}
        </div>
      </div>

      {chartData.every(v => v === 0) ? (
        <div className="w-full h-[150px] relative z-10 flex flex-col items-center justify-center">
          <Activity size={24} className="text-[#ffffff10] mb-2" />
          <p className="text-xs text-[#a1a1aa]">No activity this week</p>
          <p className="text-[10px] text-[#ffffff30] mt-1">Complete focus sessions or habits to see your velocity</p>
        </div>
      ) : (
        <div className="w-full h-[150px] relative z-10">
          <svg viewBox={`0 -10 ${width} ${height + 20}`} className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <defs>
              <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Area Fill */}
            <motion.path
              d={`${points} L ${width},${height} L 0,${height} Z`}
              fill="url(#velocityGradient)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Line */}
            <motion.path
              d={points}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Data Points */}
            {chartData.map((val, idx) => {
              const max = Math.max(...chartData, 10);
              const x = idx * (400 / (chartData.length - 1));
              const y = 150 - (val / max) * 150;
              return (
                <motion.g key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + (idx * 0.1), type: "spring" }}>
                  {val > 0 && (
                    <circle cx={x} cy={y} r="8" fill="var(--color-accent)" opacity="0.2" className="animate-pulse" />
                  )}
                  <circle cx={x} cy={y} r="4" fill="#fff" stroke="var(--color-accent)" strokeWidth="2" className="hover:scale-[2] hover:fill-[var(--color-accent)] transition-all cursor-crosshair drop-shadow-[0_0_5px_#fff]" />
                </motion.g>
              )
            })}
          </svg>
        </div>
      )}

      <div className="flex justify-between mt-6 text-[#a1a1aa] text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 border-t border-[#ffffff10] pt-4">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span className="text-[var(--color-accent)]">Sun</span>
      </div>
    </div>
  );
}
