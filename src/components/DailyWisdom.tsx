"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, RefreshCw } from "lucide-react";

const quotes = [
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
  { text: "He who fears death will never do anything worthy of a man who is alive.", author: "Seneca" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King" },
];

export default function DailyWisdom() {
  const [quote, setQuote] = useState(quotes[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Generate a random quote based on the current day, so it changes daily but stays consistent for the day
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setQuote(quotes[dayOfYear % quotes.length]);
    setIsLoaded(true);
  }, []);

  const refreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      let nextQuote;
      do {
        nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (nextQuote.text === quote.text);
      setQuote(nextQuote);
      setIsRefreshing(false);
    }, 500);
  };

  if (!isLoaded) return <div className="h-32 bg-[#0a0a0a] rounded-2xl border border-[#ffffff10] animate-pulse" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 relative overflow-hidden group flex flex-col justify-center h-full"
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-1000">
        <Quote size={120} />
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-white/50 text-[10px] uppercase font-black tracking-[0.2em] flex items-center gap-2 w-max">
          <Quote size={12} className="text-[var(--color-accent)]" /> Daily Wisdom
        </div>
        <button 
          onClick={refreshQuote}
          className={`text-[#a1a1aa] hover:text-white transition-all duration-500 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="relative z-10 mt-2">
        <motion.p 
          key={quote.text}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-light text-white leading-relaxed italic mb-6 font-['Outfit'] tracking-tight"
        >
          "{quote.text}"
        </motion.p>
        <motion.div 
          key={quote.author}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="h-[1px] w-8 bg-[var(--color-accent)] opacity-50" />
          <p className="text-[11px] font-black text-[var(--color-accent)] uppercase tracking-[0.25em]">
            {quote.author}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
