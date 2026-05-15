"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, Activity, CheckCircle2, MessageSquare } from "lucide-react";
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
      
      const focusDates = localStorage.getItem("ascend_focus_dates");
      if (focusDates) {
        const dates = JSON.parse(focusDates);
        dates.slice(-3).forEach((d: string) => {
          feed.push({ id: `focus-${d}`, type: "focus", content: "Focus session completed", timestamp: d, color: "text-emerald-400" });
        });
      }

      const tasks = localStorage.getItem("ascend_premium_tasks");
      if (tasks) {
        const parsed = JSON.parse(tasks);
        parsed.filter((t: any) => t.completed).slice(0, 3).forEach((t: any) => {
          feed.push({ id: `task-${t.id}`, type: "task", content: `Done: ${t.title}`, timestamp: "Today", color: "text-sky-400" });
        });
      }

      const transactions = localStorage.getItem("ascend_transactions");
      if (transactions) {
        const parsed = JSON.parse(transactions);
        parsed.slice(0, 2).forEach((t: any) => {
          feed.push({
            id: `wealth-${t.id}`, type: "wealth",
            content: `${t.type === 'income' ? '+' : '-'}${t.amount}`,
            timestamp: t.date, color: t.type === 'income' ? "text-emerald-400" : "text-rose-400"
          });
        });
      }

      if (feed.length === 0) {
        feed.push({ id: "sys-1", type: "journal", content: "System initialized. Awaiting activity.", timestamp: "now", color: "text-[var(--color-accent)]" });
      }
      setActions(feed.sort((a, b) => b.id.localeCompare(a.id)).slice(0, 8));
    };

    generateFeed();
    window.addEventListener("storage", generateFeed);
    window.addEventListener("ascend_stats_updated", generateFeed);
    window.addEventListener("ascend_task_updated", generateFeed);
    return () => {
      window.removeEventListener("storage", generateFeed);
      window.removeEventListener("ascend_stats_updated", generateFeed);
      window.removeEventListener("ascend_task_updated", generateFeed);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "focus": return <Zap size={10} />;
      case "task": return <CheckCircle2 size={10} />;
      case "habit": return <Activity size={10} />;
      case "wealth": return <DollarSign size={10} />;
      default: return <MessageSquare size={10} />;
    }
  };

  return (
    <div className="glass-panel p-4 flex flex-col group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-[var(--color-accent)]" />
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Activity</span>
        </div>
        <span className="text-[8px] font-mono text-[#555] animate-pulse">LIVE</span>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[250px]">
        {actions.map((action) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-white/[0.015] border border-white/[0.03] hover:border-white/[0.08] transition-all duration-200 group/item cursor-default"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${action.color} bg-white/[0.04]`}>
              {getIcon(action.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/70 truncate group-hover/item:text-white transition-colors">{action.content}</p>
            </div>
            <span className="text-[8px] font-mono text-[#555] shrink-0">{action.timestamp}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
