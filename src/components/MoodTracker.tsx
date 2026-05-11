"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Frown, Meh, Zap, Heart, TrendingUp, Calendar } from "lucide-react";

const moods = [
  { emoji: "🔥", label: "On Fire", value: 5, color: "#f59e0b" },
  { emoji: "😊", label: "Good", value: 4, color: "#10b981" },
  { emoji: "😐", label: "Neutral", value: 3, color: "#6b7280" },
  { emoji: "😔", label: "Low", value: 2, color: "#3b82f6" },
  { emoji: "😩", label: "Drained", value: 1, color: "#ef4444" },
];

interface MoodEntry {
  date: string;
  value: number;
  emoji: string;
  label: string;
  note: string;
}

export default function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [todayLogged, setTodayLogged] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_mood_entries");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed);
      const today = new Date().toISOString().split("T")[0];
      setTodayLogged(parsed.some((e: MoodEntry) => e.date === today));
    }
    setIsLoaded(true);
  }, []);

  const logMood = () => {
    if (selectedMood === null) return;
    const mood = moods.find(m => m.value === selectedMood);
    if (!mood) return;

    const today = new Date().toISOString().split("T")[0];
    const newEntry: MoodEntry = {
      date: today,
      value: mood.value,
      emoji: mood.emoji,
      label: mood.label,
      note: note.trim(),
    };

    const updated = [newEntry, ...entries.filter(e => e.date !== today)];
    setEntries(updated);
    localStorage.setItem("ascend_mood_entries", JSON.stringify(updated));
    setTodayLogged(true);
    setSelectedMood(null);
    setNote("");
  };

  const avgMood = entries.length > 0
    ? (entries.slice(0, 7).reduce((sum, e) => sum + e.value, 0) / Math.min(entries.length, 7)).toFixed(1)
    : "—";

  const last7 = entries.slice(0, 7).reverse();

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-light text-white tracking-tight mb-1">Mood Tracker</h1>
        <p className="text-sm text-[#a1a1aa]">Understand your emotional patterns to optimize performance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Log Today */}
        <div className="lg:col-span-2 glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10]">
          {todayLogged ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-5xl mb-4">{entries[0]?.emoji}</div>
              <h2 className="text-lg font-semibold text-white mb-1">Today's mood logged</h2>
              <p className="text-sm text-[#a1a1aa]">You're feeling <span className="text-white font-medium">{entries[0]?.label}</span></p>
              {entries[0]?.note && <p className="text-xs text-[#a1a1aa] mt-3 italic max-w-sm">"{entries[0].note}"</p>}
              <button onClick={() => setTodayLogged(false)} className="mt-6 text-xs text-[#a1a1aa] hover:text-white transition-colors underline underline-offset-4">Update</button>
            </motion.div>
          ) : (
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-6">How are you feeling today?</h2>
              <div className="flex gap-3 mb-6">
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedMood === mood.value
                        ? "border-white/30 bg-white/10 scale-105 shadow-lg"
                        : "border-[#ffffff08] bg-[#111] hover:border-[#ffffff20] hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider">{mood.label}</span>
                  </button>
                ))}
              </div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a short note (optional)..."
                className="w-full bg-transparent border border-[#ffffff08] rounded-xl text-sm text-white p-3 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20] resize-none h-20 mb-4"
              />
              <button
                onClick={logMood}
                disabled={selectedMood === null}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedMood !== null
                    ? "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                Log Mood
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">7-Day Average</span>
            </div>
            <div className="text-3xl font-light text-white font-['Outfit']">{avgMood}<span className="text-sm text-[#a1a1aa]">/5</span></div>
          </div>
          <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Total Entries</span>
            </div>
            <div className="text-3xl font-light text-white font-['Outfit']">{entries.length}</div>
          </div>
          <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={14} className="text-rose-400" />
              <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Last 7 Days</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {last7.length > 0 ? last7.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(e.value / 5) * 100}%` }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex-1 rounded-sm"
                  style={{ backgroundColor: moods.find(m => m.value === e.value)?.color || "#333" }}
                  title={`${e.date}: ${e.label}`}
                />
              )) : (
                <p className="text-xs text-[#a1a1aa]">No data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      {entries.length > 0 && (
        <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10]">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">History</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {entries.slice(0, 20).map((entry, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#111] border border-[#ffffff06]">
                <span className="text-xl">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{entry.label}</span>
                    {entry.note && <span className="text-xs text-[#a1a1aa] truncate">— {entry.note}</span>}
                  </div>
                </div>
                <span className="text-[10px] text-[#a1a1aa] font-mono shrink-0">{entry.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
