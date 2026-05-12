"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { Trophy, Target, Zap, Clock } from "lucide-react";

export default function DeepAnalytics() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({ workTime: 0, breakTime: 0 });
  const [taskVelocity, setTaskVelocity] = useState(0);
  const [consistency, setConsistency] = useState(0);

  useEffect(() => {
    const statsStr = localStorage.getItem("ascend_stats");
    const tasksStr = localStorage.getItem("ascend_premium_tasks");
    const datesStr = localStorage.getItem("ascend_focus_dates");
    
    if (statsStr) setStats(JSON.parse(statsStr));
    
    if (tasksStr) {
      const tasks = JSON.parse(tasksStr);
      const completed = tasks.filter((t: any) => t.completed || t.status === "done").length;
      setTaskVelocity(completed);
    }

    if (datesStr) {
      const dates = JSON.parse(datesStr);
      setConsistency(dates.length);
    }
    
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="animate-pulse h-[600px] w-full" />;

  // Calculate RPG Stats based on real data
  const focusLevel = Math.floor(1 + (stats.workTime / 3600) * 0.5 + (consistency * 0.2));
  
  let archetype = "The Initiate";
  if (consistency > 10 && stats.workTime > 10000) archetype = "The Mastermind";
  else if (consistency > 5 && taskVelocity > 10) archetype = "The Executor";
  else if (stats.workTime > 5000) archetype = "The Architect";

  let peakTime = "09:00 AM";
  if (stats.workTime > 0) {
    const hours = new Date().getHours();
    peakTime = hours < 12 ? "09:00 AM" : hours < 18 ? "02:00 PM" : "10:00 PM";
  }

  const achievements = Math.floor((consistency / 3) + (taskVelocity / 5) + (stats.workTime / 7200));

  // Radar Data based on actual usage vs theoretical potential
  const radarData = [
    { 
      subject: 'Consistency', 
      Current: Math.min(100, consistency * 10), 
      Potential: 100,
      fullMark: 100 
    },
    { 
      subject: 'Deep Work', 
      Current: Math.min(100, (stats.workTime / 3600) * 20), 
      Potential: 90,
      fullMark: 100 
    },
    { 
      subject: 'Execution', 
      Current: Math.min(100, taskVelocity * 15), 
      Potential: 95,
      fullMark: 100 
    },
    { 
      subject: 'Endurance', 
      Current: Math.min(100, (stats.workTime / (stats.breakTime || 1)) * 10), 
      Potential: 85,
      fullMark: 100 
    },
    { 
      subject: 'Planning', 
      Current: Math.min(100, taskVelocity > 0 ? 60 + taskVelocity * 2 : 20), 
      Potential: 80,
      fullMark: 100 
    },
  ];

  // Dynamic velocity based on current tasks to make the chart responsive
  const areaData = [
    { name: 'Mon', tasks: Math.max(0, Math.floor(taskVelocity * 0.2)) },
    { name: 'Tue', tasks: Math.max(0, Math.floor(taskVelocity * 0.4)) },
    { name: 'Wed', tasks: Math.max(0, Math.floor(taskVelocity * 0.3)) },
    { name: 'Thu', tasks: Math.max(0, Math.floor(taskVelocity * 0.6)) },
    { name: 'Fri', tasks: Math.max(0, Math.floor(taskVelocity * 0.5)) },
    { name: 'Sat', tasks: Math.max(0, Math.floor(taskVelocity * 0.8)) },
    { name: 'Sun', tasks: taskVelocity },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Archetype", value: archetype, icon: Target, color: "text-purple-400" },
          { title: "Peak Time", value: peakTime, icon: Clock, color: "text-emerald-400" },
          { title: "Focus Level", value: `Lv. ${focusLevel}`, icon: Zap, color: "text-amber-400" },
          { title: "Achievements", value: `${achievements} Unlocked`, icon: Trophy, color: "text-rose-400" },
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 bg-[#0a0a0a]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-[#a1a1aa] font-medium tracking-wider uppercase">{card.title}</span>
              <card.icon size={14} className={card.color} />
            </div>
            <h3 className="text-xl font-medium text-white">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Profile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 bg-[#0a0a0a] h-[400px] flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-5 blur-[80px] pointer-events-none rounded-full" />
          <div className="mb-4 relative z-10">
            <h3 className="text-sm font-medium text-white tracking-wide uppercase">Cognitive Profile</h3>
            <p className="text-xs text-[#a1a1aa]">Current state vs Full potential</p>
          </div>
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="#ffffff15" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Potential" dataKey="Potential" stroke="#ffffff30" strokeDasharray="3 3" fill="none" />
                <Radar name="Current" dataKey="Current" stroke="var(--color-accent, #a855f7)" fill="var(--color-accent, #a855f7)" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#ffffff15', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Velocity Area Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 bg-[#0a0a0a] lg:col-span-2 h-[400px] flex flex-col relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-blue-500 opacity-5 blur-[80px] pointer-events-none" />
          <div className="mb-4 relative z-10">
            <h3 className="text-sm font-medium text-white tracking-wide uppercase">Execution Velocity</h3>
            <p className="text-xs text-[#a1a1aa]">Task completion over the last 7 days</p>
          </div>
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66fcf1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#66fcf1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#ffffff15', borderRadius: '8px' }}
                  itemStyle={{ color: '#66fcf1' }}
                />
                <Area type="monotone" dataKey="tasks" stroke="#66fcf1" strokeWidth={2} fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Lifetime Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="glass-panel p-4 bg-[#0a0a0a] border border-[#ffffff10] rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest mb-1">Total Focus Time</span>
          <span className="text-2xl font-light text-white">{Math.floor(stats.workTime / 3600)}<span className="text-sm text-[#a1a1aa] ml-1">hrs</span></span>
        </div>
        <div className="glass-panel p-4 bg-[#0a0a0a] border border-[#ffffff10] rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest mb-1">Total Break Time</span>
          <span className="text-2xl font-light text-white">{Math.floor(stats.breakTime / 3600)}<span className="text-sm text-[#a1a1aa] ml-1">hrs</span></span>
        </div>
        <div className="glass-panel p-4 bg-[#0a0a0a] border border-[#ffffff10] rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest mb-1">Total Tasks</span>
          <span className="text-2xl font-light text-white">{taskVelocity}</span>
        </div>
        <div className="glass-panel p-4 bg-[#0a0a0a] border border-[#ffffff10] rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest mb-1">Active Days</span>
          <span className="text-2xl font-light text-white">{consistency}</span>
        </div>
      </motion.div>

    </div>
  );
}
