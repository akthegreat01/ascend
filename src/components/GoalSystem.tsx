"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, Calendar, ChevronRight, CheckCircle2, Circle, Trash2 } from "lucide-react";

type Milestone = {
  id: string;
  title: string;
  completed: boolean;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  category: string;
  milestones: Milestone[];
};

export default function GoalSystem() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ascend_goals");
    if (saved) {
      setGoals(JSON.parse(saved));
    } else {
      setGoals([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_goals", JSON.stringify(goals));
    }
  }, [goals, isLoaded]);

  const addGoal = () => {
    if (!newTitle.trim()) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      category: "Personal",
      milestones: []
    };
    setGoals([...goals, newGoal]);
    setNewTitle("");
    setNewDesc("");
    setIsAdding(false);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      return {
        ...g,
        milestones: g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
      };
    }));
  };

  const addMilestone = (goalId: string) => {
    const title = prompt("Enter milestone title:");
    if (!title) return;
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      return {
        ...g,
        milestones: [...g.milestones, { id: Date.now().toString(), title, completed: false }]
      };
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const deleteMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      return {
        ...g,
        milestones: g.milestones.filter(m => m.id !== milestoneId)
      };
    }));
  };

  if (!isLoaded) return <div className="animate-pulse h-[600px] w-full" />;

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex justify-between items-center">
        <div className="glass-panel px-4 py-2 bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm font-medium flex items-center gap-2">
          <Target size={16} />
          Strategic Vision
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Plus size={16} /> New Goal
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6 bg-[#0a0a0a] overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Goal Title (e.g. Launch Startup)" 
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-transparent border-b border-[#ffffff20] text-2xl font-light text-white px-2 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder-[#ffffff30]"
              />
              <textarea 
                placeholder="Why is this important? What is the vision?" 
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                className="w-full bg-[#111] border border-[#ffffff10] rounded-xl text-sm text-white p-4 focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors placeholder-[#ffffff40] resize-none h-24"
              />
              <div className="flex justify-end">
                <button 
                  onClick={addGoal}
                  className="px-6 py-2 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  Initialize Goal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {goals.map((goal, i) => {
          const completedCount = goal.milestones.filter(m => m.completed).length;
          const totalCount = goal.milestones.length;
          const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

          return (
            <motion.div 
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel bg-[#0a0a0a] p-0 overflow-hidden flex flex-col group relative border border-[#ffffff10] hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Background gradient & Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 blur-[100px] pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#a1a1aa] mb-1 block">
                      {goal.category}
                    </span>
                    <h2 className="text-xl font-medium text-white">{goal.title}</h2>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => deleteGoal(goal.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-rose-400 hover:bg-rose-400/10 rounded-md"
                      title="Delete Goal"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#111] border border-[#ffffff10] rounded-full text-xs text-[#a1a1aa]">
                      <Calendar size={12} /> {goal.deadline}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-8 flex-1 relative z-10">
                  {goal.description}
                </p>

                {/* Milestones */}
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Milestones</h3>
                    <button 
                      onClick={() => addMilestone(goal.id)}
                      className="text-[10px] text-[var(--color-accent)] hover:text-white transition-colors flex items-center"
                    >
                      <Plus size={10} className="mr-1" /> Add Step
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {goal.milestones.length === 0 && (
                      <p className="text-xs text-[#ffffff40] italic">No milestones defined yet.</p>
                    )}
                    {goal.milestones.map(m => (
                      <div key={m.id} className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#ffffff0a] transition-colors border border-transparent hover:border-[#ffffff10] group/ms text-left">
                        <button 
                          onClick={() => toggleMilestone(goal.id, m.id)}
                          className="flex items-center gap-3 flex-1 text-left"
                        >
                          {m.completed ? (
                            <CheckCircle2 size={16} className="text-[var(--color-accent)]" />
                          ) : (
                            <Circle size={16} className="text-[#ffffff30] group-hover/ms:text-[#ffffff60] transition-colors" />
                          )}
                          <span className={`text-sm transition-colors ${m.completed ? 'text-[#ffffff60] line-through' : 'text-[#e4e4e7]'}`}>
                            {m.title}
                          </span>
                        </button>
                        <button 
                          onClick={() => deleteMilestone(goal.id, m.id)}
                          className="opacity-0 group-hover/ms:opacity-100 p-1 text-rose-400 hover:bg-rose-400/10 rounded-md transition-all duration-200"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Footer */}
              <div className="h-14 bg-[#111] border-t border-[#ffffff10] px-6 flex items-center justify-between relative z-10 group-hover:bg-[#1a1a1a] transition-colors duration-500">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa] group-hover:text-white transition-colors duration-300">Mission Progress</span>
                <div className="flex items-center gap-4 w-1/2">
                  <div className="h-2 flex-1 bg-black rounded-full overflow-hidden border border-[#ffffff15] shadow-inner group-hover:border-[#ffffff30] transition-colors duration-300">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[var(--color-accent)] via-rose-400 to-[var(--color-accent)] bg-[length:200%_auto] animate-shimmer shadow-[0_0_10px_var(--color-accent)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-bold tabular-nums w-10 text-right group-hover:from-white group-hover:to-[var(--color-accent)] transition-all duration-300">{progress}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
