"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, TrendingUp, AlertTriangle, ChevronRight, RefreshCw, Heart, Zap, Moon, Sun } from "lucide-react";

type Insight = {
  id: string;
  type: "motivation" | "warning" | "insight" | "celebration";
  message: string;
  detail?: string;
  icon: typeof Brain;
  color: string;
};

function generateInsights(): Insight[] {
  const insights: Insight[] = [];
  const today = new Date().toISOString().split("T")[0];
  const hour = new Date().getHours();

  const stats = JSON.parse(localStorage.getItem("ascend_stats") || "{}");
  const focusDates: string[] = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
  const habits = JSON.parse(localStorage.getItem("ascend_habits") || "[]");
  const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
  const tasks = JSON.parse(localStorage.getItem("ascend_premium_tasks") || "[]");
  const totalXP = JSON.parse(localStorage.getItem("ascend_xp_total") || "0");
  const focusMinutes = Math.round((stats.workTime || 0) / 60);
  const pendingTasks = tasks.filter((t: any) => !t.completed && t.status !== "done").length;

  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    if (focusDates.includes(d.toISOString().split("T")[0])) streak++;
    else if (i !== 0) break;
  }

  let habitsToday = 0;
  habits.forEach((h: any) => { if (habitRecords[h.id]?.[today]) habitsToday++; });
  const habitRate = habits.length > 0 ? (habitsToday / habits.length) * 100 : 0;

  if (streak >= 7) insights.push({ id: "streak_strong", type: "celebration", message: `${streak}-day streak. Building something powerful.`, icon: Zap, color: "#f59e0b" });
  else if (streak >= 3) insights.push({ id: "streak_growing", type: "motivation", message: `${streak} days momentum. Don't break the chain.`, icon: TrendingUp, color: "#10b981" });
  else if (streak === 0 && focusDates.length > 0) insights.push({ id: "streak_broken", type: "warning", message: "Streak broken. Start recovery today.", icon: AlertTriangle, color: "#f43f5e" });

  if (focusMinutes > 300 && focusDates.slice(-7).length >= 7) insights.push({ id: "burnout_risk", type: "warning", message: "High intensity. Consider a recovery day.", icon: Heart, color: "#ec4899" });

  if (hour >= 22 || hour < 5) insights.push({ id: "late_night", type: "insight", message: "Late session. Sleep is a performance multiplier.", icon: Moon, color: "#8b5cf6" });
  else if (hour >= 5 && hour < 9) insights.push({ id: "early_bird", type: "celebration", message: "Early riser. Peak cognitive window active.", icon: Sun, color: "#f59e0b" });

  if (habitRate >= 100 && habits.length > 0) insights.push({ id: "habits_complete", type: "celebration", message: "All habits done. Exceptional discipline.", icon: Sparkles, color: "#eab308" });
  else if (habitRate === 0 && habits.length > 0 && hour >= 12) insights.push({ id: "habits_none", type: "motivation", message: `${habits.length} habits waiting. Start one.`, icon: Zap, color: "#3b82f6" });

  if (pendingTasks > 10) insights.push({ id: "task_overload", type: "warning", message: `${pendingTasks} pending. Focus on top 3.`, icon: AlertTriangle, color: "#f97316" });

  if (insights.length === 0) insights.push({ id: "default", type: "motivation", message: "Focus on what matters most today.", icon: Sparkles, color: "#f43f5e" });

  return insights.slice(0, 4);
}

export default function AICoach() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshInsights = () => {
    setInsights(generateInsights());
    setActiveIndex(0);
    setIsLoaded(true);
  };

  useEffect(() => {
    refreshInsights();
    const events = ["ascend_stats_updated", "ascend_habit_updated", "ascend_task_updated", "ascend_journal_updated", "ascend_xp_recalculate"];
    events.forEach(e => window.addEventListener(e, refreshInsights));
    return () => events.forEach(e => window.removeEventListener(e, refreshInsights));
  }, []);

  if (!isLoaded || insights.length === 0) return <div className="glass-panel skeleton h-[140px]" />;

  const current = insights[activeIndex];
  const IconComponent = current.icon;
  const typeLabels: Record<string, string> = { motivation: "Motivation", warning: "Alert", insight: "Insight", celebration: "Win" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 relative overflow-hidden group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain size={12} className="text-white" />
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Coach</span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]" style={{ color: current.color }}>{typeLabels[current.type]}</span>
        </div>
        <button onClick={refreshInsights} className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.06] text-[#666] hover:text-white transition-all">
          <RefreshCw size={10} />
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${current.color}12`, border: `1px solid ${current.color}20` }}>
              <IconComponent size={11} style={{ color: current.color }} />
            </div>
            <p className="text-[12px] text-white/80 font-medium leading-relaxed">{current.message}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {insights.length > 1 && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1">
            {insights.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className={`w-1 h-1 rounded-full transition-all ${i === activeIndex ? "bg-white w-3" : "bg-white/15 hover:bg-white/30"}`} />
            ))}
          </div>
          <button onClick={() => setActiveIndex((activeIndex + 1) % insights.length)} className="text-[9px] font-mono text-[#555] hover:text-white transition-colors flex items-center gap-0.5">
            next <ChevronRight size={8} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
