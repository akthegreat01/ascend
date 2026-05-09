"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, BrainCircuit, Activity } from "lucide-react";

export default function AILifeAnalysis() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    // Read user data to generate "AI" insights
    const statsStr = localStorage.getItem("nexus_stats");
    const tasksStr = localStorage.getItem("nexus_premium_tasks");
    const datesStr = localStorage.getItem("nexus_focus_dates");

    const generatedInsights: string[] = [];

    let workTime = 0;
    if (statsStr) {
      const stats = JSON.parse(statsStr);
      workTime = stats.workTime;
      if (stats.workTime > 3600 * 5) {
        generatedInsights.push("Your deep work endurance is reaching elite levels. You are sustaining focus periods longer than 92% of your baseline.");
      } else if (stats.workTime === 0) {
        generatedInsights.push("Your focus engines are cold. A 25-minute Pomodoro session today will break the inertia.");
      } else {
        generatedInsights.push("You are building steady momentum. Consistency matters more than intensity at this stage.");
      }
    }

    if (datesStr) {
      const dates = JSON.parse(datesStr);
      if (dates.length > 3) {
        generatedInsights.push(`You have logged focus sessions on ${dates.length} separate days. Your neural pathways are adapting to this new discipline routine.`);
      }
    }

    if (tasksStr) {
      const tasks = JSON.parse(tasksStr);
      const completed = tasks.filter((t: any) => t.completed || t.status === "done").length;
      const pending = tasks.length - completed;
      const highPriorityTasks = tasks.filter((t: any) => (!t.completed && t.status !== "done") && t.priority === "high");
      
      if (highPriorityTasks.length > 0) {
        generatedInsights.push(`Strategic Priority: "${highPriorityTasks[0].title}" requires your immediate attention. Focus here next.`);
      } else if (pending > 0) {
        const nextTask = tasks.find((t: any) => !t.completed && t.status !== "done");
        if (nextTask) {
          generatedInsights.push(`Next Objective: You have ${pending} tasks pending. Consider starting with "${nextTask.title}".`);
        }
      }
      
      if (pending > 10) {
        generatedInsights.push(`System Overload: ${pending} incomplete tasks detected. Purge or delegate low-priority items to reduce cognitive drag.`);
      } else if (completed > 2) {
        generatedInsights.push(`Execution Velocity: High. You have completed ${completed} tasks. Use this momentum to tackle complex deep work.`);
      }
    }

    // Default insights if not enough data
    if (generatedInsights.length === 0) {
      generatedInsights.push("Ascend is gathering telemetry on your focus patterns. Log your first session to begin deep analysis.");
      generatedInsights.push("Strategic Tip: Peak mental clarity often occurs after a reset. Ensure your work environment is calibrated.");
    }

    setInsights(generatedInsights.slice(0, 3)); // Show top 3 insights
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="animate-pulse h-[200px] w-full glass-panel" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 bg-[#0a0a0a] relative overflow-hidden group border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-500"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)] opacity-5 blur-[50px] pointer-events-none rounded-full group-hover:opacity-20 group-hover:scale-150 transition-all duration-700" />
      <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <BrainCircuit size={18} className="text-[var(--color-accent)]" />
          <h3 className="text-sm font-medium text-white tracking-wide uppercase">Ascend Intelligence</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest uppercase">Analyzing</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {insights.map((insight, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 1.2, duration: 0.8 }}
            className="flex gap-3 items-start group/item relative"
          >
            <div className="mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity">
              {idx === 0 ? <Sparkles size={14} className="text-emerald-400" /> : 
               idx === 1 ? <Activity size={14} className="text-amber-400" /> : 
               <BrainCircuit size={14} className="text-purple-400" />}
            </div>
            <p className="text-sm text-[#a1a1aa] leading-relaxed group-hover/item:text-white transition-colors">
              {insight.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (idx * 1.2) + (i * 0.015) }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
      
      {/* Scanning Line Effect */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50 z-20 pointer-events-none shadow-[0_0_10px_var(--color-accent)]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />
      {/* Background Pulse Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20 pointer-events-none z-0 mix-blend-overlay group-hover:opacity-50 transition-opacity duration-1000" />
    </motion.div>
  );
}
