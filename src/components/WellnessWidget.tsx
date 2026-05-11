"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Droplets, Plus, Minus, BedDouble, TrendingUp } from "lucide-react";

export default function WellnessWidget() {
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem("ascend_wellness");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) {
        setWater(data.water || 0);
        setSleep(data.sleep || 0);
      }
    }
    setIsLoaded(true);
  }, []);

  const save = (w: number, s: number) => {
    setWater(w);
    setSleep(s);
    localStorage.setItem("ascend_wellness", JSON.stringify({ date: today, water: w, sleep: s }));
  };

  if (!isLoaded) return null;

  const waterGoal = 8;
  const waterPct = Math.min(100, (water / waterGoal) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] group hover:border-cyan-500/20 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4">
        <Droplets size={16} className="text-cyan-400" />
        <h3 className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Daily Wellness</h3>
      </div>

      {/* Water */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[#a1a1aa]">Water Intake</span>
          <span className="text-[11px] font-semibold text-white tabular-nums">{water}/{waterGoal} glasses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${waterPct}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => save(Math.max(0, water - 1), sleep)}
              className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#ffffff08] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-[#ffffff20] transition-colors"
            >
              <Minus size={10} />
            </button>
            <button
              onClick={() => save(water + 1, sleep)}
              className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            >
              <Plus size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* Sleep */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <BedDouble size={12} className="text-indigo-400" />
            <span className="text-[11px] text-[#a1a1aa]">Sleep Last Night</span>
          </div>
          <span className="text-[11px] font-semibold text-white tabular-nums">{sleep}h</span>
        </div>
        <div className="flex gap-1">
          {[4, 5, 6, 7, 8, 9, 10].map(h => (
            <button
              key={h}
              onClick={() => save(water, h)}
              className={`flex-1 py-1.5 rounded-md text-[10px] font-medium border transition-all ${
                sleep === h
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.2)]"
                  : "border-[#ffffff06] text-[#a1a1aa] hover:border-[#ffffff15] hover:text-white"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
