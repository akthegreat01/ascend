"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, TrendingUp, Zap } from "lucide-react";

export default function StreakTracker() {
  const [streaks, setStreaks] = useState({ focus: 0, habits: 0, journal: 0, login: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const generate = () => {
      const calc = (dates: string[]) => {
        let streak = 0; const today = new Date();
        for (let i = 0; i < 365; i++) {
          const d = new Date(today); d.setDate(d.getDate() - i);
          if (dates.includes(d.toISOString().split("T")[0])) streak++;
          else if (i !== 0) break;
        }
        return streak;
      };

      const focus = calc(JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]"));
      const hr = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
      const hd = new Set<string>();
      Object.values(hr).forEach((r: any) => Object.keys(r).forEach(d => { if (r[d]) hd.add(d); }));
      const habits = calc([...hd]);
      const journal = calc((JSON.parse(localStorage.getItem("ascend_journal") || "[]")).map((e: any) => e.date?.split("T")?.[0]).filter(Boolean));
      const loginD = JSON.parse(localStorage.getItem("ascend_login_dates") || "[]");
      const tStr = new Date().toISOString().split("T")[0];
      if (!loginD.includes(tStr)) { loginD.push(tStr); localStorage.setItem("ascend_login_dates", JSON.stringify(loginD)); }
      const login = calc(loginD);

      setStreaks({ focus, habits, journal, login });
      setIsLoaded(true);
    };

    generate();
    const events = ["ascend_stats_updated", "ascend_habit_updated", "ascend_journal_updated"];
    events.forEach(e => window.addEventListener(e, generate));
    return () => events.forEach(e => window.removeEventListener(e, generate));
  }, []);

  if (!isLoaded) return <div className="glass-panel skeleton h-[100px]" />;

  const items = [
    { label: "FOCUS", val: streaks.focus, icon: Zap, c: "#f43f5e" },
    { label: "HABITS", val: streaks.habits, icon: Flame, c: "#f59e0b" },
    { label: "JOURNAL", val: streaks.journal, icon: Star, c: "#a855f7" },
    { label: "LOGIN", val: streaks.login, icon: TrendingUp, c: "#10b981" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-3">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Flame size={10} className="text-orange-400" />
        <h3 className="text-[9px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Streaks</h3>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {items.map((it, i) => (
          <div key={it.label} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: `${it.c}15` }}>
              <it.icon size={10} style={{ color: it.c }} />
            </div>
            <div>
              <div className="text-xs font-black text-white tabular-nums leading-none">{it.val}</div>
              <div className="text-[7px] text-[#666] uppercase tracking-wider font-mono">{it.label}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
