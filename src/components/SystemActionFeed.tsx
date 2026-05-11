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
            content: "Flow State maintained. Neural pathways reinforced.",
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
    <div className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Activity size={16} className="text-[var(--color-accent)]" />
          Neural Action Feed
        </h3>
        <span className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-tighter animate-pulse">Live Telemetry</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {actions.map((action) => (
          <motion.div 
            key={action.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 group cursor-default"
          >
            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${action.color} border border-white/10 group-hover:scale-110 transition-transform`}>
              {getIcon(action.type)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[13px] text-white/90 leading-snug group-hover:text-white transition-colors">
                {action.content}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-[#a1a1aa] uppercase tracking-widest">{action.timestamp}</span>
                <div className="h-[1px] w-4 bg-white/10" />
                <span className={`text-[9px] font-black uppercase tracking-widest ${action.color}`}>{action.type}</span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder for "filling space" aesthetic */}
        <div className="pt-4 opacity-10 select-none pointer-events-none">
          <div className="h-4 w-3/4 bg-white rounded mb-2" />
          <div className="h-4 w-1/2 bg-white rounded" />
        </div>
      </div>
    </div>
  );
}
