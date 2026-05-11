"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  Calendar,
  ChevronDown,
  ChevronUp,
  History,
  TrendingUp,
  Target
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from "recharts";

interface HealthEntry {
  weight?: number;
  calories?: number;
}

interface HealthData {
  [date: string]: HealthEntry;
}

export default function HealthTracker() {
  const [data, setData] = useState<HealthData>({});
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputWeight, setInputWeight] = useState("");
  const [inputCalories, setInputCalories] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem("ascend_health_data");
    if (saved) {
      setData(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const saveEntry = () => {
    const newData = {
      ...data,
      [selectedDate]: {
        weight: inputWeight ? parseFloat(inputWeight) : data[selectedDate]?.weight,
        calories: inputCalories ? parseInt(inputCalories) : data[selectedDate]?.calories,
      }
    };
    setData(newData);
    localStorage.setItem("ascend_health_data", JSON.stringify(newData));
    setShowInput(false);
    setInputWeight("");
    setInputCalories("");
    
    // Trigger custom event for other components if needed
    window.dispatchEvent(new Event("ascend_health_updated"));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const monthData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      day,
      dateStr,
      ...data[dateStr]
    };
  }).filter(d => d.weight || d.calories);

  const chartData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const entry = data[dateStr];
    return {
      name: day.toString(),
      weight: entry?.weight || null,
      calories: entry?.calories || 0,
      fullDate: dateStr
    };
  });

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  if (!isLoaded) return <div className="glass-panel h-[400px] animate-pulse" />;

  const todayData = data[todayStr] || {};
  const weightGoal = 75; // Placeholder
  const calorieGoal = 2500; // Placeholder

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-light text-white font-['Outfit'] mb-2 flex items-center gap-3">
            <Calendar className="text-[#66fcf1]" size={28} />
            Biometric Ascend
          </h2>
          <p className="text-xs text-[#a1a1aa] uppercase tracking-[0.3em] font-bold">Monthly Synchronization Log</p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
          <button 
            onClick={() => changeMonth(-1)} 
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-[#a1a1aa] hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="px-4 text-center min-w-[140px]">
            <span className="text-sm font-bold text-white uppercase tracking-widest">
              {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <button 
            onClick={() => changeMonth(1)} 
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-[#a1a1aa] hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Today's Protocol</span>
            <span className="text-sm font-medium text-white">{todayData.weight ? `${todayData.weight}kg` : "---"} / {todayData.calories ? `${todayData.calories}kcal` : "---"}</span>
          </div>
          <button 
            onClick={() => { setSelectedDate(todayStr); setShowInput(true); }}
            className="p-3 bg-[#66fcf1] text-black rounded-xl shadow-[0_0_20px_rgba(102,252,241,0.3)] hover:shadow-[0_0_30px_rgba(102,252,241,0.5)] transition-all"
          >
            <Activity size={20} />
          </button>
        </div>
      </div>

      {/* Premium Calendar Grid */}
      <div className="glass-panel p-1 bg-[#0a0a0a] border-white/5 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-white/5">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest border-r border-white/5 last:border-r-0">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-[140px]">
          {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-white/5 bg-[#ffffff02]" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const entry = data[dateStr];
            const isSelected = selectedDate === dateStr;
            const isToday = todayStr === dateStr;
            
            const calProgress = entry?.calories ? Math.min(100, (entry.calories / calorieGoal) * 100) : 0;
            
            return (
              <motion.button
                key={day}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                onClick={() => { setSelectedDate(dateStr); setShowInput(true); }}
                className={`relative p-4 border-r border-b border-white/5 flex flex-col text-left transition-all group overflow-hidden ${
                  isSelected ? "bg-[#66fcf1]/5" : ""
                }`}
              >
                {/* Background Glow for Today */}
                {isToday && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#66fcf1]/5 blur-2xl rounded-full -mr-10 -mt-10" />
                )}

                <div className="flex items-center justify-between mb-auto">
                  <span className={`text-sm font-['Outfit'] font-light ${
                    isToday ? "text-[#66fcf1]" : "text-[#a1a1aa]"
                  }`}>
                    {String(day).padStart(2, '0')}
                  </span>
                  {isToday && (
                    <span className="text-[8px] font-bold bg-[#66fcf1]/20 text-[#66fcf1] px-1.5 py-0.5 rounded-full uppercase">Today</span>
                  )}
                </div>

                <div className="space-y-2 mt-4 relative z-10">
                  {entry?.weight ? (
                    <div className="flex items-center gap-1.5">
                      <Scale size={10} className="text-blue-400" />
                      <span className="text-xs font-medium text-white">{entry.weight}kg</span>
                    </div>
                  ) : (
                    <div className="h-4" /> 
                  )}

                  {entry?.calories ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Flame size={10} className="text-orange-400" />
                        <span className="text-xs font-medium text-white">{entry.calories}kcal</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${calProgress}%` }}
                          className={`h-full rounded-full ${
                            calProgress > 100 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-[10px] text-[#a1a1aa] italic">Empty Log</span>
                    </div>
                  )}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div 
                    layoutId="calendar-select"
                    className="absolute inset-0 border-2 border-[#66fcf1]/30 pointer-events-none"
                    initial={false}
                  />
                )}
              </motion.button>
            );
          })}
          
          {/* Fill remaining cells */}
          {Array.from({ length: (7 - ((new Date(currentYear, currentMonth, 1).getDay() + daysInMonth) % 7)) % 7 }).map((_, i) => (
            <div key={`fill-${i}`} className="border-r border-b border-white/5 bg-[#ffffff02]" />
          ))}
        </div>
      </div>

      {/* Analytics Summary - "The End of Day" View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 bg-[#0a0a0a] border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Weight Trajectory</h3>
            </div>
            <p className="text-[10px] text-[#a1a1aa] mb-4 uppercase">Last 30 Days Variance</p>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.filter(d => d.weight)}>
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-2xl font-light text-white font-['Outfit']">
              {monthData.filter(d => d.weight).length > 0 ? (monthData.filter(d => d.weight)[monthData.filter(d => d.weight).length-1].weight! - monthData.filter(d => d.weight)[0].weight!).toFixed(1) : "0.0"}
              <span className="text-xs text-[#a1a1aa] ml-1">kg net change</span>
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 bg-[#0a0a0a] border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity size={16} className="text-orange-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Caloric Consistency</h3>
            </div>
            <p className="text-[10px] text-[#a1a1aa] mb-4 uppercase">Average Monthly Fuel</p>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="calories" fill="#f97316" radius={[2, 2, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-2xl font-light text-white font-['Outfit']">
              {monthData.filter(d => d.calories).length > 0 
                ? Math.round(monthData.filter(d => d.calories).reduce((acc, curr) => acc + (curr.calories || 0), 0) / monthData.filter(d => d.calories).length)
                : "0"
              }
              <span className="text-xs text-[#a1a1aa] ml-1">kcal avg / day</span>
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 bg-gradient-to-br from-[#66fcf1]/10 to-blue-500/5 border-[#66fcf1]/20 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target size={16} className="text-[#66fcf1]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Protocol Status</h3>
            </div>
            <p className="text-[10px] text-[#a1a1aa] mb-4 uppercase">Synchronization Integrity</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#a1a1aa] uppercase">Logs for {viewDate.toLocaleString('default', { month: 'short' })}</span>
              <span className="text-sm font-medium text-[#66fcf1]">{monthData.length} / {daysInMonth}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(monthData.length / daysInMonth) * 100}%` }}
                className="h-full bg-[#66fcf1] shadow-[0_0_10px_#66fcf1]"
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#a1a1aa] uppercase">Efficiency Rating</span>
            <span className="text-lg font-light text-white uppercase tracking-widest">
              {monthData.length > 20 ? "Elite" : monthData.length > 10 ? "Standard" : "Initial"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Input Modal */}
      <AnimatePresence>
        {showInput && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInput(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel p-8 bg-[#0d0d0d] border-[#ffffff10] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-light text-white font-['Outfit']">Initialize Log</h3>
                  <p className="text-xs text-[#66fcf1] mt-1 font-bold uppercase tracking-widest">
                    {new Date(selectedDate).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#66fcf1]/10 flex items-center justify-center border border-[#66fcf1]/20">
                  <Activity size={24} className="text-[#66fcf1]" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Mass Measurement (kg)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.1"
                      value={inputWeight}
                      onChange={(e) => setInputWeight(e.target.value)}
                      placeholder={data[selectedDate]?.weight?.toString() || "0.0"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#66fcf1]/50 transition-all placeholder:text-white/10 text-lg font-light"
                    />
                    <Scale className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Energy Intake (kcal)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={inputCalories}
                      onChange={(e) => setInputCalories(e.target.value)}
                      placeholder={data[selectedDate]?.calories?.toString() || "0"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#66fcf1]/50 transition-all placeholder:text-white/10 text-lg font-light"
                    />
                    <Flame className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" size={20} />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                <button 
                  onClick={() => setShowInput(false)}
                  className="flex-1 py-4 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa] hover:bg-white/5 transition-all"
                >
                  Abort
                </button>
                <button 
                  onClick={saveEntry}
                  className="flex-[2] py-4 rounded-xl bg-[#66fcf1] text-black text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(102,252,241,0.3)] hover:shadow-[0_0_30px_rgba(102,252,241,0.5)] transition-all"
                >
                  Sync Protocol
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
