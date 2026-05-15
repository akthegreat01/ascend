"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, BookHeart, Save, Terminal, Play, CheckCircle2, Workflow, Link2, GitBranch, PenTool, MessageSquare, Code, LayoutTemplate, Video, FileText, Mail, Music, BookOpen, Globe, Zap, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

/* ═══════════════════════════════════════════════════════
   QUICK LINKS DATA
   ═══════════════════════════════════════════════════════ */
const links = [
  { name: "ChatGPT", icon: MessageSquare, color: "#10b981", url: "https://chat.openai.com" },
  { name: "GitHub", icon: GitBranch, color: "#ffffff", url: "https://github.com" },
  { name: "Figma", icon: PenTool, color: "#f472b6", url: "https://figma.com" },
  { name: "Notion", icon: LayoutTemplate, color: "#e5e5e5", url: "https://notion.so" },
  { name: "YouTube", icon: Video, color: "#ef4444", url: "https://youtube.com" },
  { name: "VS Code", icon: Code, color: "#3b82f6", url: "vscode://" },
  { name: "Docs", icon: FileText, color: "#60a5fa", url: "https://docs.google.com" },
  { name: "Gmail", icon: Mail, color: "#f87171", url: "https://mail.google.com" },
  { name: "Spotify", icon: Music, color: "#34d399", url: "https://open.spotify.com" },
  { name: "Medium", icon: BookOpen, color: "#d4d4d4", url: "https://medium.com" },
  { name: "LinkedIn", icon: Globe, color: "#60a5fa", url: "https://linkedin.com" },
  { name: "Vercel", icon: Zap, color: "#ffffff", url: "https://vercel.com/dashboard" },
];

/* ═══════════════════════════════════════════════════════
   PROTOCOLS DATA
   ═══════════════════════════════════════════════════════ */
const protocols = [
  { id: "deep_work", name: "Focus Session", desc: "Start Focus Zone + Audio", color: "emerald", icon: Terminal },
  { id: "morning_brief", name: "Morning Brief", desc: "Review Tasks & Goals", color: "amber", icon: CheckCircle2 },
  { id: "end_of_day", name: "End of Day", desc: "Journal & Clear", color: "rose", icon: Workflow },
];

