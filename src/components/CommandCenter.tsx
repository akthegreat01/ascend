"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, BookHeart, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtocolEngine from "./ProtocolEngine";
import QuickLinks from "./QuickLinks";
import ActivityHeatmap from "./ActivityHeatmap";

export default function CommandCenter() {
  const router = useRouter();
  const [journalEntry, setJournalEntry] = useState("");
  const [activeHabits, setActiveHabits] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleHabit = (habitId: string) => {
    const savedRecords = localStorage.getItem("ascend_habit_records");
    const records = savedRecords ? JSON.parse(savedRecords) : {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!records[habitId]) records[habitId] = {};
    records[habitId][today] = !records[habitId][today];
    
    localStorage.setItem("ascend_habit_records", JSON.stringify(records));
    // Trigger update
    const updatedHabits = activeHabits.map(h => {
      if (h.id === habitId) {
        return { ...h, completedToday: records[habitId][today] };
      }
      return h;
    });
    setActiveHabits(updatedHabits);
    window.dispatchEvent(new Event("ascend_habit_updated"));
  };

  useEffect(() => {
    const loadHabits = () => {
      const savedHabits = localStorage.getItem("ascend_habits");
      const savedRecords = localStorage.getItem("ascend_habit_records");
      const records = savedRecords ? JSON.parse(savedRecords) : {};
      const today = new Date().toISOString().split('T')[0];

      if (savedHabits) {
        const allHabits = JSON.parse(savedHabits);
        const snapshot = allHabits.slice(0, 3).map((h: any) => ({
          ...h,
          title: h.name, // compatibility
          completedToday: records[h.id]?.[today] || false
        }));
        setActiveHabits(snapshot);
      } else {
        setActiveHabits([]);
      }
    };
    
    loadHabits();
    window.addEventListener("ascend_habit_updated", loadHabits);
    return () => window.removeEventListener("ascend_habit_updated", loadHabits);
  }, []);

  const quickSaveJournal = () => {
    if (!journalEntry.trim()) return;
    
    const text = journalEntry.trim();
    const lowerText = text.toLowerCase();
    
    // AI Smart Routing logic
    if (lowerText.startsWith("task:") || lowerText.startsWith("todo:") || lowerText.startsWith("remind me to") || lowerText.startsWith("buy ")) {
      const savedTasks = localStorage.getItem("ascend_premium_tasks");
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      
      let cleanText = text;
      if (lowerText.startsWith("task:")) cleanText = text.substring(5).trim();
      else if (lowerText.startsWith("todo:")) cleanText = text.substring(5).trim();
      else if (lowerText.startsWith("remind me to")) cleanText = text.substring(12).trim();
      
      const newTask = {
        id: Date.now().toString(),
        title: cleanText,
        completed: false,
        priority: (lowerText.includes("urgent") || lowerText.includes("asap")) ? "high" : "medium"
      };
      
      localStorage.setItem("ascend_premium_tasks", JSON.stringify([newTask, ...tasks]));
      alert("AI Routed: Added to Tasks ✅");
      
    } else if (lowerText.startsWith("goal:") || lowerText.startsWith("target:")) {
      const savedGoals = localStorage.getItem("ascend_goals");
      const goals = savedGoals ? JSON.parse(savedGoals) : [];
      
      let cleanText = text;
      if (lowerText.startsWith("goal:")) cleanText = text.substring(5).trim();
      else if (lowerText.startsWith("target:")) cleanText = text.substring(7).trim();
      
      const newGoal = {
        id: Date.now().toString(),
        title: cleanText,
        description: "Captured via Neural Router",
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
        category: "Captured",
        milestones: []
      };
      
      localStorage.setItem("ascend_goals", JSON.stringify([newGoal, ...goals]));
      alert("AI Routed: Added to Strategic Goals 🎯");
      
    } else {
      const saved = localStorage.getItem("ascend_journal");
      const entries = saved ? JSON.parse(saved) : [];
      
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: text,
        mood: "⚡️"
      };
      
      localStorage.setItem("ascend_journal", JSON.stringify([newEntry, ...entries]));
      alert("Memory sealed to Vault 🧠");
    }
    
    setJournalEntry("");
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <QuickLinks />

      {/* Quick Journal Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-8 flex flex-col group relative overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-500">
            <BookHeart size={20} />
          </div>
          <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Capture Thought</h3>
        </div>
        
        <textarea 
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="What's on your mind? Type 'Task:' or 'Goal:' to auto-route..."
          className="w-full bg-transparent border-0 text-[15px] leading-relaxed text-white p-0 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-white/20 resize-none flex-1 mb-8 relative z-10 font-light"
          style={{ minHeight: "100px" }}
        />
        <div className="flex justify-end relative z-10">
          <button 
            onClick={quickSaveJournal}
            disabled={!journalEntry.trim()}
            className={`px-6 py-3 text-xs font-black rounded-xl transition-all duration-500 flex items-center justify-center gap-2.5 tracking-widest uppercase
              ${journalEntry.trim() 
                ? 'bg-white text-black shadow-[0_15px_30px_rgba(255,255,255,0.2)] hover:scale-105 hover:bg-gray-100' 
                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}`}
          >
            <Save size={14} className={journalEntry.trim() ? "animate-pulse" : ""} /> Capture
          </button>
        </div>
      </motion.div>

      <ProtocolEngine />

      {/* Habits Snapshot */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-8 md:col-span-2 group relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform duration-500">
              <Activity size={20} />
            </div>
            <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">Daily Discipline</h3>
          </div>
          <button onClick={() => router.push("/habits")} className="text-[10px] font-black tracking-widest text-[#a1a1aa] hover:text-amber-400 transition-all duration-300 uppercase border-b border-transparent hover:border-amber-400/50 pb-0.5">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          {activeHabits.map((habit, i) => (
            <div 
              key={i} 
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-500 group/item ${
                habit.completedToday 
                  ? "bg-gradient-to-br from-amber-500/15 to-amber-500/5 border-amber-500/30 shadow-[0_10px_30px_rgba(245,158,11,0.1)]" 
                  : "bg-white/[0.02] border-white/[0.05] hover:border-amber-500/30 hover:bg-white/[0.04] hover:-translate-y-1"
              }`}
            >
              <span className={`text-[13px] font-bold tracking-wide transition-all duration-300 ${habit.completedToday ? 'text-amber-200' : 'text-[#a1a1aa] group-hover/item:text-white'}`}>
                {habit.title}
              </span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all duration-500 ${
                habit.completedToday 
                  ? 'bg-amber-500 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                  : 'border-white/10 group-hover/item:border-amber-500/40'
              }`}>
                {habit.completedToday && <span className="text-[14px] text-black font-black">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Atmospheric Overview (Time + Year Progress) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-8 flex flex-col justify-between group relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="text-5xl font-black font-['Outfit'] text-white tracking-tighter mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-700">
            {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'}
          </div>
          <div className="text-sm text-[#a1a1aa] font-bold tracking-[0.1em] uppercase opacity-60">
            {currentTime ? currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) : 'Loading date...'}
          </div>
        </div>

        {/* Year Progress */}
        {currentTime && (() => {
          const start = new Date(currentTime.getFullYear(), 0, 0);
          const diff = currentTime.getTime() - start.getTime();
          const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
          const isLeap = currentTime.getFullYear() % 4 === 0;
          const totalDays = isLeap ? 366 : 365;
          const pct = ((dayOfYear / totalDays) * 100).toFixed(1);
          return (
            <div className="mt-8 pt-6 border-t border-white/[0.05] relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-[0.25em]">Year Ascent</span>
                <span className="text-[11px] font-black text-white tabular-nums tracking-widest">{pct}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3 p-[1px] border border-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-rose-500 shadow-[0_0_15px_var(--color-accent)] transition-all duration-1000" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white font-black font-['Outfit'] tracking-wider uppercase tabular-nums">Day {dayOfYear}</span>
                <span className="text-[12px] text-[#a1a1aa] font-bold font-['Outfit'] tabular-nums opacity-60">{totalDays - dayOfYear} left</span>
              </div>
            </div>
          );
        })()}
      </motion.div>

      </div>
    </div>
  );
}
