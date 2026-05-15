"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Crown, Star } from "lucide-react";

/* ═══ RANK SYSTEM ═══ */
const RANKS = [
  { name: "Initiate", minXP: 0, icon: "🌱", color: "#6b7280" },
  { name: "Apprentice", minXP: 100, icon: "🔥", color: "#f59e0b" },
  { name: "Practitioner", minXP: 350, icon: "⚡", color: "#3b82f6" },
  { name: "Specialist", minXP: 750, icon: "💎", color: "#8b5cf6" },
  { name: "Expert", minXP: 1500, icon: "🌟", color: "#ec4899" },
  { name: "Master", minXP: 3000, icon: "👑", color: "#f43f5e" },
  { name: "Grandmaster", minXP: 6000, icon: "🏆", color: "#eab308" },
  { name: "Transcendent", minXP: 12000, icon: "✨", color: "#ffffff" },
];

const ACHIEVEMENTS = [
  { id: "first_focus", name: "First Light", desc: "Complete your first focus session", icon: "🔥", xp: 25, check: (d: any) => d.totalSessions >= 1 },
  { id: "streak_3", name: "Momentum", desc: "3-day focus streak", icon: "⚡", xp: 50, check: (d: any) => d.streak >= 3 },
  { id: "streak_7", name: "Unstoppable", desc: "7-day focus streak", icon: "💎", xp: 150, check: (d: any) => d.streak >= 7 },
  { id: "streak_30", name: "Iron Will", desc: "30-day focus streak", icon: "🏆", xp: 500, check: (d: any) => d.streak >= 30 },
  { id: "focus_1h", name: "Deep Diver", desc: "1 hour of focus", icon: "🌊", xp: 30, check: (d: any) => d.totalFocusMinutes >= 60 },
  { id: "focus_10h", name: "Flow Master", desc: "10 hours of focus", icon: "🧠", xp: 200, check: (d: any) => d.totalFocusMinutes >= 600 },
  { id: "focus_100h", name: "Century", desc: "100 hours of focus", icon: "👑", xp: 1000, check: (d: any) => d.totalFocusMinutes >= 6000 },
  { id: "habits_5", name: "Habit Builder", desc: "Create 5 habits", icon: "🌱", xp: 40, check: (d: any) => d.totalHabits >= 5 },
  { id: "journal_10", name: "Reflector", desc: "Write 10 journal entries", icon: "📝", xp: 60, check: (d: any) => d.journalEntries >= 10 },
  { id: "tasks_50", name: "Executor", desc: "Complete 50 tasks", icon: "✅", xp: 100, check: (d: any) => d.completedTasks >= 50 },
  { id: "level_5", name: "Rising Star", desc: "Reach Level 5", icon: "⭐", xp: 75, check: (d: any) => d.level >= 5 },
  { id: "xp_1000", name: "Thousand Club", desc: "Earn 1,000 XP", icon: "🎯", xp: 100, check: (d: any) => d.totalXP >= 1000 },
];

function getXPForLevel(level: number) { return Math.floor(50 * Math.pow(level, 1.5)); }
function getLevelFromXP(xp: number) {
  let level = 1, totalNeeded = 0;
  while (true) {
    const needed = getXPForLevel(level);
    if (totalNeeded + needed > xp) break;
    totalNeeded += needed; level++;
  }
  return { level, xpInLevel: xp - totalNeeded, xpForNext: getXPForLevel(level) };
}
function getRank(xp: number) {
  let rank = RANKS[0];
  for (const r of RANKS) { if (xp >= r.minXP) rank = r; else break; }
  return rank;
}