export default function CommandCenter() {
  const router = useRouter();
  const [journalEntry, setJournalEntry] = useState("");
  const [activeHabits, setActiveHabits] = useState<any[]>([]);
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  const executeProtocol = (id: string) => {
    setActiveProtocol(id);
    setTimeout(() => {
      if (id === "deep_work") {
        localStorage.setItem("ascend_active_sound", "neural_static");
        window.dispatchEvent(new Event("ascend_sound_change"));
        router.push("/timer");
      } else if (id === "end_of_day") {
        router.push("/briefing");
      } else if (id === "morning_brief") {
        router.push("/tasks");
      }
      setActiveProtocol(null);
    }, 1200);
  };

  const toggleHabit = (habitId: string) => {
    const savedRecords = localStorage.getItem("ascend_habit_records");
    const records = savedRecords ? JSON.parse(savedRecords) : {};
    const today = new Date().toISOString().split('T')[0];
    if (!records[habitId]) records[habitId] = {};
    records[habitId][today] = !records[habitId][today];
    localStorage.setItem("ascend_habit_records", JSON.stringify(records));
    setActiveHabits(prev => prev.map(h =>
      h.id === habitId ? { ...h, completedToday: records[habitId][today] } : h
    ));
    window.dispatchEvent(new Event("ascend_habit_updated"));
  };

  useEffect(() => {
    const loadHabits = () => {
      const savedHabits = localStorage.getItem("ascend_habits");
      const savedRecords = localStorage.getItem("ascend_habit_records");
      const records = savedRecords ? JSON.parse(savedRecords) : {};
      const today = new Date().toISOString().split('T')[0];
      if (savedHabits) {
        const allHabits = JSON.parse(savedHabits);
        setActiveHabits(allHabits.slice(0, 5).map((h: any) => ({
          ...h, title: h.name, completedToday: records[h.id]?.[today] || false
        })));
      }
    };
    loadHabits();
    window.addEventListener("ascend_habit_updated", loadHabits);
    return () => window.removeEventListener("ascend_habit_updated", loadHabits);
  }, []);

  const quickSaveJournal = () => {
    if (!journalEntry.trim()) return;
    const text = journalEntry.trim();
    const lowerText = text.toLowerCase();

    if (lowerText.startsWith("task:") || lowerText.startsWith("todo:") || lowerText.startsWith("remind me to") || lowerText.startsWith("buy ")) {
      const savedTasks = localStorage.getItem("ascend_premium_tasks");
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      let cleanText = text;
      if (lowerText.startsWith("task:")) cleanText = text.substring(5).trim();
      else if (lowerText.startsWith("todo:")) cleanText = text.substring(5).trim();
      else if (lowerText.startsWith("remind me to")) cleanText = text.substring(12).trim();
      const newTask = {
        id: Date.now().toString(), title: cleanText, completed: false,
        priority: (lowerText.includes("urgent") || lowerText.includes("asap")) ? "high" : "medium"
      };
      localStorage.setItem("ascend_premium_tasks", JSON.stringify([newTask, ...tasks]));
      window.dispatchEvent(new Event("ascend_task_updated"));
      alert("→ Task added");
    } else if (lowerText.startsWith("goal:") || lowerText.startsWith("target:")) {
      const savedGoals = localStorage.getItem("ascend_goals");
      const goals = savedGoals ? JSON.parse(savedGoals) : [];
      let cleanText = text;
      if (lowerText.startsWith("goal:")) cleanText = text.substring(5).trim();
      else if (lowerText.startsWith("target:")) cleanText = text.substring(7).trim();
      const newGoal = {
        id: Date.now().toString(), title: cleanText, description: "Captured via Command Line",
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
        category: "Captured", milestones: []
      };
      localStorage.setItem("ascend_goals", JSON.stringify([newGoal, ...goals]));
      window.dispatchEvent(new Event("ascend_goal_updated"));
      alert("→ Goal added");
    } else {
      const saved = localStorage.getItem("ascend_journal");
      const entries = saved ? JSON.parse(saved) : [];
      const newEntry = { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], content: text, mood: "⚡️" };
      localStorage.setItem("ascend_journal", JSON.stringify([newEntry, ...entries]));
      window.dispatchEvent(new Event("ascend_journal_updated"));
      alert("→ Journal saved");
    }
    setJournalEntry("");
  };

  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-400/8 border-emerald-400/15 hover:border-emerald-400/30",
    amber: "text-amber-400 bg-amber-400/8 border-amber-400/15 hover:border-amber-400/30",
    rose: "text-rose-400 bg-rose-400/8 border-rose-400/15 hover:border-rose-400/30",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

      {/* ═══ 1. COMMAND LINE — Quick Capture ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-panel p-4 flex flex-col group"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
            <BookHeart size={12} className="text-emerald-400" />
          </div>
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Command Line</span>
          <span className="text-[9px] font-mono text-[#555] ml-auto">task: | goal: | note</span>
        </div>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Type 'task:' 'goal:' or just write..."
          className="w-full bg-black/20 rounded-[16px] border border-white/[0.04] text-sm text-white p-4 focus:outline-none focus:border-white/[0.1] focus:bg-black/30 transition-all placeholder-white/15 resize-none flex-1 font-light shadow-[inset_0_4px_15px_rgba(0,0,0,0.6),_inset_0_1px_2px_rgba(0,0,0,0.8)]"
          style={{ minHeight: "80px" }}
          onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) quickSaveJournal(); }}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-[9px] text-[#555] font-mono">⌘+Enter to save</span>
          <button
            onClick={quickSaveJournal}
            disabled={!journalEntry.trim()}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all flex items-center gap-1.5 uppercase tracking-wider ${
              journalEntry.trim()
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <Save size={10} /> Capture
          </button>
        </div>
      </motion.div>

      {/* ═══ 2. QUICK ACTIONS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-4 flex flex-col"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-6 h-6 rounded-md bg-[var(--color-accent)]/10 flex items-center justify-center">
            <Workflow size={12} className="text-[var(--color-accent)]" />
          </div>
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Quick Actions</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {protocols.map(p => (
            <button
              key={p.id}
              onClick={() => executeProtocol(p.id)}
              disabled={activeProtocol !== null}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-300 ${colorMap[p.color]} ${activeProtocol === p.id ? "animate-pulse scale-[0.98]" : ""} ${activeProtocol && activeProtocol !== p.id ? "opacity-30" : ""}`}
            >
              <div className="w-6 h-6 rounded-md bg-black/20 flex items-center justify-center shrink-0">
                <p.icon size={12} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-white block leading-tight">{activeProtocol === p.id ? "Running..." : p.name}</span>
                <span className="text-[9px] opacity-50 leading-tight">{p.desc}</span>
              </div>
              {activeProtocol === p.id ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                <Play size={10} className="opacity-0 group-hover:opacity-40 transition-opacity text-white fill-white shrink-0" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ═══ 3. PORTALS + HABITS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-panel p-4 flex flex-col"
      >
        {/* Quick Links */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
            <Link2 size={12} className="text-blue-400" />
          </div>
          <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Portals</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 mb-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200 group/link"
              title={link.name}
            >
              <link.icon size={12} style={{ color: link.color }} className="opacity-60 group-hover/link:opacity-100 transition-opacity" />
              <span className="text-[7px] font-bold text-[#666] group-hover/link:text-white transition-colors truncate w-full text-center uppercase tracking-wider">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Habits */}
        {activeHabits.length > 0 && (
          <>
            <div className="flex items-center gap-2.5 mb-2 pt-2 border-t border-white/[0.04]">
              <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center">
                <Activity size={12} className="text-amber-400" />
              </div>
              <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.15em]">Habits</span>
              <button onClick={() => router.push("/habits")} className="text-[9px] text-[#555] hover:text-amber-400 transition-colors ml-auto font-mono">View All →</button>
            </div>
            <div className="flex flex-col gap-1.5">
              {activeHabits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-md border cursor-pointer transition-all duration-200 ${
                    habit.completedToday
                      ? "bg-amber-500/8 border-amber-500/20"
                      : "bg-white/[0.01] border-white/[0.04] hover:border-amber-500/20"
                  }`}
                >
                  <span className={`text-[11px] font-medium ${habit.completedToday ? 'text-amber-300' : 'text-[#888]'}`}>{habit.title}</span>
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                    habit.completedToday
                      ? 'bg-amber-500 border-amber-500'
                      : 'border-white/10'
                  }`}>
                    {habit.completedToday && <span className="text-[10px] text-black font-black">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
