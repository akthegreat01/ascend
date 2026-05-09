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
  "My potential is limitless when I commit.",
  "I trust the process and show up daily.",
  "Consistency beats intensity.",
  "I am grateful for this moment of growth.",
  "My habits shape my destiny.",
  "I refuse to settle for mediocrity.",
  "I embrace discomfort as growth.",
  "Every rejection redirects me to something better.",
  "I am the architect of my own life.",
  "I invest in myself daily.",
  "My energy flows where my attention goes.",
  "I am worthy of the success I'm building.",
];

export default function AffirmationCard() {
  const [affirmation, setAffirmation] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Pick a daily affirmation based on the date
    const today = new Date();
    const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % affirmations.length;
    setIndex(dayIndex);
    setAffirmation(affirmations[dayIndex]);
    setIsLoaded(true);
  }, []);

  const shuffle = () => {
    const newIndex = (index + 1) % affirmations.length;
    setIndex(newIndex);
    setAffirmation(affirmations[newIndex]);
  };

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] relative overflow-hidden group hover:border-violet-500/20 transition-colors"
    >
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-violet-500 opacity-[0.03] blur-[60px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-violet-400" />
          <h3 className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Daily Affirmation</h3>
        </div>
        <button
          onClick={shuffle}
          className="w-6 h-6 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 hover:bg-violet-500/20 transition-colors hover:rotate-180 duration-500"
        >
          <RefreshCw size={11} />
        </button>
      </div>

      <div className="relative z-10">
        <Quote size={14} className="text-violet-500/30 mb-2" />
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-white/90 font-light leading-relaxed italic"
        >
          {affirmation}
        </motion.p>
      </div>
    </motion.div>
  );
}
