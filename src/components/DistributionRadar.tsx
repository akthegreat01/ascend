"use client";

import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { useEffect, useState } from "react";

export default function DistributionRadar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartCategories, setChartCategories] = useState([
    { label: "MIND", value: 0.01 }, { label: "BODY", value: 0.01 }, { label: "WEALTH", value: 0.01 },
    { label: "LEARN", value: 0.01 }, { label: "SOCIAL", value: 0.01 }
  ]);
  
  const size = 120;
  const center = size / 2;
  const radius = (size / 2) - 20;

  useEffect(() => {
    const generate = () => {
      const hobbiesStr = localStorage.getItem("ascend_hobbies");
      const tasksStr = localStorage.getItem("ascend_premium_tasks");
      const goalsStr = localStorage.getItem("ascend_goals");
      const habitsStr = localStorage.getItem("ascend_habits");

      let mind = 0, body = 0, wealth = 0, learning = 0, social = 0;
      
      // Process Hobbies
      if (hobbiesStr) {
        JSON.parse(hobbiesStr).forEach((h: any) => {
          const lvl = Math.min(1.0, (h.level || 1) / 20);
          const cat = (h.category || h.name || "").toLowerCase();
          if (cat.includes("mind") || cat.includes("focus")) mind += lvl;
          if (cat.includes("body") || cat.includes("fitness") || cat.includes("gym")) body += lvl;
          if (cat.includes("wealth") || cat.includes("business")) wealth += lvl;
          if (cat.includes("learn") || cat.includes("skill") || cat.includes("code")) learning += lvl;
          if (cat.includes("social") || cat.includes("music") || cat.includes("art")) social += lvl;
        });
      }

      // Process Habits
      if (habitsStr) {
        JSON.parse(habitsStr).forEach((h: any) => {
          const title = (h.name || "").toLowerCase();
          if (title.includes("meditat") || title.includes("read") || title.includes("journal")) mind += 0.2;
          if (title.includes("workout") || title.includes("run") || title.includes("water") || title.includes("sleep")) body += 0.2;
          if (title.includes("work") || title.includes("side hustle") || title.includes("save")) wealth += 0.2;
          if (title.includes("study") || title.includes("code") || title.includes("learn")) learning += 0.2;
          if (title.includes("call") || title.includes("friend") || title.includes("family")) social += 0.2;
        });
      }

      // Process Tasks
      if (tasksStr) {
        JSON.parse(tasksStr).forEach((t: any) => {
          if (!t.completed) return;
          const title = (t.title || "").toLowerCase();
          if (title.includes("meditat") || title.includes("read")) mind += 0.05;
          if (title.includes("workout") || title.includes("gym")) body += 0.05;
          if (title.includes("work") || title.includes("client") || title.includes("pay")) wealth += 0.05;
          if (title.includes("study") || title.includes("course")) learning += 0.05;
          if (title.includes("meeting") || title.includes("call")) social += 0.05;
        });
      }

      // Normalize
      const maxVal = Math.max(0.1, mind, body, wealth, learning, social);
      const normalize = (v: number) => Math.max(0.01, Math.min(1, v / maxVal));

      setChartCategories([
        { label: "MIND", value: normalize(mind) }, { label: "BODY", value: normalize(body) },
        { label: "WEALTH", value: normalize(wealth) }, { label: "LEARN", value: normalize(learning) },
        { label: "SOCIAL", value: normalize(social) }
      ]);
      setIsLoaded(true);
    };

    generate();
    window.addEventListener("ascend_habit_updated", generate);
    window.addEventListener("ascend_task_updated", generate);
    return () => {
      window.removeEventListener("ascend_habit_updated", generate);
      window.removeEventListener("ascend_task_updated", generate);
    };
  }, []);

  if (!isLoaded) return <div className="glass-panel p-4 h-[140px] animate-pulse" />;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / chartCategories.length - Math.PI / 2;
    const x = center + radius * value * Math.cos(angle);
    const y = center + radius * value * Math.sin(angle);
    return { x, y };
  };

  const points = chartCategories.map((cat, i) => getCoordinates(cat.value, i));
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(" ") + " Z";
  const gridLevels = [0.33, 0.66, 1];

  return (
    <div className="glass-panel p-4 flex flex-col group h-full items-center">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <Network size={12} className="text-amber-400" />
          <h3 className="text-[10px] font-bold text-[#a1a1aa] tracking-[0.15em] uppercase">Distribution</h3>
        </div>
      </div>

      {chartCategories.every(c => c.value <= 0.01) ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Network size={16} className="text-white/10 mb-1" />
          <p className="text-[10px] text-[#555] font-mono">No data</p>
        </div>
      ) : (
        <div className="relative flex-1 flex justify-center items-center mt-1">
          <svg width={size} height={size} className="overflow-visible">
            {gridLevels.map((level, levelIdx) => {
              const levelPoints = chartCategories.map((_, i) => getCoordinates(level, i));
              const levelPath = levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(" ") + " Z";
              return <path key={levelIdx} d={levelPath} fill="none" stroke="#ffffff10" strokeWidth="1" />
            })}

            {chartCategories.map((_, i) => {
              const endPoint = getCoordinates(1, i);
              return <line key={`axis-${i}`} x1={center} y1={center} x2={endPoint.x} y2={endPoint.y} stroke="#ffffff10" strokeWidth="1" />
            })}

            <motion.path
              d={pathData}
              fill="rgba(245,158,11,0.15)"
              stroke="#f59e0b"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ transformOrigin: "center" }}
            />

            {chartCategories.map((cat, i) => {
              const p = getCoordinates(cat.value, i);
              const labelP = getCoordinates(1.3, i);
              return (
                <g key={`point-${i}`}>
                  <motion.circle cx={p.x} cy={p.y} r="2" fill="#fff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + (i * 0.1) }} />
                  <text x={labelP.x} y={labelP.y} fill="#666" fontSize="7" fontFamily="monospace" textAnchor="middle" alignmentBaseline="middle">{cat.label}</text>
                </g>
              )
            })}
          </svg>
        </div>
      )}
    </div>
  );
}
