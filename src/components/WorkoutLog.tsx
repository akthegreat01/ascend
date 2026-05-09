"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Plus, Trash2, TrendingUp, Flame, Calendar } from "lucide-react";

interface WorkoutEntry {
  id: string;
  date: string;
  exercises: { name: string; sets: number; reps: number; weight: string }[];
  duration: number; // minutes
  note: string;
}

const presets = ["Push-ups", "Pull-ups", "Squats", "Deadlift", "Bench Press", "Running", "Plank", "Cycling"];

export default function WorkoutLog() {
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [exercises, setExercises] = useState<{ name: string; sets: number; reps: number; weight: string }[]>([]);
  const [exName, setExName] = useState("");
  const [exSets, setExSets] = useState("3");
  const [exReps, setExReps] = useState("10");
  const [exWeight, setExWeight] = useState("");
  const [duration, setDuration] = useState("30");
  const [note, setNote] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexus_workouts");
    if (saved) setEntries(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  const save = (updated: WorkoutEntry[]) => {
    setEntries(updated);
    localStorage.setItem("nexus_workouts", JSON.stringify(updated));
  };

  const addExercise = () => {
    if (!exName.trim()) return;
    setExercises([...exercises, { name: exName.trim(), sets: parseInt(exSets) || 3, reps: parseInt(exReps) || 10, weight: exWeight.trim() }]);
    setExName("");
    setExWeight("");
  };

  const saveWorkout = () => {
    if (exercises.length === 0) return;
    const entry: WorkoutEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      exercises,
      duration: parseInt(duration) || 30,
      note: note.trim(),
    };
    save([entry, ...entries]);
    setExercises([]);
    setDuration("30");
    setNote("");
    setIsAdding(false);
  };

  const deleteEntry = (id: string) => save(entries.filter(e => e.id !== id));

  const thisWeek = entries.filter(e => {
    const d = new Date(e.date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  const totalVolume = thisWeek.reduce((sum, e) => sum + e.exercises.reduce((s, ex) => s + ex.sets * ex.reps, 0), 0);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight mb-1">Workout Log</h1>
          <p className="text-sm text-[#a1a1aa]">Track your physical training and build consistency.</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-xs font-semibold hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Plus size={14} /> Log Workout
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={14} className="text-orange-400" />
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">This Week</span>
          </div>
          <div className="text-3xl font-light text-white font-['Outfit']">{thisWeek.length} <span className="text-sm text-[#a1a1aa]">sessions</span></div>
        </div>
        <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Volume</span>
          </div>
          <div className="text-3xl font-light text-white font-['Outfit']">{totalVolume} <span className="text-sm text-[#a1a1aa]">reps</span></div>
        </div>
        <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">All Time</span>
          </div>
          <div className="text-3xl font-light text-white font-['Outfit']">{entries.length} <span className="text-sm text-[#a1a1aa]">workouts</span></div>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10]">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">New Workout</h3>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {presets.map(p => (
              <button key={p} onClick={() => setExName(p)} className={`px-2.5 py-1 rounded-md text-[10px] font-medium border transition-all ${exName === p ? "bg-white/10 border-white/20 text-white" : "border-[#ffffff08] text-[#a1a1aa] hover:text-white"}`}>
                {p}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <input value={exName} onChange={e => setExName(e.target.value)} placeholder="Exercise" className="flex-1 bg-transparent border border-[#ffffff08] rounded-lg text-sm text-white px-3 py-2.5 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]" />
            <input value={exSets} onChange={e => setExSets(e.target.value)} placeholder="Sets" className="w-16 bg-transparent border border-[#ffffff08] rounded-lg text-sm text-white px-3 py-2.5 focus:outline-none text-center placeholder-[#ffffff20]" />
            <input value={exReps} onChange={e => setExReps(e.target.value)} placeholder="Reps" className="w-16 bg-transparent border border-[#ffffff08] rounded-lg text-sm text-white px-3 py-2.5 focus:outline-none text-center placeholder-[#ffffff20]" />
            <input value={exWeight} onChange={e => setExWeight(e.target.value)} placeholder="kg" className="w-16 bg-transparent border border-[#ffffff08] rounded-lg text-sm text-white px-3 py-2.5 focus:outline-none text-center placeholder-[#ffffff20]" />
            <button onClick={addExercise} className="px-4 py-2.5 bg-white/10 border border-[#ffffff10] text-white text-xs font-semibold rounded-lg hover:bg-white/20 transition-all">Add</button>
          </div>

          {exercises.length > 0 && (
            <div className="space-y-1.5 mb-4">
              {exercises.map((ex, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#111] border border-[#ffffff06]">
                  <span className="text-sm text-white font-medium">{ex.name}</span>
                  <span className="text-xs text-[#a1a1aa]">{ex.sets}×{ex.reps} {ex.weight && `@ ${ex.weight}kg`}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration (min)" className="w-32 bg-transparent border border-[#ffffff08] rounded-lg text-sm text-white px-3 py-2.5 focus:outline-none placeholder-[#ffffff20]" />
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (optional)" className="flex-1 bg-transparent border border-[#ffffff08] rounded-lg text-sm text-white px-3 py-2.5 focus:outline-none placeholder-[#ffffff20]" />
          </div>

          <button onClick={saveWorkout} disabled={exercises.length === 0} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${exercises.length > 0 ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white/20 cursor-not-allowed"}`}>
            Save Workout
          </button>
        </motion.div>
      )}

      {/* History */}
      <div className="flex flex-col gap-3">
        {entries.length === 0 ? (
          <div className="glass-panel p-12 bg-[#0a0a0a] border border-[#ffffff10] text-center">
            <Dumbbell size={32} className="text-[#ffffff15] mx-auto mb-3" />
            <p className="text-sm text-[#a1a1aa]">No workouts logged yet. Start training.</p>
          </div>
        ) : entries.map((entry, idx) => (
          <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Dumbbell size={14} className="text-orange-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{entry.date}</span>
                  <span className="text-xs text-[#a1a1aa] ml-2">{entry.duration} min</span>
                </div>
              </div>
              <button onClick={() => deleteEntry(entry.id)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-[#a1a1aa] hover:text-red-400 transition-all">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.exercises.map((ex, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-[#111] border border-[#ffffff06] text-xs text-[#a1a1aa]">
                  {ex.name} <span className="text-white font-medium">{ex.sets}×{ex.reps}</span> {ex.weight && <span className="text-orange-400">@{ex.weight}kg</span>}
                </span>
              ))}
            </div>
            {entry.note && <p className="text-xs text-[#a1a1aa] mt-2 italic">{entry.note}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
