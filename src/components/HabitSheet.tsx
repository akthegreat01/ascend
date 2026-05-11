"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Habit {
  id: string;
  name: string;
  color: string;
}

const PAST_DAYS = 14;
const generateDates = () => {
  const dates = [];
  for (let i = PAST_DAYS - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d);
  }
  return dates;
};

const initialHabits: Habit[] = [
  { id: "1", name: "Read 20 Pages", color: "bg-emerald-500" },
  { id: "2", name: "Deep Work (2h)", color: "bg-blue-500" },
  { id: "3", name: "Workout", color: "bg-rose-500" },
];

const availableColors = ["bg-emerald-500", "bg-blue-500", "bg-rose-500", "bg-purple-500", "bg-amber-500"];

export default function HabitSheet() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [records, setRecords] = useState<Record<string, Record<string, boolean>>>({});
  const [newHabit, setNewHabit] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const dates = generateDates();

  const playPopSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  useEffect(() => {
    const savedHabits = localStorage.getItem("ascend_habits");
    const savedRecords = localStorage.getItem("ascend_habit_records");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      setHabits(initialHabits);
    }
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_habits", JSON.stringify(habits));
      localStorage.setItem("ascend_habit_records", JSON.stringify(records));
    }
  }, [habits, records, isLoaded]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    setHabits([...habits, { id: Date.now().toString(), name: newHabit, color: randomColor }]);
    setNewHabit("");
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
    const newRecords = { ...records };
    delete newRecords[id];
    setRecords(newRecords);
  };

  const toggleRecord = (habitId: string, dateStr: string) => {
    const currentStatus = records[habitId]?.[dateStr] || false;
    if (!currentStatus) playPopSound();
    
    setRecords((prev) => ({
      ...prev,
      [habitId]: {
        ...(prev[habitId] || {}),
        [dateStr]: !currentStatus,
      },
    }));
  };

  const calculateStreak = (habitId: string) => {
    let streak = 0;
    // Check backwards from today
    for (let i = dates.length - 1; i >= 0; i--) {
      const dateStr = dates[i].toISOString().split("T")[0];
      if (records[habitId]?.[dateStr]) {
        streak++;
      } else {
        // If it's today and not checked, we don't break the streak immediately, we look at yesterday
        if (i === dates.length - 1) continue;
        break;
      }
    }
    return streak;
  };

  if (!isLoaded) return <div className="glass-panel w-full h-[400px] animate-pulse"></div>;

  return (
    <div className="glass-panel overflow-x-auto w-full relative">
      <div className="min-w-max p-6">
        
        {/* Header Row: Dates */}
        <div className="flex items-end mb-4">
          <div className="w-64 flex-shrink-0 font-medium text-white text-lg">Your Protocols</div>
          <div className="flex gap-2">
            {dates.map((d, i) => {
              const isToday = i === dates.length - 1;
              return (
                <div key={i} className="w-10 flex flex-col items-center justify-end">
                  <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isToday ? 'text-white' : 'text-[#a1a1aa]/50'}`}>
                    {d.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={`text-xs ${isToday ? 'text-white font-bold bg-white/10 px-1.5 py-0.5 rounded-md' : 'text-[#a1a1aa]'}`}>
                    {d.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-16 ml-6 text-center text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Streak</div>
        </div>

        {/* Habit Rows */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {habits.map((habit) => {
              const streak = calculateStreak(habit.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={habit.id}
                  className="flex items-center group"
                >
                  {/* Habit Name Column */}
                  <div className="w-64 flex-shrink-0 flex items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${habit.color}`} />
                      <span className="text-sm font-medium text-white">{habit.name}</span>
                    </div>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-rose-400 hover:bg-rose-400/10 rounded-md transition-all duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Grid Cells */}
                  <div className="flex gap-2">
                    {dates.map((d) => {
                      const dateStr = d.toISOString().split("T")[0];
                      const isCompleted = records[habit.id]?.[dateStr];
                      return (
                        <button
                          key={dateStr}
                          onClick={() => toggleRecord(habit.id, dateStr)}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                            isCompleted 
                              ? `${habit.color} border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]` 
                              : "bg-[#111111] border-[#ffffff10] hover:border-[#ffffff30]"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Streak Column */}
                  <div className="w-16 ml-6 flex justify-center items-center gap-1.5">
                    <Flame size={14} className={streak > 0 ? "text-amber-500" : "text-[#a1a1aa]/30"} />
                    <span className={`text-sm font-bold tabular-nums ${streak > 0 ? "text-white" : "text-[#a1a1aa]/30"}`}>
                      {streak}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Add Habit Row */}
        <form onSubmit={addHabit} className="flex items-center mt-6 pt-4 border-t border-[#ffffff10]">
          <div className="w-64 pr-4">
            <div className="relative">
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Add new protocol..."
                className="w-full bg-[#111111] border border-[#ffffff15] rounded-xl py-2 pl-3 pr-10 text-sm text-white placeholder-[#a1a1aa]/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!newHabit.trim()}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
