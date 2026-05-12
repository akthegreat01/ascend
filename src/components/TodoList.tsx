"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Plus, MoreHorizontal, Trash2, Calendar, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const initialTasks: Task[] = [];

const priorityColors = {
  high: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

export default function TodoList() {
  const [view, setView] = useState<"today" | "tomorrow">("today");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tomorrowTasks, setTomorrowTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");
  const [isLoaded, setIsLoaded] = useState(false);
  const [xpPopups, setXpPopups] = useState<{id: number, x: number, y: number, amount: number}[]>([]);

  // Web Audio API for a premium tiny "pop" sound
  const playPopSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  // Web Audio API for an epic level up sound
  const playEpicSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  useEffect(() => {
    const savedToday = localStorage.getItem("ascend_premium_tasks");
    const savedTomorrow = localStorage.getItem("ascend_premium_tasks_tomorrow");
    
    if (savedToday) setTasks(JSON.parse(savedToday));
    else setTasks(initialTasks);
    
    if (savedTomorrow) setTomorrowTasks(JSON.parse(savedTomorrow));
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_premium_tasks", JSON.stringify(tasks));
      localStorage.setItem("ascend_premium_tasks_tomorrow", JSON.stringify(tomorrowTasks));
    }
  }, [tasks, tomorrowTasks, isLoaded]);

  const activeList = view === "today" ? tasks : tomorrowTasks;
  const setActiveList = view === "today" ? setTasks : setTomorrowTasks;

  const triggerXpPopup = (e: React.MouseEvent, amount: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Use relative coordinates to the button
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPopup = { id: Date.now(), x, y, amount };
    setXpPopups(prev => [...prev, newPopup]);
    
    setTimeout(() => {
      setXpPopups(prev => prev.filter(p => p.id !== newPopup.id));
    }, 1000);
  };

  const toggleTask = (id: string, currentlyCompleted: boolean, e: React.MouseEvent) => {
    if (!currentlyCompleted) {
      playPopSound();
      triggerXpPopup(e, 50);
      
      // Every 5th task triggers an epic sound
      const completedCount = activeList.filter(t => t.completed).length + 1;
      if (completedCount % 5 === 0) {
        setTimeout(() => playEpicSound(), 200);
      }
    }
    setActiveList(activeList.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setActiveList(activeList.filter(t => t.id !== id));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setActiveList([{
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: newPriority
    }, ...activeList]);
    setNewTask("");
  };

  if (!isLoaded) return <div className="glass-panel p-6 flex flex-col h-full animate-pulse" />;

  const completedCount = activeList.filter(t => t.completed).length;
  const progress = activeList.length === 0 ? 0 : (completedCount / activeList.length) * 100;

  return (
    <div className="glass-panel p-8 flex flex-col h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-accent)]/5 blur-[80px] pointer-events-none rounded-full group-hover:scale-150 transition-transform duration-1000" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase flex items-center gap-3">
            <Check size={18} className="text-[var(--color-accent)]" />
            Execution List
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest opacity-60">{completedCount}/{activeList.length} neutralized</p>
          </div>
        </div>
        
        <div className="flex bg-white/[0.03] border border-white/5 rounded-xl p-1.5 shadow-inner">
          <button 
            onClick={() => setView("today")}
            className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${view === "today" ? 'bg-white text-black shadow-lg' : 'text-[#a1a1aa] hover:text-white'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setView("tomorrow")}
            className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${view === "tomorrow" ? 'bg-white text-black shadow-lg' : 'text-[#a1a1aa] hover:text-white'}`}
          >
            Later
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8 relative z-10 p-[1px] border border-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-[var(--color-accent)] via-rose-500 to-[var(--color-accent)] bg-[length:200%_auto] animate-shimmer rounded-full shadow-[0_0_20px_rgba(244,63,94,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", bounce: 0, duration: 1.5 }}
        />
      </div>

      <form onSubmit={addTask} className="mb-8 relative z-10 flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={view === "today" ? "Initiate new objective..." : "Queue for tomorrow..."}
            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl py-4 pl-5 pr-14 text-[14px] font-medium text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent)]/50 focus:bg-white/[0.04] transition-all duration-500 shadow-inner"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-white text-black rounded-xl hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
        <div className="flex gap-3 px-1">
          {(["high", "medium", "low"] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setNewPriority(p)}
              className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                newPriority === p ? priorityColors[p] : 'text-[#a1a1aa] border-white/5 hover:bg-white/5'
              }`}
            >
              <Flag size={10} /> {p}
            </button>
          ))}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar flex flex-col gap-3 relative z-10">
        <AnimatePresence mode="popLayout">
          {activeList.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30"
            >
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <Check size={40} className="text-white" />
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white">
                {view === "today" ? "Protocol Complete" : "Queue Empty"}
              </p>
            </motion.div>
          ) : (
            activeList.map(task => (
              <motion.div
                layout
                key={task.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-500 ${
                  task.completed 
                    ? "bg-white/[0.01] border-transparent opacity-40 scale-[0.98]" 
                    : "bg-white/[0.02] border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                <div className="flex items-center gap-4 overflow-hidden relative">
                  <button
                    onClick={(e) => toggleTask(task.id, task.completed, e)}
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all duration-500 hover:scale-110 active:scale-90 relative ${
                      task.completed 
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]" 
                        : "border-white/10 hover:border-[var(--color-accent)]/50 bg-black/20"
                    }`}
                  >
                    {task.completed && <Check size={16} strokeWidth={3} className="animate-glow" />}
                    
                    {/* XP Popups */}
                    <AnimatePresence>
                      {xpPopups.map(popup => (
                        <motion.div
                          key={popup.id}
                          initial={{ opacity: 1, y: 0, scale: 0.5 }}
                          animate={{ opacity: 0, y: -50, scale: 2 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute pointer-events-none text-[var(--color-accent)] font-black text-[10px] whitespace-nowrap drop-shadow-[0_0_10px_var(--color-accent)] z-50"
                          style={{ left: popup.x - 20, top: popup.y - 20 }}
                        >
                          +{popup.amount} XP
                        </motion.div>
                      ))}
                    </AnimatePresence>

                  </button>
                  <span className={`text-[14px] font-medium truncate transition-all duration-500 ${task.completed ? "text-[#a1a1aa] line-through italic" : "text-white"}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${priorityColors[task.priority]} ${task.completed ? 'opacity-30' : ''}`}>
                    {task.priority}
                  </span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
