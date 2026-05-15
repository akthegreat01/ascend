"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, BrainCircuit, Activity } from "lucide-react";

export default function AILifeAnalysis() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const generate = () => {
      const statsStr = localStorage.getItem("ascend_stats");
      const tasksStr = localStorage.getItem("ascend_premium_tasks");
      const datesStr = localStorage.getItem("ascend_focus_dates");
      const generatedInsights: string[] = [];

      if (statsStr) {
        const stats = JSON.parse(statsStr);
        if (stats.workTime > 3600 * 5) {
          generatedInsights.push("Deep work endurance reaching elite levels — sustaining focus longer than 92% of baseline.");
        } else if (stats.workTime === 0) {
          generatedInsights.push("Focus engines cold. A 25-min Pomodoro today will break the inertia.");
        } else {
          generatedInsights.push("Building steady momentum. Consistency matters more than intensity.");
        }
      }

      if (datesStr) {
        const dates = JSON.parse(datesStr);
        if (dates.length > 3) {
          generatedInsights.push(`${dates.length} focus sessions logged. Neural pathways adapting to discipline routine.`);
        }
      }

      if (tasksStr) {
        const tasks = JSON.parse(tasksStr);
        const completed = tasks.filter((t: any) => t.completed || t.status === "done").length;
        const pending = tasks.length - completed;
        const high = tasks.filter((t: any) => (!t.completed && t.status !== "done") && t.priority === "high");
        
        if (high.length > 0) {
          generatedInsights.push(`Priority: "${high[0].title}" requires immediate attention.`);
        } else if (pending > 0) {
          const next = tasks.find((t: any) => !t.completed && t.status !== "done");
          if (next) generatedInsights.push(`Next: ${pending} tasks pending. Start with "${next.title}".`);
        }
        
        if (pending > 10) generatedInsights.push(`Overload: ${pending} incomplete tasks. Purge low-priority items.`);
        else if (completed > 2) generatedInsights.push(`Velocity high. ${completed} tasks complete. Tackle complex work.`);
      }

      if (generatedInsights.length === 0) {
        generatedInsights.push("Gathering telemetry. Log your first session to begin analysis.");
      }

      setInsights(generatedInsights.slice(0, 3));
      setIsLoaded(true);
    };

    generate();
    window.addEventListener("ascend_stats_updated", generate);
    window.addEventListener("ascend_task_updated", generate);
    return () => {
      window.removeEventListener("ascend_stats_updated", generate);
      window.removeEventListener("ascend_task_updated", generate);
    };
  }, []);

  if (!isLoaded) return <div className="glass-panel skeleton h-[120px]" />;

  const icons = [Sparkles, Activity, BrainCircuit];
  const colors = ["text-emerald-400", "text-amber-400", "text-purple-400"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 relative overflow-hidden group border-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/25 transition-all duration-500"
    >
      {/* Scanning line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent pointer-events-none"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <BrainCircuit size={12} className="text-[var(--color-accent)]" />
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">AI Analysis</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--color-accent)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-[8px] font-mono opacity-60">SYNCING</span>
        </div>
      </div>

      <div className="space-y-2.5 relative z-10">
        {insights.map((insight, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.8, duration: 0.5 }}
              className="flex gap-2.5 items-start group/item"
            >
              <Icon size={11} className={`${colors[idx % colors.length]} mt-0.5 shrink-0 opacity-50 group-hover/item:opacity-100 transition-opacity`} />
              <p className="text-[11px] text-[#888] leading-relaxed group-hover/item:text-white/80 transition-colors">
                {insight}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
