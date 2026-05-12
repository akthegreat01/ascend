"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Heart, Dumbbell, BookOpen, Wallet, Users, Sparkles } from "lucide-react";

const categoryDefs = [
  { name: "Mind", icon: Brain, color: "#66fcf1" },
  { name: "Body", icon: Dumbbell, color: "#45a29e" },
  { name: "Discipline", icon: Sparkles, color: "#d4af37" },
  { name: "Learning", icon: BookOpen, color: "#a855f7" },
  { name: "Wealth", icon: Wallet, color: "#10b981" },
  { name: "Social", icon: Users, color: "#f43f5e" },
  { name: "Spiritual", icon: Heart, color: "#ec4899" },
];

export default function LifeDashboard() {
  const [values, setValues] = useState<number[]>(Array(7).fill(0));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Calculate values from real data
    const focusDates = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
    const tasks = JSON.parse(localStorage.getItem("ascend_premium_tasks") || "[]");
    const habits = JSON.parse(localStorage.getItem("ascend_habits") || "[]");
    const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
    const goals = JSON.parse(localStorage.getItem("ascend_goals") || "[]");
    const journal = JSON.parse(localStorage.getItem("ascend_journal") || "[]");
    const workouts = JSON.parse(localStorage.getItem("ascend_workouts") || "[]");

    const completedTasks = tasks.filter((t: any) => t.completed).length;
    const totalTasks = tasks.length;
    const habitCount = habits.length;
    
    // Count today's completed habits
    const today = new Date().toISOString().split('T')[0];
    let habitsCompletedToday = 0;
    Object.values(habitRecords).forEach((record: any) => {
      if (record[today]) habitsCompletedToday++;
    });

    // Mind: based on focus sessions
    const mind = Math.min(100, focusDates.length * 10);
    // Body: based on workouts
    const body = Math.min(100, workouts.length * 15);
    // Discipline: based on habit completion today
    const discipline = habitCount > 0 ? Math.min(100, Math.round((habitsCompletedToday / habitCount) * 100)) : 0;
    // Learning: based on journal entries (reflection)
    const learning = Math.min(100, journal.length * 8);
    // Wealth: based on goals set
    const wealth = Math.min(100, goals.length * 20);
    // Social: placeholder 0
    const social = 0;
    // Spiritual: based on journal entries
    const spiritual = Math.min(100, journal.length * 5);

    setValues([mind, body, discipline, learning, wealth, social, spiritual]);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const categories = categoryDefs.map((cat, i) => ({ ...cat, value: values[i] }));

  return (
    <div className="glass-panel p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-['Outfit'] font-light text-white mb-1">
          Life Systems
        </h2>
        <p className="text-sm text-[#c5c6c7]/60 font-light">
          Your holistic performance matrix
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-4 rounded-xl border border-white/5 bg-white/5 relative overflow-hidden group cursor-pointer"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${cat.color}, transparent)` }}
            />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="flex items-center justify-between">
                <cat.icon size={20} style={{ color: cat.color }} className="opacity-80" />
                <span className="text-xl font-light text-white">
                  {cat.value}<span className="text-xs text-white/50">%</span>
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-2">{cat.name}</h3>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 1, type: "spring" }}
                    className="h-full rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: cat.color, color: cat.color }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
