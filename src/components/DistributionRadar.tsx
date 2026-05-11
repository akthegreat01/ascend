"use client";

import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { useEffect, useState } from "react";

export default function DistributionRadar() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Strategic Focus Stats
  const [chartCategories, setChartCategories] = useState([
    { label: "MIND", value: 0.01 },
    { label: "BODY", value: 0.01 },
    { label: "WEALTH", value: 0.01 },
    { label: "LEARNING", value: 0.01 },
    { label: "SOCIAL", value: 0.01 }
  ]);
  
  const size = 250;
  const center = size / 2;
  const radius = (size / 2) - 40;

  useEffect(() => {
    // Read user data from localStorage
    const hobbiesStr = localStorage.getItem("ascend_hobbies");
    let mind = 0, body = 0, wealth = 0, learning = 0, social = 0;
    
    if (hobbiesStr) {
      const hobbies = JSON.parse(hobbiesStr);
      hobbies.forEach((h: any) => {
        const lvl = Math.min(1.0, (h.level || 1) / 20);
        const cat = (h.category || h.name || "").toLowerCase();
        if (!cat) return;
        
        if (cat.includes("mind") || cat.includes("focus") || cat.includes("meditat") || cat.includes("read")) mind = Math.max(mind, lvl);
        else if (cat.includes("body") || cat.includes("fitness") || cat.includes("gym") || cat.includes("run") || cat.includes("sport")) body = Math.max(body, lvl);
        else if (cat.includes("wealth") || cat.includes("business") || cat.includes("career") || cat.includes("financ") || cat.includes("invest")) wealth = Math.max(wealth, lvl);
        else if (cat.includes("learn") || cat.includes("skill") || cat.includes("creative") || cat.includes("code") || cat.includes("study") || cat.includes("music") || cat.includes("art") || cat.includes("draw") || cat.includes("photo")) learning = Math.max(learning, lvl);
        else social = Math.max(social, lvl);
      });
    }

    setChartCategories([
      { label: "MIND", value: Math.max(0.01, mind) },
      { label: "BODY", value: Math.max(0.01, body) },
      { label: "WEALTH", value: Math.max(0.01, wealth) },
      { label: "LEARNING", value: Math.max(0.01, learning) },
      { label: "SOCIAL", value: Math.max(0.01, social) }
    ]);
    
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="glass-panel p-6 h-[300px] animate-pulse" />;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / chartCategories.length - Math.PI / 2;
    const x = center + radius * value * Math.cos(angle);
    const y = center + radius * value * Math.sin(angle);
    return { x, y };
  };

  const points = chartCategories.map((cat, i) => getCoordinates(cat.value, i));
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(" ") + " Z";

  // Grid background
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500">
      <div className="absolute -inset-10 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-center gap-2 mb-2 relative z-10">
        <Network size={18} className="text-amber-400" />
        <h3 className="text-sm font-medium text-white tracking-wide uppercase">Neuro-Balance Matrix</h3>
      </div>
      <p className="text-[10px] text-[#a1a1aa] tracking-widest uppercase mb-4">Focus Distribution</p>

      {chartCategories.every(c => c.value <= 0.01) ? (
        <div className="relative w-full flex flex-col items-center justify-center py-12">
          <Network size={24} className="text-[#ffffff10] mb-2" />
          <p className="text-xs text-[#a1a1aa]">No data yet</p>
          <p className="text-[10px] text-[#ffffff30] mt-1">Track hobbies to see your balance</p>
        </div>
      ) : (
      <div className="relative w-full flex justify-center items-center mt-6">
        <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          {/* Background web */}
          {gridLevels.map((level, levelIdx) => {
            const levelPoints = chartCategories.map((_, i) => getCoordinates(level, i));
            const levelPath = levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(" ") + " Z";
            return (
              <path 
                key={levelIdx}
                d={levelPath}
                fill="none"
                stroke="#ffffff10"
                strokeWidth="1"
                className="group-hover:stroke-[#ffffff20] transition-colors"
              />
            )
          })}

          {/* Axes */}
          {chartCategories.map((_, i) => {
            const endPoint = getCoordinates(1, i);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="#ffffff10"
                strokeWidth="1"
                className="group-hover:stroke-[#ffffff20] transition-colors"
              />
            )
          })}

          {/* Value Polygon */}
          <motion.path
            d={pathData}
            fill="rgba(245,158,11,0.2)"
            stroke="#f59e0b"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            style={{ transformOrigin: "center" }}
            className="drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
          />

          {/* Points & Labels */}
          {chartCategories.map((cat, i) => {
            const p = getCoordinates(cat.value, i);
            const labelP = getCoordinates(1.25, i);
            return (
              <g key={`point-${i}`}>
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#fff"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + (i * 0.1), type: "spring" }}
                  className="hover:scale-[2] hover:fill-[#f59e0b] cursor-pointer transition-all drop-shadow-[0_0_5px_#fff]"
                />
                <text
                  x={labelP.x}
                  y={labelP.y}
                  fill="#a1a1aa"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="uppercase tracking-[0.2em] group-hover:fill-white transition-colors"
                >
                  {cat.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      )}
    </div>
  );
}