export default function XPEngine() {
  const [xpData, setXpData] = useState({ totalXP: 0, level: 1, xpInLevel: 0, xpForNext: 50 });
  const [rank, setRank] = useState(RANKS[0]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState<{ type: string; message: string; xp?: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const recalculateXP = useCallback(() => {
    const stats = JSON.parse(localStorage.getItem("ascend_stats") || "{}");
    const focusDates = JSON.parse(localStorage.getItem("ascend_focus_dates") || "[]");
    const habits = JSON.parse(localStorage.getItem("ascend_habits") || "[]");
    const habitRecords = JSON.parse(localStorage.getItem("ascend_habit_records") || "{}");
    const journal = JSON.parse(localStorage.getItem("ascend_journal") || "[]");
    const tasks = JSON.parse(localStorage.getItem("ascend_premium_tasks") || "[]");
    const prevUnlocked = JSON.parse(localStorage.getItem("ascend_achievements") || "[]");

    let totalXP = 0;
    totalXP += focusDates.length * 10;
    const focusMinutes = Math.round((stats.workTime || 0) / 60);
    totalXP += Math.floor(focusMinutes / 5);
    const completedTasks = tasks.filter((t: any) => t.completed || t.status === "done").length;
    totalXP += completedTasks * 5;
    totalXP += journal.length * 8;

    let totalHabitCompletions = 0;
    Object.values(habitRecords).forEach((record: any) => {
      Object.values(record).forEach((done: any) => { if (done) totalHabitCompletions++; });
    });
    totalXP += totalHabitCompletions * 3;

    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      if (focusDates.includes(ds)) streak++; else if (i !== 0) break;
    }
    totalXP += streak * 2;

    const levelData = getLevelFromXP(totalXP);
    const activityData = { totalXP, totalSessions: focusDates.length, streak, totalFocusMinutes: focusMinutes, totalHabits: habits.length, journalEntries: journal.length, completedTasks, level: levelData.level };

    const newUnlocked: string[] = [...prevUnlocked];
    let newAchievement: typeof ACHIEVEMENTS[0] | null = null;
    for (const achievement of ACHIEVEMENTS) {
      if (!newUnlocked.includes(achievement.id) && achievement.check(activityData)) {
        newUnlocked.push(achievement.id); totalXP += achievement.xp; newAchievement = achievement;
      }
    }
    if (newUnlocked.length > prevUnlocked.length) {
      localStorage.setItem("ascend_achievements", JSON.stringify(newUnlocked));
      if (newAchievement) {
        setShowCelebration({ type: "achievement", message: `${newAchievement.icon} ${newAchievement.name}`, xp: newAchievement.xp });
        setTimeout(() => setShowCelebration(null), 3000);
      }
    }

    const prevXP = JSON.parse(localStorage.getItem("ascend_xp_total") || "0");
    const prevLevel = getLevelFromXP(prevXP).level;
    if (levelData.level > prevLevel && prevXP > 0) {
      setShowCelebration({ type: "levelup", message: `Level ${levelData.level}!` });
      setTimeout(() => setShowCelebration(null), 3000);
    }

    localStorage.setItem("ascend_xp_total", JSON.stringify(totalXP));
    const finalLevelData = getLevelFromXP(totalXP);
    setXpData({ totalXP, ...finalLevelData });
    setRank(getRank(totalXP));
    setUnlockedAchievements(newUnlocked);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    recalculateXP();
    const events = ["ascend_stats_updated", "ascend_habit_updated", "ascend_task_updated", "ascend_journal_updated", "ascend_xp_recalculate"];
    events.forEach(e => window.addEventListener(e, recalculateXP));
    return () => events.forEach(e => window.removeEventListener(e, recalculateXP));
  }, [recalculateXP]);

  if (!isLoaded) return <div className="glass-panel skeleton h-[140px]" />;

  const progressPercent = xpData.xpForNext > 0 ? (xpData.xpInLevel / xpData.xpForNext) * 100 : 0;

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] px-5 py-3 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-purple-600 flex items-center justify-center">
              {showCelebration.type === "levelup" ? <Crown size={16} className="text-white" /> : <Star size={16} className="text-white" />}
            </div>
            <div>
              <p className="text-white font-bold text-xs">{showCelebration.message}</p>
              {showCelebration.xp && <p className="text-[var(--color-accent)] text-[10px] font-bold">+{showCelebration.xp} XP</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 relative overflow-hidden group"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: `${rank.color}15`, border: `1px solid ${rank.color}25` }}
            >
              {rank.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-white leading-none">{rank.name}</p>
              <p className="text-[9px] text-[#666] font-mono">Lv.{xpData.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-black font-['Outfit'] text-white tabular-nums leading-none">{xpData.totalXP.toLocaleString()}</p>
            <p className="text-[8px] font-mono text-[#555] uppercase">XP</p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[9px] font-mono text-[#555] mb-1 tabular-nums">
            <span>{xpData.xpInLevel}/{xpData.xpForNext}</span>
            <span>Lv.{xpData.level + 1}</span>
          </div>
          <div className="xp-bar">
            <motion.div className="xp-bar-fill" initial={{ width: 0 }} animate={{ width: `${Math.min(progressPercent, 100)}%` }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
          </div>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-[#555] font-mono">{unlockedAchievements.length}/{ACHIEVEMENTS.length} unlocked</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {ACHIEVEMENTS.slice(0, 8).map((a) => {
            const unlocked = unlockedAchievements.includes(a.id);
            return (
              <div
                key={a.id}
                className={`w-6 h-6 rounded flex items-center justify-center text-[10px] cursor-default transition-all ${
                  unlocked ? "bg-white/8 border border-white/15" : "bg-white/[0.02] border border-white/[0.04] opacity-25 grayscale"
                }`}
                title={unlocked ? `${a.name}: ${a.desc}` : `🔒 ${a.name}`}
              >
                {a.icon}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

export function triggerXPRecalculate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ascend_xp_recalculate"));
  }
}
