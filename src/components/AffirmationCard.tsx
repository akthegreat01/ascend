"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, RefreshCw, Quote } from "lucide-react";

const affirmations = [
  "I am in control of my time and energy.",
  "I choose progress over perfection.",
  "Every small step compounds into massive results.",
  "I am becoming the person I want to be.",
  "My discipline is my superpower.",
  "I release what I cannot control.",
  "Today I choose focus over distraction.",
  "I am building something extraordinary.",
  "Consistency beats intensity.",
  "Every rejection redirects me to something better."
];

export default function AffirmationCard() {
  const [affirmation, setAffirmation] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % affirmations.length;
    setIndex(dayIndex);
    setAffirmation(affirmations[dayIndex]);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="glass-panel skeleton h-[80px]" />;

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4 flex flex-col justify-center relative overflow-hidden group">
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <Brain size={10} className="text-violet-400" />
          <h3 className="text-[9px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Affirmation</h3>
        </div>
        <button onClick={() => { const n = (index + 1) % affirmations.length; setIndex(n); setAffirmation(affirmations[n]); }} className="text-[#555] hover:text-violet-400 transition-colors">
          <RefreshCw size={10} />
        </button>
      </div>

      <div className="relative z-10 flex gap-2 items-start mt-1">
        <Quote size={12} className="text-violet-500/40 shrink-0 mt-0.5" />
        <motion.p key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-white/80 font-light italic leading-tight">
          {affirmation}
        </motion.p>
      </div>
    </motion.div>
  );
}
