"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Plus, Minus, BedDouble } from "lucide-react";

export default function WellnessWidget() {
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem("ascend_wellness");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) { setWater(data.water || 0); setSleep(data.sleep || 0); }
    }
    setIsLoaded(true);
  }, [today]);

  const save = (w: number, s: number) => {
    setWater(w); setSleep(s);
    localStorage.setItem("ascend_wellness", JSON.stringify({ date: today, water: w, sleep: s }));
  };

  if (!isLoaded) return <div className="glass-panel skeleton h-[100px]" />;

  const wGoal = 8;
  const wPct = Math.min(100, (water / wGoal) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-3">
      <div className="flex items-center gap-1.5 mb-3">
        <Droplets size={10} className="text-cyan-400" />
        <h3 className="text-[9px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Wellness</h3>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] font-mono text-[#666]">WATER</span>
          <span className="text-[9px] font-black text-white tabular-nums">{water}/{wGoal}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full bg-cyan-400" initial={{ width: 0 }} animate={{ width: `${wPct}%` }} />
          </div>
          <div className="flex gap-0.5">
            <button onClick={() => save(Math.max(0, water - 1), sleep)} className="w-5 h-5 rounded flex items-center justify-center bg-white/5 text-[#555] hover:text-white"><Minus size={8} /></button>
            <button onClick={() => save(water + 1, sleep)} className="w-5 h-5 rounded flex items-center justify-center bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"><Plus size={8} /></button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1"><BedDouble size={8} className="text-indigo-400" /><span className="text-[8px] font-mono text-[#666]">SLEEP</span></div>
          <span className="text-[9px] font-black text-white tabular-nums">{sleep}h</span>
        </div>
        <div className="flex gap-0.5">
          {[5, 6, 7, 8, 9].map(h => (
            <button key={h} onClick={() => save(water, h)} className={`flex-1 py-1 rounded text-[8px] font-mono border ${sleep === h ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "border-white/5 text-[#555] hover:text-white"}`}>{h}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
