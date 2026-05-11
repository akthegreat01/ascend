"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Plus, Trash2, AlertCircle } from "lucide-react";

interface Countdown {
  id: string;
  label: string;
  targetDate: string;
}

export default function CountdownWidget() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [now, setNow] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_countdowns");
    if (saved) setCountdowns(JSON.parse(saved));
    setIsLoaded(true);

    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const save = (updated: Countdown[]) => {
    setCountdowns(updated);
    localStorage.setItem("ascend_countdowns", JSON.stringify(updated));
  };

  const addCountdown = () => {
    if (!label.trim() || !date) return;
    save([...countdowns, { id: Date.now().toString(), label: label.trim(), targetDate: date }]);
    setLabel("");
    setDate("");
    setIsAdding(false);
  };

  const getTimeLeft = (target: string) => {
    const diff = new Date(target).getTime() - now.getTime();
    if (diff <= 0) return { text: "Passed", urgent: true, days: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days === 0) return { text: `${hours}h left`, urgent: true, days: 0 };
    return { text: `${days}d ${hours}h`, urgent: days <= 3, days };
  };

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] group hover:border-amber-500/20 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-amber-400" />
          <h3 className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Countdowns</h3>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>

      {isAdding && (
        <div className="flex flex-col gap-2 mb-4">
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="Event name..."
            className="w-full bg-transparent border border-[#ffffff08] rounded-lg text-xs text-white px-3 py-2 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]"
            autoFocus
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full bg-transparent border border-[#ffffff08] rounded-lg text-xs text-white px-3 py-2 focus:outline-none focus:border-[#ffffff20] [color-scheme:dark]"
          />
          <button
            onClick={addCountdown}
            disabled={!label.trim() || !date}
            className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${label.trim() && date ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
          >
            Add
          </button>
        </div>
      )}

      {countdowns.length === 0 && !isAdding ? (
        <p className="text-xs text-[#a1a1aa] text-center py-4">No countdowns set</p>
      ) : (
        <div className="space-y-2">
          {countdowns.map(cd => {
            const tl = getTimeLeft(cd.targetDate);
            return (
              <div key={cd.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[#111] border border-[#ffffff06] group/item">
                <div className="flex items-center gap-2 min-w-0">
                  {tl.urgent && <AlertCircle size={12} className="text-amber-400 shrink-0 animate-pulse" />}
                  <span className="text-xs text-white font-medium truncate">{cd.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-semibold font-['Outfit'] tabular-nums ${tl.urgent ? "text-amber-400" : "text-[#a1a1aa]"}`}>
                    {tl.text}
                  </span>
                  <button
                    onClick={() => save(countdowns.filter(c => c.id !== cd.id))}
                    className="opacity-0 group-hover/item:opacity-100 p-1 rounded hover:bg-red-500/10 text-[#a1a1aa] hover:text-red-400 transition-all"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
