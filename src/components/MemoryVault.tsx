"use client";

import { motion } from "framer-motion";
import { Lock, Clock, MessageSquare, Image as ImageIcon } from "lucide-react";

export default function MemoryVault() {
  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col h-full relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
        <Lock size={200} />
      </div>

      <div className="relative z-10 mb-6">
        <h2 className="text-2xl font-['Outfit'] font-light text-white mb-1 glow-text">
          Memory Vault
        </h2>
        <p className="text-sm text-[#c5c6c7]/60 font-light">
          Your personal temporal database.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative z-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute left-0 top-0 w-1 h-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#d4af37] font-medium tracking-wide mb-1 flex items-center gap-1">
                <Clock size={12} /> 1 YEAR AGO TODAY
              </p>
              <h3 className="text-sm text-white font-medium mb-2">The Breakthrough</h3>
              <p className="text-xs text-[#c5c6c7]/80 line-clamp-2">
                Today I finally understood how to structure my deep work sessions. The key was removing all friction before starting...
              </p>
            </div>
            <MessageSquare size={16} className="text-[#d4af37]/50" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mt-auto pt-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <MessageSquare size={20} className="mb-2 text-[#45a29e]" />
            <span className="text-xs font-medium tracking-wide">Journal</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <ImageIcon size={20} className="mb-2 text-[#a855f7]" />
            <span className="text-xs font-medium tracking-wide">Moment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
