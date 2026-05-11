"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sunrise, CheckCircle2, Circle, Timer, Target, BookHeart, Activity, Flame, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DailyBriefing() {
  const [data, setData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const today = new Date().toISOString().split("T")[0];

    // Gather all data
    const tasks = JSON.parse(localStorage.getItem("ascend_premium_tasks") || "[]");
    const habits = JSON.parse(localStorage.getItem("ascend_habits") || "[]");
    const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
    const goals = JSON.parse(localStorage.getItem("ascend_goals") || "[]");
    const journal = JSON.parse(localStorage.getItem("ascend_journal") || "[]");
    const focusDates = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
    const wellness = JSON.parse(localStorage.getItem("ascend_wellness") || "{}");
    const stats = JSON.parse(localStorage.getItem("ascend_stats") || "{}");

    const pendingTasks = tasks.filter((t: any) => !t.completed && t.status !== "done");
    const completedToday = tasks.filter((t: any) => t.completed || t.status === "done").length;

    let habitsCompleted = 0;
    habits.forEach((h: any) => {
      if (habitRecords[h.id]?.[today]) habitsCompleted++;
    });

    // Streak
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      if (focusDates.includes(ds)) streak++;
      else if (i !== 0) break;
    }

    setData({
      pendingTasks: pendingTasks.slice(0, 5),
      totalPending: pendingTasks.length,
      completedToday,
      habits: habits.length,
      habitsCompleted,
      goals: goals.length,
      journalEntries: journal.length,
      streak,
      sleep: wellness.date === today ? wellness.sleep : 0,
      water: wellness.date === today ? wellness.water : 0,
      focusMinutes: Math.round((stats.workTime || 0) / 60),
    });
  }, []);

  if (!data || !currentTime) return null;

  const hour = currentTime.getHours();
  let greeting = "Good morning";
  let emoji = "☀️";
  if (hour >= 12 && hour < 17) { greeting = "Good afternoon"; emoji = "🌤"; }
  else if (hour >= 17) { greeting = "Good evening"; emoji = "🌙"; }

  const name = typeof window !== "undefined" ? localStorage.getItem("ascend_name") || "User" : "User";

  const cards = [
    { label: "Pending Tasks", value: data.totalPending, icon: Target, color: "text-blue-400", link: "/tasks" },
    { label: "Habits Done", value: `${data.habitsCompleted}/${data.habits}`, icon: Activity, color: "text-amber-400", link: "/habits" },
    { label: "Focus Today", value: `${data.focusMinutes}m`, icon: Timer, color: "text-emerald-400", link: "/timer" },
    { label: "Streak", value: `${data.streak} days`, icon: Flame, color: "text-orange-400", link: "/analytics" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#111] border border-[#ffffff08] p-10"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-accent)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[#a1a1aa] text-sm mb-1">{currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p>
          <h1 className="text-4xl font-light text-white tracking-tight mb-2">
            {greeting}, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-rose-400">{name}</span> {emoji}
          </h1>
          <p className="text-[#a1a1aa] text-sm max-w-lg">
            {data.totalPending === 0 && data.habitsCompleted === 0
              ? "Your day is clear. Set some tasks or habits to get started."
              : `You have ${data.totalPending} pending task${data.totalPending !== 1 ? "s" : ""} and ${data.habits - data.habitsCompleted} habit${data.habits - data.habitsCompleted !== 1 ? "s" : ""} remaining today.`
            }
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link href={card.link} className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col gap-3 group hover:border-[#ffffff20] transition-all block">
              <div className="flex items-center justify-between">
                <card.icon size={16} className={card.color} />
                <ArrowRight size={12} className="text-[#ffffff15] group-hover:text-[#a1a1aa] transition-colors" />
              </div>
              <div>
                <div className="text-2xl font-light text-white font-['Outfit'] tabular-nums">{card.value}</div>
                <div className="text-[10px] text-[#a1a1aa] uppercase tracking-widest font-bold mt-1">{card.label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Today's Tasks */}
      {data.pendingTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wide">Today's Priority</h2>
            <Link href="/tasks" className="text-[10px] text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-wider font-bold">View All</Link>
          </div>
          <div className="space-y-2">
            {data.pendingTasks.map((task: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#111] border border-[#ffffff06]">
                <Circle size={14} className="text-[#ffffff20] shrink-0" />
                <span className="text-sm text-white font-light">{task.title}</span>
                {task.priority === "high" && (
                  <span className="ml-auto text-[9px] font-bold text-rose-400 uppercase">High</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Wellness */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-cyan-400" />
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Water Today</span>
          </div>
          <div className="text-2xl font-light text-white font-['Outfit']">{data.water} <span className="text-sm text-[#a1a1aa]">glasses</span></div>
        </div>
        <div className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10]">
          <div className="flex items-center gap-2 mb-2">
            <Sunrise size={14} className="text-indigo-400" />
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Sleep Last Night</span>
          </div>
          <div className="text-2xl font-light text-white font-['Outfit']">{data.sleep} <span className="text-sm text-[#a1a1aa]">hours</span></div>
        </div>
      </motion.div>
    </div>
  );
}
