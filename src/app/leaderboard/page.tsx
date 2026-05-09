"use client";

import { motion } from "framer-motion";
import { Trophy, Lock, Zap } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] relative">
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent)] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center relative z-10 max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-[#111] border border-[#ffffff10] flex items-center justify-center mb-8 relative">
          <Trophy size={32} className="text-[#ffffff30]" />
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#111] border border-[#ffffff10] flex items-center justify-center">
            <Lock size={12} className="text-[#a1a1aa]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-3">
          Global Rankings
        </h1>
        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8">
          Compete with other Ascend users worldwide. Track your consistency streaks, focus hours, and execution velocity against the collective.
        </p>

        {/* Status badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111] border border-[#ffffff10] mb-8">
          <Zap size={14} className="text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-white tracking-wide">Coming Soon</span>
        </div>

        {/* Guild teaser */}
        <div className="w-full p-5 rounded-xl bg-[#111] border border-[#ffffff08] text-left">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Guilds</span>
          </div>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Create or join a Guild with your friends. Compete on weekly focus hours, habit streaks, and task completion. Top guilds get featured on the global board.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
