"use client";

import { motion } from "framer-motion";
import { Brain, Dumbbell, Shield, BookOpen, Coins, Palette, Users, Sparkles } from "lucide-react";

const categories = [
  { id: "mind", name: "Mind", level: 1, xp: 0, next: 100, icon: Brain, color: "from-blue-500 to-indigo-600", border: "border-blue-500/30" },
  { id: "body", name: "Body", level: 1, xp: 0, next: 100, icon: Dumbbell, color: "from-emerald-500 to-teal-600", border: "border-emerald-500/30" },
  { id: "discipline", name: "Discipline", level: 1, xp: 0, next: 100, icon: Shield, color: "from-rose-500 to-red-600", border: "border-rose-500/30" },
  { id: "learning", name: "Learning", level: 1, xp: 0, next: 100, icon: BookOpen, color: "from-amber-400 to-orange-500", border: "border-amber-500/30" },
  { id: "wealth", name: "Wealth", level: 1, xp: 0, next: 100, icon: Coins, color: "from-yellow-400 to-yellow-600", border: "border-yellow-500/30" },
  { id: "creativity", name: "Creativity", level: 1, xp: 0, next: 100, icon: Palette, color: "from-fuchsia-500 to-pink-600", border: "border-fuchsia-500/30" },
  { id: "social", name: "Social", level: 1, xp: 0, next: 100, icon: Users, color: "from-cyan-400 to-cyan-600", border: "border-cyan-500/30" },
  { id: "spirituality", name: "Spirituality", level: 1, xp: 0, next: 100, icon: Sparkles, color: "from-violet-500 to-purple-600", border: "border-violet-500/30" },
];

export default function EvolutionTree() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <div className="absolute inset-0 bg-[var(--color-accent)] opacity-[0.02] blur-[150px] pointer-events-none rounded-full" />
      
      {categories.map((cat, idx) => {
        const progress = (cat.xp / cat.next) * 100;

        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`glass-panel p-6 bg-[#0a0a0a] border ${cat.border} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
          >
            {/* Background Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-20 backdrop-blur-md`}>
                  <cat.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-white tracking-wide">{cat.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#a1a1aa] uppercase font-bold tracking-widest block mb-0.5">Level</span>
                <span className="text-2xl font-light text-white font-['Outfit'] tabular-nums">{cat.level}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#a1a1aa]">XP Progress</span>
                <span className="text-white font-medium tabular-nums">{cat.xp} / {cat.next}</span>
              </div>
              <div className="h-1.5 w-full bg-[#111111] rounded-full overflow-hidden border border-[#ffffff0a]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#ffffff0a] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[10px] text-[#a1a1aa] leading-relaxed">
                Unlock higher cognitive resilience and advanced environments at Level {cat.level + 1}.
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
