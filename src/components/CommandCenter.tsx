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
    const savedRecords = localStorage.getItem("nexus_habit_records");
    const records = savedRecords ? JSON.parse(savedRecords) : {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!records[habitId]) records[habitId] = {};
    records[habitId][today] = !records[habitId][today];
    
    localStorage.setItem("nexus_habit_records", JSON.stringify(records));
    // Trigger update
    const updatedHabits = activeHabits.map(h => {
      if (h.id === habitId) {
        return { ...h, completedToday: records[habitId][today] };
      }
      return h;
    });
    setActiveHabits(updatedHabits);
    window.dispatchEvent(new Event("nexus_habit_updated"));
  };

  useEffect(() => {
    const loadHabits = () => {
      const savedHabits = localStorage.getItem("nexus_habits");
      const savedRecords = localStorage.getItem("nexus_habit_records");
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
    window.addEventListener("nexus_habit_updated", loadHabits);
    return () => window.removeEventListener("nexus_habit_updated", loadHabits);
  }, []);

  const quickSaveJournal = () => {
    if (!journalEntry.trim()) return;
    
    const text = journalEntry.trim();
    const lowerText = text.toLowerCase();
    
    // AI Smart Routing logic
    if (lowerText.startsWith("task:") || lowerText.startsWith("todo:") || lowerText.startsWith("remind me to") || lowerText.startsWith("buy ")) {
      const savedTasks = localStorage.getItem("nexus_premium_tasks");
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
      
      localStorage.setItem("nexus_premium_tasks", JSON.stringify([newTask, ...tasks]));
      alert("AI Routed: Added to Tasks ✅");
      
    } else if (lowerText.startsWith("goal:") || lowerText.startsWith("target:")) {
      const savedGoals = localStorage.getItem("nexus_goals");
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
      
      localStorage.setItem("nexus_goals", JSON.stringify([newGoal, ...goals]));
      alert("AI Routed: Added to Strategic Goals 🎯");
      
    } else {
      const saved = localStorage.getItem("nexus_journal");
      const entries = saved ? JSON.parse(saved) : [];
      
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        content: text,
        mood: "⚡️"
      };
      
      localStorage.setItem("nexus_journal", JSON.stringify([newEntry, ...entries]));
      alert("Memory sealed to Vault 🧠");
    }
    
    setJournalEntry("");
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <QuickLinks />

      {/* Quick Journal Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col group hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-500 relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-10 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <BookHeart size={18} />
          </div>
          <h3 className="font-medium text-white tracking-wide uppercase text-sm">Capture Thought</h3>
        </div>
        
        <textarea 
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="What's on your mind? Type 'Task:' or 'Goal:' to auto-route..."
          className="w-full bg-transparent border-0 text-[14px] leading-relaxed text-white p-0 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-[#ffffff30] resize-none flex-1 mb-6 relative z-10 font-light"
          style={{ minHeight: "80px" }}
        />
        <div className="flex justify-end relative z-10">
          <button 
            onClick={quickSaveJournal}
            disabled={!journalEntry.trim()}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 tracking-wide
              ${journalEntry.trim() 
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-105 hover:bg-gray-200' 
                : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
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
        className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] md:col-span-2 group hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-150 relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-10 bg-gradient-to-tl from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-150 pointer-events-none" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Activity size={18} />
            </div>
            <h3 className="font-medium text-white tracking-wide uppercase text-sm">Daily Discipline Snapshot</h3>
          </div>
          <button onClick={() => router.push("/habits")} className="text-xs font-bold tracking-wider text-[#a1a1aa] hover:text-amber-400 transition-colors uppercase">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          {activeHabits.map((habit, i) => (
            <div 
              key={i} 
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-150 group/item ${
                habit.completedToday 
                  ? "bg-gradient-to-r from-amber-500/20 to-amber-500/5 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                  : "bg-[#111] border-[#ffffff10] hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <span className={`text-sm font-medium transition-all duration-150 ${habit.completedToday ? 'text-amber-100' : 'text-[#e4e4e7] group-hover/item:text-white'}`}>
                {habit.title}
              </span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-150 ${
                habit.completedToday 
                  ? 'bg-amber-400 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                  : 'border-[#ffffff30] group-hover/item:border-amber-500/60'
              }`}>
                {habit.completedToday && <span className="text-[12px] text-black font-bold">✓</span>}
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
        className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] lg:col-span-1 group hover:border-[var(--color-accent)]/30 transition-colors flex flex-col justify-between"
      >
        <div>
          <div className="text-4xl font-light font-['Outfit'] text-white tracking-tight mb-1">
            {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'}
          </div>
          <div className="text-sm text-[#a1a1aa] font-medium tracking-wide">
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
            <div className="mt-5 pt-4 border-t border-[#ffffff08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Year Progress</span>
                <span className="text-[10px] font-bold text-white tabular-nums">{pct}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] transition-all duration-1000" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white font-semibold font-['Outfit'] tabular-nums">Day {dayOfYear}</span>
                <span className="text-[11px] text-[#a1a1aa] font-['Outfit'] tabular-nums">{totalDays - dayOfYear} left</span>
              </div>
            </div>
          );
        })()}
      </motion.div>

      </div>
    </div>
  );
}
