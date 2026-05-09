"use client";

import { motion } from "framer-motion";
import { Target, ChevronRight, Compass } from "lucide-react";

export default function StrategicRoadmap() {
  const roadmap: any[] = [];

  return (
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500 opacity-5 blur-[50px] pointer-events-none rounded-full group-hover:opacity-10 transition-all duration-700" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Compass size={16} className="text-sky-400" />
          Strategic Roadmap
        </h3>
        <button className="text-[10px] font-black text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-widest">Master Plan</button>
      </div>

      <div className="space-y-6">
        {roadmap.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest block mb-1">{item.phase}</span>
                <h4 className="text-[13px] font-semibold text-white group-hover:text-sky-100 transition-colors">{item.title}</h4>
              </div>
              <span className="text-[11px] font-black text-[#a1a1aa] uppercase tabular-nums">{item.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1.5, delay: idx * 0.2 }}
                className="h-full bg-gradient-to-r from-sky-500 to-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.3)]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group/item hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
              <Target size={16} />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white uppercase tracking-tight">Main Objective</p>
              <p className="text-[10px] text-[#a1a1aa]">Neural Engine Integration</p>
            </div>
          </div>
          <ChevronRight size={14} className="text-[#a1a1aa] group-hover/item:text-white transition-all transform group-hover/item:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
