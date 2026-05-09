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
      className="glass-panel p-6 bg-[#0a0a0a] relative overflow-hidden group border border-[#ffffff10] flex flex-col justify-center"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Quote size={80} />
      </div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="px-2.5 py-1 rounded-md bg-[#111] border border-[#ffffff10] text-[#a1a1aa] text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 w-max">
          <Quote size={10} /> Daily Wisdom
        </div>
        <button 
          onClick={refreshQuote}
          className={`text-[#a1a1aa] hover:text-white transition-colors p-1 rounded-md hover:bg-[#ffffff10] ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="relative z-10 mt-2">
        <motion.p 
          key={quote.text}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-lg font-light text-white leading-relaxed italic mb-4"
        >
          "{quote.text}"
        </motion.p>
        <motion.p 
          key={quote.author}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider"
        >
          — {quote.author}
        </motion.p>
      </div>
    </motion.div>
  );
}
