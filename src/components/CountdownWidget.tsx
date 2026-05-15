"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Plus, Trash2, AlertCircle } from "lucide-react";

interface Countdown { id: string; label: string; targetDate: string; }

export default function CountdownWidget() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [now, setNow] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [bedtime, setBedtime] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_countdowns");
    const savedBedtime = localStorage.getItem("ascend_bedtime");
    if (saved) setCountdowns(JSON.parse(saved));
    if (savedBedtime) setBedtime(savedBedtime);
    
    setIsLoaded(true);
    const interval = setInterval(() => setNow(new Date()), 60000);
    
    const handleProfileUpdate = () => {
      const b = localStorage.getItem("ascend_bedtime");
      if (b) setBedtime(b);
    };
    window.addEventListener("ascend_profile_updated", handleProfileUpdate);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("ascend_profile_updated", handleProfileUpdate);
    };
  }, []);

  const save = (updated: Countdown[]) => { setCountdowns(updated); localStorage.setItem("ascend_countdowns", JSON.stringify(updated)); };
  const add = () => { if (!label.trim() || !date) return; save([...countdowns, { id: Date.now().toString(), label: label.trim(), targetDate: date }]); setLabel(""); setDate(""); setIsAdding(false); };

  const getTimeLeft = (target: string) => {
    const diff = new Date(target).getTime() - now.getTime();
    if (diff <= 0) return { text: "Passed", urgent: true };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days === 0) return { text: `${hours}h`, urgent: true };
    return { text: `${days}d ${hours}h`, urgent: days <= 3 };
  };

  const getBedtimeLeft = () => {
    if (!bedtime) return null;
    const [hours, minutes] = bedtime.split(":").map(Number);
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);
    
    // If bedtime has already passed today, it means bedtime is tomorrow
    if (now.getTime() > target.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    
    const diffMs = target.getTime() - now.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      hours: diffH,
      minutes: diffM,
      urgent: diffH <= 2
    };
  };

  const bTime = getBedtimeLeft();

  if (!isLoaded) return <div className="glass-panel skeleton h-[100px]" />;

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4 flex flex-col flex-1 min-h-[100px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Clock size={10} className="text-amber-400" />
          <h3 className="text-[9px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Countdowns</h3>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="text-[#555] hover:text-amber-400 transition-colors"><Plus size={10} /></button>
      </div>

      {isAdding && (
        <div className="flex flex-col gap-1.5 mb-2">
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Event name..." className="w-full bg-white/5 border border-white/10 rounded text-[10px] text-white px-2 py-1.5 focus:outline-none focus:border-white/20" autoFocus />
          <div className="flex gap-1.5">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded text-[10px] text-white px-2 py-1.5 focus:outline-none focus:border-white/20 [color-scheme:dark]" />
            <button onClick={add} disabled={!label.trim() || !date} className="px-3 rounded bg-white text-black text-[9px] font-bold disabled:opacity-30 disabled:bg-white/10 disabled:text-white">ADD</button>
          </div>
        </div>
      )}

      {countdowns.length === 0 && !isAdding && !bTime ? (
        <div className="flex-1 flex flex-col items-center justify-center"><p className="text-[9px] font-mono text-[#555]">No events</p></div>
      ) : (
        <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[120px]">
          {bTime && (
            <div className="flex items-center justify-between px-2 py-1.5 rounded bg-white/[0.02] border border-white/5 group/item">
              <div className="flex items-center gap-1.5 min-w-0">
                <Clock size={8} className="text-indigo-400 shrink-0" />
                <span className="text-[10px] text-indigo-300 truncate font-semibold">Wind Down (Bedtime)</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-mono font-bold ${bTime.urgent ? "text-rose-400 animate-pulse" : "text-indigo-400"}`}>
                  {bTime.hours}h {bTime.minutes}m
                </span>
              </div>
            </div>
          )}
          {countdowns.map(cd => {
            const tl = getTimeLeft(cd.targetDate);
            return (
              <div key={cd.id} className="flex items-center justify-between px-2 py-1.5 rounded bg-white/[0.02] border border-white/5 group/item">
                <div className="flex items-center gap-1.5 min-w-0">
                  {tl.urgent && <AlertCircle size={8} className="text-amber-400 shrink-0 animate-pulse" />}
                  <span className="text-[10px] text-white truncate">{cd.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-mono font-bold ${tl.urgent ? "text-amber-400" : "text-[#888]"}`}>{tl.text}</span>
                  <button onClick={() => save(countdowns.filter(c => c.id !== cd.id))} className="opacity-0 group-hover/item:opacity-100 text-[#555] hover:text-red-400 transition-colors"><Trash2 size={8} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
