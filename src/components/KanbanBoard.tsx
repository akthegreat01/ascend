"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  status?: "todo" | "in-progress" | "done";
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_premium_tasks");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate old tasks
      const migrated = parsed.map((t: Task) => ({
        ...t,
        status: t.status || (t.completed ? "done" : "todo")
      }));
      setTasks(migrated);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_premium_tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const updateStatus = (id: string, newStatus: "todo" | "in-progress" | "done") => {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, status: newStatus, completed: newStatus === "done" } 
        : t
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: "medium",
      status: "todo"
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const columns = [
    { id: "todo", title: "To Do", color: "border-[#ffffff15]" },
    { id: "in-progress", title: "In Progress", color: "border-amber-500/30" },
    { id: "done", title: "Done", color: "border-emerald-500/30" },
  ] as const;

  if (!isLoaded) return <div className="animate-pulse h-[600px] bg-[#111] rounded-2xl" />;

  return (
    <div className="flex gap-6 h-[700px] w-full overflow-x-auto pb-4 custom-scrollbar">
      {columns.map(col => {
        const columnTasks = tasks.filter(t => t.status === col.id);
        
        return (
          <div key={col.id} className={`flex-1 min-w-[300px] flex flex-col bg-[#0a0a0a] rounded-2xl border ${col.color} p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white tracking-wide">{col.title}</h3>
              <div className="flex items-center gap-2">
                {col.id === "todo" && (
                  <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-1 rounded-md bg-[#111] text-[#a1a1aa] hover:text-white hover:bg-[#222] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                )}
                <span className="text-xs font-bold text-[#a1a1aa] bg-[#111] px-2 py-1 rounded-full">{columnTasks.length}</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1">
              {col.id === "todo" && isAdding && (
                <form onSubmit={handleAddTask} className="mb-2">
                  <input
                    type="text"
                    autoFocus
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="New task..."
                    className="w-full bg-[#111] border border-[var(--color-accent)] rounded-xl px-3 py-2 text-sm text-white focus:outline-none shadow-[0_0_10px_var(--color-accent)_inset]"
                  />
                </form>
              )}
              <AnimatePresence>
                {columnTasks.map(task => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={task.id}
                    className="bg-[#111] border border-[#ffffff10] p-4 rounded-xl group hover:border-[#ffffff25] transition-all"
                  >
                    <p className={`text-sm mb-3 ${task.completed ? 'text-[#a1a1aa] line-through' : 'text-white'}`}>
                      {task.title}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-md border ${
                        task.priority === 'high' ? 'text-rose-400 border-rose-400/20 bg-rose-400/10' :
                        task.priority === 'medium' ? 'text-amber-400 border-amber-400/20 bg-amber-400/10' :
                        'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'
                      }`}>
                        {task.priority}
                      </span>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {col.id !== "todo" && (
                          <button 
                            onClick={() => updateStatus(task.id, col.id === "done" ? "in-progress" : "todo")}
                            className="p-1 hover:bg-[#ffffff10] rounded text-[#a1a1aa]"
                          >
                            <ChevronLeft size={14} />
                          </button>
                        )}
                        {col.id !== "done" && (
                          <button 
                            onClick={() => updateStatus(task.id, col.id === "todo" ? "in-progress" : "done")}
                            className="p-1 hover:bg-[#ffffff10] rounded text-[#a1a1aa]"
                          >
                            <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
