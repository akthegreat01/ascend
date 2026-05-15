"use client";

import React from "react";
import { usePremium } from "@/context/PremiumContext";
import { Lock, Zap, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface PremiumGateProps {
  children: React.ReactNode;
  featureName?: string;
  description?: string;
}

export default function PremiumGate({ 
  children, 
  featureName = "this premium feature",
  description = "Get a license key to unlock elite productivity tools and advanced analytics."
}: PremiumGateProps) {
  const { isPremium } = usePremium();

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative group overflow-hidden rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-50" />
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)] mb-6">
          <Lock size={32} className="text-white" />
        </div>

        <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
          Elite Access Required
        </h3>
        <p className="text-sm text-[#a1a1aa] max-w-sm mb-8 font-medium leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-md">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-left">
            <Zap size={14} className="text-amber-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Unlimited Use</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-left">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Lifetime Access</span>
          </div>
        </div>

        <button 
          onClick={() => window.dispatchEvent(new Event("ascend_open_settings"))}
          className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] flex items-center gap-3 uppercase tracking-widest text-xs"
        >
          <Sparkles size={16} />
          Unlock {featureName}
        </button>
        
        <p className="mt-4 text-[10px] text-white/30 font-bold uppercase tracking-widest">
          Enter your license key in System Settings
        </p>
      </motion.div>

      {/* Blurred children preview */}
      <div className="absolute inset-0 z-0 opacity-10 blur-xl pointer-events-none grayscale select-none">
        {children}
      </div>
    </div>
  );
}
