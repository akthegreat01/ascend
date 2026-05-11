"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Battery, BatteryMedium, BatteryWarning, Zap } from "lucide-react";

export default function EnergyMonitor() {
  const [energy, setEnergy] = useState(100);
  const [status, setStatus] = useState("Optimal");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Calculate synthetic "Energy" based on real local storage data
    const statsStr = localStorage.getItem("ascend_stats");
    const tasksStr = localStorage.getItem("ascend_premium_tasks");
    
    let drain = 0;
    
    // Drain based on time of day (energy naturally dips in afternoon, recovers slightly evening)
    const hour = new Date().getHours();
    if (hour >= 13 && hour <= 16) drain += 20; // Afternoon slump
    if (hour >= 22) drain += 40; // Late night exhaustion
    
    // Drain based on work done today
    if (statsStr) {
      const stats = JSON.parse(statsStr);
      // Rough approximation: Every hour of deep work drains 15% battery
      drain += (stats.workTime / 3600) * 15;
    }
    
    // Drain based on task completion
    if (tasksStr) {
      const tasks = JSON.parse(tasksStr);
      const completed = tasks.filter((t: any) => t.completed).length;
      drain += completed * 2; // Every task takes 2% mental energy
    }

    const currentEnergy = Math.max(5, Math.min(100, 100 - drain));
    setEnergy(currentEnergy);

    if (currentEnergy > 75) setStatus("Peak Flow State");
    else if (currentEnergy > 40) setStatus("Sustained Focus");
    else if (currentEnergy > 15) setStatus("Cognitive Fatigue");
    else setStatus("Critical: Rest Required");

    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const getBatteryColor = () => {
    if (energy > 75) return "bg-emerald-500 shadow-[0_0_15px_#10b981]";
    if (energy > 40) return "bg-amber-500 shadow-[0_0_15px_#f59e0b]";
    return "bg-rose-500 shadow-[0_0_15px_#f43f5e] animate-pulse";
  };

  const getBatteryIcon = () => {
    if (energy > 75) return <Battery size={16} className="text-emerald-500" />;
    if (energy > 40) return <BatteryMedium size={16} className="text-amber-500" />;
    return <BatteryWarning size={16} className="text-rose-500 animate-pulse" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] relative overflow-hidden group hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all duration-500"
    >
      {/* Background ambient glow based on energy */}
      <div className={`absolute -inset-10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none ${
        energy > 75 ? 'bg-gradient-to-tr from-emerald-500/10 to-transparent' :
        energy > 40 ? 'bg-gradient-to-tr from-amber-500/10 to-transparent' :
        'bg-gradient-to-tr from-rose-500/10 to-transparent'
      }`} />
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          {getBatteryIcon()}
          <h3 className="text-sm font-medium text-white tracking-wide uppercase">Cognitive Battery</h3>
        </div>
        <span className="text-xs font-bold tabular-nums text-[#a1a1aa]">{Math.round(energy)}%</span>
      </div>

      <div className="flex gap-[2px] w-full h-5 mb-5 relative z-10 group-hover:scale-[1.02] transition-transform duration-500">
        {[...Array(20)].map((_, i) => {
          const threshold = i * 5;
          const isActive = energy > threshold;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.03, type: "spring" }}
              className={`flex-1 rounded-[1px] transition-colors duration-500 ${
                isActive ? getBatteryColor() : 'bg-[#1a1a1a] border border-[#ffffff05]'
              }`}
            />
          )
        })}
      </div>

      <div className="flex items-start gap-3 relative z-10">
        <Zap size={14} className={energy > 40 ? 'text-amber-400' : 'text-rose-500'} />
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          {status}. {energy < 40 ? "Your execution velocity is dropping. Switch to low-priority tasks or initiate a 15-minute recovery protocol." : "You have sufficient mental reserves to tackle high-priority complex tasks right now."}
        </p>
      </div>
    </motion.div>
  );
}
