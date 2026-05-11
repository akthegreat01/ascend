"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Plus, GripVertical, Trash2, AlertTriangle, Star, Clock, ArrowDown } from "lucide-react";

interface MatrixTask {
  id: string;
  title: string;
  quadrant: "do" | "schedule" | "delegate" | "eliminate";
}

const quadrants = [
  { key: "do" as const, label: "Do First", desc: "Urgent & Important", color: "#ef4444", icon: AlertTriangle },
  { key: "schedule" as const, label: "Schedule", desc: "Important, Not Urgent", color: "#3b82f6", icon: Clock },
  { key: "delegate" as const, label: "Delegate", desc: "Urgent, Not Important", color: "#f59e0b", icon: Star },
  { key: "eliminate" as const, label: "Eliminate", desc: "Neither", color: "#6b7280", icon: ArrowDown },
];

export default function EisenhowerMatrix() {
  const [tasks, setTasks] = useState<MatrixTask[]>([]);
  const [adding, setAdding] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_eisenhower");
    if (saved) setTasks(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  const save = (updated: MatrixTask[]) => {
    setTasks(updated);
    localStorage.setItem("ascend_eisenhower", JSON.stringify(updated));
  };

  const addTask = (quadrant: MatrixTask["quadrant"]) => {
    if (!newTask.trim()) return;
    save([...tasks, { id: Date.now().toString(), title: newTask.trim(), quadrant }]);
    setNewTask("");
    setAdding(null);
  };

  const deleteTask = (id: string) => save(tasks.filter(t => t.id !== id));

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-light text-white tracking-tight mb-1 flex items-center gap-3">
          Eisenhower Matrix
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest">
            Priority System
          </span>
        </h1>
        <p className="text-sm text-[#a1a1aa]">Prioritize by urgency and importance. Focus on what truly matters.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((q, qi) => {
          const qTasks = tasks.filter(t => t.quadrant === q.key);
          return (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.08 }}
              className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] min-h-[200px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: q.color }} />
                  <h3 className="text-sm font-semibold text-white">{q.label}</h3>
                </div>
                <span className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">{q.desc}</span>
              </div>

              <div className="flex-1 space-y-1.5 mb-3">
                {qTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#111] border border-[#ffffff06] group/task">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: q.color, opacity: 0.6 }} />
                    <span className="text-xs text-white font-light flex-1">{task.title}</span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover/task:opacity-100 p-1 rounded hover:bg-red-500/10 text-[#a1a1aa] hover:text-red-400 transition-all"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
                {qTasks.length === 0 && <p className="text-[11px] text-[#ffffff15] text-center py-6">No tasks</p>}
              </div>

              {adding === q.key ? (
                <div className="flex gap-2">
                  <input
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addTask(q.key)}
                    placeholder="Task..."
                    className="flex-1 bg-transparent border border-[#ffffff08] rounded-lg text-xs text-white px-3 py-2 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]"
                    autoFocus
                  />
                  <button onClick={() => addTask(q.key)} className="px-3 py-2 bg-white/10 rounded-lg text-xs text-white font-medium hover:bg-white/20 transition-colors">Add</button>
                </div>
              ) : (
                <button
                  onClick={() => { setAdding(q.key); setNewTask(""); }}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-dashed border-[#ffffff08] text-[11px] text-[#a1a1aa] hover:text-white hover:border-[#ffffff20] transition-all"
                >
                  <Plus size={12} /> Add Task
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
