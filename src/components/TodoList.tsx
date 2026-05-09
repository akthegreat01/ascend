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
    const savedToday = localStorage.getItem("nexus_premium_tasks");
    const savedTomorrow = localStorage.getItem("nexus_premium_tasks_tomorrow");
    
    if (savedToday) setTasks(JSON.parse(savedToday));
    else setTasks(initialTasks);
    
    if (savedTomorrow) setTomorrowTasks(JSON.parse(savedTomorrow));
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("nexus_premium_tasks", JSON.stringify(tasks));
      localStorage.setItem("nexus_premium_tasks_tomorrow", JSON.stringify(tomorrowTasks));
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
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden group">
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-medium text-white tracking-wide font-['Outfit']">Tasks</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-[#a1a1aa]">{completedCount}/{activeList.length} completed</p>
          </div>
        </div>
        
        <div className="flex bg-[#111] border border-[#ffffff10] rounded-lg p-1">
          <button 
            onClick={() => setView("today")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${view === "today" ? 'bg-white text-black' : 'text-[#a1a1aa] hover:text-white'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setView("tomorrow")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${view === "tomorrow" ? 'bg-white text-black' : 'text-[#a1a1aa] hover:text-white'}`}
          >
            Tomorrow
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden mb-6 relative z-10 shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-[var(--color-accent)] via-rose-400 to-[var(--color-accent)] bg-[length:200%_auto] animate-shimmer rounded-full shadow-[0_0_15px_var(--color-accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", bounce: 0, duration: 1.5 }}
        />
      </div>

      <form onSubmit={addTask} className="mb-6 relative z-10 flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={view === "today" ? "What needs to be done today?" : "Plan for tomorrow..."}
            className="w-full bg-[#0a0a0a] border border-[#ffffff15] rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-[#a1a1aa]/50 focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-white to-gray-300 text-black rounded-lg hover:from-white hover:to-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
        <div className="flex gap-2 px-1">
          {(["high", "medium", "low"] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setNewPriority(p)}
              className={`text-[10px] font-medium px-2 py-1 rounded-md border transition-all flex items-center gap-1 hover:scale-105 active:scale-95 ${
                newPriority === p ? priorityColors[p] : 'text-[#a1a1aa] border-transparent hover:bg-white/5'
              }`}
            >
              <Flag size={10} /> {p}
            </button>
          ))}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2 relative z-10">
        <AnimatePresence mode="popLayout">
          {activeList.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50"
            >
              <Check size={32} className="text-[#a1a1aa]" />
              <p className="text-sm text-[#a1a1aa]">
                {view === "today" ? "All caught up.\nEnjoy your day." : "Nothing planned yet.\nSet up tomorrow."}
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
                className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                  task.completed ? "bg-[#0a0a0a] border-transparent opacity-60 scale-[0.98]" : "bg-[#111111] border-[#ffffff10] hover:border-[#ffffff25] hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden relative">
                  <button
                    onClick={(e) => toggleTask(task.id, task.completed, e)}
                    className={`flex-shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 active:scale-90 relative ${
                      task.completed 
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-[0_0_15px_var(--color-accent)]" 
                        : "border-[#ffffff30] hover:border-[var(--color-accent)]/80 hover:shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                    }`}
                  >
                    {task.completed && <Check size={14} strokeWidth={3} className="animate-glow" />}
                    
                    {/* XP Popups */}
                    <AnimatePresence>
                      {xpPopups.map(popup => (
                        <motion.div
                          key={popup.id}
                          initial={{ opacity: 1, y: 0, scale: 0.5 }}
                          animate={{ opacity: 0, y: -40, scale: 1.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute pointer-events-none text-[var(--color-accent)] font-black text-xs whitespace-nowrap drop-shadow-lg z-50"
                          style={{ left: popup.x - 10, top: popup.y - 10 }}
                        >
                          +{popup.amount} XP
                        </motion.div>
                      ))}
                    </AnimatePresence>

                  </button>
                  <span className={`text-sm truncate transition-colors duration-300 ${task.completed ? "text-[#a1a1aa] line-through" : "text-white"}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-md border ${priorityColors[task.priority]} ${task.completed ? 'opacity-50' : ''}`}>
                    {task.priority}
                  </span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-rose-400 hover:bg-rose-400/10 rounded-md transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <Trash2 size={14} />
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
