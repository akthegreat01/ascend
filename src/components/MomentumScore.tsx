"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gauge, ArrowUp, ArrowDown, Minus } from "lucide-react";

function calculateMomentum(): { score: number; trend: "up" | "down" | "stable"; details: { label: string; value: number; max: number }[] } {
  const today = new Date().toISOString().split("T")[0];
  let score = 0;
  const details: { label: string; value: number; max: number }[] = [];

  const focusDates: string[] = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
  const focusPoints = focusDates.includes(today) ? 30 : 0;
  score += focusPoints;
  details.push({ label: "Focus", value: focusPoints, max: 30 });

  const habits = JSON.parse(localStorage.getItem("ascend_habits") || "[]");
  const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
  let habitsCompleted = 0;
  habits.forEach((h: any) => { if (habitRecords[h.id]?.[today]) habitsCompleted++; });
  const habitPoints = habits.length > 0 ? Math.round((habitsCompleted / habits.length) * 30) : 0;
  score += habitPoints;
  details.push({ label: "Habits", value: habitPoints, max: 30 });

  const tasks = JSON.parse(localStorage.getItem("ascend_premium_tasks") || "[]");
  const completedToday = tasks.filter((t: any) => (t.completed || t.status === "done") && t.completedAt?.startsWith(today)).length;
  const taskPoints = Math.min(completedToday * 5, 20);
  score += taskPoints;
  details.push({ label: "Tasks", value: taskPoints, max: 20 });

  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    if (focusDates.includes(d.toISOString().split("T")[0])) streak++;
    else if (i !== 0) break;
  }
  const streakPoints = Math.min(streak * 3, 20);
  score += streakPoints;
  details.push({ label: "Streak", value: streakPoints, max: 20 });

  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  let yesterdayScore = focusDates.includes(yesterdayStr) ? 30 : 0;
  let habitsYesterday = 0;
  habits.forEach((h: any) => { if (habitRecords[h.id]?.[yesterdayStr]) habitsYesterday++; });
  yesterdayScore += habits.length > 0 ? Math.round((habitsYesterday / habits.length) * 30) : 0;

  let trend: "up" | "down" | "stable" = "stable";
  if (score > yesterdayScore + 5) trend = "up";
  else if (score < yesterdayScore - 5) trend = "down";

  return { score: Math.min(score, 100), trend, details };
}

export default function MomentumScore() {
  const [momentum, setMomentum] = useState<{ score: number; trend: "up" | "down" | "stable"; details: { label: string; value: number; max: number }[] }>({ score: 0, trend: "stable", details: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calc = () => { setMomentum(calculateMomentum()); setIsLoaded(true); };
    calc();
    const events = ["ascend_stats_updated", "ascend_habit_updated", "ascend_task_updated"];
    events.forEach(e => window.addEventListener(e, calc));
    return () => events.forEach(e => window.removeEventListener(e, calc));
  }, []);

  if (!isLoaded) return <div className="glass-panel skeleton h-[140px]" />;

  const { score, trend, details } = momentum;
  let statusText = "Warming Up", statusColor = "#6b7280";
  if (score >= 80) { statusText = "On Fire"; statusColor = "#f43f5e"; }
  else if (score >= 60) { statusText = "Strong"; statusColor = "#10b981"; }
  else if (score >= 40) { statusText = "Building"; statusColor = "#3b82f6"; }
  else if (score >= 20) { statusText = "Starting"; statusColor = "#f59e0b"; }

  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 group"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Gauge size={12} style={{ color: statusColor }} />
        <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Momentum</span>
      </div>

      {/* Score + Ring */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/5" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none" stroke={statusColor} strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray="126"
              initial={{ strokeDashoffset: 126 }}
              animate={{ strokeDashoffset: 126 - (126 * score / 100) }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-black font-['Outfit'] text-white tabular-nums">{score}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white">{statusText}</span>
            <TrendIcon size={10} style={{ color: statusColor }} />
          </div>
          <p className="text-[9px] text-[#666]">{score >= 60 ? "Above average today" : "Keep going"}</p>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-1.5">
        {details.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-[#555] uppercase w-9 shrink-0">{d.label}</span>
            <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: statusColor }}
                initial={{ width: 0 }}
                animate={{ width: `${d.max > 0 ? (d.value / d.max) * 100 : 0}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-[8px] font-mono text-white tabular-nums w-4 text-right">{d.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
