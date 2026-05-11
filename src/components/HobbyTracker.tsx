"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Flame, Clock, Music, Code, Dumbbell, BookOpen, Brush, Trash2 } from "lucide-react";

type Hobby = {
  id: string;
  name: string;
  icon: string;
  hoursLogged: number;
  hoursTarget: number;
  level: number;
};

const ICONS: Record<string, any> = {
  "music": Music,
  "code": Code,
  "fitness": Dumbbell,
  "reading": BookOpen,
  "art": Brush,
  "general": Flame
};

export default function HobbyTracker() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState(100);
  const [newIcon, setNewIcon] = useState("general");

  useEffect(() => {
    const saved = localStorage.getItem("ascend_hobbies");
    if (saved) {
      setHobbies(JSON.parse(saved));
    } else {
      setHobbies([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_hobbies", JSON.stringify(hobbies));
    }
  }, [hobbies, isLoaded]);

  const addHobby = () => {
    if (!newName.trim()) return;
    const newHobby: Hobby = {
      id: Date.now().toString(),
      name: newName,
      icon: newIcon,
      hoursLogged: 0,
      hoursTarget: newTarget,
      level: 1
    };
    setHobbies([...hobbies, newHobby]);
    setNewName("");
    setIsAdding(false);
  };

  const logHours = (id: string, hours: number) => {
    setHobbies(hobbies.map(h => {
      if (h.id !== id) return h;
      const newTotal = h.hoursLogged + hours;
      // Level up every 10 hours
      const newLevel = Math.floor(newTotal / 10) + 1;
      return { ...h, hoursLogged: newTotal, level: newLevel };
    }));
  };

  const deleteHobby = (id: string) => {
    setHobbies(hobbies.filter(h => h.id !== id));
  };

  if (!isLoaded) return <div className="animate-pulse h-[400px] w-full" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="glass-panel px-4 py-2 bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm font-medium flex items-center gap-2">
          <Flame size={16} /> Active Pursuits
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Plus size={16} /> New Skill
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6 bg-[#0a0a0a] overflow-hidden border border-[#ffffff20]"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Skill Name (e.g. Piano)" 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="flex-1 bg-[#111] border border-[#ffffff10] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <input 
                type="number" 
                placeholder="Target Hours (e.g. 100)" 
                value={newTarget}
                onChange={e => setNewTarget(parseInt(e.target.value))}
                className="w-32 bg-[#111] border border-[#ffffff10] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <select 
                value={newIcon}
                onChange={e => setNewIcon(e.target.value)}
                className="bg-[#111] border border-[#ffffff10] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              >
                <option value="general">General</option>
                <option value="music">Music</option>
                <option value="code">Coding</option>
                <option value="fitness">Fitness</option>
                <option value="reading">Reading</option>
                <option value="art">Art</option>
              </select>
              <button 
                onClick={addHobby}
                className="px-6 py-3 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
              >
                Initialize Skill
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hobbies.map((hobby, i) => {
          const Icon = ICONS[hobby.icon] || Flame;
          const progress = Math.min(100, Math.round((hobby.hoursLogged / hobby.hoursTarget) * 100));

          return (
            <motion.div 
              key={hobby.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-500 relative group overflow-hidden hover:-translate-y-1"
            >
              {/* Dynamic Aura */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--color-accent)] opacity-10 blur-[60px] group-hover:opacity-30 group-hover:scale-150 transition-all duration-700 rounded-full pointer-events-none" />
              <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{hobby.name}</h3>
                    <span className="text-[10px] text-[#a1a1aa] uppercase font-bold tracking-widest">Level {hobby.level}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteHobby(hobby.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-rose-400 hover:bg-rose-400/10 rounded-md transition-all duration-200"
                  title="Remove Skill"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-xs text-[#a1a1aa]">Mastery Progress</span>
                <span className="text-sm font-medium text-white tabular-nums">{hobby.hoursLogged} / {hobby.hoursTarget} hrs</span>
              </div>
              
              <div className="h-2 w-full bg-[#111111] rounded-full overflow-hidden border border-[#ffffff15] mb-6 relative z-10 shadow-inner group-hover:border-[#ffffff30] transition-colors">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[var(--color-accent)] via-rose-400 to-[var(--color-accent)] bg-[length:200%_auto] animate-shimmer rounded-full shadow-[0_0_15px_var(--color-accent)]"
                />
              </div>

              <div className="flex gap-3 relative z-10">
                <button 
                  onClick={() => logHours(hobby.id, 1)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#111] to-[#151515] hover:from-[var(--color-accent)]/20 hover:to-[var(--color-accent)]/10 border border-[#ffffff10] hover:border-[var(--color-accent)]/50 text-xs font-bold text-white rounded-xl transition-all duration-150 flex items-center justify-center gap-1 shadow-md hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95 uppercase tracking-widest"
                >
                  <Plus size={14} /> 1 Hr
                </button>
                <button 
                  onClick={() => logHours(hobby.id, 5)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#111] to-[#151515] hover:from-[var(--color-accent)]/20 hover:to-[var(--color-accent)]/10 border border-[#ffffff10] hover:border-[var(--color-accent)]/50 text-xs font-bold text-white rounded-xl transition-all duration-150 flex items-center justify-center gap-1 shadow-md hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95 uppercase tracking-widest"
                >
                  <Plus size={14} /> 5 Hrs
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
