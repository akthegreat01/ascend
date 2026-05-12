"use client";

import { motion } from "framer-motion";
import { Target, ChevronRight, Compass } from "lucide-react";

export default function StrategicRoadmap() {
  const roadmap = [
    { phase: "Q2 Core", title: "Core System Sync", progress: 65 },
    { phase: "Q3 Expansion", title: "Digital Ecosystem Hub", progress: 20 },
    { phase: "Q4 Mastery", title: "Productivity System", progress: 5 }
  ];

  return (
    <div className="glass-panel p-8 group relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 blur-[80px] pointer-events-none rounded-full group-hover:bg-sky-500/20 transition-all duration-1000" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.15)] group-hover:scale-110 transition-transform duration-500">
            <Compass size={20} />
          </div>
          <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Strategic Roadmap</h3>
        </div>
        <button className="text-[10px] font-black text-[#a1a1aa] hover:text-sky-400 transition-all duration-300 uppercase tracking-widest border-b border-transparent hover:border-sky-400/50 pb-0.5">Master Plan</button>
      </div>

      <div className="space-y-8 relative z-10">
        {roadmap.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-[9px] font-black text-sky-400 uppercase tracking-[0.25em] block mb-1.5 opacity-80">{item.phase}</span>
                <h4 className="text-[14px] font-black text-white group-hover:text-sky-100 transition-colors tracking-tight">{item.title}</h4>
              </div>
              <span className="text-[11px] font-black text-[#a1a1aa] uppercase tabular-nums tracking-widest">{item.progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1.5, delay: idx * 0.2 }}
                className="h-full bg-gradient-to-r from-sky-600 to-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.4)] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-white/[0.05] relative z-10">
        <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group/item hover:bg-white/[0.04] hover:border-sky-500/30 transition-all duration-500 cursor-pointer hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.1)] group-hover/item:scale-110 transition-transform duration-500">
              <Target size={20} />
            </div>
            <div>
              <p className="text-[12px] font-black text-white uppercase tracking-wider mb-0.5">Primary Goal</p>
              <p className="text-[11px] font-bold text-[#a1a1aa] tracking-tight uppercase opacity-60">Core System Integration</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#a1a1aa] group-hover/item:text-white transition-all transform group-hover/item:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
