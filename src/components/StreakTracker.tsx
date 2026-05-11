"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Star, TrendingUp, Zap } from "lucide-react";

export default function StreakTracker() {
  const [streaks, setStreaks] = useState({ focus: 0, habits: 0, journal: 0, login: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calculateStreak = (key: string, datesFn: () => string[]) => {
      const dates = datesFn();
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const ds = d.toISOString().split("T")[0];
        if (dates.includes(ds)) streak++;
        else if (i !== 0) break;
      }
      return streak;
    };

    const focus = calculateStreak("focus", () => JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]"));

    // Habits streak: days where at least one habit was done
    const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
    const habitDates = new Set<string>();
    Object.values(habitRecords).forEach((record: any) => {
      Object.keys(record).forEach(date => { if (record[date]) habitDates.add(date); });
    });
    const habits = calculateStreak("habits", () => [...habitDates]);

    // Journal streak
    const journal = JSON.parse(localStorage.getItem("ascend_journal") || "[]");
    const journalDates = journal.map((e: any) => e.date?.split("T")?.[0]).filter(Boolean);
    const journalStreak = calculateStreak("journal", () => journalDates);

    // Login streak
    const loginDates = JSON.parse(localStorage.getItem("ascend_login_dates") || "[]");
    const today = new Date().toISOString().split("T")[0];
    if (!loginDates.includes(today)) {
      loginDates.push(today);
      localStorage.setItem("ascend_login_dates", JSON.stringify(loginDates));
    }
    const loginStreak = calculateStreak("login", () => loginDates);

    setStreaks({ focus, habits, journal: journalStreak, login: loginStreak });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const items = [
    { label: "Focus", value: streaks.focus, icon: Zap, color: "#f43f5e" },
    { label: "Habits", value: streaks.habits, icon: Flame, color: "#f59e0b" },
    { label: "Journal", value: streaks.journal, icon: Star, color: "#a855f7" },
    { label: "Login", value: streaks.login, icon: TrendingUp, color: "#10b981" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] group hover:border-orange-500/20 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4">
        <Flame size={16} className="text-orange-400" />
        <h3 className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Streaks</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="p-3 rounded-xl bg-[#111] border border-[#ffffff06] flex items-center gap-3 group/streak"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/streak:scale-110"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <item.icon size={14} style={{ color: item.color }} />
            </div>
            <div>
              <div className="text-lg font-light text-white font-['Outfit'] tabular-nums leading-none">
                {item.value}
              </div>
              <div className="text-[9px] text-[#a1a1aa] uppercase tracking-wider font-bold">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
