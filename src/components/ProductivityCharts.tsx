"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, TrendingUp, Sparkles } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0c10]/90 border border-white/10 p-4 rounded-xl backdrop-blur-md shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[#c5c6c7] capitalize">{entry.name}:</span>
            <span className="text-white font-medium">{Math.round(entry.value / 60)}m</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProductivityCharts() {
  const [stats, setStats] = useState({ workTime: 0, breakTime: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const loadStats = () => {
    const statsStr = localStorage.getItem("ascend_stats");
    if (statsStr) {
      setStats(JSON.parse(statsStr));
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadStats();
    window.addEventListener("ascend_stats_updated", loadStats);
    return () => window.removeEventListener("ascend_stats_updated", loadStats);
  }, []);

  if (!isLoaded) return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse h-[400px]" />;

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const barData = [
    { name: "Day 1", active: 0, break: 0, manual: 0 },
    { name: "Day 2", active: 0, break: 0, manual: 0 },
    { name: "Day 3", active: 0, break: 0, manual: 0 },
    { name: "Day 4", active: 0, break: 0, manual: 0 },
    { name: "Day 5", active: 0, break: 0, manual: 0 },
    { name: "Yesterday", active: 0, break: 0, manual: 0 },
    { name: today, active: stats.workTime, break: stats.breakTime, manual: 0 },
  ];

  const pieData = [
    { name: "Deep Work", value: stats.workTime, color: "#66fcf1" },
    { name: "Breaks", value: stats.breakTime, color: "#f43f5e" },
    { name: "Meetings", value: 0, color: "#45a29e" },
    { name: "Meetings", value: 0, color: "#45a29e" },
    { name: "Admin", value: 0, color: "#d4af37" },
  ];

  const distractionData = [
    { name: "Twitter/X", time: 0, color: "#1DA1F2" },
    { name: "Instagram", time: 0, color: "#E1306C" },
    { name: "YouTube", time: 0, color: "#FF0000" },
    { name: "News", time: 0, color: "#a1a1aa" },
  ];

  // If entirely empty, avoid rendering an invisible pie chart
  const hasPieData = stats.workTime > 0 || stats.breakTime > 0;
  const renderPieData = hasPieData ? pieData : [{ name: "No Data", value: 1, color: "#333333" }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Bar Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 lg:col-span-2 h-[400px] flex flex-col bg-[#111111]"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white tracking-wide">Activity Timeline</h3>
            <p className="text-xs text-[#a1a1aa]">Daily breakdown of your focus hours (in seconds)</p>
          </div>
        </div>
        <div className="flex-1 w-full h-full min-h-[0]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
              <Bar dataKey="active" stackId="a" fill="#66fcf1" radius={[0, 0, 4, 4]} />
              <Bar dataKey="manual" stackId="a" fill="#d4af37" />
              <Bar dataKey="break" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 lg:col-span-1 h-[400px] flex flex-col bg-[#111111]"
      >
        <div className="mb-2">
          <h3 className="text-lg font-medium text-white tracking-wide">Distribution</h3>
          <p className="text-xs text-[#a1a1aa]">Where your time goes</p>
        </div>
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={renderPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={hasPieData ? 5 : 0}
                dataKey="value"
                stroke={hasPieData ? "none" : "#ffffff10"}
                strokeDasharray={hasPieData ? "0" : "4 4"}
              >
                {renderPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0b0c10', borderColor: '#ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Screen Time & Distractions */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 lg:col-span-3 h-[300px] flex flex-col bg-[#111111]"
      >
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white tracking-wide">Screen Time & Distractions</h3>
          <p className="text-xs text-[#a1a1aa]">Simulated integration from Apple Screen Time</p>
        </div>
        <div className="flex-1 w-full h-full min-h-[0]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={distractionData} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} width={80} />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ backgroundColor: '#0b0c10', borderColor: '#ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: any) => [`${value}m`, 'Time spent']}
              />
              <Bar dataKey="time" radius={[0, 4, 4, 0]} barSize={20}>
                {distractionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      {/* Focus Performance Summary */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 bg-[#0a0a0a] border border-rose-500/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity size={40} className="text-rose-500" />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-rose-400" />
            <h3 className="text-lg font-medium text-white tracking-wide">Focus Score</h3>
          </div>
          <p className="text-xs text-[#a1a1aa]">Your deep work performance index</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <span className="text-3xl font-light text-white font-['Outfit']">
              {stats.workTime > 0 ? Math.min(100, Math.round((stats.workTime / 3600) * 20)).toString() : "0"}
              <span className="text-sm text-rose-500 font-bold ml-1">pts</span>
            </span>
            {stats.workTime > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <TrendingUp size={10} /> Active
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="block text-[10px] text-[#a1a1aa] uppercase font-bold mb-1">Focus Time</span>
              <span className="text-sm font-medium text-white">{Math.round(stats.workTime / 60)}m</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="block text-[10px] text-[#a1a1aa] uppercase font-bold mb-1">Break Time</span>
              <span className="text-sm font-medium text-white">{Math.round(stats.breakTime / 60)}m</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
