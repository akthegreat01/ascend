"use client";

import { motion } from "framer-motion";
import { Check, Flame, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

const tierStyles = {
  cosmic: "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-purple-900/20 text-purple-200",
  gold: "border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[#d4af37]/10 text-[#d4af37]",
  blue: "border-[#45a29e]/50 shadow-[0_0_10px_rgba(69,162,158,0.2)] bg-[#45a29e]/10 text-[#45a29e]",
  base: "border-white/10 bg-white/5 text-[#c5c6c7]",
};

export default function HabitTracker() {
  const [habits, setHabits] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedHabits = localStorage.getItem("ascend_habits");
    const savedRecords = localStorage.getItem("ascend_habit_records");
    
    if (savedHabits && savedRecords) {
      const parsedHabits = JSON.parse(savedHabits);
      const parsedRecords = JSON.parse(savedRecords);
      const todayStr = new Date().toISOString().split("T")[0];
      
      const enrichedHabits = parsedHabits.map((h: any) => {
        let streak = 0;
        let d = new Date();
        const history: boolean[] = [];
        const todayStr = new Date().toISOString().split("T")[0];

        // Calculate 30-day history
        for (let i = 0; i < 30; i++) {
          const checkDate = new Date();
          checkDate.setDate(checkDate.getDate() - i);
          const dateStr = checkDate.toISOString().split("T")[0];
          history.push(!!parsedRecords[h.id]?.[dateStr]);
        }
        history.reverse(); // Show oldest to newest

        // Calculate current streak
        let streakDate = new Date();
        while (true) {
          const dateStr = streakDate.toISOString().split("T")[0];
          if (parsedRecords[h.id]?.[dateStr]) {
            streak++;
            streakDate.setDate(streakDate.getDate() - 1);
          } else {
            if (dateStr === todayStr) {
               streakDate.setDate(streakDate.getDate() - 1);
               continue;
            }
            break;
          }
        }
        
        let tier = "base";
        if (streak > 30) tier = "cosmic";
        else if (streak > 14) tier = "gold";
        else if (streak > 5) tier = "blue";
        
        return {
          ...h,
          streak,
          tier,
          history,
          progress: parsedRecords[h.id]?.[todayStr] ? 100 : 0
        };
      });
      setHabits(enrichedHabits.slice(0, 4));
    } else {
      setHabits([]);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="glass-panel w-full h-[300px] animate-pulse"></div>;

  return (
    <div className="glass-panel p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Trophy size={120} />
      </div>

      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-['Outfit'] font-light text-white mb-1">
            Discipline Protocols
          </h2>
          <p className="text-sm text-[#c5c6c7]/60 font-light">
            Evolve your habits. Build unbreakable streaks.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#45a29e]/20 border border-[#45a29e]/30 rounded-full">
          <Flame size={14} className="text-[#66fcf1]" />
          <span className="text-xs font-medium text-[#66fcf1]">Level 42</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 opacity-30 text-white gap-4">
             <Trophy size={48} />
             <p className="text-sm">No protocols active. Initialize in Habits tab.</p>
          </div>
        ) : habits.map((habit, idx) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative flex flex-col gap-4 p-5 rounded-2xl border transition-all duration-500 hover:bg-white/5 ${
              tierStyles[habit.tier as keyof typeof tierStyles]
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                  habit.progress === 100
                    ? "bg-current border-current text-black"
                    : "bg-transparent border-current/30 text-current"
                }`}>
                  {habit.progress === 100 ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    <Flame size={20} />
                  )}
                </div>
                <div>
                  <span className="font-medium tracking-wide text-lg text-white block">{habit.name}</span>
                  <span className="text-[10px] font-bold tracking-widest opacity-60 uppercase flex items-center gap-1">
                    {habit.streak} DAY STREAK <Flame size={10} className={habit.progress === 100 ? "text-orange-500 animate-pulse" : ""} />
                  </span>
                </div>
              </div>
            </div>

            {/* 30-Day Monthly History Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold text-[#c5c6c7]/40 tracking-widest uppercase">30-Day Protocol Consistency</span>
                <span className="text-[9px] font-bold text-[#c5c6c7]/40 tracking-widest uppercase">{Math.round((habit.history.filter(Boolean).length / 30) * 100)}%</span>
              </div>
              <div className="flex gap-1.5 justify-between">
                {habit.history.map((completed: boolean, dayIdx: number) => (
                  <div 
                    key={dayIdx}
                    className={`flex-1 h-3 rounded-sm transition-all duration-500 ${
                      completed 
                        ? "bg-current opacity-100 shadow-[0_0_8px_currentColor]" 
                        : "bg-white/5 border border-white/5 hover:bg-white/10"
                    }`}
                    title={`Day ${dayIdx + 1}: ${completed ? 'Completed' : 'Missed'}`}
                  />
                ))}
              </div>
            </div>

            {/* Glowing progress bar background */}
            {habit.progress > 0 && (
              <div
                className="absolute bottom-0 left-5 right-5 h-[2px] bg-current opacity-40 shadow-[0_0_10px_currentColor] rounded-full"
                style={{ width: `calc(${habit.progress}% - 40px)` }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
