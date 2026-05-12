"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Target, DollarSign, Activity, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Action {
  id: string;
  type: "focus" | "task" | "habit" | "wealth" | "journal";
  content: string;
  timestamp: string;
  color: string;
}

export default function SystemActionFeed() {
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    const generateFeed = () => {
      const feed: Action[] = [];
      
      // Pull from focus records
      const focusDates = localStorage.getItem("ascend_focus_dates");
      if (focusDates) {
        const dates = JSON.parse(focusDates);
        dates.slice(-2).forEach((d: string) => {
          feed.push({
            id: `focus-${d}`,
            type: "focus",
            content: "Flow State maintained. Focus consistency improved.",
            timestamp: d,
            color: "text-emerald-400"
          });
        });
      }

      // Pull from tasks
      const tasks = localStorage.getItem("ascend_premium_tasks");
      if (tasks) {
        const parsed = JSON.parse(tasks);
        parsed.filter((t: any) => t.completed).slice(0, 3).forEach((t: any) => {
          feed.push({
            id: `task-${t.id}`,
            type: "task",
            content: `Objective reached: ${t.title}`,
            timestamp: "Today",
            color: "text-sky-400"
          });
        });
      }

      // Pull from wealth
      const transactions = localStorage.getItem("ascend_transactions");
      if (transactions) {
        const parsed = JSON.parse(transactions);
        parsed.slice(0, 2).forEach((t: any) => {
          feed.push({
            id: `wealth-${t.id}`,
            type: "wealth",
            content: `${t.type === 'income' ? 'Capital Influx' : 'Capital Allocation'}: ${t.amount}`,
            timestamp: t.date,
            color: t.type === 'income' ? "text-emerald-400" : "text-rose-400"
          });
        });
      }

      // Default if empty
      if (feed.length === 0) {
        feed.push({
          id: "sys-1",
          type: "journal",
          content: "System Initialized. Awaiting user telemetry.",
          timestamp: "System",
          color: "text-[var(--color-accent)]"
        });
      }

      setActions(feed.sort((a, b) => b.id.localeCompare(a.id)));
    };

    generateFeed();
    window.addEventListener("storage", generateFeed);
    return () => window.removeEventListener("storage", generateFeed);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "focus": return <Zap size={14} />;
      case "task": return <CheckCircle2 size={14} />;
      case "habit": return <Activity size={14} />;
      case "wealth": return <DollarSign size={14} />;
      default: return <MessageSquare size={14} />;
    }
  };

  return (
    <div className="glass-panel p-8 flex flex-col h-[450px] group relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-[11px] font-black text-white tracking-[0.2em] uppercase flex items-center gap-3">
          <Activity size={18} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-500" />
          System Activity
        </h3>
        <span className="text-[9px] font-black text-[#a1a1aa] uppercase tracking-widest animate-pulse opacity-60">Real-time activity</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-3 relative z-10">
        {actions.map((action) => (
          <motion.div 
            key={action.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-5 group/item cursor-default"
          >
            <div className={`mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center ${action.color} border border-white/[0.05] group-hover/item:scale-110 group-hover/item:border-white/20 transition-all duration-500`}>
              {getIcon(action.type)}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-medium text-white/80 leading-snug group-hover/item:text-white transition-colors duration-300">
                {action.content}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-[#a1a1aa] uppercase tracking-[0.15em] opacity-60">{action.timestamp}</span>
                <div className="h-[1px] w-6 bg-white/10" />
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${action.color} opacity-80`}>{action.type}</span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder for "filling space" aesthetic */}
        <div className="pt-6 opacity-5 select-none pointer-events-none">
          <div className="h-4 w-3/4 bg-white rounded-full mb-3" />
          <div className="h-4 w-1/2 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
